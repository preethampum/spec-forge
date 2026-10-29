---
name: Academic Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#444651'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#006a63'
  on-secondary: '#ffffff'
  secondary-container: '#99efe5'
  on-secondary-container: '#006f67'
  tertiary: '#00246b'
  on-tertiary: '#ffffff'
  tertiary-container: '#00389a'
  on-tertiary-container: '#8da9ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#9cf2e8'
  secondary-fixed-dim: '#80d5cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#00504a'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#b4c5ff'
  on-tertiary-fixed: '#00174b'
  on-tertiary-fixed-variant: '#003ea8'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.625rem
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.125rem
  label-lg:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.025em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 0.875rem
    letterSpacing: 0.04em
  tabular-data:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1.25rem
    letterSpacing: -0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an authoritative, calm, and distraction-free environment tailored for university faculty, department chairs, and curriculum accreditation auditors. The target audience engages in cognitively dense tasks: cross-referencing Course Outcomes (CO) with Program Outcomes (PO) and Program Specific Outcomes (PSO), auditing compliance, and generating syllabus specifications.

The visual direction rejects ornamental gradients, decorative imagery, and non-functional visual noise in favor of a modern document-first productivity style rooted in structural clarity and typographic rigor. 

Key attributes:
- **Scholarly Authority:** Conveyed through disciplined proportions, deep navy structure, and precise geometric hairline divisions.
- **Cognitive Serenity:** Off-white canvas planes reduce screen glare during extended authoring and review sessions.
- **Audit Fidelity:** Immediate visual distinction between validated, pending, warning, and non-compliant matrix cells via purposeful semantic signaling rather than decorative color.

## Colors

The palette relies on deliberate contrast hierarchies designed to keep academic text, data grids, and status flags immediately legible.

- **Primary (`#1E3A8A` - Academic Navy):** Anchors primary brand anchors, top-level navigation states, selected document headers, and high-priority action buttons.
- **Secondary (`#0F766E` - Spruce Teal):** Governs curriculum verification indicators, calculation matrices, and outcome-alignment actions.
- **Tertiary (`#2563EB` - Interactive Indigo):** Active text links, inline focused states, and current cell cursor selections.
- **Neutral (`#64748B` - Slate):** Secondary labels, metadata timestamps, structural borders (`#E2E8F0`), and table grid dividers.
- **Canvas & Containers:** Base application canvas utilizes `#F8FAFC`, secondary navigation and inspector sidebars rest on `#F1F5F9`, and document edit workspaces use pure `#FFFFFF`.
- **Semantic Status Signals:** Success Emerald (`#10B981` / background `#ECFDF5`), Amber Warning (`#F59E0B` / background `#FFFBEB`), and Error Rose (`#EF4444` / background `#FEF2F2`) must be accompanied by explicit text labels or icons to ensure ADA/WCAG compliance.

## Typography

Inter serves as the unified typographic engine across all contexts. Its neutral, systematic geometry supports the dual requirements of long-form academic specification editing and dense numerical matrix auditing.

- **Tabular Numerics:** All matrix calculation points, credit-hour distributions, outcome mapping correlation levels (e.g., 0, 1, 2, 3), and percentages must activate OpenType feature settings: `font-feature-settings: "tnum" 1, "cv05" 1, "cv11" 1`.
- **Text Rhythms:** Document reading views enforce an optimal line measure between 65 and 75 characters. Matrix tables and inspector views prioritize compact, scannable heights using `label-md` and `tabular-data`.
- **Uppercase Restraint:** Uppercase styling is strictly reserved for acronym badges (e.g., `CO3`, `PO12`, `PSO2`, `ABET`) rendered in `label-sm` with slight positive tracking.

## Layout & Spacing

The layout is built upon a 3-pane workbench architecture:
1. **Curriculum Hierarchy Rail (Left):** 280px fixed width, collapsible to 64px icon-only navigation.
2. **Document Stage (Center):** Fluid workspace with a max-width constraint of 1100px for course specs, expanding to full-bleed for comprehensive CO-PO cross-tabulation matrices.
3. **Audit & Verification Inspector (Right):** 360px contextual panel for real-time validation checks and accreditation rubric compliance.

