# English Solutions Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Translate the live Webflow page `/en/solutions` completely into natural corporate English, including all segment tabs, component overrides, product cards, widgets, and SEO.

**Architecture:** Modify only page `6a79fb43201d5652afc251b8` on site `69d7c3721733f0f4aaa00b42`. Preserve the user-installed `Nav en` component `3abbf964-d826-f1f5-73e4-65e197c9b008` and `EN Footer` component `73787413-748f-8cb1-6cd3-5fa117c90eeb`. Translate String leaves and component property overrides in place so styles, spans, tabs, CMS bindings, images, and animations remain intact; add `data-lang="en"` only to the six `hoteleria-tabs` containers.

**Tech Stack:** Webflow MCP data APIs, Webflow components and props, HTML embeds, vanilla JavaScript widget language contract.

---

### Task 1: Preserve the correct live-page baseline

**Files:**
- Modify: Webflow page `6a79fb43201d5652afc251b8`
- Reference: `widgets/hoteleria-tabs/hoteleria-tabs.js`

- [ ] **Step 1: Read both 100-node pages of content**

Use `get_page_content` with offsets `0` and `100`.

Expected: 195 nodes on `Solutions`, path `/en/solutions`, `draft:false`; do not use draft page `6a6306af394df3ded104c255` (`Solutions-old`).

- [ ] **Step 2: Lock navigation and footer invariants**

Expected component IDs:

```text
Nav en: 3abbf964-d826-f1f5-73e4-65e197c9b008
EN Footer: 73787413-748f-8cb1-6cd3-5fa117c90eeb
```

Do not write to either component or instance.

### Task 2: Translate the page shell and segment selectors

**Files:**
- Modify: text leaves and component props on page `6a79fb43201d5652afc251b8`

- [ ] **Step 1: Translate hero and primary calls to action**

Use these approved equivalents:

```text
Eficiencia que respalda tu operación -> Efficiency That Supports Your Operations
Desde grandes cadenas hoteleras... -> From major hotel chains to luxury cruise lines, Jypesa designs amenities, dispensing systems, and collections tailored to your operations, your guests, and your brand values.
Explorar colecciones -> Explore Collections
Contactar a un asesor -> Contact an Advisor
Soluciones especializadas -> Specialized Solutions
La solución correcta para cada segmento -> The Right Solution for Every Segment
Explora nuestras soluciones... -> Explore our solutions by segment and find the option that best fits your business needs.
```

- [ ] **Step 2: Translate the six segment cards**

```text
Hotelería -> Hospitality
Hoteles independientes / Cadenas hoteleras / Grupos hoteleros -> Independent hotels / Hotel chains / Hotel groups
Hospitalidad alternativa -> Alternative Hospitality
Institucional -> Institutional
Hospitales / Restaurante & Clubes -> Hospitals / Restaurants & Clubs
Canal comercial -> Commercial Channel
Distribuidores -> Distributors
Empresarial -> Corporate
Corporativo / Regalos empresariales -> Corporate programs / Corporate gifts
Hospitalidad especializada -> Specialized Hospitality
Cruceros / Campamentos -> Cruise lines / Camps
```

### Task 3: Translate all six tab panels

**Files:**
- Modify: String leaves and button prop overrides on page `6a79fb43201d5652afc251b8`

- [ ] **Step 1: Translate repeated section labels and headings**

```text
¿Qué problema resolvemos? -> What Problems Do We Solve?
Entendemos lo que necesitas -> We Understand What You Need
Colecciones recomendadas -> Recommended Collections
Colecciones diseñadas para entornos que demandan funcionalidad, resistencia y eficiencia. -> Collections designed for environments that demand functionality, durability, and efficiency.
Conocer más -> Learn More
Comprar en Amazon -> Buy on Amazon
No items found. -> No items found.
```

- [ ] **Step 2: Translate every descriptive paragraph and bullet**

Translate all hospitality, alternative hospitality, institutional, commercial, corporate, and specialized-hospitality panel copy into concise natural English. Preserve each existing bullet as a separate String leaf, preserve all emphasized spans and line breaks, and leave CMS bindings and images unchanged.

- [ ] **Step 3: Translate product-card copy**

```text
Amenidades hoteleras profesionales -> Professional Hotel Amenities
Set versátil -> Versatile Set
Amenidades Premium -> Premium Amenities
pzs./Caja -> pcs./Case
Jabones -> Soaps
Cremas humectantes -> Moisturizing Lotions
Acondicionadores -> Conditioners
Geles de baño -> Shower Gels
```

Preserve quantities, milliliters, grams, asset IDs, and Amazon destinations.

### Task 4: Activate English widget behavior

**Files:**
- Modify: six `.jht-widget-container` HTML embeds on page `6a79fb43201d5652afc251b8`
- Preserve: partners marquee embed `19cc09f8-e816-3ab9-d0aa-df214c2294a0`

- [ ] **Step 1: Add English to every hotel-tabs container**

Preserve each existing `data-cms-source` and add `data-lang="en"`:

```html
<div class="jht-widget-container" data-lang="en"></div>
<div class="jht-widget-container" data-cms-source=".cms-source-2" data-lang="en"></div>
<div class="jht-widget-container" data-cms-source=".cms-source-3" data-lang="en"></div>
<div class="jht-widget-container" data-cms-source=".cms-source-4" data-lang="en"></div>
<div class="jht-widget-container" data-cms-source=".cms-source-5" data-lang="en"></div>
<div class="jht-widget-container" data-cms-source=".cms-source-6" data-lang="en"></div>
```

Expected: the partners marquee remains unchanged because it has no language-dependent UI.

### Task 5: Translate page SEO

**Files:**
- Modify: Webflow page settings for `6a79fb43201d5652afc251b8`

- [ ] **Step 1: Update metadata**

```text
SEO title: Hospitality Solutions | JYPESA
SEO description: Amenities for hotels, alternative hospitality, institutional, and corporate environments. Solutions that streamline operations and elevate the guest experience.
```

Keep slug `solutions`, folder, Open Graph inheritance, and publishing state unchanged.

### Task 6: Final verification without publishing

**Files:**
- Verify: Webflow page `6a79fb43201d5652afc251b8`

- [ ] **Step 1: Re-read all 195 content nodes**

Confirm visible Spanish text count is zero, component property overrides are English, six hotel-tabs embeds contain `data-lang="en"`, and all CMS selectors remain unchanged.

- [ ] **Step 2: Re-read page metadata and invariants**

Confirm `/en/solutions`, `draft:false`, English SEO, unchanged `Nav en` and `EN Footer`, and no publish action invoked.

