# Responsive Design Rules for Luminix Solar

> **Scope**: Applies to all frontend pages and components in the Luminix Solar website.
> **Source of Truth**: Derived from the proven responsive implementations of Navbar, Hero Section, Stats Section, and Completed Projects Section (Top of page through to before "Coming Soon").

---

## 0. Rule Update Protocol (Mandatory)

Whenever the user asks to modify or adjust responsive behaviors, layout dimensions, padding, font scaling, or mobile/desktop treatments:
1. **Apply the requested change** to the component code.
2. **Always ask the user**: *"Would you like me to update the stored responsive design rules in `.agents/rules/responsive-design-rules.md` to reflect this change across upcoming sections as well?"*
3. **If confirmed**, update this rule file immediately so that future sections inherit the revised rule.

---

## 1. Breakpoint Hierarchy & Viewport Standards

We adhere to Tailwind's core breakpoints with mobile-first styling:
- **Mobile (< 640px)**: Default styles (targeted for 320px – 430px smartphone screens).
- **Tablet (`sm:` >= 640px)**: Initial multi-column transformations, expanded horizontal paddings.
- **Medium / Low Desktop (`md:` >= 768px)**: Info bars and medium-screen layouts.
- **Desktop (`lg:` >= 1024px)**: Full multi-column grids (6-col stats, 12-col hero, 3-card projects).
- **Large Desktop (`xl:` >= 1280px / `2xl:` >= 1536px)**: Edge-to-edge max-width constraints and expanded desktop typography.

---

## 2. Page & Section Container Spacing

### A. Max Widths & Centering
- **High-impact & Edge Sections (Hero, Navbar)**: `mx-auto w-full max-w-[1600px]`.
- **Content Sections (Stats, Projects, Calculators, Features)**: `mx-auto max-w-7xl` (1280px).
- **Narrow Content (Modals, Forms, Text)**: `max-w-2xl` or `max-w-3xl`.

### B. Horizontal Container Padding
- Mobile (`< 640px`): `px-3.5` or `px-4` (maximum screen real-estate without content touching bezel).
- Tablet (`sm:`): `px-6` or `px-7`.
- Desktop (`lg:`): `px-8` to `px-12` (up to `px-16` on hero content).

### C. Vertical Section Spacing
- Standard Section padding: `py-16 sm:py-20 lg:py-28`.
- Hero Section top padding: `pt-24 sm:pt-32 lg:pt-36` (accounts for fixed ~76px navbar).
- Hero Section bottom padding: `pb-12 lg:pb-16`.
- Card internal padding:
  - Mobile: `p-4` or `p-5`
  - Tablet: `sm:p-6` or `sm:p-7`
  - Desktop: `lg:p-8` to `lg:p-12`

---

## 3. Typography Scaling System

All headings and paragraphs must scale responsively across viewports:

| Element | Mobile (< 640px) | Tablet (`sm:`) | Desktop (`lg:` / `xl:`) | Tailwind Classes |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title (`<h1>`)** | `text-3xl` (30px) | `sm:text-5xl` (48px) | `lg:text-6xl xl:text-7xl` | `text-3xl font-medium leading-[1.15] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl xl:text-7xl` |
| **Section Title (`<h2>`)** | `text-2xl` (24px) | `sm:text-3xl` (30px) | `lg:text-4xl` (36px) | `text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl` |
| **Modal / Card Title (`<h3>`)** | `text-xl` (20px) | `sm:text-2xl` (24px) | `sm:text-2xl` | `text-xl font-bold tracking-tight text-slate-900 sm:text-2xl` |
| **Subtitle / Lead Paragraph** | `text-sm leading-6` | `sm:text-base leading-7` | `sm:text-lg sm:leading-8` | `text-sm leading-6 text-slate-600 sm:text-base` |
| **Eyebrow / Category Tag** | `text-xs font-bold uppercase` | `text-xs font-bold uppercase` | `text-xs font-bold uppercase` | `text-xs font-bold uppercase tracking-[0.15em] text-emerald-800` |
| **Micro Labels & Counters** | `text-[10px]` / `text-[11px]` | `sm:text-xs` | `sm:text-xs` | `text-[11px] font-semibold sm:text-xs` |

---

## 4. Forms, Inputs & Touch Interaction Rules

### A. Critical iOS Auto-Zoom Prevention Rule
- **Inputs & Selects must use `text-base sm:text-sm`**:
  - iOS Safari automatically zooms the page when an input `< 16px` (`text-sm` is 14px) is focused.
  - Setting `text-base` on mobile and `sm:text-sm` on tablet/desktop prevents layout jarring while keeping desktop crisp.
- **Padding**: `px-3.5 py-2.5 sm:py-3`.
- **Containment**: Always include `w-full max-w-full min-w-0 box-border`. Use `truncate` on `<select>` elements to prevent wide text overflowing narrow viewports.

