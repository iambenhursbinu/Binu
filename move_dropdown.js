import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// Find the dropdown
const dropdownRegex = /<div id="notification-dropdown"[\s\S]*?<!-- Loaded dynamically by JS -->\s*<\/div>\s*<\/div>/;
const match = html.match(dropdownRegex);

if (match) {
  let dropdownHtml = match[0];
  
  // Remove it from current location
  html = html.replace(dropdownRegex, '');
  
  // Modify its classes
  dropdownHtml = dropdownHtml.replace('absolute right-0 mt-3', 'fixed right-4 md:right-8 top-[72px] md:top-[88px] z-[110]');
  // Give it a solid background so it NEVER overlaps with bugs. It's a glassy theme, so we can use a very opaque white.
  dropdownHtml = dropdownHtml.replace('bg-white/95 backdrop-blur-xl', 'bg-white/95 backdrop-blur-2xl');
  
  // Insert it before toast-container
  html = html.replace('<div id="toast-container"', dropdownHtml + '\n  <div id="toast-container"');
  
  fs.writeFileSync('index.html', html);
  console.log('Successfully moved and updated the dropdown.');
} else {
  console.log('Dropdown not found.');
}
