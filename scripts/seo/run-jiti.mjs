import path from 'node:path';
import { createJiti } from 'jiti';

const [target, ...rest] = process.argv.slice(2);

if (!target) {
  console.error('Usage: node scripts/seo/run-jiti.mjs <script-path> [args...]');
  process.exit(1);
}

const resolvedTarget = path.resolve(target);
process.argv = [process.argv[0], resolvedTarget, ...rest];

const jiti = createJiti(import.meta.url, {
  interopDefault: true,
});

jiti.import(resolvedTarget).catch((err) => {
  console.error(err);
  process.exit(1);
});
