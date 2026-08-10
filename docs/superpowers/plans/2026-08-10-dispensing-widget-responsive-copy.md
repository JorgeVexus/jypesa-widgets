# Dispensing Widget Responsive Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep all Spanish and English copy inside the dispensing widget’s text column at every supported viewport width.

**Architecture:** Make the center and mobile headers size containers, calculate typography from available inline space, remove rigid no-wrap behavior, and constrain description/button content. Preserve the existing desktop scroll and mobile carousel layouts.

**Tech Stack:** CSS embedded in browser JavaScript, Node.js contract tests, local browser preview.

---

### Task 1: Define the responsive CSS contract

**Files:**
- Create: `tests/sistemas-dispensacion-responsive.test.cjs`
- Modify: `widgets/sistemas-dispensacion/sistemas-dispensacion.js`

- [ ] **Step 1: Write failing assertions**

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'widgets', 'sistemas-dispensacion', 'sistemas-dispensacion.js'), 'utf8');

test('sizes copy from its container and allows safe wrapping', () => {
  assert.match(source, /\.jypesa-disp-split-col-center\s*{[\s\S]*?container-type:\s*inline-size/);
  assert.match(source, /\.jypesa-disp-title-line\s*{[\s\S]*?white-space:\s*normal/);
  assert.match(source, /\.jypesa-disp-main-title\s*{[\s\S]*?max-width:\s*100%/);
  assert.match(source, /font-size:\s*clamp\([^;]*cqi[^;]*\)/);
  assert.match(source, /\.jypesa-disp-btn\s*{[\s\S]*?max-width:\s*100%/);
});

test('keeps both language variants in the same responsive structure', () => {
  assert.match(source, /Menos residuos,/);
  assert.match(source, /Less Waste, Greater/);
  assert.doesNotMatch(source, /data-lang=['"]en['"][^}]*font-size/s);
});
```

- [ ] **Step 2: Run RED**

Run: `node --test tests/sistemas-dispensacion-responsive.test.cjs`

Expected: FAIL on container sizing, normal wrapping, and width constraints.

### Task 2: Implement container-responsive typography

**Files:**
- Modify: `widgets/sistemas-dispensacion/sistemas-dispensacion.js:68-123,195-230,239-247,317-375`
- Test: `tests/sistemas-dispensacion-responsive.test.cjs`

- [ ] **Step 1: Constrain shared copy elements**

Add or update:

```css
.jypesa-disp-main-title {
  width: 100%;
  max-width: 100%;
  font-size: clamp(30px, 8cqi, 70px);
  overflow-wrap: normal;
  text-wrap: balance;
}

.jypesa-disp-title-line {
  display: block;
  max-width: 100%;
  white-space: normal;
}

.jypesa-disp-intro-desc {
  width: 100%;
  max-width: min(732px, 100%);
  overflow-wrap: anywhere;
}

.jypesa-disp-btn {
  max-width: 100%;
  white-space: normal;
  text-align: center;
  line-height: 1.25;
}

.jypesa-disp-btn svg { flex: 0 0 auto; }
```

- [ ] **Step 2: Establish container contexts**

```css
.jypesa-disp-split-col-center,
.jypesa-disp-split-mobile-header {
  container-type: inline-size;
}
```

Replace fixed mobile title sizes with `clamp(28px, 10cqi, 42px)` and keep the smallest breakpoint at `clamp(26px, 11cqi, 32px)`.

- [ ] **Step 3: Preserve a fallback before container units**

Place `font-size: clamp(30px, 3.2vw, 70px);` immediately before the `cqi` declaration so older browsers retain fluid sizing.

- [ ] **Step 4: Run GREEN and syntax check**

Run: `node --test tests/sistemas-dispensacion-responsive.test.cjs && node --check widgets/sistemas-dispensacion/sistemas-dispensacion.js`

Expected: PASS.

### Task 3: Verify representative viewports

**Files:**
- Verify: `widgets/sistemas-dispensacion/preview.html`
- Verify: `widgets/sistemas-dispensacion/sistemas-dispensacion.js`

- [ ] **Step 1: Run the local preview in both languages**

Check widths `1440`, `1200`, `1024`, `991`, `768`, `390`, and `320` pixels. At each width, assert title, subtitle, description, and button rectangles remain inside their containing text column/header.

- [ ] **Step 2: Verify visible copy**

Expected English title: `Less Waste, Greater Efficiency` with natural wrapping and no image overlap.

Expected Spanish title: `Menos residuos, mayor eficiencia` with no clipping.

- [ ] **Step 3: Run regression tests**

Run: `node --test tests/sistemas-dispensacion-responsive.test.cjs tests/widget-data-lang.test.cjs`

Expected: all tests pass.

