const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('widgets/slider certificaciones new/slider-certificaciones.js', 'utf8');

test('certifications slider reads data-lang and provides complete English UI copy', () => {
  assert.match(source, /getAttribute\(["']data-lang["']\)/);
  assert.match(source, /Certifications/);
  assert.match(source, /Good Manufacturing Practices/);
  assert.match(source, /Cruelty-free beauty/);
  assert.match(source, /Sustainable palm oil/);
  assert.match(source, /Plastic recovered before reaching the ocean/);
  assert.match(source, /Climate commitment/);
  assert.match(source, /Regulatory Compliance/);
  assert.match(source, /View previous certification/);
  assert.match(source, /View next certification/);
  assert.match(source, /carousel/);
});

test('English status uses to/of while Spanish fallback keeps a/de', () => {
  assert.match(source, /lang === ["']en["'][\s\S]*?["'] to ["'][\s\S]*?["'] of ["']/);
  assert.match(source, /Certificaciones ["'] \+ \(state\.index \+ 1\) \+ ["'] a ["']/);
});
