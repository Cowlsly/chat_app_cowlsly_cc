import { test } from 'node:test';
import assert from 'node:assert/strict';

// Inline the escape function for unit testing (matches app.js)
function esc(s) {
  return String(s).replace(/[&<>"']/g, m => ({
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '&#39;'
  }[m]));
}

test('esc properly escapes HTML special characters', () => {
  assert.equal(esc('Hello <script>alert(1)</script> & "quotes"'), 'Hello <script>alert(1)</script> & "quotes"');
  assert.equal(esc("It's a test"), 'It&#39;s a test');
  assert.equal(esc('safe text'), 'safe text');
});

test('esc handles empty and non-string', () => {
  assert.equal(esc(''), '');
  assert.equal(esc(null), 'null');
  assert.equal(esc(undefined), 'undefined');
});
