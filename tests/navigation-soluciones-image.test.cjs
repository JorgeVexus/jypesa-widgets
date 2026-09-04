const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const filePaths = [
  path.join(__dirname, '..', 'widgets', 'navegacion-principal', 'navegacion-principal.js'),
  path.join(__dirname, '..', 'jypesa-widgets-repo', 'widgets', 'navegacion-principal', 'navegacion-principal.js')
];

test('Soluciones megamenu does not contain broken image URL and uses active card asset', () => {
  filePaths.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.ok(
      !content.includes('6a5a92ddf931dcfaf8fb4bce_soluciones%20menu.avif'),
      `Broken URL found in ${filePath}`
    );
    assert.ok(
      content.includes('6a443587bbde5974f8d192b0_hoteleria%20card.avif'),
      `Active Hoteleria card URL missing in ${filePath}`
    );
    assert.ok(
      content.includes('alt="${t.solutions}"'),
      `Dynamic i18n alt missing for solutions in ${filePath}`
    );
  });
});
