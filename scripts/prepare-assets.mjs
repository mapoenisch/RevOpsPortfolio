import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = '/Users/marcpoenisch/Projekte/Jobsuche 2026';
await fs.mkdir(path.join(root, 'public/images'), { recursive: true });
await fs.mkdir(path.join(root, 'public/nachweise'), { recursive: true });
await fs.mkdir(path.join(root, 'tmp'), { recursive: true });
await sharp(path.join(source, 'output/img/marc_warm.jpg'))
  .rotate().webp({ quality: 88 }).toFile(path.join(root, 'public/images/marc-poenisch.webp'));
console.log('Porträt für die Website optimiert; Original erhalten.');
