import { StaticImageData } from 'next/image';
import img1 from './completed-project/img1.jpg';
import img2 from './completed-project/img2.jpg';
import img3 from './completed-project/img3.jpg';
import img4 from './completed-project/img4.jpg';

export interface Product {
  id: string;
  name: string;
  category: 'residential' | 'commercial' | 'inverter-battery' | 'water-pump';
  categoryLabel: string;
  tagline: string;
  image: string;
  efficiency: string;
  capacityRange: string;
  warranty: string;
  indicativePrice: string;
  subsidyEligible: boolean;
  subsidyNote: string;
  description: string;
  features: string[];
  specifications: { [key: string]: string };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  systemInstalled: string;
  rating: number;
  billBefore: string;
  billAfter: string;
  feedback: string;
  date: string;
}

export interface CompletedProject {
  id: string;
  title: string;
  clientType: 'Residential Villa' | 'Commercial Factory' | 'Educational Campus' | 'Hospitality';
  location: string;
  capacity: string;
  annualGeneration: string;
  image: StaticImageData;
  completionYear: string;
  summary: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const COMPANY_INFO = {
  name: "LUMINIX SOLAR PVT. LTD.",
  brandName: "LUMINIX SOLAR",
  tagline: "Clean Energy for a Brighter Tomorrow",
  logo: "/images/logo.png",
  establishedYear: 2024,
  yearsOfExperience: (new Date().getFullYear() - 2024).toString(),
  parentCompany: "Luminix Clean Energy Holdings Group",
  gstin: "09ccvpv0642n1zm",
  mnreVendorId: "MNRE/RTS/2023/8842",
  isoCertifications: "ISO 9001:2015 & ISO 14001:2015 Certified",
  phone: "+91 9793078997",
  phoneDisplay: "+91 9793078997",
  whatsapp: "+919793078997",
  email: "luminixsolar2025@gmail.com",
  supportEmail: "luminixsolar2025@gmail.com",
  address: "MP - 2824, DASHAHARABAG MAKHDUMPUR ROAD, NEAR GOBIND INDUSTRIES I UNIT, NAWABGANJ BARABANKI, UTTAR PRADESH - 225001",
  mapsUrl: "https://maps.google.com/",
  operatingHours: {
    weekdays: "Mon - Sat: 9:00 AM - 7:30 PM",
    sunday: "Sun: 10:00 AM - 4:00 PM (Emergency & Site Visits Available)",
  },
  socialLinks: {
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    twitter: "https://x.com",
  },
};
export const COMPANY_STATS = [
  { label: "Happy Customers", value: "2000+", description: "Verified active clients" },
  { label: "Installation Capacity", value: " Up to 2 MW", description: "clean energy scale" },
  { label: "Consultations Completed", value: "5000+", description: "Completed energy audits" },
  { label: "Years of Excellence", value: "2+ Years", description: "Proven track record" },
  { label: "Customer Bill Savings", value: "Up to 90%", description: "Lower power costs" },
  { label: "CO2 Offset", value: "2500+ Tonnes", description: "Green Impact ~41.3k trees" },
];

export const AUTHORIZED_PARTNERS = [
  { name: "Tata Power Solar", category: "Tier-1 Solar Panels & EPC", badge: "Gold Channel Partner" },
  { name: "Adani Solar", category: "High-Efficiency TopCon Modules", badge: "Authorized Distributor" },
  { name: "Growatt", category: "Smart Hybrid Inverters", badge: "Certified Service Center" },
  { name: "Enphase Energy", category: "Microinverter Systems", badge: "Platinum Installer" },
  { name: "Havells Solar", category: "Solar Power Systems", badge: "Authorized Dealer" },
  { name: "Sungrow", category: "Commercial & Utility Inverters", badge: "Strategic Partner" },
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: "luminix-prime-topcon",
    name: "Luminix Prime N-Type TOPCon Solar Panels",
    category: "residential",
    categoryLabel: "Residential Rooftop",
    tagline: "Next-generation bifacial N-type cell technology with industry-leading 22.8% efficiency.",
    image: "/images/solar-panel-tech.jpg",
    efficiency: "22.8% Module Efficiency",
    capacityRange: "550Wp - 590Wp Per Panel",
    warranty: "12-Year Product + 30-Year Linear Performance Warranty",
    indicativePrice: "Starting ₹52,000 / kW (Net After PM Surya Ghar Subsidy)",
    subsidyEligible: true,
    subsidyNote: "Eligible for up to ₹78,000 Direct Bank Transfer Subsidy",
    description: "Engineered with ultra-pure N-type monocrystalline silicon and 16-busbar half-cut cell architecture. Delivers superior low-light generation on cloudy monsoon days and low temperature coefficient for Indian summers.",
    features: [
      "Bifacial generation: up to 25% extra energy harvest from rear reflected light",
      "Anti-reflective self-cleaning tempered glass with hydrophobic nanocoating",
      "IP68 waterproof junction box and MC4-EVO2 original connectors",
      "Withstands extreme wind loads up to 2400 Pa and snow loads up to 5400 Pa",
      "Virtually zero PID (Potential Induced Degradation) & ultra-low first-year degradation (<1%)"
    ],
    specifications: {
      "Cell Type": "N-Type Monocrystalline TOPCon (16BB Half-cut)",
      "Module Dimensions": "2278 x 1134 x 35 mm",
      "Weight": "27.5 kg",
      "Operating Temperature": "-40°C to +85°C",
      "Temperature Coefficient": "-0.30% / °C",
      "Maximum System Voltage": "1500V DC",
      "Certifications": "IEC 61215, IEC 61730, BIS Approved, ALMM Listed",
    }
  },
  {
    id: "luminix-hybrid-inverter",
    name: "Luminix Intelligent Hybrid Inverter System",
    category: "inverter-battery",
    categoryLabel: "Inverters & Storage",
    tagline: "Smart grid-tied inverter with instantaneous battery backup and mobile app analytics.",
    image: "/images/hybrid-inverter-system.jpg",
    efficiency: "98.4% Peak Conversion Efficiency",
    capacityRange: "3 kW, 5 kW, 8 kW, 10 kW (Single & Three Phase)",
    warranty: "10-Year Replacement Warranty",
    indicativePrice: "Starting ₹48,000",
    subsidyEligible: true,
    subsidyNote: "Fully MNRE & State DISCOM Net-Metering Compliant",
    description: "The brain of your solar ecosystem. Automatically balances solar power, battery storage, and grid import/export in real-time. Features lightning-fast 10ms transfer time so computers and medical devices never reboot.",
    features: [
      "Dual independent MPPT trackers with 99.9% MPPT efficiency",
      "Built-in Wi-Fi & 4G IoT cloud telemetry with Luminix Mobile App",
      "Integrated Type II AC & DC Surge Protection Devices (SPD)",
      "Zero export capability and smart diesel generator synchronization",
      "Ultra-quiet fanless natural cooling with IP65 weather-sealed aluminum body"
    ],
    specifications: {
      "Rated AC Output": "3000W / 5000W / 10000W",
      "Max DC Input Voltage": "600V (Single Phase) / 1000V (Three Phase)",
      "MPPT Voltage Range": "90V - 550V DC",
      "Backup Switching Time": "<10 ms (UPS Grade Seamless)",
      "Communication": "Wi-Fi, RS485, CAN, Luminix Cloud iOS & Android",
      "Dimensions": "480 x 360 x 180 mm",
      "Weight": "16.8 kg",
    }
  },
  {
    id: "luminix-powerwall-lfp",
    name: "Luminix Ultra-LFP Lithium Battery Storage",
    category: "inverter-battery",
    categoryLabel: "Inverters & Storage",
    tagline: "High-density Lithium Iron Phosphate (LiFePO4) modular battery pack with 6,000+ cycle life.",
    image: "/images/inverter-battery.jpg",
    efficiency: "95% Round-Trip Efficiency",
    capacityRange: "5.12 kWh expandable up to 30.72 kWh",
    warranty: "10-Year Comprehensive Warranty",
    indicativePrice: "Starting ₹95,000 (5.12 kWh)",
    subsidyEligible: false,
    subsidyNote: "Can be retrofitted to any existing on-grid solar plant",
    description: "Store your free daylight solar power and utilize it at night during peak tariff hours or unexpected power outages. Safe chemistry that prevents thermal runaway, with modular stackable design.",
    features: [
      "Grade-A EV grade prismatic LiFePO4 cells with 15+ years design life",
      "Smart Battery Management System (BMS) with multi-level thermal protection",
      "Modular stackable plug-and-play expansion without messy cables",
      "Wall-mount or floor-mount installation with sleek minimalist aesthetics",
      "High discharge rate (1C) capable of powering air conditioners, refrigerators, and water pumps"
    ],
    specifications: {
      "Nominal Voltage": "51.2V DC",
      "Nominal Capacity": "100Ah (5.12 kWh per module)",
      "Depth of Discharge (DoD)": "90%",
      "Cycle Life": "6,000+ Cycles @ 25°C, 80% DoD",
      "Communication Ports": "CAN / RS485 for Inverter BMS synchronization",
      "Ingress Protection": "IP65 Indoor / Outdoor rated",
    }
  },
  {
    id: "luminix-commercial-solar",
    name: "Luminix Industrial & Commercial Rooftop Array",
    category: "commercial",
    categoryLabel: "Commercial & Industrial",
    tagline: "Heavy-duty turnkey commercial solar systems engineered for factories, hospitals, and tech parks.",
    image: "/images/commercial-solar.jpg",
    efficiency: "Up to 35% Internal Rate of Return (IRR)",
    capacityRange: "25 kW to 1 MW+ Turnkey Systems",
    warranty: "25-Year Performance + 5-Year Comprehensive O&M Included",
    indicativePrice: "Custom quote based on power sanctions & roof type",
    subsidyEligible: true,
    subsidyNote: "Accelerated Depreciation (40%) and Section 32 Income Tax benefits",
    description: "Reduce operational overheads, achieve ESG carbon-neutral benchmarks, and leverage accelerated depreciation. Luminix handles complete HT/LT CEIG electrical liaisoning, Discom approvals, and custom structural engineering.",
    features: [
      "Custom non-penetrative clamp mounting for metal sheet roofs & RCC ballasted setups",
      "High-voltage string inverters with remote string-level SCADA monitoring",
      "Automatic solar module cleaning sprinkler system integration",
      "DG-Solar synchronization to slash expensive diesel generator fuel bills by up to 75%",
      "Comprehensive Annual Maintenance Contract (AMC) with guaranteed generation uptime"
    ],
    specifications: {
      "System Voltages": "415V LT / 11kV / 33kV HT Grid Interconnection",
      "Structure Material": "Hot-dip galvanized steel (80 microns) / Anodized Aluminum 6063-T6",
      "Wind Speed Tolerance": "Up to 180 km/h (IS 875 Part 3 Compliant)",
      "Monitoring": "Luminix Commercial Cloud SCADA with automated daily generation alerts",
      "Approvals Handled": "CEIG, DISCOM, Fire Safety NOC, Net Metering"
    }
  },
  {
    id: "luminix-solar-water-pump",
    name: "Luminix Agro-Flow Solar Water Pumping System",
    category: "water-pump",
    categoryLabel: "Solar Water Pumps",
    tagline: "Reliable, zero-electricity cost water pumping for agricultural farmland, resorts, and remote estates.",
    image: "/images/hero-solar.jpg",
    efficiency: "High-Discharge MPPT Variable Frequency Drive",
    capacityRange: "3 HP, 5 HP, 7.5 HP & 10 HP Submersible / Surface",
    warranty: "5-Year Full System Warranty + 25-Year Panel Warranty",
    indicativePrice: "Subsidized schemes under PM-KUSUM Component-B",
    subsidyEligible: true,
    subsidyNote: "Eligible for up to 60% PM-KUSUM Central & State Subsidies",
    description: "Say goodbye to irregular three-phase grid power schedules and diesel pump fuel expenses. The system starts automatically at dawn, maximizes water yield throughout the day, and shuts off gracefully at dusk.",
    features: [
      "Advanced MPPT Variable Frequency Drive (VFD) with dry-run protection",
      "High-efficiency stainless steel submersible or monobloc pump motor (BLDC/AC)",
      "Dual-axis manual seasonal tilt tracker structure for 15% higher water discharge",
      "Remote mobile SMS / App pump start-stop and water level monitoring",
      "Zero running cost and zero carbon emissions for farms and agricultural lands"
    ],
    specifications: {
      "Pump Types": "Submersible Borewell / Open-well / Surface Monobloc",
      "Operating Head": "30 meters up to 220 meters",
      "Daily Water Discharge": "Up to 2,50,000 Litres / day (dependent on head and HP)",
      "Motor Protection": "Overvoltage, undervoltage, overload, and dry-run sensors",
      "Controller Enclosure": "IP65 Weatherproof lockable steel cabinet",
    }
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    name: "Rajeshwar Sharma",
    role: "Homeowner & IT Director",
    location: "Indiranagar, Bengaluru",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    systemInstalled: "5 kW Monocrystalline Rooftop with Net-Metering",
    rating: 5,
    billBefore: "₹8,400 / mo",
    billAfter: "₹380 / mo",
    feedback: "Luminix Solar made the entire transition effortless. From the detailed 3D shadow analysis to BESCOM net-metering and subsidy crediting (₹78,000 received directly in my bank account in 24 days), their team handled every single document. My monthly bill is virtually zero now!",
    date: "February 2026",
  },
  {
    id: "test-2",
    name: "Dr. Arvind & Sunita Mehta",
    role: "Villa Owners",
    location: "Jubilee Hills, Hyderabad",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    systemInstalled: "10 kW Hybrid Solar + 10 kWh Battery Storage",
    rating: 5,
    billBefore: "₹16,200 / mo",
    billAfter: "₹720 / mo",
    feedback: "Living in an area with frequent summer power cuts, the Luminix Hybrid system with battery storage has been a lifesaver. The transition during power outages is instantaneous. The build quality of the mounting structure and panel cabling is world-class.",
    date: "January 2026",
  },
  {
    id: "test-3",
    name: "K. R. Venkatraman",
    role: "Managing Director, Sri Krishna Precision Engineering",
    location: "Peenya Industrial Area, Bengaluru",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    systemInstalled: "85 kW Industrial Rooftop Solar Plant",
    rating: 5,
    billBefore: "₹1,45,000 / mo",
    billAfter: "₹38,000 / mo",
    feedback: "Our factory's power expenses were eating into our operating margins. Luminix engineered an 85 kW system tailored to our heavy CNC load with zero roof penetration. We recovered our entire investment in under 3.5 years thanks to tax depreciation and bill savings.",
    date: "November 2025",
  },
  {
    id: "test-4",
    name: "Priya Chandran Nair",
    role: "President, Green Crest Apartment Association",
    location: "Kakkanad, Kochi",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    systemInstalled: "25 kW Common Area Solar System",
    rating: 5,
    billBefore: "₹42,000 / mo",
    billAfter: "₹4,100 / mo",
    feedback: "We installed a 25 kW rooftop system to power our common area lifts, corridor lighting, and water pumping. Every resident is thrilled because society maintenance charges dropped noticeably. Luminix Solar's after-sales service and quarterly inspection visits are exemplary.",
    date: "December 2025",
  }
];

