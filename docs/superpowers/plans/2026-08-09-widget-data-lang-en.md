# Widget data-lang English Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the hero-soluciones, proceso, and sustentabilidad widgets render English for `data-lang="en"` while preserving Spanish as the default and fallback.

**Architecture:** Each widget keeps an internal `CONTENT` dictionary keyed by `es` and `en`. A local `resolveLanguage(target)` normalizes the root attribute and selects English only when explicitly requested; existing builders consume the selected content while preserving markup, styles, assets, and animation hooks.

**Tech Stack:** Browser JavaScript IIFEs and Node.js built-in `node:test`, `assert`, and `vm`.

---

## File map

- Create `tests/widget-data-lang.test.cjs`: execute each real widget in a fake DOM and assert rendered language.
- Modify `widgets/hero-soluciones/hero-soluciones.js`: bilingual hero copy, links, and alt text.
- Modify `widgets/proceso/proceso-widget.js`: bilingual heading and eight process steps.
- Modify `widgets/sustentabilidad/sustentabilidad-widget.js`: bilingual cards and service/innovation content.

### Task 1: Add failing language contract tests

**Files:**
- Create: `tests/widget-data-lang.test.cjs`

- [ ] **Step 1: Create a real-script rendering harness**

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function renderWidget(file, targetId, lang) {
  const target = {
    innerHTML: '',
    getAttribute(name) { return name === 'data-lang' ? lang ?? null : null; },
    querySelectorAll() { return []; },
    querySelector() { return null; }
  };
  const document = {
    readyState: 'complete',
    currentScript: { src: `https://example.test/${path.basename(file)}` },
    head: { appendChild(node) { if (node.onload) node.onload(); } },
    createElement(tag) { return { tagName: tag, style: {}, setAttribute() {}, appendChild() {} }; },
    getElementById(id) { return id === targetId ? target : null; },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    addEventListener() {}
  };
  const context = {
    window: { matchMedia: () => ({ matches: true }) },
    document,
    console,
    setTimeout(fn) { fn(); },
    clearTimeout() {},
    Image: function Image() {}
  };
  context.window.window = context.window;
  context.window.document = document;
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
  return target.innerHTML;
}
```

- [ ] **Step 2: Add the three behavior cases for every widget**

```js
const ROOT = path.resolve(__dirname, '..');
const widgets = [
  { file: 'widgets/hero-soluciones/hero-soluciones.js', id: 'jypesa-hero-soluciones-widget', es: 'Creamos productos', en: 'We create products' },
  { file: 'widgets/proceso/proceso-widget.js', id: 'jypesa-proceso-widget', es: 'De la idea a la', en: 'From idea to' },
  { file: 'widgets/sustentabilidad/sustentabilidad-widget.js', id: 'jypesa-sustentabilidad-widget', es: 'Un solo proceso', en: 'One process' }
];

for (const widget of widgets) {
  const file = path.join(ROOT, widget.file);
  test(`${widget.file} renders English for data-lang=en`, () => {
    const html = renderWidget(file, widget.id, 'en');
    assert.match(html, new RegExp(widget.en));
    assert.doesNotMatch(html, new RegExp(widget.es));
  });
  test(`${widget.file} defaults to Spanish`, () => {
    assert.match(renderWidget(file, widget.id), new RegExp(widget.es));
  });
  test(`${widget.file} falls back to Spanish for unsupported languages`, () => {
    assert.match(renderWidget(file, widget.id, 'fr'), new RegExp(widget.es));
  });
}
```

- [ ] **Step 3: Verify RED**

Run: `node --test tests/widget-data-lang.test.cjs`

Expected: the three English cases fail because the widgets currently render Spanish; default and fallback cases pass.

- [ ] **Step 4: Commit**

```bash
git add tests/widget-data-lang.test.cjs
git commit -m "test: define widget data-lang contract"
```

### Task 2: Make hero-soluciones bilingual

**Files:**
- Modify: `widgets/hero-soluciones/hero-soluciones.js:445-510`
- Test: `tests/widget-data-lang.test.cjs`

- [ ] **Step 1: Add the resolver and complete dictionaries above `buildWidgetHtml`**

```js
const CONTENT = {
  es: {
    line1: 'Creamos productos', line2: 'a la medida', line3: 'de tu marca',
    description: 'Desarrollamos amenidades personalizadas desde la conceptualización hasta la producción, alineadas a la identidad y necesidades de tu marca.',
    primaryCta: 'Conocer proceso', secondaryCta: 'Contactar asesor',
    contactUrl: '/contacto', imageAlt: 'Jypesa — Desarrollo Personalizado', partnerAlt: 'Logo de socio'
  },
  en: {
    line1: 'We create products', line2: 'tailored', line3: 'to your brand',
    description: 'We develop custom amenities from concept through production, aligned with your brand identity and needs.',
    primaryCta: 'Explore the process', secondaryCta: 'Contact an advisor',
    contactUrl: '/en/contact', imageAlt: 'Jypesa — Custom Development', partnerAlt: 'Partner logo'
  }
};

