/**
 * Compress all images in src/assets and public/images that exceed 300KB.
 * Outputs WebP at quality 75, max dimension 2400px.
 * Skips .mov and non-image files.
 * Run: node scripts/compress-images.js
 */

import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, basename } from "path";

const DIRS = ["src/assets", "public/images"];
const MAX_BYTES = 300 * 1024; // 300KB
const MAX_DIM = 2400;
const QUALITY = 75;
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".tiff", ".avif"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (IMAGE_EXTS.has(extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function compress(filePath) {
  let info;
  try {
    info = await stat(filePath);
  } catch {
    // File may have been converted to webp already in a prior run
    return false;
  }
  if (info.size <= MAX_BYTES) return false;

  const sizeBefore = (info.size / 1024).toFixed(1);
  const ext = extname(filePath).toLowerCase();
  const outPath = ext === ".webp" ? filePath : filePath.replace(ext, ".webp");

  try {
    const img = sharp(filePath).resize({ width: MAX_DIM, height: MAX_DIM, fit: "inside", withoutEnlargement: true });
    const buf = await img.webp({ quality: QUALITY }).toBuffer();

    // Only write if we actually saved space
    if (buf.length < info.size) {
      // Write to a temp file then rename to avoid Windows file-lock issues
      const tmpPath = outPath + ".tmp";
      await sharp(buf).toFile(tmpPath);
      const { rename, unlink } = await import("fs/promises");
      // If converting from non-webp, remove original after writing new file
      if (outPath !== filePath) {
        await rename(tmpPath, outPath);
        await unlink(filePath).catch(() => {});
      } else {
        await rename(tmpPath, outPath);
      }
      const sizeAfter = (buf.length / 1024).toFixed(1);
      console.log(`✓ ${basename(filePath)}: ${sizeBefore}KB → ${sizeAfter}KB`);
      return true;
    } else {
      console.log(`- ${basename(filePath)}: already optimal (${sizeBefore}KB)`);
      return false;
    }
  } catch (err) {
    console.error(`✗ ${basename(filePath)}: ${err.message}`);
    return false;
  }
}

async function main() {
  let total = 0, compressed = 0;
  for (const dir of DIRS) {
    const files = await walk(dir).catch(() => []);
    for (const file of files) {
      total++;
      if (await compress(file)) compressed++;
    }
  }
  console.log(`\nDone: ${compressed}/${total} images compressed.`);
}

main();