export const COMPLETED_PROJECTS: CompletedProject[] = [
  {
    id: "proj-1",
    title: "Luxury Modern Villa Rooftop System",
    clientType: "Residential Villa",
    location: "Electronic City, Bengaluru",
    capacity: "8 kW Bifacial N-Type System",
    annualGeneration: "11,800 kWh / Year",
    image: img1,
    completionYear: "2025",
    summary: "Elevated customized pergola structure providing usable shaded terrace recreational space alongside 92% electricity generation.",
  },
  {
    id: "proj-2",
    title: "Precision Manufacturing Plant Solar EPC",
    clientType: "Commercial Factory",
    location: "Bommasandra Industrial Area",
    capacity: "120 kW Industrial Array",
    annualGeneration: "1,75,000 kWh / Year",
    image: img2,
    completionYear: "2024",
    summary: "Non-penetrative sheet clamping system with automated IoT generation monitoring and DG-synchronization module.",
  },
  {
    id: "proj-3",
    title: "Eco-Tech Innovation Campus",
    clientType: "Educational Campus",
    location: "Whitefield, Bengaluru",
    capacity: "65 kW Distributed Rooftop",
    annualGeneration: "96,000 kWh / Year",
    image: img3,
    completionYear: "2025",
    summary: "Multi-building distributed solar network powering computer labs, smart classrooms, and solar street illumination.",
  },
  {
    id: "proj-4",
    title: "Reliable Hybrid Solar & Battery Facility",
    clientType: "Hospitality",
    location: "Coorg Estate Resort",
    capacity: "15 kW Hybrid + 20 kWh Storage",
    annualGeneration: "21,500 kWh / Year",
    image: img4,
    completionYear: "2025",
    summary: "Off-grid capable hybrid solution ensuring continuous silent luxury experience without noisy diesel generators.",
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: "faq-1",
    category: "Subsidy & Cost",
    question: "How does the PM Surya Ghar: Muft Bijli Yojana subsidy work, and how much can I get?",
    answer: "Under the central government's PM Surya Ghar Muft Bijli Yojana, residential consumers receive direct bank transfer (DBT) subsidies: ₹30,000 for a 1 kW system, ₹60,000 for a 2 kW system, and ₹78,000 for 3 kW and higher systems. As an authorized MNRE-empanelled partner, Luminix Solar handles the entire online portal application, technical feasibility clearance, and DISCOM inspection so your subsidy is released directly to your bank account without any paperwork headaches.",
  },
  {
    id: "faq-2",
    category: "Technical & Generation",
    question: "What happens during cloudy days, monsoon season, or at night?",
    answer: "Solar panels continue to generate electricity even during overcast or rainy days using ambient diffuse sunlight (typically 25% to 40% of peak capacity). At night, your home seamlessly draws power from the grid or your Luminix lithium battery storage. With a Net-Metered grid-tied system, excess energy produced on bright sunny days is exported to the grid and banked as credit units, which offset nighttime or rainy day consumption.",
  },
  {
    id: "faq-3",
    category: "Space & Installation",
    question: "How much rooftop space is required for a 3 kW or 5 kW solar setup?",
    answer: "Thanks to our ultra-efficient N-Type TOPCon panels (which produce more watts per square meter), you only need approximately 80 to 90 sq. ft. of shadow-free area per kilowatt. A standard 3 kW system requires ~250 sq. ft., while a 5 kW system requires ~420 sq. ft. If you need terrace space for leisure, we also construct elevated canopy/pergola structures that elevate panels 8-9 feet high so your terrace remains 100% usable.",
  },
  {
    id: "faq-4",
    category: "Savings & ROI",
    question: "What is Net Metering and how does it reduce my monthly electricity bill?",
    answer: "Net Metering is a bidirectional energy metering agreement with your state electricity board (e.g., BESCOM, TSSPDEL, KSEB, TANGEDCO). During daytime peak solar hours, whatever electricity your home does not immediately consume flows into the electrical grid, turning your meter backward. At month-end, the electricity board bills you only for 'Net Units' (Units Imported minus Units Exported). If you export more than you use, the credits carry forward or are credited to you.",
  },
  {
    id: "faq-5",
    category: "Warranty & Maintenance",
    question: "What kind of maintenance is required, and what is covered under warranty?",
    answer: "Solar systems have no moving parts and require minimal maintenance—simply rinsing the dust off panels with water twice a month keeps generation optimal. Luminix Solar provides a 25-to-30 year linear performance warranty on solar panels (guaranteeing over 87% output even after 25 years), a 10-year warranty on hybrid inverters, and a 10-year warranty on lithium batteries. Furthermore, our turnkey installation includes complimentary periodic maintenance visits and 24/7 cloud generation monitoring.",
  },
  {
    id: "faq-6",
    category: "Financing & Payment",
    question: "Are there low-interest solar loans or Zero-Cost EMI options available?",
    answer: "Yes! Luminix Solar has partnered with premier banks and NBFCs (including SBI, Canara Bank, HDFC, and Tata Capital) to offer specialized residential rooftop solar loans at interest rates as low as 7.0% per annum under government green energy schemes, with tenures up to 7 years. In most cases, your monthly loan EMI is less than what you currently pay for your electricity bill, making solar cash-flow positive from Day 1!",
  }
];

export const STEP_PROCESS = [
  {
    step: "01",
    title: "Free Site Survey & 3D Shadow Analysis",
    description: "Our certified solar engineers visit your premises with drone and laser tools to assess roof orientation, azimuth, structural strength, and 365-day sun path simulation.",
  },
  {
    step: "02",
    title: "Custom Engineering & DISCOM Sanction",
    description: "We prepare custom CAD layouts, single-line diagrams (SLD), and submit government portal applications for PM Surya Ghar subsidy approval and grid connectivity feasibility.",
  },
  {
    step: "03",
    title: "Precision Installation & Safety Earthing",
    description: "Our in-house certified technicians install hot-dip galvanized mounting structures, tier-1 solar panels, dedicated chemical earthing, and lightning arresters adhering to IEC safety norms.",
  },
  {
    step: "04",
    title: "Net-Meter Commissioning & Discom Inspection",
    description: "We coordinate end-to-end with your electricity board engineers for plant inspection, bi-directional net-meter installation, and official grid synchronization.",
  },
  {
    step: "05",
    title: "Subsidy Release & Smart App Telemetry",
    description: "Your government subsidy is disbursed directly to your bank account, and our team connects your smartphone to the Luminix cloud app for real-time live generation monitoring.",
  }
];
