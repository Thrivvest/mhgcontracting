import sharp from "sharp";
import { readdir, stat, rename, unlink } from "fs/promises";
import { join, extname, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "public", "images") + "/";
const MAX_WIDTH = 2400;
const QUALITY = 82;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

const files = (await walk(ROOT)).filter((f) =>
  [".jpg", ".jpeg"].includes(extname(f).toLowerCase())
);

let before = 0;
let after = 0;
let count = 0;

for (const file of files) {
  const s = await stat(file);
  before += s.size;

  const tmp = file + ".tmp";
  try {
    await sharp(file)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
      .toFile(tmp);

    const n = await stat(tmp);
    if (n.size < s.size) {
      await rename(tmp, file);
      after += n.size;
      count++;
      console.log(
        `${file.replace(ROOT, "")}: ${(s.size / 1024).toFixed(0)}KB -> ${(n.size / 1024).toFixed(0)}KB`
      );
    } else {
      await unlink(tmp);
      after += s.size;
    }
  } catch (err) {
    console.error(`FAIL ${file}: ${err.message}`);
    try { await unlink(tmp); } catch {}
    after += s.size;
  }
}

console.log(`\nOptimized ${count}/${files.length} files`);
console.log(`Before: ${(before / 1024 / 1024).toFixed(1)} MB`);
console.log(`After:  ${(after / 1024 / 1024).toFixed(1)} MB`);
console.log(`Saved:  ${((before - after) / 1024 / 1024).toFixed(1)} MB (${(((before - after) / before) * 100).toFixed(1)}%)`);
