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

test('English product collection links map correctly and only include the 10 target collections', () => {
  const englishHtml = renderNavigation('en');
  assert.doesNotMatch(englishHtml, /href="\/en\/colecciones\//);
  
  // Included in English
  assert.match(englishHtml, /href="\/en\/standar\/elements"/);
  assert.match(englishHtml, /href="\/en\/standar\/tea-leaf"/);
  assert.match(englishHtml, /href="\/en\/standar\/rain-forest"/);
  assert.match(englishHtml, /href="\/en\/standar\/almond-olive"/);
  assert.match(englishHtml, /href="\/en\/superior\/cava"/);
  assert.match(englishHtml, /href="\/en\/superior\/biogena"/);
  assert.match(englishHtml, /href="\/en\/superior\/lavarino-cosso"/);
  assert.match(englishHtml, /href="\/en\/premium\/vervan"/);
  assert.match(englishHtml, /href="\/en\/premium\/persea"/);
  assert.match(englishHtml, /href="\/en\/premium\/agavia"/);
  assert.match(englishHtml, /href="\/en\/premium\/valquer"/);

  // Dispensers and Accessories included in English
  assert.match(englishHtml, /href="\/en\/sistemas-de-dispensacion#soportes"/);
  assert.match(englishHtml, /href="\/en\/sistemas-de-dispensacion#sistemas"/);
  assert.match(englishHtml, /href="\/en\/accesorios#lavarino"/);
  assert.match(englishHtml, /href="\/en\/accesorios"/);

  // Excluded in English
  assert.doesNotMatch(englishHtml, /href="\/en\/superior\/dove"/);
  assert.doesNotMatch(englishHtml, /href="\/en\/superior\/tresseme"/);
  assert.doesNotMatch(englishHtml, /href="\/en\/premium\/hawaiian-tropic"/);
  assert.doesNotMatch(englishHtml, /href="\/en\/premium\/for-all-folks"/);
  assert.doesNotMatch(englishHtml, /href="\/en\/premium\/botanicus"/);
  assert.doesNotMatch(englishHtml, /href="\/en\/premium\/botanicaromatica"/);
  assert.doesNotMatch(englishHtml, /href="\/en\/luxury\/xinu"/);
});

test('English Sustainability links use /en/sustainability and preserve section hashes', () => {
  const englishHtml = renderNavigation('en');
  const spanishHtml = renderNavigation('es');

  assert.match(englishHtml, /href="\/en\/sustainability" class="nav-link">Sustainability<\/a>/);
  assert.match(englishHtml, /href="\/en\/sustainability#materiales"/);
  assert.match(englishHtml, /href="\/en\/sustainability#certificaciones"/);
  assert.doesNotMatch(englishHtml, /href="\/en\/sustentabilidad/);
  assert.match(spanishHtml, /href="\/sustentabilidad" class="nav-link">Sustentabilidad<\/a>/);
});

test('Smart Order is rendered in Spanish desktop navigation only, and Shop is rendered in English desktop only', () => {
  const spanishHtml = renderNavigation('es');
  const englishHtml = renderNavigation('en');
  
  const navActionsStartEs = spanishHtml.indexOf('<div class="nav-actions">');
  const mobileOverlayStartEs = spanishHtml.indexOf('<div class="mobile-overlay"');
  const spanishDesktopActions = spanishHtml.slice(navActionsStartEs, mobileOverlayStartEs);
  const spanishMobileOverlay = spanishHtml.slice(mobileOverlayStartEs);
  
  const smartOrderAnchor = spanishDesktopActions.match(
    /<a href="https:\/\/sm\.jypesa\.com\/jypesa\/public\/login" class="smart-order" target="_blank" rel="noopener noreferrer">([\s\S]*?)<\/a>/
  );

  assert.notEqual(navActionsStartEs, -1);
  assert.notEqual(mobileOverlayStartEs, -1);
  assert.ok(smartOrderAnchor, 'Spanish nav-actions must contain the complete Smart Order link');
  assert.match(smartOrderAnchor[1], /<svg\b[^>]*>[\s\S]*?<\/svg>/);
  assert.match(smartOrderAnchor[1], /<path\b[^>]*><\/path>/);
  assert.match(smartOrderAnchor[1], /<circle\b[^>]*><\/circle>/);
  assert.match(smartOrderAnchor[1], /\sSmart order\s/);
  assert.doesNotMatch(spanishMobileOverlay, /smart-order|sm\.jypesa\.com|Smart order/i);
  assert.doesNotMatch(spanishDesktopActions, /\bShop\b/);

  // English desktop actions
  const navActionsStartEn = englishHtml.indexOf('<div class="nav-actions">');
  const mobileOverlayStartEn = englishHtml.indexOf('<div class="mobile-overlay"');
  const englishDesktopActions = englishHtml.slice(navActionsStartEn, mobileOverlayStartEn);
  const englishMobileOverlay = englishHtml.slice(mobileOverlayStartEn);

  const shopAnchor = englishDesktopActions.match(
    /<a href="\/en\/shop" class="smart-order nav-shop" target="_blank" rel="noopener noreferrer">([\s\S]*?)<\/a>/
  );
  assert.ok(shopAnchor, 'English nav-actions must contain the Shop link');
  assert.match(shopAnchor[1], /<svg\b[^>]*>[\s\S]*?<\/svg>/);
  assert.match(shopAnchor[1], /\sShop\s/);
  assert.doesNotMatch(englishHtml, /sm\.jypesa\.com|Smart order|Smart Order/);
  assert.doesNotMatch(englishMobileOverlay, /\bShop\b/);
});