function resolveLanguage(target) {
  return String(target.getAttribute('data-lang') || '').trim().toLowerCase() === 'en' ? 'en' : 'es';
}
```

- [ ] **Step 2: Pass `copy` into `buildMarqueeHtml` and `buildWidgetHtml`**

```js
const copy = CONTENT[resolveLanguage(container)];
container.innerHTML = buildWidgetHtml(buildMarqueeHtml(logos, copy), copy);
```

Replace each visible literal, contact URL, and alt label with the corresponding `copy` property. Do not change classes, SVG, or animation timing.

- [ ] **Step 3: Verify GREEN**

Run: `node --test --test-name-pattern="hero-soluciones" tests/widget-data-lang.test.cjs`

Expected: three hero tests PASS.

- [ ] **Step 4: Commit**

```bash
git add widgets/hero-soluciones/hero-soluciones.js tests/widget-data-lang.test.cjs
git commit -m "feat: localize hero soluciones widget"
```

### Task 3: Make proceso bilingual

**Files:**
- Modify: `widgets/proceso/proceso-widget.js:58-120`
- Test: `tests/widget-data-lang.test.cjs`

- [ ] **Step 1: Add `resolveLanguage` and `CONTENT.es/en`**

The dictionary contains `eyebrow`, `title`, `accent`, `description`, and eight `[title, description]` step pairs. English copy:

```js
var EN = {
  eyebrow: 'Our process',
  title: 'From idea to',
  accent: 'production',
  description: 'An end-to-end process that turns needs into market-ready solutions.',
  steps: [
    ['Need', 'We understand the project goals, scope, and requirements.'],
    ['Concept', 'We turn the opportunity into a clear product proposal.'],
    ['Development', 'We create or adapt the formula and define its specifications.'],
    ['Validation', 'We verify performance, stability, and compliance.'],
    ['Packaging', 'We select and validate the right format.'],
    ['Scale-up', 'We take the solution from the laboratory to industrial production.'],
    ['Production', 'We manufacture under quality and traceability controls.'],
    ['Delivery', 'We coordinate release and distribution of the finished product.']
  ]
};
```

- [ ] **Step 2: Render from the selected content**

```js
var copy = CONTENT[resolveLanguage(target)];
target.innerHTML = buildHtml(copy);
```

Generate the cards from `copy.steps` while retaining the existing step numbers, dot classes, SVG, layout, and GSAP selectors.

- [ ] **Step 3: Verify GREEN**

Run: `node --test --test-name-pattern="proceso-widget" tests/widget-data-lang.test.cjs`

Expected: three process tests PASS.

- [ ] **Step 4: Commit**

```bash
git add widgets/proceso/proceso-widget.js tests/widget-data-lang.test.cjs
git commit -m "feat: localize process widget"
```

### Task 4: Make sustentabilidad bilingual

**Files:**
- Modify: `widgets/sustentabilidad/sustentabilidad-widget.js:59-165`
- Test: `tests/widget-data-lang.test.cjs`

- [ ] **Step 1: Add the resolver and parallel Spanish/English dictionaries**

English content:

```js
var EN = {
  eyebrowLead: 'One process',
  eyebrowTail: 'multiple solutions',
  title: 'From formulation to optimization',
  description: 'We integrate development, adaptation, and optimization into one process, applying technical expertise at every stage to improve product performance, feasibility, and competitiveness.',
  serviceTitle: 'Integrated service model',
  serviceDescription: 'Refillable dispensing systems designed to reduce single-use packaging in hotels and hospitality operations.',
  serviceClosing: 'We reduce operational friction and accelerate your time to market.',
  innovationTitle: 'Applied innovation',
  innovationDescription: 'We listen to your main need and solve it technically.',
  innovationItems: ['Sensory optimization', 'Raw material alternatives', 'Stability improvement', 'Strategic ingredient substitution', 'Competitive differentiation', 'Sustainable alternatives'],
  innovationClosing: 'We do more than follow instructions—we contribute technical judgment.',
  cards: [
    { title: 'Formula development', items: ['From scratch', 'Formula adaptation', 'Optimization', 'Technical replication'], alt: 'Formula' },
    { title: 'Research and development', items: ['In-house laboratory', 'Microbiological testing', 'Stability studies'], alt: 'Research and development' },
    { title: 'Branding and packaging', items: ['Design and adaptation', 'Stability studies', 'Material selection'], alt: 'Packaging' }
  ],
  warehouseAlt: 'Optimization warehouse'
};
```

- [ ] **Step 2: Make `buildHtml(copy)` generate desktop and mobile content from the dictionary**

```js
var copy = CONTENT[resolveLanguage(target)];
target.innerHTML = buildHtml(copy);
```

Use one checklist-row helper for repeated card and innovation items. Preserve every existing class and animation selector.

- [ ] **Step 3: Verify GREEN**

Run: `node --test --test-name-pattern="sustentabilidad-widget" tests/widget-data-lang.test.cjs`

Expected: three sustainability tests PASS.

- [ ] **Step 4: Commit**

```bash
git add widgets/sustentabilidad/sustentabilidad-widget.js tests/widget-data-lang.test.cjs
git commit -m "feat: localize sustainability widget"
```

### Task 5: Full verification

**Files:**
- Verify: `tests/widget-data-lang.test.cjs`
- Verify: all three modified widget scripts

- [ ] **Step 1: Run the complete new suite**

Run: `node --test tests/widget-data-lang.test.cjs`

Expected: 9 tests PASS and 0 fail.

- [ ] **Step 2: Run all existing Node tests**

Run: `node --test tests/*.test.cjs "slider certificaciones new"/*.test.js "widgets/slider certificaciones new"/*.test.js`

Expected: every test passes with no uncaught errors.

- [ ] **Step 3: Check syntax and diff integrity**

```bash
node --check widgets/hero-soluciones/hero-soluciones.js
node --check widgets/proceso/proceso-widget.js
node --check widgets/sustentabilidad/sustentabilidad-widget.js
git diff --check
git status --short
```

Expected: syntax checks exit 0, `git diff --check` prints nothing, and status lists only the intended files.

- [ ] **Step 4: Commit any verification-only adjustment**

```bash
git add tests/widget-data-lang.test.cjs widgets/hero-soluciones/hero-soluciones.js widgets/proceso/proceso-widget.js widgets/sustentabilidad/sustentabilidad-widget.js
git commit -m "test: verify bilingual custom development widgets"
```
