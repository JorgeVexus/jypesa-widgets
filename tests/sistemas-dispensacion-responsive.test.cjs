const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const widgetPath = path.join(__dirname, '..', 'widgets', 'sistemas-dispensacion', 'sistemas-dispensacion.js');
const source = fs.readFileSync(widgetPath, 'utf8');

function cssRules(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matches = Array.from(
    source.matchAll(new RegExp(`(?:^|[{}])\\s*${escaped}\\s*\\{([^{}]*)\\}`, 'gm')),
    (match) => match[1],
  );
  assert.ok(matches.length, `missing CSS rule for ${selector}`);
  return matches;
}

function cssRule(selector, index = 0) {
  const rules = cssRules(selector);
  assert.ok(rules[index], `missing CSS rule ${index + 1} for ${selector}`);
  return rules[index];
}

function declarations(rule) {
  return Object.fromEntries(
    rule.split(';')
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        const separator = entry.indexOf(':');
        return [entry.slice(0, separator).trim(), entry.slice(separator + 1).trim()];
      }),
  );
}

test('sizes dispensing copy from its available container width', () => {
  const center = declarations(cssRule('.jypesa-disp-split-col-center'));
  const mobileHeader = declarations(cssRule('.jypesa-disp-split-mobile-header'));
  const title = declarations(cssRule('.jypesa-disp-main-title'));

  assert.equal(center['container-type'], 'inline-size');
  assert.equal(mobileHeader['container-type'], 'inline-size');
  assert.match(title['font-size'], /^clamp\([^)]*cqi[^)]*\)$/);
  assert.match(cssRule('.jypesa-disp-main-title'), /font-size:\s*clamp\([^;]*vw[^;]*\);\s*font-size:\s*clamp\([^;]*cqi[^;]*\);/);
  assert.equal(title.width, '100%');
  assert.equal(title['max-width'], '100%');
  assert.equal(title['text-wrap'], 'balance');
});

test('allows title, description, and call-to-action copy to wrap safely', () => {
  const titleLine = declarations(cssRule('.jypesa-disp-title-line'));
  const description = declarations(cssRule('.jypesa-disp-intro-desc'));
  const button = declarations(cssRule('.jypesa-disp-btn'));
  const icon = declarations(cssRule('.jypesa-disp-btn svg'));

  assert.equal(titleLine['white-space'], 'normal');
  assert.equal(description.width, '100%');
  assert.match(description['max-width'], /min\(/);
  assert.equal(description['overflow-wrap'], 'anywhere');
  assert.equal(button['max-width'], '100%');
  assert.equal(button['text-align'], 'center');
  assert.equal(button['white-space'], 'normal');
  assert.equal(button['overflow-wrap'], 'anywhere');
  assert.equal(icon['flex-shrink'], '0');
});

test('uses container-relative clamps instead of fixed mobile copy sizes', () => {
  const mobileTitleRules = cssRules('.jypesa-disp-split-mobile-header .jypesa-disp-main-title');
  const mobileDescription = declarations(cssRule('.jypesa-disp-split-mobile-header .jypesa-disp-intro-desc'));

  assert.equal(mobileTitleRules.length, 2, 'expected base mobile title rule and <=576px override');
  for (const rule of mobileTitleRules) {
    assert.match(declarations(rule)['font-size'], /^clamp\([^)]*cqi[^)]*\)$/);
  }
  assert.match(mobileDescription['font-size'], /^clamp\([^)]*cqi[^)]*\)$/);
  assert.doesNotMatch(source, /@media\s*\(max-width:\s*576px\)[\s\S]*?\.jypesa-disp-split-mobile-header \.jypesa-disp-main-title\s*\{[^}]*font-size:\s*\d+px/);
});

test('keeps Spanish and English titles on the same responsive markup structure', () => {
  const dataBlock = source.match(/const staticDataByLang = \{([\s\S]*?)\n  \};/);
  assert.ok(dataBlock, 'missing localized dispensing data');
  const titles = Array.from(dataBlock[1].matchAll(/^\s+title:\s*'([^']+)'/gm), (match) => match[1]);
  assert.equal(titles.length, 2);

  const structure = (title) => title
    .replace(/>[^<]*/g, '>')
    .replace(/\s+/g, '');

  assert.equal(structure(titles[0]), structure(titles[1]));
  for (const title of titles) {
    assert.equal((title.match(/jypesa-disp-title-line/g) || []).length, 2);
    assert.equal((title.match(/jypesa-disp-split-italic-highlight/g) || []).length, 1);
  }
});
