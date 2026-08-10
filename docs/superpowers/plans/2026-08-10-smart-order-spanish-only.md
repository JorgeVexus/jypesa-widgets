# Spanish-Only Smart Order Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render the desktop Smart Order link only when the navigation widget resolves Spanish.

**Architecture:** Keep the existing navigation template and wrap the Smart Order anchor in a small language-dependent template fragment. Verify the generated source contract without changing mobile navigation or other actions.

**Tech Stack:** Browser JavaScript, Node.js built-in test runner.

---

### Task 1: Add the language visibility contract

**Files:**
- Modify: `tests/navigation-custom-development-url.test.cjs`
- Modify: `widgets/navegacion-principal/navegacion-principal.js:1037-1040`

- [ ] **Step 1: Write a failing source-contract test**

```js
test('Smart Order is rendered only for Spanish navigation', () => {
  assert.match(source, /const smartOrderLink = lang === 'es'/);
  assert.match(source, /\$\{smartOrderLink\}/);
  assert.equal((source.match(/class="smart-order"/g) || []).length, 1);
});
```

- [ ] **Step 2: Run RED**

Run: `node --test tests/navigation-custom-development-url.test.cjs`

Expected: FAIL because Smart Order is currently unconditional.

- [ ] **Step 3: Implement the conditional fragment**

Inside `buildWidgetHtml(lang)`, after `const u = ...`, add:

```js
const smartOrderLink = lang === 'es' ? `
  <a href="https://sm.jypesa.com/jypesa/public/login" class="smart-order" target="_blank" rel="noopener noreferrer">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    ${t.smartOrder}
  </a>
` : '';
```

Replace the original anchor with `${smartOrderLink}`.

- [ ] **Step 4: Run GREEN and syntax validation**

Run: `node --test tests/navigation-custom-development-url.test.cjs && node --check widgets/navegacion-principal/navegacion-principal.js`

Expected: all navigation tests pass.

### Task 2: Verify final navigation behavior

**Files:**
- Verify: `widgets/navegacion-principal/navegacion-principal.js`

- [ ] **Step 1: Execute the widget in ES and EN fake DOM contexts**

Add assertions to the navigation test harness that generated Spanish HTML contains `class="smart-order"` and English HTML does not.

- [ ] **Step 2: Run the focused suite**

Run: `node --test tests/navigation-custom-development-url.test.cjs`

Expected: PASS.

