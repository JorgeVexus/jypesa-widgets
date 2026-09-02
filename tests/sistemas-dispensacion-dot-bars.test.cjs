const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const mainPath = path.join(__dirname, '..', 'widgets', 'sistemas-dispensacion', 'sistemas-dispensacion.js');
const repoPath = path.join(__dirname, '..', 'jypesa-widgets-repo', 'widgets', 'sistemas-dispensacion', 'sistemas-dispensacion.js');

const mainSource = fs.readFileSync(mainPath, 'utf8');
const repoSource = fs.readFileSync(repoPath, 'utf8');

test('sistemas-dispensacion mobile dots have matching bar styles from colecciones-tabs', () => {
  for (const [name, source] of [['main', mainSource], ['repo', repoSource]]) {
    // Check height: 5px
    assert.match(source, /\.jypesa-disp-split-mobile-dot[\s\S]*?height:\s*5px;/i, `[${name}] dot height must be 5px`);
    // Check width: 30px
    assert.match(source, /\.jypesa-disp-split-mobile-dot[\s\S]*?width:\s*30px;/i, `[${name}] dot width must be 30px`);
    // Check inactive color: rgba(72, 169, 197, 0.35)
    assert.match(source, /\.jypesa-disp-split-mobile-dot[\s\S]*?background-color:\s*rgba\(72,\s*169,\s*197,\s*0\.35\);/i, `[${name}] inactive dot color must be light cyan`);
    // Check active color: #48a9c5
    assert.match(source, /\.jypesa-disp-split-mobile-dot\.active[\s\S]*?background-color:\s*#48a9c5;/i, `[${name}] active dot color must be #48a9c5`);
    // Check gap: 6px
    assert.match(source, /\.jypesa-disp-split-mobile-dots[\s\S]*?gap:\s*6px;/i, `[${name}] container gap must be 6px`);
  }
});
