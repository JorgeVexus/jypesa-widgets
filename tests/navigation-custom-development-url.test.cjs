const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(
  path.join(__dirname, '..', 'widgets', 'navegacion-principal', 'navegacion-principal.js'),
  'utf8'
);

function renderNavigation(lang) {
  const attributes = new Map([['data-lang', lang]]);
  const target = {
    innerHTML: '',
    getAttribute(name) {
      return attributes.get(name) || null;
    },
    setAttribute(name, value) {
      attributes.set(name, value);
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
  };
  const document = {
    body: { style: {} },
    currentScript: null,
    documentElement: { getAttribute: () => lang },
    head: { appendChild() {} },
    readyState: 'complete',
    addEventListener() {},
    createElement() {
      return { textContent: '' };
    },
    getElementsByTagName() {
      return [];
    },
    querySelectorAll() {
      return [target];
    },
  };
  const window = {
    addEventListener() {},
    location: { pathname: lang === 'en' ? '/en/home' : '/' },
    requestAnimationFrame(callback) {
      callback();
    },
    scrollY: 0,
  };

  vm.runInNewContext(source, { document, window });
  return target.innerHTML;
}

test('English navigation maps Custom Development to its published English URL', () => {
  assert.match(
    source,
    /if \(base === '\/desarollo-personalizado'\) return '\/en\/custom-development'/
  );
});

test('desktop and mobile Custom Development links use the shared URL resolver', () => {
  const matches = source.match(/href="\$\{u\('\/desarollo-personalizado'\)\}"/g) || [];
  assert.equal(matches.length, 2);
});

test('English Elements links use /en/standar/elements on desktop and mobile', () => {
  const englishHtml = renderNavigation('en');
  const links = [...englishHtml.matchAll(/href="([^"]+)"[^>]*>Elements<\/a>/g)].map(
    (match) => match[1]
  );

  assert.deepEqual(links, ['/en/standar/elements', '/en/standar/elements']);
  assert.doesNotMatch(englishHtml, /href="\/en\/colecciones\/estandar\/elements"/);
});

test('Smart Order is rendered in Spanish desktop navigation only', () => {
  const spanishHtml = renderNavigation('es');
  const englishHtml = renderNavigation('en');
  const navActionsStart = spanishHtml.indexOf('<div class="nav-actions">');
  const mobileOverlayStart = spanishHtml.indexOf('<div class="mobile-overlay"');
  const spanishDesktopActions = spanishHtml.slice(navActionsStart, mobileOverlayStart);
  const spanishMobileOverlay = spanishHtml.slice(mobileOverlayStart);
  const smartOrderAnchor = spanishDesktopActions.match(
    /<a href="https:\/\/sm\.jypesa\.com\/jypesa\/public\/login" class="smart-order" target="_blank" rel="noopener noreferrer">([\s\S]*?)<\/a>/
  );

  assert.notEqual(navActionsStart, -1);
  assert.notEqual(mobileOverlayStart, -1);
  assert.ok(smartOrderAnchor, 'Spanish nav-actions must contain the complete Smart Order link');
  assert.match(smartOrderAnchor[1], /<svg\b[^>]*>[\s\S]*?<\/svg>/);
  assert.match(smartOrderAnchor[1], /<path\b[^>]*><\/path>/);
  assert.match(smartOrderAnchor[1], /<circle\b[^>]*><\/circle>/);
  assert.match(smartOrderAnchor[1], /\sSmart order\s/);
  assert.doesNotMatch(spanishMobileOverlay, /smart-order|sm\.jypesa\.com|Smart order/i);
  assert.doesNotMatch(englishHtml, /smart-order|sm\.jypesa\.com|Smart Order/i);
});
