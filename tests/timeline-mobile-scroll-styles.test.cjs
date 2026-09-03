const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const mainJsPath = path.join(__dirname, '..', 'widgets', 'timeline', 'timeline-widget.js');
const repoJsPath = path.join(__dirname, '..', 'jypesa-widgets-repo', 'widgets', 'timeline', 'timeline-widget.js');
const mainCssPath = path.join(__dirname, '..', 'widgets', 'timeline', 'timeline-widget.css');
const repoCssPath = path.join(__dirname, '..', 'jypesa-widgets-repo', 'widgets', 'timeline', 'timeline-widget.css');

const mainJs = fs.readFileSync(mainJsPath, 'utf8');
const repoJs = fs.readFileSync(repoJsPath, 'utf8');
const mainCss = fs.readFileSync(mainCssPath, 'utf8');
const repoCss = fs.readFileSync(repoCssPath, 'utf8');

test('timeline CSS removes text border-left on mobile to prevent double lines', () => {
  for (const [name, css] of [['mainJs', mainJs], ['repoJs', repoJs], ['mainCss', mainCss], ['repoCss', repoCss]]) {
    // Check that inside mobile media query, timeline-body has border-left: none !important and padding-left: 0 !important
    assert.match(
      css,
      /\.timeline-body\s*\{[^}]*border-left:\s*none\s*!important/i,
      `[${name}] mobile timeline-body must have border-left: none !important`
    );
    assert.match(
      css,
      /\.timeline-body\s*\{[^}]*padding-left:\s*0\s*!important/i,
      `[${name}] mobile timeline-body must have padding-left: 0 !important`
    );
    // Check active and visited states also do not have border-left
    assert.match(
      css,
      /\.timeline-item\.active\s+\.timeline-body[^{]*\{[^}]*border-left:\s*none\s*!important/i,
      `[${name}] active mobile timeline-body must have border-left: none !important`
    );
  }
});

test('timeline JS implements fluid mobile scroll activation and disables mobile autoplay', () => {
  for (const [name, js] of [['mainJs', mainJs], ['repoJs', repoJs]]) {
    // Autoplay only on desktop
    assert.match(js, /if\s*\(isMobile\(\)\)\s*return;/i, `[${name}] autoplay must be skipped on mobile`);
    // updateMobileScroll function exists
    assert.match(js, /function\s+updateMobileScroll\(\)/i, `[${name}] updateMobileScroll function must exist`);
    // requestAnimationFrame scroll handling
    assert.match(js, /requestAnimationFrame\(\(\)\s*=>\s*\{\s*updateMobileScroll\(\)/i, `[${name}] must use requestAnimationFrame on scroll`);
    // Passive scroll listener
    assert.match(js, /window\.addEventListener\('scroll',\s*onScrollMobile,\s*\{\s*passive:\s*true\s*\}\)/i, `[${name}] must attach passive scroll listener`);
  }
});
