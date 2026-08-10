const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const widgetPath = path.join(__dirname, '..', 'widgets', 'cobertura-global', 'cobertura-global.js');
const source = fs.readFileSync(widgetPath, 'utf8');
const previewSource = fs.readFileSync(path.join(__dirname, '..', 'cobertura-global.html'), 'utf8');
const match = source.match(/\/\* LOCATIONS_DATA_START \*\/([\s\S]*?)\/\* LOCATIONS_DATA_END \*\//);

function readLocations() {
  assert.ok(match, 'normalized location data block is missing');
  const context = {};
  vm.runInNewContext(`${match[1]};globalThis.result = LOCATIONS;`, context);
  return context.result;
}

test('contains exactly the approved global coverage locations', () => {
  const locations = readLocations();

  assert.equal(locations.length, 20);
  assert.deepEqual(
    Object.fromEntries(
      Object.entries(Object.groupBy(locations, ({ type }) => type))
        .map(([type, entries]) => [type, entries.length]),
    ),
    { representativeOffices: 14, jypesaFactories: 3, associatedFactories: 3 },
  );

  assert.deepEqual(
    Array.from(locations, ({ city, country }) => `${city.es}, ${country.es}`),
    [
      'Guadalajara, México', 'Cancún, México', 'Punta Cana, República Dominicana',
      'Kingston, Jamaica', 'Las Vegas, Estados Unidos', 'Dallas, Estados Unidos',
      'Ciudad de Guatemala, Guatemala', 'San José, Costa Rica', 'Bogotá, Colombia',
      'Lima, Perú', 'Santiago, Chile', 'Alicante, España', 'Guangzhou, China',
      'Sydney, Australia', 'Guadalajara, México', 'Toledo, España', 'Yangzhou, China',
      'Medellín, Colombia', 'Buenos Aires, Argentina', 'Kuala Lumpur, Malasia',
    ],
  );
});

test('stores coordinates and localized labels without private contact details', () => {
  const locations = readLocations();

  for (const location of locations) {
    assert.equal(Number.isFinite(location.lat), true, `${location.city?.es || 'location'} needs a latitude`);
    assert.equal(Number.isFinite(location.lon), true, `${location.city?.es || 'location'} needs a longitude`);
    assert.equal(typeof location.city.es, 'string');
    assert.equal(typeof location.city.en, 'string');
    assert.equal(typeof location.country.es, 'string');
    assert.equal(typeof location.country.en, 'string');

    for (const forbidden of ['name', 'location', 'contact', 'url', 'address']) {
      assert.equal(Object.hasOwn(location, forbidden), false, `${forbidden} must not be stored`);
    }
  }
});

test('provides the approved English location labels', () => {
  const locations = readLocations();

  assert.deepEqual(
    Array.from(locations, ({ city, country }) => `${city.en}, ${country.en}`),
    [
      'Guadalajara, Mexico', 'Cancun, Mexico', 'Punta Cana, Dominican Republic',
      'Kingston, Jamaica', 'Las Vegas, United States', 'Dallas, United States',
      'Guatemala City, Guatemala', 'San Jose, Costa Rica', 'Bogota, Colombia',
      'Lima, Peru', 'Santiago, Chile', 'Alicante, Spain', 'Guangzhou, China',
      'Sydney, Australia', 'Guadalajara, Mexico', 'Toledo, Spain', 'Yangzhou, China',
      'Medellin, Colombia', 'Buenos Aires, Argentina', 'Kuala Lumpur, Malaysia',
    ],
  );

  assert.match(source, /representativeOffices: 'Representative Offices'/);
  assert.match(source, /jypesaFactories: 'Jypesa Factories'/);
  assert.match(source, /associatedFactories: 'Associated Factories'/);
});

test('uses one localized location label across lists and tooltips', () => {
  assert.match(source, /function locationLabel\(location, lang\)/);
  assert.match(source, /escapeHtml\(locationLabel\(location, lang\)\)/);
  assert.match(source, /jypesa-cg-tt-title[^`]*\$\{escapeHtml\(locationLabel\(m, lang\)\)\}/s);
  assert.doesNotMatch(source, /function contactHref|function tooltipRow|jypesa-cg-tt-link/);
});

test('preview language buttons reload the encapsulated widget script without reloading the page', () => {
  assert.match(previewSource, /document\.createElement\('script'\)/);
  assert.match(previewSource, /cobertura-global\.js\?t=/);
  assert.doesNotMatch(previewSource, /location\.reload\(\)/);
});
