import assert from 'node:assert/strict';
import test from 'node:test';

// Minimal extraction of the escape logic for unit testing (mirrors app.js)
function escapeHtml(value) {
  return String(value).replace(/[&<>'\"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[char]);
}

test('escapeHtml converts special characters to entities', () => {
  assert.equal(escapeHtml('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;/script&gt;');
  assert.equal(escapeHtml('a & b'), 'a &amp; b');
  assert.equal(escapeHtml('"quoted"'), '&quot;quoted&quot;');
  assert.equal(escapeHtml("it's"), 'it&#39;s');
  assert.equal(escapeHtml('plain'), 'plain');
  assert.equal(escapeHtml(''), '');
  assert.equal(escapeHtml(null), 'null');
  assert.equal(escapeHtml(undefined), 'undefined');
});

test('escapeHtml handles mixed content', () => {
  const input = '<img src=x onerror="alert(\'xss\')"> & <div>';
  const expected = '&lt;img src=x onerror=&quot;alert(&#39;xss&#39;)&quot;&gt; &amp; &lt;div&gt;';
  assert.equal(escapeHtml(input), expected);
});
