# English About Us Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Translate the current Webflow page at `/en/about-us` into polished corporate English and explicitly activate English in every embedded Jypesa widget.

**Architecture:** Edit only Webflow page `6a79f41ca85fe01bdc681bfd` on site `69d7c3721733f0f4aaa00b42`. Preserve the existing English navigation component, English footer component, certifications section, layout, styles, images, animation attributes, and element hierarchy. Static text is translated in place; each widget container receives `data-lang="en"` without changing its script URL.

**Tech Stack:** Webflow MCP data APIs, HTML embeds, vanilla JavaScript widget language contract.

---

### Task 1: Capture the approved page baseline

**Files:**
- Modify: Webflow page `6a79f41ca85fe01bdc681bfd`
- Reference: `widgets/hero-interactive/hero-widget.js`
- Reference: `widgets/timeline/timeline-widget.js`
- Reference: `widgets/cards/cards-widget.js`
- Reference: `widgets/cobertura-global/cobertura-global.js`

- [ ] **Step 1: Read all static page content**

Use Webflow `get_page_content` with page ID `6a79f41ca85fe01bdc681bfd`, limit `100`.

Expected: 48 nodes, including English navbar/footer components, four widget embeds, Spanish editorial copy, and an already-English certifications section.

- [ ] **Step 2: Verify widget language contracts locally**

Run:

```powershell
rg -n 'data-lang|dataset\.lang|lang ===' widgets/hero-interactive widgets/timeline widgets/cards widgets/cobertura-global
```

Expected: each production widget reads `data-lang`; all four support `en`.

### Task 2: Translate static editorial content

**Files:**
- Modify: Webflow page `6a79f41ca85fe01bdc681bfd`

- [ ] **Step 1: Update Spanish text nodes in place**

Apply these English equivalents while preserving existing inline elements, classes, line breaks, and emphasis spans:

```text
Nuestra historia -> Our History
50 años creando / Experiencias / de hospitalidad -> 50 Years Creating / Hospitality / Experiences

Desde sus inicios... ->
Since its beginnings, Jypesa has focused on developing and supplying amenities for the hospitality industry. Over more than five decades, the company has evolved from a product manufacturer into a strategic partner for hotels, hotel groups, and operators worldwide.

With a strong track record, Jypesa has expanded into multiple markets, consolidating its operations across the Americas and strengthening its global reach through comprehensive solutions spanning design, manufacturing, and distribution.

Nuestra filosofía -> Our Philosophy

Creemos en hacer las cosas bien... ->
We believe in doing things right, from the source to the final experience. We care for our ingredients, our processes, our environmental impact, and the people involved at every stage. Because to us, hospitality is also a way of caring. We care about our air, oceans, environment, bodies, and people.

Hospitalidad -> Hospitality
Diseñamos productos que elevan la experiencia del usuario final. -> We design products that elevate the guest experience.
Sostentabilidad -> Sustainability
Integramos prácticas responsables en materiales, procesos y sistemas. -> We integrate responsible practices into our materials, processes, and systems.
Calidad -> Quality
Garantizamos estándares consistentes en cada línea de producto. -> We ensure consistent standards across every product line.
Innovación -> Innovation
desarrollamos soluciones adaptadas a las necesidades actuales del mercado. -> We develop solutions tailored to today’s market needs.
Capacidades -> Capabilities
Soluciones integrales para cada proyecto -> Comprehensive Solutions for Every Project
```

Expected: no Spanish editorial text remains outside comments in CSS/HTML embeds.

- [ ] **Step 2: Re-read page content**

Use Webflow `get_page_content` again.

Expected: navbar, footer, certifications, images, and style embed are unchanged; all listed static copy is English.

### Task 3: Activate English in embedded widgets

**Files:**
- Modify: Webflow HTML embeds on page `6a79f41ca85fe01bdc681bfd`

- [ ] **Step 1: Set language attributes on the four containers**

Update only the opening container tags:

```html
<div id="jypesa-hero-widget" data-lang="en"></div>
<div id="jypesa-timeline-widget" data-lang="en"></div>
<div id="jypesa-cards-widget" data-lang="en"></div>
<div id="jypesa-cobertura-global-widget" data-lang="en"></div>
```

Keep these script URLs unchanged:

```text
https://jypesa-widgets.vercel.app/widgets/hero-interactive/hero-widget.js
https://jypesa-widgets.vercel.app/widgets/timeline/timeline-widget.js
https://jypesa-widgets.vercel.app/widgets/cards/cards-widget.js
https://jypesa-widgets.vercel.app/widgets/cobertura-global/cobertura-global.js
```

- [ ] **Step 2: Re-read all four embeds**

Expected: each container has exactly `data-lang="en"`; no script URL or surrounding embed content changed.

### Task 4: Final verification without publishing

**Files:**
- Verify: Webflow page `6a79f41ca85fe01bdc681bfd`

- [ ] **Step 1: Audit the complete page content**

Confirm:

```text
Page: About Us
Published path: /en/about-us
Draft: false
Navbar component: unchanged
Footer component: unchanged
Certifications copy: unchanged and English
Spanish editorial nodes: 0
Widgets with data-lang="en": 4
```

- [ ] **Step 2: Confirm publishing was not invoked**

Expected: page changes are saved in Webflow staging, and no site publish action was called.

