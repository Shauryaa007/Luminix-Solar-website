'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Plus,
  Minus,
  Sun,
  Factory,
  Zap,
  Building,
  Info,
} from 'lucide-react';

export interface ConsultationFormProps {
  /**
   * Layout variant:
   * - 'compact': streamlined layout ideal for hero card & sidebars (default)
   * - 'full': expanded layout with notes ideal for modal dialogs
   */
  variant?: 'compact' | 'full';

  /**
   * Source identifier for lead tracking (e.g., 'hero_section', 'modal_popup')
   */
  source?: string;

  /**
   * Optional prefilled requirement text or prefill configuration object
   */
  prefillNote?: string | ConsultationPrefillData;

  /**
   * Structured prefill configuration data
   */
  prefillData?: ConsultationPrefillData;

  /**
   * Callback fired when user begins typing or interacting with form inputs.
   */
  onInteraction?: () => void;

  /**
   * Callback fired when submission succeeds
   */
  onSuccess?: () => void;

  /**
   * Callback to close enclosing modal/container on done
   */
  onClose?: () => void;

  /**
   * Custom submit button label
   */
  submitButtonText?: string;

  /**
   * Optional custom className for outer wrapper
   */
  className?: string;
}

// --------------------------------------------------------------------------
// Constants & Options
// --------------------------------------------------------------------------

export type SchemeType = 'PMSG' | 'PMFME';

export interface ConsultationPrefillData {
  note?: string;
  capacity?: string; // e.g., '1 kW', '2 kW', '3 kW', '5 kW', '10 kW'
  systemType?: string; // e.g., 'On-Grid', 'Off-Grid', 'Hybrid'
  scheme?: SchemeType;
  selectionMode?: 'bill' | 'capacity';
  panelCompany?: string;
  propertyType?: string;
}

export const PANEL_COMPANIES = ['TATA', 'ADANI', 'WARI', 'UTL', 'OTHERS'] as const;

export const BILL_STEPS = [
  '≤ ₹1,000',
  '₹2,000',
  '₹3,000',
  '₹4,000',
  '₹5,000',
  '₹6,000',
  '₹7,000',
  '₹8,000',
  '₹9,000',
  '≥ ₹10,000',
] as const;

export const CAPACITY_STEPS = [
  '1 kW',
  '2 kW',
  '3 kW',
  '4 kW',
  '5 kW',
  '6 kW',
  '7 kW',
  '8 kW',
  '9 kW',
  '10 kW',
  '≥ 10 kW',
] as const;

export const SYSTEM_TYPES = ['On-Grid', 'Off-Grid', 'Hybrid'] as const;

export const PROPERTY_TYPE_OPTIONS = [
  { value: 'Residential Independent House / Villa', label: 'Independent House / Villa' },
  { value: 'Gated Society / Apartment Association', label: 'Apartment / Housing Society' },
  { value: 'Commercial Office / Retail / Hospital', label: 'Commercial Property' },
  { value: 'Industrial Factory / Warehouse', label: 'Industrial / Warehouse' },
  { value: 'Agricultural Farmland', label: 'Agricultural Farmland' },
  { value: 'Solar Pump', label: 'Solar Pump' },
] as const;

export function parsePrefillData(
  input?: string | ConsultationPrefillData
): ConsultationPrefillData {
  if (!input) return {};
  if (typeof input === 'object') return input;

  const res: ConsultationPrefillData = { note: input };
  const text = input.toLowerCase();

  // Capacity check
  const kwMatch = text.match(/(\d+(?:\.\d+)?)\s*kw/i);
  if (kwMatch) {
    const kw = Math.round(parseFloat(kwMatch[1]));
    res.selectionMode = 'capacity';
    if (kw <= 1) res.capacity = '1 kW';
    else if (kw >= 10) res.capacity = '10 kW';
    else res.capacity = `${kw} kW`;
  }

  // System type check
  if (text.includes('on-grid') || text.includes('ongrid')) {
    res.systemType = 'On-Grid';
  } else if (text.includes('off-grid') || text.includes('offgrid')) {
    res.systemType = 'Off-Grid';
  } else if (text.includes('hybrid')) {
    res.systemType = 'Hybrid';
  }

  return res;
}

