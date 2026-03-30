import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ASSETS_DIR = path.resolve(__dirname, '../public/assets');
const EXTENSIONS = ['.jpg', '.jpeg', '.png'];
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 80;

async function convertDir(dir: string): Promise<void> {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await convertDir(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!EXTENSIONS.includes(ext)) continue;

    const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

    // Skip if webp already exists and is newer than the source
    if (fs.existsSync(webpPath)) {
      const srcStat = fs.statSync(fullPath);
      const webpStat = fs.statSync(webpPath);
      if (webpStat.mtimeMs >= srcStat.mtimeMs) {
        console.log(`  SKIP  ${path.relative(ASSETS_DIR, webpPath)}`);
        continue;
      }
    }

    try {
      const image = sharp(fullPath);
      const metadata = await image.metadata();

      let pipeline = image;
      // Resize if wider than MAX_WIDTH, keeping aspect ratio
      if (metadata.width && metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      }

      await pipeline.webp({ quality: WEBP_QUALITY }).toFile(webpPath);

      const srcSize = fs.statSync(fullPath).size;
      const webpSize = fs.statSync(webpPath).size;
      const saved = ((1 - webpSize / srcSize) * 100).toFixed(1);

      console.log(
        `  CONV  ${path.relative(ASSETS_DIR, fullPath)} -> .webp  (${formatSize(srcSize)} -> ${formatSize(webpSize)}, -${saved}%)`
      );
    } catch (err) {
      console.error(`  FAIL  ${path.relative(ASSETS_DIR, fullPath)}: ${err}`);
    }
  }
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

async function main() {
  console.log(`Converting images in ${ASSETS_DIR} to WebP...`);
  console.log(`  Max width: ${MAX_WIDTH}px | Quality: ${WEBP_QUALITY}`);
  console.log('');
  await convertDir(ASSETS_DIR);
  console.log('\nDone!');
}

main().catch(console.error);
