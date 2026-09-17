const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function runHeroWidget(lang) {
  const filePath = path.resolve(__dirname, '../widgets/hero-interactive/hero-widget.js');
  const code = fs.readFileSync(filePath, 'utf8');

  let injectedStyles = '';
  const target = {
    innerHTML: '',
    getAttribute(name) {
      if (name === 'data-lang') return lang;
      if (name === 'data-initialized') return null;
      return null;
    },
    setAttribute(name, value) {},
    querySelectorAll() {
      return [];
    },
    querySelector(sel) {
      if (sel === '.jypesa-hero-widget') {
        return {
          classList: {
            add() {}
          }
        };
      }
      return null;
    }
  };

  const document = {
    readyState: 'complete',
    createElement(tag) {
      return {
        tagName: tag,
        appendChild(child) {
          if (tag === 'style' && child && child.textContent) {
            injectedStyles += child.textContent;
          }
        }
      };
    },
    createTextNode(text) {
      return { textContent: text };
    },
    head: {
      appendChild(node) {}
    },
    documentElement: {
      getAttribute() {
        return null;
      }
    },
    querySelectorAll(selector) {
      return [target];
    },
    addEventListener() {}
  };

  const window = {
    location: {
      hostname: 'jypesa.com',
      pathname: '/'
    },
    setTimeout: (fn) => fn()
  };

  const sandbox = {
    window,
    document,
    console,
    setTimeout: (fn) => fn()
  };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);

  return { html: target.innerHTML, css: injectedStyles };
}

test('hero-widget.js renders without breadcrumbs in Spanish variant', () => {
  const { html, css } = runHeroWidget('es');

  assert.doesNotMatch(html, /jypesa-hero-breadcrumb/i);
  assert.doesNotMatch(html, /aria-label="Breadcrumb"/i);
  assert.doesNotMatch(html, />Inicio</);
  assert.doesNotMatch(html, />Nosotros</);
  assert.match(html, /jypesa-hero-sobre">Sobre</);
  assert.match(html, /De experiencia en hospitalidad/);
  assert.doesNotMatch(css, /\.jypesa-hero-breadcrumb/);
  assert.doesNotMatch(css, /\.jypesa-hero-logo-stack/);
});

test('hero-widget.js renders without breadcrumbs in English variant', () => {
  const { html, css } = runHeroWidget('en');

  assert.doesNotMatch(html, /jypesa-hero-breadcrumb/i);
  assert.doesNotMatch(html, /aria-label="Breadcrumb"/i);
  assert.doesNotMatch(html, />Home</);
  assert.doesNotMatch(html, />About Us</);
  assert.match(html, /jypesa-hero-sobre">About</);
  assert.match(html, /Hospitality Experience/);
  assert.doesNotMatch(css, /\.jypesa-hero-breadcrumb/);
  assert.doesNotMatch(css, /\.jypesa-hero-logo-stack/);
});
