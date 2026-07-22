const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const widgetPath = path.join(__dirname, '..', 'widgets', 'cobertura-global', 'cobertura-global.js');
const source = fs.readFileSync(widgetPath, 'utf8');
const match = source.match(/\/\* LOCATIONS_DATA_START \*\/([\s\S]*?)\/\* LOCATIONS_DATA_END \*\//);

test('contains the complete normalized CSV location set', () => {
  assert.ok(match, 'normalized location data block is missing');

  const context = {};
  vm.runInNewContext(`${match[1]};globalThis.result = LOCATIONS;`, context);
  const locations = context.result;

  assert.equal(locations.length, 39);
  assert.deepEqual(
    Object.fromEntries(
      Object.entries(Object.groupBy(locations, ({ type }) => type))
        .map(([type, entries]) => [type, entries.length]),
    ),
    { Distribuidores: 35, Oficinas: 3, 'Fábrica': 1 },
  );
  assert.equal(locations.some(({ name }) => name === 'Black Dogs Hosp'), false);

  const colombiaOffice = locations.find(({ name }) => name === 'Jypesa Colombia');
  assert.ok(colombiaOffice);
  assert.equal(colombiaOffice.country, 'Colombia');
  assert.ok(Math.abs(colombiaOffice.lat - 4.711) < 0.01);
  assert.ok(Math.abs(colombiaOffice.lon + 74.0721) < 0.01);

  for (const location of locations) {
    assert.equal(Number.isFinite(location.lat), true, `${location.name} needs a latitude`);
    assert.equal(Number.isFinite(location.lon), true, `${location.name} needs a longitude`);
    if (location.contact) {
      assert.match(location.contact, /^(?:[^\s@]+@[^\s@]+\.[^\s@]+|(?:https?:\/\/)?(?:www\.)?[^\s]+\.[^\s]+)$/i);
    }
  }
});
