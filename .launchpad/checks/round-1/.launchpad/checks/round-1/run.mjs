import fs from 'node:fs';
import assert from 'node:assert/strict';

assert.ok(fs.existsSync('index.html'), 'index.html must exist in the repository root');
const html = fs.readFileSync('index.html', 'utf8');

assert.match(html, /<canvas/i, 'index.html must include a <canvas> element for the game');
assert.match(html, /#0D0908|#140D0B/i, 'Game must use the Hotpod dark control-room background');
assert.match(html, /#F05A18|#FFB35C/i, 'Game must use Hotpod orange/amber heat accents');
assert.match(html, /Space|keydown|pointerdown|mousedown/i, 'Game must handle keyboard or mouse lever controls');

console.log('PASS: All Round 1 checks passed.');
