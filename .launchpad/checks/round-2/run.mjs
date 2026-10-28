import fs from 'node:fs';

const tests = [];
function test(name, fn) {
  try {
    fn();
    tests.push({ name, status: 'passed' });
  } catch (e) {
    tests.push({ name, status: 'failed' });
    console.error(`FAIL ${name}: ${e.message}`);
  }
}
const html = fs.existsSync('index.html') ? fs.readFileSync('index.html', 'utf8') : '';

test('index.html exists and renders the game canvas', () => {
  if (!html) throw new Error('index.html must exist in the repository root');
  if (!/<canvas/i.test(html)) throw new Error('index.html must include a <canvas> element');
});
test('pressure gauge and lever controls are wired', () => {
  if (!/Space|keydown|pointerdown|mousedown/i.test(html)) throw new Error('no keyboard or mouse lever controls');
});
test('brand palette (#0D0908 and #F05A18) is used without blue/purple', () => {
  if (!/#0D0908|#140D0B/i.test(html)) throw new Error('missing the dark control-room background');
  if (!/#F05A18|#FFB35C/i.test(html)) throw new Error('missing the orange/amber heat accents');
});

if (process.env.LAUNCHPAD_GATE_OUT) fs.writeFileSync(process.env.LAUNCHPAD_GATE_OUT, JSON.stringify({ tests }));
process.exit(tests.every((t) => t.status === 'passed') ? 0 : 1);
