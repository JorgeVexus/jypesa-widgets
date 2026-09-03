const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const mainPath = path.join(__dirname, '..', 'widgets', 'slider-coleccion-productos', 'slider-coleccion-productos.js');
const repoPath = path.join(__dirname, '..', 'jypesa-widgets-repo', 'widgets', 'slider-coleccion-productos', 'slider-coleccion-productos.js');

const mainSource = fs.readFileSync(mainPath, 'utf8');
const repoSource = fs.readFileSync(repoPath, 'utf8');

test('slider-coleccion-productos mobile dots have enlarged touch target and robust navigation', () => {
  for (const [name, source] of [['main', mainSource], ['repo', repoSource]]) {
    // 1. Check expanded touch target of 36px
    assert.match(
      source,
      /\.jypesa-scol-dot::before\s*\{[^}]*width:\s*36px;[^}]*height:\s*36px;/i,
      `[${name}] dot must have ::before 36px x 36px touch hit area`
    );

    // 2. Check z-index and pointer-events on dots bar
    assert.match(
      source,
      /\.jypesa-scol-dots-bar\s*\{[^}]*position:\s*relative;[^}]*z-index:\s*10;[^}]*pointer-events:\s*auto;/i,
      `[${name}] dots bar must have relative positioning, z-index 10 and pointer-events auto`
    );

    // 3. Check touch-action manipulation on dots
    assert.match(
      source,
      /\.jypesa-scol-dot\s*\{[^}]*touch-action:\s*manipulation;/i,
      `[${name}] dot must have touch-action: manipulation`
    );

    // 4. Check scrollToIdx implementation supporting scroll-snap-align: center on mobile
    assert.match(
      source,
      /const scrollToIdx = \(idx\) => \{[\s\S]*?card\.offsetLeft - \(track\.clientWidth - card\.clientWidth\) \/ 2/i,
      `[${name}] scrollToIdx must center card on mobile`
    );

    // 5. Check both click and touchend listeners
    assert.match(
      source,
      /dot\.addEventListener\('click',\s*handleSelect\);[\s\S]*?dot\.addEventListener\('touchend',\s*handleSelect/i,
      `[${name}] must listen to both click and touchend for instantaneous mobile response`
    );

    // 6. Check tab click listener for Webflow tabs
    assert.match(
      source,
      /\.w-tab-link/i,
      `[${name}] must listen to Webflow tab switches to synchronize dots`
    );
  }
});
