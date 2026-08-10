const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(
  path.join(__dirname, '..', 'widgets', 'navegacion-principal', 'navegacion-principal.js'),
  'utf8'
);

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
