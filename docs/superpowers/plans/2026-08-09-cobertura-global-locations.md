# Cobertura Global Locations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Cobertura Global dataset with the approved 20 locations, simplify pin tooltips to one localized location label, and provide complete ES/EN output through `data-lang`.

**Architecture:** Keep the existing single-file widget and its D3 map, but normalize every location around a stable category key plus localized city/country labels. A shared `locationLabel(location, lang)` function will feed desktop lists, mobile lists, and tooltips so all surfaces stay synchronized.

**Tech Stack:** Browser JavaScript, D3.js, TopoJSON, Node.js built-in test runner, `vm`-based source contract tests.

---

## File map

- Modify `widgets/cobertura-global/cobertura-global.js`: category definitions, 20-location dataset, localized labels, lists, markers, and tooltip rendering.
- Modify `tests/cobertura-global-data.test.cjs`: dataset counts, categories, coordinates, forbidden contact fields, translations, and tooltip contract.
- Verify `cobertura-global.html`: existing ES/EN preview switches continue to initialize the widget correctly; no source change is expected.

### Task 1: Define the new location data contract

**Files:**
- Modify: `tests/cobertura-global-data.test.cjs`
- Test: `tests/cobertura-global-data.test.cjs`

- [ ] **Step 1: Replace the legacy dataset assertions with failing normalized-data assertions**

Add helpers that evaluate the existing `LOCATIONS_DATA_START` block and assert the exact distribution:

```js
assert.equal(locations.length, 20);
assert.deepEqual(
  Object.fromEntries(
    Object.entries(Object.groupBy(locations, ({ type }) => type))
      .map(([type, entries]) => [type, entries.length]),
  ),
  { representativeOffices: 14, jypesaFactories: 3, associatedFactories: 3 },
);

assert.deepEqual(
  locations.map(({ city, country }) => `${city.es}, ${country.es}`),
  [
    'Guadalajara, México', 'Cancún, México', 'Punta Cana, República Dominicana',
    'Kingston, Jamaica', 'Las Vegas, Estados Unidos', 'Dallas, Estados Unidos',
    'Ciudad de Guatemala, Guatemala', 'San José, Costa Rica', 'Bogotá, Colombia',
    'Lima, Perú', 'Santiago, Chile', 'Alicante, España', 'Guangzhou, China',
    'Sydney, Australia', 'Guadalajara, México', 'Toledo, España', 'Yangzhou, China',
    'Medellín, Colombia', 'Buenos Aires, Argentina', 'Kuala Lumpur, Malasia',
  ],
);
```

- [ ] **Step 2: Assert bilingual fields and privacy constraints**

```js
for (const location of locations) {
  assert.equal(Number.isFinite(location.lat), true, `${location.city.es} needs a latitude`);
  assert.equal(Number.isFinite(location.lon), true, `${location.city.es} needs a longitude`);
  assert.equal(typeof location.city.es, 'string');
  assert.equal(typeof location.city.en, 'string');
  assert.equal(typeof location.country.es, 'string');
  assert.equal(typeof location.country.en, 'string');
  for (const forbidden of ['name', 'location', 'contact', 'url', 'address']) {
    assert.equal(Object.hasOwn(location, forbidden), false, `${forbidden} must not be stored`);
  }
}
```

- [ ] **Step 3: Run the test and verify RED**

Run: `node --test tests/cobertura-global-data.test.cjs`

Expected: FAIL because the current file still contains 39 distributor/office/factory records and contact details.

- [ ] **Step 4: Commit the failing contract test**

```bash
git add tests/cobertura-global-data.test.cjs
git commit -m "test: define global coverage location contract"
```

### Task 2: Replace groups and location records

**Files:**
- Modify: `widgets/cobertura-global/cobertura-global.js:7-61`
- Test: `tests/cobertura-global-data.test.cjs`

- [ ] **Step 1: Replace the category definitions with stable keys**

```js
const GROUPS = {
  representativeOffices: { color: '#0089C1' },
  jypesaFactories: { color: '#4AA25D' },
  associatedFactories: { color: '#FBB31F' },
};

const GROUP_PRIORITY = ['representativeOffices', 'jypesaFactories', 'associatedFactories'];
```

- [ ] **Step 2: Replace `LOCATIONS` with the approved 20 localized records**

Replace the block with:

