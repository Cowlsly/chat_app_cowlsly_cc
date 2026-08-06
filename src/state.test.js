import assert from 'node:assert/strict';
import test from 'node:test';

import { cleanId, escapeHtml, normaliseState } from './state.js';

test('normaliseState restores the safe starter state for corrupt input', () => {
  const state = normaliseState({ conversations: 'not-an-array' });
  assert.equal(state.activeId, 'river');
  assert.equal(state.conversations.length, 2);
});

test('normaliseState repairs invalid and duplicate conversation ids', () => {
  const state = normaliseState({
    activeId: 'duplicate',
    conversations: [
      { id: 'duplicate', name: 'One', messages: [] },
      { id: 'duplicate', name: 'Two', messages: [] },
      { id: '<bad>', name: 'Three', messages: [] },
    ],
  });

  assert.deepEqual(state.conversations.map(({ id }) => id), [
    'duplicate',
    'restored-2',
    'restored-3',
  ]);
  assert.equal(state.activeId, 'duplicate');
});

test('normaliseState trims messages, caps their length and sanitises sender roles', () => {
  const state = normaliseState({
    activeId: 'chat',
    conversations: [{
      id: 'chat',
      name: ' Demo ',
      messages: [
        { from: 'admin', text: `  ${'x'.repeat(600)}  `, time: '  Now  ' },
        { from: 'me', text: ' hello ', time: 'Then' },
        { from: 'me', text: '   ', time: 'Never' },
      ],
    }],
  });

  const [first, second] = state.conversations[0].messages;
  assert.equal(state.conversations[0].messages.length, 2);
  assert.equal(first.from, 'them');
  assert.equal(first.text.length, 500);
  assert.equal(first.time, 'Now');
  assert.deepEqual(second, { from: 'me', text: 'hello', time: 'Then' });
});

test('cleanId and escapeHtml reject unsafe identifiers and markup', () => {
  assert.equal(cleanId(' safe-id_2 '), 'safe-id_2');
  assert.equal(cleanId('../unsafe'), '');
  assert.equal(escapeHtml('<img src=x onerror="boom">'), '&lt;img src=x onerror=&quot;boom&quot;&gt;');
});
