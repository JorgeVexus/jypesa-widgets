# Cobertura Global Locations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Cobertura Global widget locations with the approved CSV records, accurate static coordinates, optional contact details, and a verified local preview.

**Architecture:** Keep the widget self-contained, but make its location array the single source of truth for map markers, legends, counts, and tooltips. Add a lightweight Node test that extracts and validates the embedded data without requiring a browser.

**Tech Stack:** Vanilla JavaScript, D3 v7, TopoJSON, Node.js built-in test/assert modules, static HTML preview.

---

### Task 1: Add a failing data-contract test

**Files:**
- Create: `tests/cobertura-global-data.test.cjs`
- Test: `widgets/cobertura-global/cobertura-global.js`

- [ ] **Step 1: Write the failing test**

Create a Node test that reads the widget source, evaluates only the serializable location block, and asserts: 39 included records; 35 distributors, 3 offices, and 1 factory; no `Black Dogs Hosp`; Bogotá fallback for `Jypesa Colombia`; every record has finite latitude/longitude; and contacts are absent or valid emails/URLs.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/cobertura-global-data.test.cjs`

Expected: FAIL because the current source still contains the three legacy groups and has no normalized location block.

- [ ] **Step 3: Commit the test with the implementation in Task 2**

Do not commit a deliberately failing repository state separately.

### Task 2: Replace legacy data and generate UI from one source

**Files:**
- Modify: `widgets/cobertura-global/cobertura-global.js:8-46`
- Modify: `widgets/cobertura-global/cobertura-global.js:426-574`
- Modify: `widgets/cobertura-global/cobertura-global.js:594-760`
- Test: `tests/cobertura-global-data.test.cjs`

- [ ] **Step 1: Define normalized locations and group metadata**

Replace `GROUPS` with `LOCATIONS` records using this shape:

```js
{ name: 'Cafi Guatemala', type: 'Distribuidores', location: 'AVENIDA ELENA 6-42 ZONA 3 CIUDAD GUATEMALA GUATEMALA', country: 'Guatemala', contact: 'ventasguatemala@jypesa.com', lat: 14.6349, lon: -90.5069 }
```

Define group display metadata for `Distribuidores`, `Oficinas`, and `Fábrica`, including stable colors and priority order.

- [ ] **Step 2: Generate desktop and mobile legends**

Add helpers that HTML-escape all CSV-derived strings, build a compact city/state label, split the large distributor list into two desktop columns, and generate counts directly from `LOCATIONS`.

- [ ] **Step 3: Preserve individual records at shared coordinates**

Build one marker per included record. Apply a small deterministic longitude/latitude offset only when two records share identical coordinates so each tooltip remains reachable.

- [ ] **Step 4: Build optional tooltip rows**

Render name and type for every marker. Render location, country, and contact rows only when populated. Classify an email with `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`; classify other contact values as URLs and normalize missing schemes to `https://`.

- [ ] **Step 5: Make tooltip links interactive**

Change tooltip pointer handling so email and web links can be clicked, and do not hide the tooltip while the pointer moves from the marker into the tooltip.

- [ ] **Step 6: Run the data-contract test**

Run: `node --test tests/cobertura-global-data.test.cjs`

Expected: PASS with all data-contract assertions satisfied.

- [ ] **Step 7: Run syntax validation**

Run: `node --check widgets/cobertura-global/cobertura-global.js`

Expected: exit code 0 with no output.

### Task 3: Verify the preview visually

**Files:**
- Verify: `cobertura-global.html`
- Verify: `widgets/cobertura-global/cobertura-global.js`

- [ ] **Step 1: Start the existing local preview**

Run a local HTTP server from the repository root and load `/cobertura-global.html`.

- [ ] **Step 2: Inspect desktop layout**

Confirm the three group labels and counts are legible, markers render on the world map, representative international/Mexico/US/Spain tooltips contain the correct optional contact, and the layout does not overflow at 1440px width.

- [ ] **Step 3: Inspect mobile layout**

At approximately 390px width, confirm the group list remains readable, the map does not overflow, and tooltips fit within the viewport.

- [ ] **Step 4: Final regression checks**

Run:

```powershell
node --test tests/cobertura-global-data.test.cjs
node --check widgets/cobertura-global/cobertura-global.js
git diff --check
```

Expected: tests pass, syntax check exits 0, and `git diff --check` reports no whitespace errors.

- [ ] **Step 5: Present preview without publishing**

Provide the local preview URL and summarize included/omitted records. Do not deploy, push, or publish.