```js
const LOCATIONS = [
  { type: 'representativeOffices', city: { es: 'Guadalajara', en: 'Guadalajara' }, country: { es: 'México', en: 'Mexico' }, lat: 20.6597, lon: -103.3496 },
  { type: 'representativeOffices', city: { es: 'Cancún', en: 'Cancun' }, country: { es: 'México', en: 'Mexico' }, lat: 21.1619, lon: -86.8515 },
  { type: 'representativeOffices', city: { es: 'Punta Cana', en: 'Punta Cana' }, country: { es: 'República Dominicana', en: 'Dominican Republic' }, lat: 18.5601, lon: -68.3725 },
  { type: 'representativeOffices', city: { es: 'Kingston', en: 'Kingston' }, country: { es: 'Jamaica', en: 'Jamaica' }, lat: 17.9712, lon: -76.7936 },
  { type: 'representativeOffices', city: { es: 'Las Vegas', en: 'Las Vegas' }, country: { es: 'Estados Unidos', en: 'United States' }, lat: 36.1699, lon: -115.1398 },
  { type: 'representativeOffices', city: { es: 'Dallas', en: 'Dallas' }, country: { es: 'Estados Unidos', en: 'United States' }, lat: 32.7767, lon: -96.7970 },
  { type: 'representativeOffices', city: { es: 'Ciudad de Guatemala', en: 'Guatemala City' }, country: { es: 'Guatemala', en: 'Guatemala' }, lat: 14.6349, lon: -90.5069 },
  { type: 'representativeOffices', city: { es: 'San José', en: 'San Jose' }, country: { es: 'Costa Rica', en: 'Costa Rica' }, lat: 9.9281, lon: -84.0907 },
  { type: 'representativeOffices', city: { es: 'Bogotá', en: 'Bogota' }, country: { es: 'Colombia', en: 'Colombia' }, lat: 4.7110, lon: -74.0721 },
  { type: 'representativeOffices', city: { es: 'Lima', en: 'Lima' }, country: { es: 'Perú', en: 'Peru' }, lat: -12.0464, lon: -77.0428 },
  { type: 'representativeOffices', city: { es: 'Santiago', en: 'Santiago' }, country: { es: 'Chile', en: 'Chile' }, lat: -33.4489, lon: -70.6693 },
  { type: 'representativeOffices', city: { es: 'Alicante', en: 'Alicante' }, country: { es: 'España', en: 'Spain' }, lat: 38.3452, lon: -0.4810 },
  { type: 'representativeOffices', city: { es: 'Guangzhou', en: 'Guangzhou' }, country: { es: 'China', en: 'China' }, lat: 23.1291, lon: 113.2644 },
  { type: 'representativeOffices', city: { es: 'Sydney', en: 'Sydney' }, country: { es: 'Australia', en: 'Australia' }, lat: -33.8688, lon: 151.2093 },
  { type: 'jypesaFactories', city: { es: 'Guadalajara', en: 'Guadalajara' }, country: { es: 'México', en: 'Mexico' }, lat: 20.6597, lon: -103.3496 },
  { type: 'jypesaFactories', city: { es: 'Toledo', en: 'Toledo' }, country: { es: 'España', en: 'Spain' }, lat: 39.8628, lon: -4.0273 },
  { type: 'jypesaFactories', city: { es: 'Yangzhou', en: 'Yangzhou' }, country: { es: 'China', en: 'China' }, lat: 32.3942, lon: 119.4129 },
  { type: 'associatedFactories', city: { es: 'Medellín', en: 'Medellin' }, country: { es: 'Colombia', en: 'Colombia' }, lat: 6.2442, lon: -75.5812 },
  { type: 'associatedFactories', city: { es: 'Buenos Aires', en: 'Buenos Aires' }, country: { es: 'Argentina', en: 'Argentina' }, lat: -34.6037, lon: -58.3816 },
  { type: 'associatedFactories', city: { es: 'Kuala Lumpur', en: 'Kuala Lumpur' }, country: { es: 'Malasia', en: 'Malaysia' }, lat: 3.1390, lon: 101.6869 },
];
```

The Guadalajara office and factory intentionally share coordinates; the existing overlap-offset logic keeps both pins selectable.

- [ ] **Step 3: Update the category translations**

```js
groups: {
  representativeOffices: 'Oficinas de representación',
  jypesaFactories: 'Fábricas Jypesa',
  associatedFactories: 'Fábricas asociadas',
}
```

and:

```js
groups: {
  representativeOffices: 'Representative Offices',
  jypesaFactories: 'Jypesa Factories',
  associatedFactories: 'Associated Factories',
}
```

Remove the obsolete `tooltip` translation objects because tooltips will have no field labels.

- [ ] **Step 4: Run the dataset test and verify GREEN**