Responsive adaptation rules:
- **Desktop (≥ 1280px):** All 3 panels visible simultaneously. Center stage utilizes `margin: 2rem` and `gutter: 1.5rem`.
- **Tablet (768px – 1279px):** Left navigation collapses to an off-canvas drawer; Right audit panel becomes an expandable bottom sheet or contextual overlay.
- **Mobile (< 768px):** Single-column stacked mode. Complex mapping matrices switch from full 2D cross-tables to accordion-based outcome relationship cards.

## Elevation & Depth

Visual hierarchy uses crisp hairline borders paired with subtle ambient diffusion to mimic tactile card stock on a smooth architectural desk.

- **Surface Base (`#F8FAFC`):** Zero elevation. Serves as the structural background behind editor modules.
- **Level 1 (Document Canvases & Toolbars):** `#FFFFFF` surface with a continuous 1px outline of `#E2E8F0`. Shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04)`.
- **Level 2 (Active Cards, Popovers & Cell Focus):** `#FFFFFF` surface with `#CBD5E1` border. Shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Modal Dialogs & Export Audits):** `#FFFFFF` with `#94A3B8` border and a deep backdrop blur (`rgba(15, 23, 42, 0.4)`). Shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.

Never employ heavy saturated drop shadows or colored ambient glows. Structural separation is always preserved via the 1px neutral hairline.

## Shapes

The design system incorporates a disciplined, soft geometric aesthetic (`roundedness: 1`). Radii remain intentional and understated to maintain a professional workspace tone:

- Standard controls, table cells, text input containers, and status chips apply a default radius of `0.25rem` (4px).
- Standalone document panels, modal containers, and elevated cards employ `0.5rem` (8px).
- Pill shapes are strictly forbidden except for numeric count indicators and micro status badges (`rounded-full`). Sharp corners are preserved strictly on nested table inner cell intersections to maintain clean tabular lines.

## Components

### Buttons
- **Primary:** Background `#1E3A8A`, text `#FFFFFF`, radius `0.25rem`, height 36px (compact faculty workbench standard). Hover: `#172554`. Focus: 2px offset with `#2563EB`.
- **Secondary (Audit/Action):** Background `#FFFFFF`, text `#0F766E`, border 1px `#0F766E`. Hover: `#F0FDFA`.
- **Tertiary / Ghost:** No border, text `#64748B`. Hover: `#F1F5F9` and text `#1E293B`.

### Matrix Grid Cells (CO-PO Mapping)
- Dimensions: Fixed 44px × 44px minimum hit targets.
- Empty State: Pure white with 1px hairline `#E2E8F0`.
- Mapped Values (0 = None, 1 = Low, 2 = Medium, 3 = High):
  - Value 0: Text `#94A3B8`, background transparent.
  - Value 1: Text `#0F766E`, background `#F0FDFA`.
  - Value 2: Text `#0F766E`, background `#CCFBF1`, font-weight 600.
  - Value 3: Text `#FFFFFF`, background `#0F766E`, font-weight 700.

### Input Fields & Document Editors
- Background `#FFFFFF`, border 1px `#CBD5E1`, typography `body-md`.
- Focus State: Border color `#1E3A8A`, subtle outer focus ring `box-shadow: 0 0 0 1px #1E3A8A`.
- Rich editor blocks maintain subtle left-accent borders (`2px solid #E2E8F0`) transitioning to `#1E3A8A` on active cursor line.

### Status Chips & Badges
- **Valid / Accredited:** Background `#ECFDF5`, text `#065F46`, border 1px `#A7F3D0`.
- **Needs Review:** Background `#FFFBEB`, text `#92400E`, border 1px `#FDE68A`.
- **Missing Mapping / Error:** Background `#FEF2F2`, text `#991B1B`, border 1px `#FECACA`.
- Text size uses `label-sm`, tracking uppercase, padding `0.125rem 0.5rem`.

### Document Cards
- Structured summaries of course outlines: background `#FFFFFF`, border 1px `#E2E8F0`, header separated by horizontal hairline. Metadata metrics displayed via tabular figures.