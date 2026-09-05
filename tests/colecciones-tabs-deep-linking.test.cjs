const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const jsPath = path.join(__dirname, '..', 'widgets', 'colecciones-tabs', 'colecciones-tabs.js');
const js = fs.readFileSync(jsPath, 'utf8');

test('colecciones-tabs has deep linking and hash change listener', () => {
  assert.match(js, /function checkUrlHash\(\)/, 'checkUrlHash function must be defined');
  assert.match(js, /window\.addEventListener\(['"]hashchange['"],\s*checkUrlHash\)/, 'hashchange listener must be attached');
  assert.match(js, /function cleanAlpha\(/, 'cleanAlpha helper must exist');
  assert.match(js, /function slugify\(/, 'slugify helper must exist');
});

test('colecciones-tabs supports bilingual cross-linking aliases', () => {
  assert.match(js, /bilingualAliases/, 'bilingualAliases map must exist');
  assert.match(js, /'estandar':\s*'standard'/, 'estandar -> standard alias');
  assert.match(js, /'standard':\s*'estandar'/, 'standard -> estandar alias');
  assert.match(js, /'lujo':\s*'luxury'/, 'lujo -> luxury alias');
  assert.match(js, /'luxury':\s*'lujo'/, 'luxury -> lujo alias');
});
