import { mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const root = fileURLToPath(new URL('..', import.meta.url));
const project = path.join(root, 'examples', 'demo', '_mintfolio');

/**
 * Run a local tool without shell interpolation.
 * @param {string[]} args Node/npm arguments, including the executable JS entry.
 * @param {string} cwd Explicit project directory.
 * @param {boolean} capture Whether stdout contains machine-readable pack metadata.
 * @returns {Promise<string>} Captured stdout; rejects on a nonzero child exit.
 */
function run(args, cwd, capture = false) {
  // npm 12 exports allow-scripts to lifecycle children, but rejects it when a
  // nested project install consumes that env option. These npm calls already
  // use --ignore-scripts; dropping the inherited option does not enable scripts.
  const env = { ...process.env };
  if (args[0] === process.env.npm_execpath) {
    for (const key of Object.keys(env)) {
      if (key.toLowerCase() === 'npm_config_allow_scripts') delete env[key];
    }
  }
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd, env, shell: false, windowsHide: true,
      stdio: ['inherit', capture ? 'pipe' : 'inherit', 'inherit'],
    });
    let output = '';
    if (capture) child.stdout.setEncoding('utf8').on('data', (chunk) => { output += chunk; });
    const interrupt = () => child.kill('SIGINT');
    process.once('SIGINT', interrupt);
    child.once('error', (error) => { process.removeListener('SIGINT', interrupt); reject(error); });
    child.once('exit', (code) => {
      process.removeListener('SIGINT', interrupt);
      if (code === 0) resolve(output);
      else reject(new Error('Demo command failed: exit ' + code));
    });
  });
}

/** setup installs a freshly packed theme; dev/build/preview run the demo's Core CLI. */
async function main() {
  const command = process.argv[2];
  if (command === 'setup') {
    const npm = process.env.npm_execpath;
    if (!npm?.endsWith('npm-cli.js')) throw new Error('Run this through npm run demo:setup.');
    const packages = path.join(project, '.packages');
    await mkdir(packages, { recursive: true });
    const output = await run([npm, 'pack', '--ignore-scripts', '--json', '--pack-destination', packages], root, true);
    const packed = JSON.parse(output)[0];
    if (!packed?.filename || path.basename(packed.filename) !== packed.filename) throw new Error('Unexpected npm pack result.');
    await run([npm, 'install', '--ignore-scripts', '--no-audit', '--no-fund', './.packages/' + packed.filename], project);
    console.log('Demo installed. Run npm run demo. Re-run demo:setup after changing theme source.');
    return;
  }
  if (!['dev', 'build', 'preview'].includes(command)) {
    throw new Error('Use npm run demo:setup, demo, demo:build or demo:preview.');
  }
  const cli = path.join(project, 'node_modules', '@mintfolio', 'core', 'bin', 'mintfolio.mjs');
  await access(cli).catch(() => { throw new Error('Run npm run demo:setup first.'); });
  const args = command === 'build' ? [command] : [command, '--port', '4370', '--host', '127.0.0.1'];
  await run([cli, ...args, ...process.argv.slice(3)], project);
}
await main();
