const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function renderCardsWidget(lang, scriptSrc = 'https://jypesa-widgets.vercel.app/widgets/cards/cards-widget.js') {
  const filePath = path.resolve(__dirname, '../widgets/cards/cards-widget.js');
  const code = fs.readFileSync(filePath, 'utf8');

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
    querySelector() {
      return null;
    }
  };

  const document = {
    readyState: 'complete',
    currentScript: { src: scriptSrc },
    getElementsByTagName(tag) {
      return [{ src: scriptSrc }];
    },
    createElement(tag) {
      return {
        tagName: tag,
        appendChild(child) {}
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
      hostname: 'jypesa-widgets.vercel.app',
      pathname: '/'
    }
  };

  const sandbox = {
    window,
    document,
    console
  };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);

  return target.innerHTML;
}

test('cards-widget.js keeps original image for Licencias in Spanish', () => {
  const html = renderCardsWidget('es');
  assert.match(html, /<h3 class="jypesa-card-title">Licencias<\/h3>/);
  assert.match(html, /src="https:\/\/cdn\.prod\.website-files\.com\/69d7c3721733f0f4aaa00b42\/69fa4c51ab013c1db7e3825f_Product-Image\.png"/);
  assert.doesNotMatch(html, /Img-per\.webp/);
});

test('cards-widget.js uses Img-per.webp for Licenses in English', () => {
  const html = renderCardsWidget('en');
  assert.match(html, /<h3 class="jypesa-card-title">Licenses<\/h3>/);
  assert.match(html, /src="https:\/\/jypesa-widgets\.vercel\.app\/assets\/images-widgets\/Img-per\.webp"/);
  assert.doesNotMatch(html, /69fa4c51ab013c1db7e3825f_Product-Image\.png/);
});

test('cards-widget.js resolves relative path locally', () => {
  const html = renderCardsWidget('en', './widgets/cards/cards-widget.js');
  assert.match(html, /src="\.\/assets\/images-widgets\/Img-per\.webp"/);
});
