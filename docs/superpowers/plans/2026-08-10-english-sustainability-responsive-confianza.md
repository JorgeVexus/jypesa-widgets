# English Sustainability and Responsive Confianza Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Translate `/en/sustainability`, add real English support to its certifications slider, and prevent `#confianza` card copy from overflowing at any viewport width.

**Architecture:** Modify only Webflow page `6a7a02fd7e6505156bf0563f`, preserving `Nav en`, `EN Footer`, images, CMS, and partner marquees. Extend the local certifications widget with a normalized `data-lang` contract and translated accessibility strings. Add page-scoped responsive CSS under `#confianza` so shared global classes elsewhere remain unaffected.

**Tech Stack:** Webflow MCP APIs, vanilla JavaScript, HTML/CSS, Node test runner.

---

### Task 1: Add bilingual certifications-slider behavior with TDD

**Files:**
- Modify: `widgets/slider certificaciones new/slider-certificaciones.js`
- Modify: `widgets/slider certificaciones new/slider-certificaciones.html`
- Create: `tests/slider-certificaciones-language.test.cjs`

- [ ] Write a failing test proving `data-lang="en"` selects English region/status labels and Spanish remains the fallback.
- [ ] Run `node --test tests/slider-certificaciones-language.test.cjs` and confirm RED.
- [ ] Implement normalized `es|en` detection from `#gpk-slider-certificaciones-widget-root` and translate `Certificaciones`, `carrusel`, and `Certificaciones X a Y de Z` to `Certifications`, `carousel`, and `Certifications X to Y of Z`.
- [ ] Run the focused test and existing slider contract tests; expect PASS.

### Task 2: Translate the live Sustainability page

**Files:**
- Modify: Webflow page `6a7a02fd7e6505156bf0563f`

- [ ] Translate all visible Spanish String leaves and button prop overrides into natural corporate English while preserving spans and line breaks.
- [ ] Translate SEO to `Sustainability & We Care Philosophy | JYPESA` with an English description.
- [ ] Add `data-lang="en"` to `#gpk-slider-certificaciones-widget-root`; preserve its script URL.
- [ ] Leave both partner-marquee embeds unchanged because they have no language-dependent UI.

### Task 3: Make `#confianza` fully responsive

**Files:**
- Modify: Webflow page `6a7a02fd7e6505156bf0563f`

- [ ] Append one scoped style embed targeting only `#confianza`.
- [ ] Set `.highlights-section` to a two-column grid with `minmax(0,1fr)`, align items to stretch, and use responsive gaps.
- [ ] Set `.content-block-3` and descendant text wrappers to `height:auto`, `min-height:0`, `min-width:0`, and safe widths.
- [ ] Apply `overflow-wrap:anywhere`, `word-break:normal`, balanced headings, fluid `clamp()` typography, and responsive padding.
- [ ] At `max-width:767px`, switch to one column; at `max-width:479px`, tighten padding and spacing without fixed heights.

### Task 4: Verify without publishing

**Files:**
- Verify: Webflow page and local widget files

- [ ] Re-read all 42 Webflow nodes and confirm zero visible Spanish, English nav/footer, English widget attribute, unchanged marquees, and scoped responsive CSS.
- [ ] Verify metadata, `/en/sustainability`, `draft:false`, and no publish action.
- [ ] Run focused tests, relevant existing tests, `node --check`, and `git diff --check`.