Run: `node --test tests/cobertura-global-data.test.cjs`

Expected: PASS with 20 locations and category counts `14/3/3`.

- [ ] **Step 5: Commit the dataset update**

```bash
git add widgets/cobertura-global/cobertura-global.js tests/cobertura-global-data.test.cjs
git commit -m "feat: update global coverage locations"
```

### Task 3: Localize every displayed location and simplify tooltips

**Files:**
- Modify: `widgets/cobertura-global/cobertura-global.js:450-760`
- Modify: `tests/cobertura-global-data.test.cjs`

- [ ] **Step 1: Add failing source-contract assertions for shared labels and minimal tooltips**

```js
test('uses one localized location label across lists and tooltips', () => {
  assert.match(source, /function locationLabel\(location, lang\)/);
  assert.match(source, /escapeHtml\(locationLabel\(location, lang\)\)/);
  assert.match(source, /jypesa-cg-tt-title[^`]*\$\{escapeHtml\(locationLabel\(m, lang\)\)\}/s);
  assert.doesNotMatch(source, /contactHref|tooltipRow|jypesa-cg-tt-link/);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test --test-name-pattern="localized location label" tests/cobertura-global-data.test.cjs`

Expected: FAIL because the widget still builds labels from `name`, `country`, address, and contact fields.

- [ ] **Step 3: Add the shared localized-label helper**

```js
function localizedValue(value, lang) {
  if (!value) return '';
  return value[lang] || value.es || '';
}

function locationLabel(location, lang) {
  return [localizedValue(location.city, lang), localizedValue(location.country, lang)]
    .filter(Boolean)
    .join(', ');
}
```

Delete `listLabel`, `isEmail`, `contactHref`, and `tooltipRow`.

- [ ] **Step 4: Pass the language into all render paths**

Change the group functions so both label calls become `escapeHtml(locationLabel(location, lang))`, then use these signatures:

```js
function buildDesktopGroups(texts, lang)
function buildMobileGroups(texts, lang)
function buildWidgetHtml(texts, lang)
function renderMap(target, texts, lang)
```

Initialization must call:

```js
target.innerHTML = buildWidgetHtml(texts, lang);
loadMapLibs(function () { renderMap(target, texts, lang); });
```

- [ ] **Step 5: Reduce `showTT` to one localized title**

```js
function showTT(ev, m) {
  window.clearTimeout(hideTimer);
  tt.innerHTML = `
    <div class="jypesa-cg-tt-inner">
      <div class="jypesa-cg-tt-title">${escapeHtml(locationLabel(m, lang))}</div>
    </div>
  `;
  posTT(ev);
  tt.classList.add('jypesa-cg-tooltip-visible');
}
```

- [ ] **Step 6: Run focused and complete widget tests**

Run: `node --test tests/cobertura-global-data.test.cjs`

Expected: PASS with no tooltip contact/address/URL markup.

- [ ] **Step 7: Commit localization and tooltip simplification**

```bash
git add widgets/cobertura-global/cobertura-global.js tests/cobertura-global-data.test.cjs
git commit -m "feat: localize global coverage map labels"
```

### Task 4: Regression and preview verification

**Files:**
- Verify: `widgets/cobertura-global/cobertura-global.js`
- Verify: `tests/cobertura-global-data.test.cjs`
- Verify: `cobertura-global.html`

- [ ] **Step 1: Run syntax validation**

Run: `node --check widgets/cobertura-global/cobertura-global.js`

Expected: exit code 0 with no syntax errors.

- [ ] **Step 2: Run the relevant automated suites**

Run: `node --test tests/cobertura-global-data.test.cjs tests/widget-data-lang.test.cjs tests/navigation-custom-development-url.test.cjs`

Expected: all relevant tests pass.

- [ ] **Step 3: Inspect the local ES/EN preview**

Open `cobertura-global.html`, switch between its Spanish and English controls, and verify:

```text
ES: Oficinas de representación / Fábricas Jypesa / Fábricas asociadas
EN: Representative Offices / Jypesa Factories / Associated Factories
Tooltip: exactly one “City, Country” line in the active language
Pins: 20 total across three distinct category colors
```

- [ ] **Step 4: Check the final diff**

Run: `git diff --check && git status --short`

Expected: no whitespace errors; only the intended widget, test, and plan changes are present alongside any previously documented user changes.

- [ ] **Step 5: Commit the verified final state**

```bash
git add widgets/cobertura-global/cobertura-global.js tests/cobertura-global-data.test.cjs
git commit -m "test: verify bilingual global coverage widget"
```
