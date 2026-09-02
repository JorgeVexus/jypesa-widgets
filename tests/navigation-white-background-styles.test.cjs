const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const srcPath = path.join(__dirname, '..', 'widgets', 'navegacion-principal', 'navegacion-principal.js');
const repoSrcPath = path.join(__dirname, '..', 'jypesa-widgets-repo', 'widgets', 'navegacion-principal', 'navegacion-principal.js');

const source = fs.readFileSync(srcPath, 'utf8');
const repoSource = fs.readFileSync(repoSrcPath, 'utf8');

test('CSS rules ensure logo is blue (#506D85) on scrolled, light variant, and menu-open', () => {
  for (const [name, code] of [['main', source], ['repo', repoSource]]) {
    assert.match(
      code,
      /\.jypesa-nav\.scrolled \.logo[\s\S]*?color:\s*#506D85/i,
      `[${name}] scrolled logo must be #506D85`
    );
    assert.match(
      code,
      /\.jypesa-nav\.jypesa-nav-light \.logo[\s\S]*?color:\s*#506D85/i,
      `[${name}] jypesa-nav-light logo must be #506D85`
    );
    assert.match(
      code,
      /\.jypesa-nav\.menu-open \.logo[\s\S]*?color:\s*#506D85/i,
      `[${name}] menu-open logo must be #506D85`
    );
  }
});

test('CSS rules ensure hamburger menu is blue (#506D85) on scrolled, light variant, menu-open, and active', () => {
  for (const [name, code] of [['main', source], ['repo', repoSource]]) {
    assert.match(
      code,
      /\.jypesa-nav\.scrolled \.hamburger span[\s\S]*?background:\s*#506D85/i,
      `[${name}] scrolled hamburger span must be #506D85`
    );
    assert.match(
      code,
      /\.jypesa-nav\.jypesa-nav-light \.hamburger span[\s\S]*?background:\s*#506D85/i,
      `[${name}] jypesa-nav-light hamburger span must be #506D85`
    );
    assert.match(
      code,
      /\.jypesa-nav\.menu-open \.hamburger span[\s\S]*?background:\s*#506D85/i,
      `[${name}] menu-open hamburger span must be #506D85`
    );
    assert.match(
      code,
      /\.hamburger\.active span[\s\S]*?background:\s*#506D85/i,
      `[${name}] active hamburger span must be #506D85`
    );
  }
});

test('CSS rules ensure background is white on scrolled, light variant, and menu-open', () => {
  for (const [name, code] of [['main', source], ['repo', repoSource]]) {
    assert.match(
      code,
      /\.jypesa-nav\.menu-open\s*\{[\s\S]*?background:\s*#ffffff/i,
      `[${name}] menu-open background must be white`
    );
  }
});

test('Color variant initialization supports data-color, data-variant, data-theme and data-header-color', () => {
  for (const [name, code] of [['main', source], ['repo', repoSource]]) {
    assert.match(code, /target\.getAttribute\('data-color'\)/);
    assert.match(code, /target\.getAttribute\('data-variant'\)/);
    assert.match(code, /target\.getAttribute\('data-theme'\)/);
  }
});
