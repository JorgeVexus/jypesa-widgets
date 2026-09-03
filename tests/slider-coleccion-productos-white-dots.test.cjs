const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const mainPath = path.join(__dirname, '..', 'widgets', 'slider-coleccion-productos', 'slider-coleccion-productos.js');
const repoPath = path.join(__dirname, '..', 'jypesa-widgets-repo', 'widgets', 'slider-coleccion-productos', 'slider-coleccion-productos.js');

const mainSource = fs.readFileSync(mainPath, 'utf8');
const repoSource = fs.readFileSync(repoPath, 'utf8');

test('slider-coleccion-productos supports white dots variant via data-color="white" or data-dots-color="white"', () => {
  for (const [name, source] of [['main', mainSource], ['repo', repoSource]]) {
    // 1. Check CSS selectors for white dots
    assert.match(
      source,
      /\[data-color="white"\]\s*\.jypesa-scol-dot/i,
      `[${name}] CSS must include [data-color="white"] .jypesa-scol-dot selector`
    );
    assert.match(
      source,
      /\[data-dots-color="white"\]\s*\.jypesa-scol-dot/i,
      `[${name}] CSS must include [data-dots-color="white"] .jypesa-scol-dot selector`
    );
    assert.match(
      source,
      /\.jypesa-scol-dots-white\s*\.jypesa-scol-dot/i,
      `[${name}] CSS must include .jypesa-scol-dots-white .jypesa-scol-dot selector`
    );

    // 2. Check inactive white dot background is white with opacity
    assert.match(
      source,
      /\.jypesa-scol-dots-white\s*\.jypesa-scol-dot[\s\S]*?background:\s*rgba\(255,\s*255,\s*255/i,
      `[${name}] inactive white dot must be white with transparency`
    );

    // 3. Check active white dot background is solid #ffffff
    assert.match(
      source,
      /\.jypesa-scol-dots-white\s*\.jypesa-scol-dot\.active[\s\S]*?background:\s*#ffffff/i,
      `[${name}] active white dot must be solid white #ffffff`
    );

    // 4. Check JS reads data-dots-color and data-color
    assert.match(
      source,
      /target\.getAttribute\('data-dots-color'\)\s*\|\|\s*target\.getAttribute\('data-dots'\)\s*\|\|\s*target\.getAttribute\('data-color'\)/i,
      `[${name}] JS must check data-dots-color, data-dots and data-color for white variant`
    );
  }
});
