import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readlinkSync, existsSync, symlinkSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('../scripts/deploy.sh', import.meta.url));
const sha = 'a'.repeat(40);

function fixture(t) {
  const temp = mkdtempSync(join(tmpdir(), 'portfolio-deploy-'));
  t.after(() => rmSync(temp, { recursive: true, force: true }));
  const bin = join(temp, 'bin');
  const root = join(temp, 'server');
  const website = join(temp, 'website');
  mkdirSync(bin);
  mkdirSync(root);
  mkdirSync(website);
  writeFileSync(join(website, 'index.html'), '<h1>Portfolio</h1>');
  writeFileSync(join(website, '__release.json'), JSON.stringify({ commit: sha }));
  const archive = join(temp, 'website.tar.gz');
  assert.equal(spawnSync('tar', ['-czf', archive, '-C', website, '.']).status, 0);
  const mock = `#!/usr/bin/env node
const fs = require('fs'), cp = require('child_process'), path = require('path');
const name = path.basename(process.argv[1]);
const args = process.argv.slice(2), root = process.env.TEST_SERVER;
fs.appendFileSync(process.env.TEST_CALLS, name + '\\n');
if (name === 'ssh') {
  const start = args.indexOf('--');
  const remoteArgs = args.slice(start + 1);
  remoteArgs[0] = root;
  const r = cp.spawnSync('bash', ['-s', '--', ...remoteArgs], { input: fs.readFileSync(0), env: process.env, encoding: 'utf8' });
  process.stdout.write(r.stdout || ''); process.stderr.write(r.stderr || ''); process.exit(r.status ?? 1);
} else if (name === 'scp') {
  const destination = args.at(-1).split(':')[1].replace(process.env.DEPLOY_ROOT, root);
  fs.copyFileSync(args.at(-2), destination);
} else if (name === 'curl') {
  process.stdout.write(process.env.TEST_BAD_RESPONSE === 'true' ? '{"commit":"wrong"}' : fs.readFileSync(root + '/current/__release.json'));
} else if (name !== 'sleep') process.exit(1);
`;
  for (const name of ['ssh', 'scp', 'curl', 'sleep']) writeFileSync(join(bin, name), mock, { mode: 0o700 });
  const env = {
    ...process.env,
    PATH: `${bin}:${process.env.PATH}`,
    DEPLOY_HOST: 'server.example.com', DEPLOY_USER: 'portfolio', DEPLOY_PORT: '22',
    DEPLOY_ROOT: '/var/www/portfolio-deploy-test', DEPLOY_SSH_KEY: 'test-only', DEPLOY_KNOWN_HOSTS: 'test-only',
    RELEASE_SHA: sha, RELEASE_ID: `${sha}-123-1`, RELEASE_ARCHIVE: archive,
    TEST_SERVER: root, TEST_CALLS: join(temp, 'calls'),
  };
  return { root, env, run: (overrides = {}) => spawnSync('bash', [script], { env: { ...env, ...overrides }, encoding: 'utf8' }) };
}

test('Fehlende Zugangsdaten stoppen vor jeder Verbindung', t => {
  const f = fixture(t), result = f.run({ DEPLOY_SSH_KEY: '' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /DEPLOY_SSH_KEY/);
  assert.equal(existsSync(f.env.TEST_CALLS), false);
});

test('Unsichere Serverwerte stoppen vor jeder Verbindung', t => {
  const f = fixture(t);
  for (const values of [{ DEPLOY_ROOT: '/' }, { DEPLOY_ROOT: '/var/www/../etc' }, { DEPLOY_USER: 'root' }, { DEPLOY_HOST: 'host;echo bad' }, { DEPLOY_PORT: '65536' }]) {
    assert.notEqual(f.run(values).status, 0);
  }
  assert.equal(existsSync(f.env.TEST_CALLS), false);
});

// Die echten Server-Kommandos benötigen Linux/GNU mv; GitHub führt diese Fälle aus.
test('Neue Version wird entpackt, aktiviert und öffentlich bestätigt', { skip: process.platform !== 'linux' }, t => {
  const f = fixture(t), result = f.run();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(readlinkSync(join(f.root, 'current')), join(f.root, 'releases', f.env.RELEASE_ID));
  assert.equal(existsSync(join(f.root, 'current', '__release.json')), true);
});

test('Fehlgeschlagene Online-Prüfung stellt die vorige Version wieder her', { skip: process.platform !== 'linux' }, t => {
  const f = fixture(t), old = join(f.root, 'releases', 'old');
  mkdirSync(old, { recursive: true });
  symlinkSync(old, join(f.root, 'current'));
  const result = f.run({ TEST_BAD_RESPONSE: 'true' });
  assert.notEqual(result.status, 0);
  assert.equal(readlinkSync(join(f.root, 'current')), old);
});

test('Fehlgeschlagene Erstveröffentlichung hinterlässt keinen aktiven Link', { skip: process.platform !== 'linux' }, t => {
  const f = fixture(t), result = f.run({ TEST_BAD_RESPONSE: 'true' });
  assert.notEqual(result.status, 0);
  assert.equal(existsSync(join(f.root, 'current')), false);
});

test('Vorhandenes echtes Website-Verzeichnis wird nicht überschrieben', { skip: process.platform !== 'linux' }, t => {
  const f = fixture(t);
  mkdirSync(join(f.root, 'current'));
  writeFileSync(join(f.root, 'current', 'existing.txt'), 'keep');
  const result = f.run();
  assert.notEqual(result.status, 0);
  assert.equal(existsSync(join(f.root, 'current', 'existing.txt')), true);
});
