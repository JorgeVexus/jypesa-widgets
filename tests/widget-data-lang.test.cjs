const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function renderWidget(file, targetId, lang) {
  const target = {
    innerHTML: '',
    getAttribute(name) {
      return name === 'data-lang' ? lang ?? null : null;
    },
    querySelectorAll() {
      return [];
    },
    querySelector() {
      return null;
    }
  };

  const document = {
    readyState: 'complete',
    currentScript: { src: `https://example.test/${path.basename(file)}` },
    head: {
      appendChild(node) {
        if (node.onload) node.onload();
      }
    },
    createElement(tag) {
      return {
        tagName: tag,
        style: {},
        setAttribute() {},
        appendChild() {}
      };
    },
    getElementById(id) {
      return id === targetId ? target : null;
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    addEventListener() {}
  };

  const context = {
    window: { matchMedia: () => ({ matches: true }) },
    document,
    console,
    setTimeout(fn) {
      fn();
    },
    clearTimeout() {},
    Image: function Image() {}
  };
  context.window.window = context.window;
  context.window.document = document;

  vm.runInNewContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
  return target.innerHTML;
}

const ROOT = path.resolve(__dirname, '..');
const widgets = [
  {
    file: 'widgets/hero-soluciones/hero-soluciones.js',
    id: 'jypesa-hero-soluciones-widget',
    es: 'Creamos productos',
    en: 'We create products',
    forbidden: ['a la medida', 'de tu marca', 'Desarrollamos amenidades', 'Desarrollar mi proyecto', 'Contactar a un asesor']
  },
  {
    file: 'widgets/proceso/proceso-widget.js',
    id: 'jypesa-proceso-widget',
    es: 'De la idea a la',
    en: 'From idea to',
    forbidden: ['Nuestro proceso', 'Metodología clara', 'Brief técnico', 'Análisis de viabilidad', 'Producción piloto']
  },
  {
    file: 'widgets/sustentabilidad/sustentabilidad-widget.js',
    id: 'jypesa-sustentabilidad-widget',
    es: 'Un solo proceso',
    en: 'One process',
    forbidden: ['múltiples soluciones', 'Desarrollo de fórmula', 'Desde cero', 'Innovación aplicada', 'Alternativas sostenibles']
  }
];

for (const widget of widgets) {
  const file = path.join(ROOT, widget.file);

  test(`${widget.file} renders English for data-lang=en`, () => {
    const html = renderWidget(file, widget.id, 'en');
    assert.match(html, new RegExp(widget.en));
    assert.doesNotMatch(html, new RegExp(widget.es));
  });

  test(`${widget.file} defaults to Spanish`, () => {
    assert.match(renderWidget(file, widget.id), new RegExp(widget.es));
  });

  test(`${widget.file} falls back to Spanish for unsupported languages`, () => {
    assert.match(renderWidget(file, widget.id, 'fr'), new RegExp(widget.es));
  });

  test(`${widget.file} removes visible Spanish copy in English mode`, () => {
    const visibleText = renderWidget(file, widget.id, 'en')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ');

    for (const phrase of widget.forbidden) {
      assert.doesNotMatch(visibleText, new RegExp(phrase));
    }
  });
}
