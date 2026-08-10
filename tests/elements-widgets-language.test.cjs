const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('tabs widget keeps Spanish as default and exposes English UI copy', () => {
  const source = read('widgets/tabs-colecciones-productos/tabs-colecciones-productos.js');
  assert.match(source, /getAttribute\('data-lang'\) \|\| 'es'/);
  assert.match(source, /collectionProducts: 'Collection products'/);
  assert.match(source, /olfactoryFamily: 'Olfactory family'/);
  assert.match(source, /viewAmazon: 'View on Amazon'/);
  assert.match(source, /buildWidgetHtml\(collections, getWidgetLang\(target\)\)/);
});

test('benefits widget selects complete English benefit copy through data-lang', () => {
  const source = read('widgets/beneficios-persea/beneficios-persea.js');
  assert.match(source, /getAttribute\('data-lang'\) \|\| 'es'/);
  assert.match(source, /var BENEFITS_EN = \[/);
  assert.match(source, /t: 'Biodegradable formula'/);
  assert.match(source, /isEnglish \? 'Benefits' : 'Beneficios'/);
  assert.match(source, /buildHtml\(centralImg, getLang\(target\)\)/);
});
