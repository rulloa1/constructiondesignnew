// Script to convert HEIC images to JPG
// Run with: node scripts/convert-heic-to-jpg.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import convert from 'heic-convert';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = 'C:\\Users\\roryu\\OneDrive\\POOL FINAL';
const outputDir = path.join(__dirname, '../src/assets/projects');

async function convertHeicToJpg() {
  console.log('🔄 Converting HEIC files to JPG...\n');

  // Get all HEIC files (case-insensitive)
  const files = fs.readdirSync(sourceDir).filter(file => 
    file.toLowerCase().endsWith('.heic')
  );

  if (files.length === 0) {
    console.log('❌ No HEIC files found');
    return;
  }

  let startNumber = 17; // Start from pool-design-17.jpg

  for (const file of files.sort()) {
    const sourcePath = path.join(sourceDir, file);
    const outputFilename = `pool-design-${startNumber}.jpg`;
    const outputPath = path.join(outputDir, outputFilename);

    try {
      console.log(`Converting ${file}...`);
      
      const inputBuffer = fs.readFileSync(sourcePath);
      const outputBuffer = await convert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 0.92
      });

      fs.writeFileSync(outputPath, outputBuffer);
      console.log(`✅ ${file} -> ${outputFilename}`);
      startNumber++;
    } catch (error) {
      console.error(`❌ Error converting ${file}:`, error.message);
    }
  }

  console.log(`\n✨ Conversion complete! ${startNumber - 17} files converted.`);
  console.log(`📁 Files created in src/assets/projects/`);
}

convertHeicToJpg();

