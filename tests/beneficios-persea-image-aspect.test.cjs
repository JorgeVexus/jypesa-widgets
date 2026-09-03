const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const mainJsPath = path.join(__dirname, '..', 'widgets', 'beneficios-persea', 'beneficios-persea.js');
const repoJsPath = path.join(__dirname, '..', 'jypesa-widgets-repo', 'widgets', 'beneficios-persea', 'beneficios-persea.js');

const mainJs = fs.readFileSync(mainJsPath, 'utf8');
const repoJs = fs.readFileSync(repoJsPath, 'utf8');

test('beneficios-persea styles preserve image aspect ratio and prevent stretching on mobile', () => {
  for (const [name, js] of [['mainJs', mainJs], ['repoJs', repoJs]]) {
    // Desktop has object-fit: contain
    assert.match(
      js,
      /\.bp-soap\{[^}]*object-fit:contain;/i,
      `[${name}] desktop bp-soap must have object-fit: contain`
    );
    // Mobile resets height to auto and uses object-fit: contain
    assert.match(
      js,
      /\.bp-soap\{[^}]*height:auto!important;[^}]*object-fit:contain;/i,
      `[${name}] mobile bp-soap must have height: auto !important and object-fit: contain`
    );
  }
});