export default function ConsultationForm({
  variant = 'compact',
  source = 'consultation_form',
  prefillNote = '',
  prefillData,
  onInteraction,
  onSuccess,
  onClose,
  submitButtonText,
  className = '',
}: ConsultationFormProps) {
  // ------------------------------------------------------------------------
  // State
  // ------------------------------------------------------------------------
  const initialPrefill = parsePrefillData(prefillData || prefillNote);

  const [activeScheme, setActiveScheme] = useState<SchemeType>(
    initialPrefill.scheme || 'PMSG'
  );

  // Contact details
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  // Panel company selection (Mandatory: user must pick one)
  const [panelCompany, setPanelCompany] = useState<string>(
    initialPrefill.panelCompany || ''
  );
  const [panelCompanyOther, setPanelCompanyOther] = useState('');

  // PMSG: Selection mode (Bill OR Capacity)
  const [selectionMode, setSelectionMode] = useState<'bill' | 'capacity'>(
    initialPrefill.selectionMode || (initialPrefill.capacity ? 'capacity' : 'bill')
  );
  const [billIndex, setBillIndex] = useState<number>(3); // default ₹4,000
  const [capacityIndex, setCapacityIndex] = useState<number>(() => {
    if (initialPrefill.capacity) {
      const idx = CAPACITY_STEPS.findIndex(
        (s) => s.toLowerCase() === initialPrefill.capacity?.toLowerCase()
      );
      if (idx !== -1) return idx;
    }
    return 2; // default 3 kW
  });

  // PMSG: System & Property type (Mandatory: user must pick)
  const [systemType, setSystemType] = useState<string>(
    initialPrefill.systemType || ''
  );
  const [propertyType, setPropertyType] = useState<string>(
    initialPrefill.propertyType || ''
  );

  // PMFME: Business type & Capacity
  const [pmfmeCapacityIndex, setPmfmeCapacityIndex] = useState<number>(() => {
    if (initialPrefill.capacity) {
      const idx = CAPACITY_STEPS.findIndex(
        (s) => s.toLowerCase() === initialPrefill.capacity?.toLowerCase()
      );
      if (idx !== -1) return idx;
    }
    return 2; // default 3 kW
  });
  const [businessType, setBusinessType] = useState('');

  // Optional general notes
  const [requirementNote, setRequirementNote] = useState(
    initialPrefill.note || (typeof prefillNote === 'string' ? prefillNote : '')
  );

  // Submission & Validation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    const data = parsePrefillData(prefillData || prefillNote);
    if (data.note !== undefined) {
      setRequirementNote(data.note);
    }
    if (data.scheme) {
      setActiveScheme(data.scheme);
    }
    if (data.selectionMode) {
      setSelectionMode(data.selectionMode);
    }
    if (data.capacity) {
      const idx = CAPACITY_STEPS.findIndex(
        (s) => s.toLowerCase() === data.capacity?.toLowerCase()
      );
      if (idx !== -1) {
        setSelectionMode('capacity');
        setCapacityIndex(idx);
        setPmfmeCapacityIndex(idx);
      }
    }
    if (data.systemType) {
      const matched = SYSTEM_TYPES.find(
        (t) => t.toLowerCase() === data.systemType?.toLowerCase()
      );
      if (matched) {
        setSystemType(matched);
      }
    }
    if (data.panelCompany) {
      setPanelCompany(data.panelCompany);
    }
    if (data.propertyType) {
      setPropertyType(data.propertyType);
    }
  }, [prefillNote, prefillData]);

  const handleInteraction = () => {
    if (onInteraction) {
      onInteraction();
    }
  };

  const clearErrors = () => {
    if (errorMessage) setErrorMessage(null);
    if (errorField) setErrorField(null);
  };

  // ------------------------------------------------------------------------
  // Bill / Capacity Steppers
  // ------------------------------------------------------------------------
  const handleBillStep = (delta: number) => {
    handleInteraction();
    clearErrors();
    setBillIndex((prev) => Math.max(0, Math.min(BILL_STEPS.length - 1, prev + delta)));
  };

  const handleCapacityStep = (delta: number) => {
    handleInteraction();
    clearErrors();
    if (activeScheme === 'PMSG') {
      setCapacityIndex((prev) => Math.max(0, Math.min(CAPACITY_STEPS.length - 1, prev + delta)));
    } else {
      setPmfmeCapacityIndex((prev) =>
        Math.max(0, Math.min(CAPACITY_STEPS.length - 1, prev + delta))
      );
    }
  };

  // ------------------------------------------------------------------------
  // Form Submission & Strict Field Validation
  // ------------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setErrorField(null);

    // 1. Full Name (Mandatory)
    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      setErrorField('name');
      return;
    }

    // 2. Mobile Number (Mandatory 10-digit Indian mobile)
    const cleanMobile = mobile.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).');
      setErrorField('mobile');
      return;
    }

    // 3. City (Mandatory)
    if (!city.trim() || city.trim().length < 2) {
      setErrorMessage('Please enter your city name.');
      setErrorField('city');
      return;
    }

    // 4. Pincode (Mandatory 6 digits)
    if (!pincode.trim() || !/^\d{6}$/.test(pincode.trim())) {
      setErrorMessage('Please enter a valid 6-digit PIN code.');
      setErrorField('pincode');
      return;
    }

    // 5. Panel Company (Mandatory)
    if (!panelCompany) {
      setErrorMessage('Please select your preferred panel company (TATA, ADANI, WARI, UTL, or OTHERS).');
      setErrorField('panelCompany');
      return;
    }

    if (panelCompany === 'OTHERS' && !panelCompanyOther.trim()) {
      setErrorMessage('Please specify your preferred panel manufacturer name.');
      setErrorField('panelCompanyOther');
      return;
    }

    // 6. Scheme-specific Mandatory Fields
    if (activeScheme === 'PMSG') {
      if (!systemType) {
        setErrorMessage('Please select a system type (On-Grid, Off-Grid, or Hybrid).');
        setErrorField('systemType');
        return;
      }
      if (!propertyType || !propertyType.trim()) {
        setErrorMessage('Please select your property type.');
        setErrorField('propertyType');
        return;
      }
    } else {
      // PMFME Scheme
      if (!businessType.trim()) {
        setErrorMessage('Please enter your business type (e.g. Flour Mill / Bakery).');
        setErrorField('businessType');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        mobile: cleanMobile,
        city: city.trim(),
        pincode: pincode.trim(),
        scheme: activeScheme,
        panelCompany,
        panelCompanyOther: panelCompany === 'OTHERS' ? panelCompanyOther.trim() : undefined,
        selectionMode: activeScheme === 'PMSG' ? selectionMode : 'capacity',
        monthlyBill: activeScheme === 'PMSG' && selectionMode === 'bill' ? BILL_STEPS[billIndex] : undefined,
        capacity:
          activeScheme === 'PMSG'
            ? selectionMode === 'capacity'
              ? CAPACITY_STEPS[capacityIndex]
              : undefined
            : CAPACITY_STEPS[pmfmeCapacityIndex],
        systemType: activeScheme === 'PMSG' ? systemType : undefined,
        propertyType: activeScheme === 'PMSG' ? propertyType : undefined,
        businessType: activeScheme === 'PMFME' ? businessType.trim() : undefined,
        requirement: requirementNote.trim() || undefined,
        companyWebsiteUrl: honeypot || undefined,
        source,
      };

      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit consultation request.');
      }

      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      console.error('Consultation submission error:', err);
      setErrorMessage(
        err instanceof Error ? err.message : 'An error occurred. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setMobile('');
    setCity('');
    setPincode('');
    setPanelCompany('');
    setPanelCompanyOther('');
    setSelectionMode('bill');
    setBillIndex(3);
    setCapacityIndex(2);
    setPmfmeCapacityIndex(2);
    setSystemType('');
    setPropertyType('');
    setBusinessType('');
    const resetData = parsePrefillData(prefillData || prefillNote);
    setRequirementNote(resetData.note || '');
    setIsSubmitted(false);
    setErrorMessage(null);
    setErrorField(null);
    setHoneypot('');
  };

  // Shared responsive classes compliant with rules (text-base sm:text-sm to prevent iOS zoom)
  const inputClass =
    'w-full max-w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2 sm:py-2.5 text-base sm:text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 box-border';

  const getInputClass = (fieldName: string, extraClasses = '') =>
    `${inputClass} ${errorField === fieldName
      ? 'border-rose-400 ring-2 ring-rose-400/20 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-400/30'
      : ''
      } ${extraClasses}`.trim();

  const labelClass = 'mb-1 block text-[11px] sm:text-xs font-semibold text-slate-700';

  // ------------------------------------------------------------------------
  // Render: Success Screen
  // ------------------------------------------------------------------------
  if (isSubmitted) {
    return (
      <div className={`py-8 text-center ${className}`}>
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-700" />

        <h3 className="mt-4 text-xl font-bold text-slate-900">
          Thank you, {name}!
        </h3>

        <p className="mt-2.5 text-sm leading-6 text-slate-600 max-w-md mx-auto">
          Your solar consultation request under{' '}
          <strong className="text-emerald-950 font-bold">
            {activeScheme === 'PMSG' ? 'PM Surya Ghar' : 'PMFME Scheme'}
          </strong>{' '}
          has been recorded. Our certified solar engineer will contact you shortly at{' '}
          <span className="font-semibold text-slate-900">+91 {mobile}</span>.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="text-sm font-semibold text-emerald-800 hover:underline"
          >
            Submit another inquiry
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-emerald-800 px-5 py-2 text-xs font-bold text-white transition hover:bg-emerald-900"
            >
              Done
            </button>
          )}
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------------
  // Render: Active Form
  // ------------------------------------------------------------------------
  return (
    <form onSubmit={handleSubmit} className={`space-y-3.5 ${className}`}>
      {/* Anti-spam honeypot - invisible to legitimate users */}
      <div className="hidden" aria-hidden="true" tabIndex={-1}>
        <input
          type="text"
          name="companyWebsiteUrl"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {/* ------------------------------------------------------------------ */}
      {/* 1. SCHEME SELECTOR (Clean Segmented Tabs)                          */}
      {/* ------------------------------------------------------------------ */}
      <div>
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1 border border-slate-200/70">
          <button
            type="button"
            onClick={() => {
              handleInteraction();
              setActiveScheme('PMSG');
              clearErrors();
            }}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all ${activeScheme === 'PMSG'
              ? 'bg-white text-emerald-950 shadow-xs border border-slate-200/60'
              : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            <Sun className={`h-3.5 w-3.5 ${activeScheme === 'PMSG' ? 'text-amber-500' : 'text-slate-400'}`} />
            <span>PM Surya Ghar</span>
          </button>

          <button
            type="button"
            onClick={() => {
              handleInteraction();
              setActiveScheme('PMFME');
              clearErrors();
            }}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all ${activeScheme === 'PMFME'
              ? 'bg-white text-emerald-950 shadow-xs border border-slate-200/60'
              : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            <Factory className={`h-3.5 w-3.5 ${activeScheme === 'PMFME' ? 'text-emerald-700' : 'text-slate-400'}`} />
            <span>PMFME Scheme</span>
          </button>
        </div>

        {/* Scheme details banner */}
        {activeScheme === 'PMSG' ? (
          <div className="mt-2 flex items-center justify-between rounded-lg bg-emerald-50/60 border border-emerald-100 px-3 py-1.5 text-[11px] text-emerald-950">
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <span className="font-semibold text-emerald-900">
                PM Surya Ghar: <span className="font-normal text-emerald-800">Muft Bijli Yojana</span>
              </span>
            </div>
            <a
              href="https://pmsuryaghar.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-emerald-800 hover:underline shrink-0 ml-2"
            >
              <span>Govt. Portal</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ) : (
          <div className="mt-2 rounded-lg bg-emerald-50/60 border border-emerald-100 px-3 py-1.5 text-[11px] text-emerald-950">
            {/* Line 1: Simple full form + portal link */}
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-emerald-950 text-[10.5px] sm:text-[11px] truncate">
                PM Formalisation of Micro Food Enterprises
              </span>
              <a
                href="https://pmfme.mofpi.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-emerald-800 hover:underline shrink-0 text-[10.5px] ml-2"
              >
                <span>Govt. Portal</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Line 2: Simple subsidy and estimate */}
            <div className="mt-0.5 flex items-center justify-between text-[10px] sm:text-[10.5px] text-emerald-900">
              <span className="font-semibold">Fixed 35% Govt. Subsidy</span>
              <span className="text-slate-600">
                Project Est: <strong className="text-emerald-950 font-bold">₹3 – ₹10 Lakhs</strong>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Error alert if validation fails */}
      {errorMessage && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs font-medium text-red-700 leading-relaxed"
        >
          {errorMessage}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 2. CONTACT DETAILS                                                 */}
      {/* ------------------------------------------------------------------ */}
      <div>
        <label htmlFor="consult-name" className={labelClass}>
          Full name <span className="text-rose-500 font-bold">*</span>
        </label>
        <input
          id="consult-name"
          required
          autoComplete="name"
          placeholder="Enter your name"
          value={name}
          onFocus={handleInteraction}
          onChange={(e) => {
            setName(e.target.value);
            clearErrors();
          }}
          className={getInputClass('name')}
        />
      </div>

      {/* Mobile number */}
      <div>
        <label htmlFor="consult-mobile" className={labelClass}>
          Mobile number <span className="text-rose-500 font-bold">*</span>
        </label>
        <div
          className={`flex w-full min-w-0 overflow-hidden rounded-lg border transition ${errorField === 'mobile'
            ? 'border-rose-400 ring-2 ring-rose-400/20 bg-rose-50/20'
            : 'border-slate-200 focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-700/10'
            }`}
        >
          <span className="flex shrink-0 items-center border-r border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-500">
            +91
          </span>
          <input
            id="consult-mobile"
            type="tel"
            required
            autoComplete="tel-national"
            inputMode="numeric"
            pattern="[6-9][0-9]{9}"
            maxLength={10}
            title="Enter a valid 10-digit Indian mobile number"
            placeholder="9876543210"
            value={mobile}
            onFocus={handleInteraction}
            onChange={(e) => {
              setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
              clearErrors();
            }}
            className="min-w-0 flex-1 bg-white px-3 py-2 text-base sm:text-sm text-slate-800 outline-none"
          />
        </div>
      </div>

      {/* City & Pincode in ONE line */}
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label htmlFor="consult-city" className={labelClass}>
            City <span className="text-rose-500 font-bold">*</span>
          </label>
          <input
            id="consult-city"
            required
            autoComplete="address-level2"
            placeholder="e.g. Lucknow"
            value={city}
            onFocus={handleInteraction}
            onChange={(e) => {
              setCity(e.target.value);
              clearErrors();
            }}
            className={getInputClass('city')}
          />
        </div>

        <div>
          <label htmlFor="consult-pincode" className={labelClass}>
            Pincode <span className="text-rose-500 font-bold">*</span>
          </label>
          <input
            id="consult-pincode"
            required
            type="tel"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            autoComplete="postal-code"
            placeholder="6-digit PIN"
            value={pincode}
            onFocus={handleInteraction}
            onChange={(e) => {
              setPincode(e.target.value.replace(/\D/g, '').slice(0, 6));
              clearErrors();
            }}
            className={getInputClass('pincode')}
          />
        </div>
      </div>


      {/* ------------------------------------------------------------------ */}
      {/* 3. PANEL COMPANY (Clean modern selector)                           */}
      {/* ------------------------------------------------------------------ */}
      <div>
        <label htmlFor="consult-panel" className={labelClass}>
          Panel Company Preference <span className="text-rose-500 font-bold">*</span>
        </label>
        <select
          id="consult-panel"
          required
          value={panelCompany}
          onFocus={handleInteraction}
          onChange={(e) => {
            setPanelCompany(e.target.value);
            if (e.target.value !== 'OTHERS') setPanelCompanyOther('');
            clearErrors();
          }}
          className={`${getInputClass('panelCompany')} truncate ${!panelCompany ? 'text-slate-400 font-medium' : 'text-slate-800'
            }`}
        >
          <option value="" disabled>
            - Select Panel Company -
          </option>
          {PANEL_COMPANIES.map((company) => (
            <option key={company} value={company} className="text-slate-800">
              {company}
            </option>
          ))}
        </select>

        {/* Manual Writing Box if OTHERS selected */}
        {panelCompany === 'OTHERS' && (
          <div className="mt-2">
            <label htmlFor="consult-panel-other" className={labelClass}>
              Specify Panel Company <span className="text-rose-500 font-bold">*</span>
            </label>
            <input
              id="consult-panel-other"
              type="text"
              required
              placeholder="e.g. Waaree, Vikram Solar, Goldi..."
              value={panelCompanyOther}
              onFocus={handleInteraction}
              onChange={(e) => {
                setPanelCompanyOther(e.target.value);
                clearErrors();
              }}
              className={getInputClass('panelCompanyOther')}
              aria-label="Other panel company name"
            />
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 4. SCHEME-SPECIFIC FIELDS                                          */}
      {/* ------------------------------------------------------------------ */}
      {activeScheme === 'PMSG' ? (
        <>
          {/* System Requirement: Unified Single Container */}
          <div>
            <label className={labelClass}>
              System Requirement <span className="text-rose-500 font-bold">*</span>
            </label>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-2">
              {/* Clean Mode Switch */}
              <div className="grid grid-cols-2 gap-1 rounded-lg bg-slate-200/60 p-1 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    handleInteraction();
                    setSelectionMode('bill');
                    clearErrors();
                  }}
                  className={`py-1.5 rounded-md font-bold transition ${selectionMode === 'bill'
                    ? 'bg-white text-emerald-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  By Monthly Bill
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleInteraction();
                    setSelectionMode('capacity');
                    clearErrors();
                  }}
                  className={`py-1.5 rounded-md font-bold transition ${selectionMode === 'capacity'
                    ? 'bg-white text-emerald-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  By System Capacity
                </button>
              </div>

              {/* Integrated Stepper */}
              <div className="mt-2 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-2 py-1.5">
                <button
                  type="button"
                  onClick={() =>
                    selectionMode === 'bill' ? handleBillStep(-1) : handleCapacityStep(-1)
                  }
                  disabled={selectionMode === 'bill' ? billIndex === 0 : capacityIndex === 0}
                  aria-label="Decrease value"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-25 active:scale-95 transition"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="text-base font-bold text-emerald-950">
                  {selectionMode === 'bill' ? BILL_STEPS[billIndex] : CAPACITY_STEPS[capacityIndex]}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    selectionMode === 'bill' ? handleBillStep(1) : handleCapacityStep(1)
                  }
                  disabled={
                    selectionMode === 'bill'
                      ? billIndex === BILL_STEPS.length - 1
                      : capacityIndex === CAPACITY_STEPS.length - 1
                  }
                  aria-label="Increase value"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-25 active:scale-95 transition"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* System Type: On-Grid, Off-Grid, Hybrid */}
          <div>
            <label htmlFor="consult-system-type" className={labelClass}>
              System Type <span className="text-rose-500 font-bold">*</span>
            </label>
            <select
              id="consult-system-type"
              required
              value={systemType}
              onFocus={handleInteraction}
              onChange={(e) => {
                setSystemType(e.target.value);
                clearErrors();
              }}
              className={`${getInputClass('systemType')} truncate ${!systemType ? 'text-slate-400 font-medium' : 'text-slate-800'
                }`}
            >
              <option value="" disabled>
                - Select System Type -
              </option>
              {SYSTEM_TYPES.map((type) => (
                <option key={type} value={type} className="text-slate-800">
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type Dropdown */}
          <div>
            <label htmlFor="consult-property" className={labelClass}>
              Property Type <span className="text-rose-500 font-bold">*</span>
            </label>
            <select
              id="consult-property"
              required
              value={propertyType}
              onFocus={handleInteraction}
              onChange={(e) => {
                setPropertyType(e.target.value);
                clearErrors();
              }}
              className={`${getInputClass('propertyType')} truncate ${!propertyType ? 'text-slate-400 font-medium' : 'text-slate-800'
                }`}
            >
              <option value="" disabled>
                - Select Property Type -
              </option>
              {PROPERTY_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="text-slate-800">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : (
        /* ------------------------------------------------------------------ */
        /* PMFME SPECIFIC FIELDS                                              */
        /* ------------------------------------------------------------------ */
        <>
          {/* Required System Capacity */}
          <div>
            <label className={labelClass}>
              Required System Capacity <span className="text-rose-500 font-bold">*</span>
            </label>
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-2 py-1.5">
              <button
                type="button"
                onClick={() => handleCapacityStep(-1)}
                disabled={pmfmeCapacityIndex === 0}
                aria-label="Decrease capacity"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-25 active:scale-95 transition"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="text-base font-bold text-emerald-950">
                {CAPACITY_STEPS[pmfmeCapacityIndex]}
              </span>

              <button
                type="button"
                onClick={() => handleCapacityStep(1)}
                disabled={pmfmeCapacityIndex === CAPACITY_STEPS.length - 1}
                aria-label="Increase capacity"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-25 active:scale-95 transition"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Business Type: Flour mill / bakery */}
          <div>
            <label htmlFor="consult-business-type" className={labelClass}>
              Business Type <span className="text-rose-500 font-bold">*</span>
            </label>
            <input
              id="consult-business-type"
              required
              placeholder="Ex - Flour Mill / Bakery"
              value={businessType}
              onFocus={handleInteraction}
              onChange={(e) => {
                setBusinessType(e.target.value);
                clearErrors();
              }}
              className={getInputClass('businessType')}
            />
          </div>
        </>
      )}

      {/* Optional Additional Notes */}
      {(variant === 'full' || requirementNote) && (
        <div>
          <label htmlFor="consult-notes" className={labelClass}>
            Additional Notes <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="consult-notes"
            rows={2}
            placeholder="Any specific terrace sizing, load details, or questions..."
            value={requirementNote}
            onFocus={handleInteraction}
            onChange={(e) => setRequirementNote(e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 5. SUBMIT BUTTON                                                   */}
      {/* ------------------------------------------------------------------ */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex min-h-11 w-full max-w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-900 active:scale-[0.99] disabled:opacity-60 shadow-sm"
      >
        <span className="truncate">
          {isSubmitting
            ? 'Submitting Request...'
            : submitButtonText ||
            (activeScheme === 'PMSG'
              ? 'Get PM Surya Ghar Consultation'
              : 'Get PMFME Subsidy Consultation')}
        </span>
        {!isSubmitting && <ArrowRight className="h-4 w-4 shrink-0" />}
      </button>

    </form>
  );
}
