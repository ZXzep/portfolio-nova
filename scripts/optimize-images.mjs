// One-off: downscale + recompress oversized source images under public/.
// The originals also live in ../my-portfolio, so this is safe to re-run.
// Run: npm run opt:images
import sharp from 'sharp';
import { readdirSync, statSync, writeFileSync, renameSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOTS = ['public/case-studies', 'public/work'];
const MAX_W = 1800; // plenty for the lightbox; gallery shows <=600px
const RESIZE_OVER = 2200; // only resize genuinely oversized sources
const RASTER = /\.(png|jpe?g)$/i;

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (RASTER.test(name)) out.push(full);
  }
  return out;
}

let before = 0, after = 0, touched = 0;
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const sizeBefore = statSync(file).size;
    const img = sharp(file, { failOn: 'none' });
    const meta = await img.metadata();
    const isPng = /\.png$/i.test(file);
    let pipe = img.rotate();
    if ((meta.width ?? 0) > RESIZE_OVER) pipe = pipe.resize({ width: MAX_W, withoutEnlargement: true });
    // High-quality dithered quantization (same tech as pngquant / TinyPNG) — at
    // q90 it is visually indistinguishable, and next/image re-encodes to tuned
    // WebP at request time anyway.
    pipe = isPng
      ? pipe.png({ palette: true, quality: 90, dither: 1, compressionLevel: 9, effort: 10 })
      : pipe.jpeg({ quality: 88, mozjpeg: true });
    const buf = await pipe.toBuffer();

    before += sizeBefore;
    if (buf.length < sizeBefore * 0.95) {
      const tmp = file + '.tmp';
      writeFileSync(tmp, buf);
      renameSync(tmp, file);
      after += buf.length;
      touched++;
      console.log(`${relative('.', file)}  ${(sizeBefore / 1024).toFixed(0)}KB -> ${(buf.length / 1024).toFixed(0)}KB`);
    } else {
      after += sizeBefore;
    }
  }
}
console.log(`\n${touched} files rewritten · ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`);
