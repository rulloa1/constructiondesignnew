import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsDir = path.join(__dirname, '../src/assets/projects');
const assetsDir = path.join(__dirname, '../src/assets');

// Mapping of loose files to their target project folders
const fileMappings = {
  // Development project images
  'development-aerial-after.jpg': 'development',
  'development-aerial-before.jpg': 'development',
  'development-construction-1.jpg': 'development',
  'development-construction-2.jpg': 'development',
  'development-entrance-1.jpg': 'development',
  'development-entrance-2.jpg': 'development',
  'development-plan.jpg': 'development',
  'development-site.jpg': 'development',
  'development-trail.jpg': 'development',
  
  // Carmel Valley images (old ones - should go to carmel-valley-design-build)
  'carmel-valley-cover.jpg': 'carmel-valley-design-build',
  'carmel-valley-1.jpg': 'carmel-valley-design-build',
  'carmel-valley-2.jpg': 'carmel-valley-design-build',
  'carmel-valley-3.jpg': 'carmel-valley-design-build',
  'carmel-valley-4.jpg': 'carmel-valley-design-build',
  
  // Carmel-3 images - need to identify project
  // These appear to be unused based on imports, but let's move them to a folder
  // They might be for a project that's not in the current list
  
  // Hillside images - these might be for a different project than hillside-cleanup
  // Let's check if they're used
  
  // LDS images - need to identify project
  // These appear to be unused based on imports
  
  // IMGP and numbered images - need to identify project
  // These appear to be unused based on imports
  
  // Other loose files
  'abaco-development-1.jpg': 'bahamas-abaco-development',
  'bakers-bay-1.jpg': 'bahamas-abaco-development',
  'bakers-bay-2.jpg': 'bahamas-abaco-development',
  'carmel-1-cover.jpg': 'carmel-house-2',
  'hospitality-pool-1.jpg': 'hospitality-pool',
  
  // Laguna images (old versions - move to laguna-grande-design-build)
  'laguna-cover.jpg': 'laguna-grande-design-build',
  'laguna-1.jpg': 'laguna-grande-design-build',
  'laguna-2.jpg': 'laguna-grande-design-build',
  'laguna-3.jpg': 'laguna-grande-design-build',
  'laguna-4.jpg': 'laguna-grande-design-build',
  'laguna-5.jpg': 'laguna-grande-design-build',
  'laguna-6.jpg': 'laguna-grande-design-build',
  
  // Carmel-3 images (appear unused but organize them)
  'carmel-3-cover-new.jpg': 'carmel-house-2',
  'carmel-3-1.jpg': 'carmel-house-2',
  'carmel-3-2.jpg': 'carmel-house-2',
  'carmel-3-3.jpg': 'carmel-house-2',
  'carmel-3-4.jpg': 'carmel-house-2',
  'carmel-3-5.jpg': 'carmel-house-2',
  'carmel-3-6.jpg': 'carmel-house-2',
  'carmel-3-7.jpg': 'carmel-house-2',
  'carmel-3-8.jpg': 'carmel-house-2',
  'carmel-3-9.jpg': 'carmel-house-2',
  'carmel-3-10.jpg': 'carmel-house-2',
  'carmel-3-11.jpg': 'carmel-house-2',
  'carmel-3-12.jpg': 'carmel-house-2',
  'carmel-3-13.jpg': 'carmel-house-2',
  'carmel-3-14.jpg': 'carmel-house-2',
  'carmel-3-15.jpg': 'carmel-house-2',
  'carmel-3-16.jpg': 'carmel-house-2',
  'carmel-3-17.jpg': 'carmel-house-2',
  'carmel-3-18.jpg': 'carmel-house-2',
  'carmel-3-19.jpg': 'carmel-house-2',
  'carmel-3-20.jpg': 'carmel-house-2',
  'carmel-3-21.jpg': 'carmel-house-2',
  'carmel-3-22.jpg': 'carmel-house-2',
  'carmel-3-23.jpg': 'carmel-house-2',
  'carmel-3-24.jpg': 'carmel-house-2',
  'carmel-3-25.jpg': 'carmel-house-2',
  
  // Hillside images (appear unused - move to hillside-cleanup for organization)
  'hillside-cover.jpg': 'hillside-cleanup',
  'hillside-1.jpg': 'hillside-cleanup',
  'hillside-2.jpg': 'hillside-cleanup',
  'hillside-3.jpg': 'hillside-cleanup',
  'hillside-4.jpg': 'hillside-cleanup',
  'hillside-5.jpg': 'hillside-cleanup',
  'hillside-6.jpg': 'hillside-cleanup',
  'hillside-7.jpg': 'hillside-cleanup',
};

// Files that should be moved to src/assets (not projects)
const assetsFiles = {
  'vero-beach-cover.jpeg': true,
};

console.log('Starting organization of remaining loose files...');

// Move files to project folders
Object.entries(fileMappings).forEach(([fileName, folderName]) => {
  const sourcePath = path.join(projectsDir, fileName);
  const targetDir = path.join(projectsDir, folderName);
  const targetPath = path.join(targetDir, fileName);
  
  if (fs.existsSync(sourcePath) && !fs.existsSync(targetPath)) {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log(`Created folder: ${folderName}`);
    }
    fs.renameSync(sourcePath, targetPath);
    console.log(`Moved: ${fileName} -> ${folderName}/`);
  } else if (!fs.existsSync(sourcePath)) {
    console.log(`File not found: ${fileName}`);
  } else if (fs.existsSync(targetPath)) {
    console.log(`File already exists in target: ${fileName}`);
  }
});

// Move files to assets directory
Object.keys(assetsFiles).forEach((fileName) => {
  const sourcePath = path.join(projectsDir, fileName);
  const targetPath = path.join(assetsDir, fileName);
  
  if (fs.existsSync(sourcePath) && !fs.existsSync(targetPath)) {
    fs.renameSync(sourcePath, targetPath);
    console.log(`Moved to assets: ${fileName}`);
  } else if (!fs.existsSync(sourcePath)) {
    // Check if it's already in assets
    if (fs.existsSync(targetPath)) {
      console.log(`File already in assets: ${fileName}`);
    } else {
      console.log(`File not found: ${fileName}`);
    }
  }
});

// Create an "unused" folder for files that don't match any project
const unusedDir = path.join(projectsDir, '_unused');
if (!fs.existsSync(unusedDir)) {
  fs.mkdirSync(unusedDir, { recursive: true });
  console.log('Created folder: _unused');
}

// List remaining loose files and move to unused
console.log('\nMoving remaining loose files to _unused folder:');
const files = fs.readdirSync(projectsDir);
files.forEach(file => {
  const filePath = path.join(projectsDir, file);
  if (fs.statSync(filePath).isFile() && !file.startsWith('.')) {
    const targetPath = path.join(unusedDir, file);
    if (!fs.existsSync(targetPath)) {
      fs.renameSync(filePath, targetPath);
      console.log(`  Moved to _unused: ${file}`);
    }
  }
});

console.log('\nOrganization complete!');
console.log('Note: Files in _unused folder may be unused or need manual organization.');