### B. Mobile Touch Target Standards
- Primary CTA buttons must have at least **48px height**: `min-h-12` (`h-12`).
- Mobile button layout: `w-full flex-col sm:w-auto sm:flex-row`.
- Floating / Icon buttons: Minimum `h-10 w-10` with `active:scale-95` feedback.

---

## 5. Grid & Layout Transformation Patterns

| Pattern | Mobile (< 640px) | Tablet (`sm:` >= 640px) | Desktop (`lg:` >= 1024px) |
| :--- | :--- | :--- | :--- |
| **Hero Layout** | `grid-cols-1 gap-8` (Copy stacked above form) | `grid-cols-1 gap-10` | `lg:grid-cols-12 lg:gap-8` (7 cols copy, 5 cols form) |
| **Metric / Stats Bar** | `grid-cols-2 gap-px` (2x3 grid) | `sm:grid-cols-3` (3x2 grid) | `lg:grid-cols-6` (1x6 single row) |
| **Project / Feature Cards** | Single-card swipe carousel (`sm:hidden`) | Multi-card scroll (`w-[calc(50%-10px)]`) | 3-card scroll (`lg:w-[calc(33.333%-13.333px)]`) |
| **Header + Controls** | `flex flex-col gap-4` | `sm:flex-row sm:items-end sm:justify-between` | Same |
| **Dual Button Actions** | `flex flex-col gap-3 w-full` | `sm:flex-row sm:w-auto` | Same |

---

## 6. Dual Carousel / Slider Implementation Strategy

When presenting galleries or multi-card showcases (as seen in `CompletedProjectsSection`):
1. **Desktop & Tablet (`hidden sm:block`)**:
   - Native smooth scroll-snap: `flex gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory`.
   - Card widths: `w-[calc(50%-10px)]` on tablet, `lg:w-[calc(33.333%-13.333px)]` on desktop.
   - Interactive Chevron buttons (`ChevronLeft`, `ChevronRight`) hidden on mobile (`hidden sm:flex`).
   - Clickable multi-indicator dot track.
2. **Mobile Viewport (`sm:hidden`)**:
   - Single full-width slide card (`w-full shrink-0`) with card height `h-80`.
   - Infinite loop using clone buffer (`[lastClone, ...items, firstClone]`).
   - Touch drag gesture support (`onTouchStart`, `onTouchMove`, `onTouchEnd`) with 40px delta threshold.
   - Auto-slide with pause-on-touch (4000ms pause after swipe before resuming auto-advance).
   - Elongated active pill indicator (`w-7 bg-emerald-700` vs `w-2.5 bg-slate-300`).

---

## 7. Navbar & Navigation Responsiveness

1. **Top Slim Info Bar**:
   - Visible only on `md:block` (768px+); completely `hidden` on mobile to preserve vertical viewport height.
   - Smoothly collapses (`h-0 opacity-0`) when page is scrolled >16px.
2. **Navbar Height**:
   - Default: `h-[76px]`; Scrolled: `h-[68px]`.
3. **Mobile Drawer**:
   - Hidden on desktop (`xl:hidden`).
   - Height constraint: `max-h-[calc(100dvh-76px)] overflow-y-auto` (using `100dvh` for mobile browser toolbar dynamic height support).
   - Nav link items: Full width cards `min-h-11 rounded-xl px-3.5 py-3 text-sm font-semibold`.
   - Grid layout: 1 column on mobile, 2 columns on tablet (`grid-cols-1 sm:grid-cols-2`).

---

## 8. Modals, Dialogs & Overlays

1. **Backdrop & Placement**:
   - `fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/75 p-4 backdrop-blur-sm`.
2. **Modal Card Container**:
   - `my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl`.
3. **Image Header Height**:
   - Mobile: `h-60`; Tablet/Desktop: `sm:h-72`.
4. **Responsive Metric Cards**:
   - 1 or 2 columns based on content (`grid gap-2.5 sm:gap-3 grid-cols-1 sm:grid-cols-2` or `grid-cols-2`).
5. **Adaptive Text for Compact Screens**:
   - Use adaptive text spans to prevent awkward text breaking on narrow 320px–360px phones:
     ```tsx
     <span className="sm:hidden">Annual Gen.</span>
     <span className="hidden sm:inline">Annual Generation</span>
     ```

---

## 9. Horizontal Overflow Prevention (Strict Checklist)

To ensure zero horizontal scroll jitter on mobile:
1. `html, body` have `overflow-x: hidden; width: 100%;` in `globals.css`.
2. Never assign fixed pixel widths (e.g., `w-[500px]`) without `max-w-full`.
3. Always pair `flex-1` with `min-w-0` inside flex containers to prevent text blowouts.
4. Long text, emails, and phone numbers must use `break-words`, `break-all`, or `truncate`.
5. Background decorative blur circles must be wrapped in `pointer-events-none overflow-hidden`.
