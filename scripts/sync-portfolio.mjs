import { cp, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const sourceDirectory = resolve(scriptDirectory, '../../prototype');
const targetDirectory = resolve(scriptDirectory, '../public/portfolio');

await mkdir(targetDirectory, { recursive: true });

for (const fileName of ['index.html', 'styles.css', 'app.js', 'profile-art.svg']) {
  await cp(resolve(sourceDirectory, fileName), resolve(targetDirectory, fileName));
}

console.log(`Portfolio synced from ${sourceDirectory} to ${targetDirectory}`);
