const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(
  path.join(__dirname, '..', 'widgets', 'navegacion-principal', 'navegacion-principal.js'),
  'utf8'
);

function renderNav(lang) {
  const attributes = new Map([['data-lang', lang]]);
  const target = {
    innerHTML: '',
    classList: {
      contains() { return false; },
      add() {},
      remove() {}
    },
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
    }
  };

  const document = {
    body: { style: {} },
    currentScript: null,
    documentElement: { getAttribute: () => lang },
    head: { appendChild() {} },
    readyState: 'complete',
    addEventListener() {},
    createElement() {
      return { textContent: '', appendChild() {}, style: {} };
    },
    createTextNode(text) {
      return { textContent: text };
    },
    getElementsByTagName() {
      return [];
    },
    querySelectorAll() {
      return [target];
    }
  };

  const window = {
    addEventListener() {},
    location: { pathname: lang === 'en' ? '/en/home' : '/', hostname: 'jypesa.com' },
    requestAnimationFrame(cb) { cb(); },
    scrollY: 0
  };

  vm.runInNewContext(source, { document, window, console });
  return target.innerHTML;
}

test('Spanish navigation keeps original catalogs link, amenities guide and Smart Order', () => {
  const html = renderNav('es');
  assert.match(html, /href="https:\/\/jypesa\.aflip\.in\/hojas-de-venta"/);
  assert.match(html, /Catálogos descargables/);
  assert.match(html, /href="https:\/\/jypesa\.aflip\.in\/guia-amenidades-hoteleras"/);
  assert.match(html, /Guía de amenidades hoteleras/);
  assert.match(html, /href="https:\/\/sm\.jypesa\.com\/jypesa\/public\/login"/);
  assert.match(html, /Smart order/);
});

test('English navigation updates downloadable catalogs to jypesausa-sellsheets', () => {
  const html = renderNav('en');
  assert.match(html, /href="https:\/\/jypesa\.aflip\.in\/jypesausa-sellsheets"/);
  assert.match(html, /Downloadable Catalogs/);
  assert.doesNotMatch(html, /href="https:\/\/jypesa\.aflip\.in\/hojas-de-venta"/);
});

test('English navigation removes Hotel Amenities Guide from desktop and mobile', () => {
  const html = renderNav('en');
  assert.doesNotMatch(html, /Hotel Amenities Guide/i);
  assert.doesNotMatch(html, /guia-amenidades-hoteleras/i);
});

test('English navigation Shop button links directly to https://shop.jypesausa.com', () => {
  const html = renderNav('en');
  assert.match(
    html,
    /<a href="https:\/\/shop\.jypesausa\.com" class="smart-order nav-shop" target="_blank" rel="noopener noreferrer">/
  );
  assert.doesNotMatch(html, /href="https:\/\/jypesausa\.com\/shop"/);
});
