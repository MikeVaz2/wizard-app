// This script moves the build output to the /docs folder for GitHub Pages deployment
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '../build');
const docsDir = path.join(__dirname, '../docs');

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest);
  fs.readdirSync(src).forEach((item) => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

function removeDirSync(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach((item) => {
    const curPath = path.join(dir, item);
    if (fs.lstatSync(curPath).isDirectory()) {
      removeDirSync(curPath);
    } else {
      fs.unlinkSync(curPath);
    }
  });
  fs.rmdirSync(dir);
}

// Remove old docs
if (fs.existsSync(docsDir)) {
  removeDirSync(docsDir);
}
// Copy build to docs
copyRecursiveSync(buildDir, docsDir);
// Remove build folder
removeDirSync(buildDir);

console.log('Moved build output to /docs for GitHub Pages.');
