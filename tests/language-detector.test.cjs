const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const detectorHtml = fs.readFileSync(
  path.join(__dirname, '..', 'widgets', 'language-detector', 'language-detector.html'),
  'utf8'
);

test('Language detector script has all required Spanish to English URL mappings', () => {
  assert.match(detectorHtml, /if \(path === '\/' \|\| path === '' \|\| path === '\/inicio'\) return '\/en\/home'/);
  assert.match(detectorHtml, /if \(path === '\/nosotros'\) return '\/en\/about-us'/);
  assert.match(detectorHtml, /if \(path === '\/contacto'\) return '\/en\/contact'/);
  assert.match(detectorHtml, /if \(path === '\/desarollo-personalizado'\) return '\/en\/custom-development'/);
  assert.match(detectorHtml, /if \(path === '\/sustentabilidad'\) return '\/en\/sustainability'/);
  assert.match(detectorHtml, /if \(path === '\/soluciones'\) return '\/en\/solutions'/);
  assert.match(detectorHtml, /prod\.startsWith\('estandar\/'\)/);
  assert.match(detectorHtml, /return '\/en\/standar\/'/);
  assert.match(detectorHtml, /prod\.startsWith\('lujo\/'\)/);
  assert.match(detectorHtml, /return '\/en\/luxury\/'/);
});

test('Language detector script checks bot crawlers and localStorage', () => {
  assert.match(detectorHtml, /googlebot/i);
  assert.match(detectorHtml, /localStorage\.getItem\('jypesa_lang'\)/);
  assert.match(detectorHtml, /navigator\.languages/);
  assert.match(detectorHtml, /window\.location\.replace/);
});
