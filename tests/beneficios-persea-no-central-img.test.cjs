const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const mainJsPath = path.join(__dirname, '..', 'widgets', 'beneficios-persea', 'beneficios-persea.js');
const repoJsPath = path.join(__dirname, '..', 'jypesa-widgets-repo', 'widgets', 'beneficios-persea', 'beneficios-persea.js');

const mainJs = fs.readFileSync(mainJsPath, 'utf8');
const repoJs = fs.readFileSync(repoJsPath, 'utf8');

test('beneficios-persea does not render central image tag when no image is loaded in CMS', () => {
  for (const [name, js] of [['mainJs', mainJs], ['repoJs', repoJs]]) {
    // Check isValidImgSrc function exists
    assert.match(js, /function isValidImgSrc\(src\)/, `[${name}] isValidImgSrc must exist`);

    // Check buildHtml only renders soapImgHtml if centralImg is valid
    assert.match(
      js,
      /var soapImgHtml = '';\s*if \(centralImg && isValidImgSrc\(centralImg\)\)/,
      `[${name}] buildHtml must only render img tag if centralImg is valid`
    );

    // Check CMS data without centralImg sets centralImg to cmsData.centralImg (which is null) instead of SOAP_IMG
    assert.match(
      js,
      /else if \(cmsData\) \{\s*\/\/[^\n]*\s*centralImg = cmsData\.centralImg;/i,
      `[${name}] must not fallback to SOAP_IMG when CMS is used without central image`
    );

    // Check onerror handler is attached to avoid broken image placeholders
    assert.match(
      js,
      /onerror="this\.style\.display=\\'none\\';"/,
      `[${name}] img must have onerror handler to hide broken image icons`
    );
  }
});
