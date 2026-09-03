const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const mainJsPath = path.join(__dirname, '..', 'widgets', 'hoteleria-tabs', 'hoteleria-tabs.js');
const repoJsPath = path.join(__dirname, '..', 'jypesa-widgets-repo', 'widgets', 'hoteleria-tabs', 'hoteleria-tabs.js');

const mainJs = fs.readFileSync(mainJsPath, 'utf8');
const repoJs = fs.readFileSync(repoJsPath, 'utf8');

test('hoteleria-tabs resets min-height on mobile to avoid dead blank space', () => {
  for (const [name, js] of [['mainJs', mainJs], ['repoJs', repoJs]]) {
    assert.match(
      js,
      /\.jht-right\s*\{[^}]*min-height:\s*auto\s*!important/i,
      `[${name}] mobile jht-right must have min-height: auto !important`
    );
    assert.match(
      js,
      /#hoteleria\.section,\s*\.section\.colecciones\s*\{[^}]*padding-bottom:\s*16px\s*!important/i,
      `[${name}] container section must reduce padding-bottom on mobile`
    );
  }
});

test('hoteleria-tabs keeps desktop dots hidden but displays dots on mobile/tablet', () => {
  for (const [name, js] of [['mainJs', mainJs], ['repoJs', repoJs]]) {
    const desktopMatch = js.match(/\.jht-dots\s*\{\s*display:\s*none;\s*\}/);
    const mobileMatch = js.match(/@media\s*\(max-width:\s*1100px\)\s*\{\s*\.jht-dots/);
    assert.ok(desktopMatch, `[${name}] desktop dots rule must exist`);
    assert.ok(mobileMatch, `[${name}] mobile dots rule must exist`);
    assert.ok(
      desktopMatch.index < mobileMatch.index,
      `[${name}] desktop hide rule must precede mobile display rule so dots work in mobile`
    );
  }
});
