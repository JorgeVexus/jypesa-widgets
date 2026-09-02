const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const mainPath = path.join(__dirname, '..', 'widgets', 'slider-scroll-vertical', 'slider-scroll-vertical.js');
const repoPath = path.join(__dirname, '..', 'jypesa-widgets-repo', 'widgets', 'slider-scroll-vertical', 'slider-scroll-vertical.js');

const mainSource = fs.readFileSync(mainPath, 'utf8');
const repoSource = fs.readFileSync(repoPath, 'utf8');

test('slider-scroll-vertical button has exact Webflow styles for spacing and size', () => {
  for (const [name, source] of [['main', mainSource], ['repo', repoSource]]) {
    // Check padding: 15px 17px
    assert.match(source, /\.jypesa-sust-btn[\s\S]*?padding:\s*15px 17px;/i, `[${name}] padding must be 15px 17px`);
    // Check margin: 0
    assert.match(source, /\.jypesa-sust-btn[\s\S]*?margin:\s*0;/i, `[${name}] margin must be 0`);
    // Check width: 100%
    assert.match(source, /\.jypesa-sust-btn[\s\S]*?width:\s*100%;/i, `[${name}] width must be 100%`);
    // Check height: auto
    assert.match(source, /\.jypesa-sust-btn[\s\S]*?height:\s*auto;/i, `[${name}] height must be auto`);
    // Check min-height: 40px
    assert.match(source, /\.jypesa-sust-btn[\s\S]*?min-height:\s*40px;/i, `[${name}] min-height must be 40px`);
    // Check max-height: 40px
    assert.match(source, /\.jypesa-sust-btn[\s\S]*?max-height:\s*40px;/i, `[${name}] max-height must be 40px`);
    // Check min-width: 0
    assert.match(source, /\.jypesa-sust-btn[\s\S]*?min-width:\s*0;/i, `[${name}] min-width must be 0`);
    // Check max-width: none
    assert.match(source, /\.jypesa-sust-btn[\s\S]*?max-width:\s*none;/i, `[${name}] max-width must be none`);
    // Check overflow: visible
    assert.match(source, /\.jypesa-sust-btn[\s\S]*?overflow:\s*visible;/i, `[${name}] overflow must be visible`);
  }
});
