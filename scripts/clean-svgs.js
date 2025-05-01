const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, '../components/svgs'); // Adjust as needed
const TARGET_COLOR = '#737373'; // Or whatever you prefer

function cleanSvgFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace fill="url(#...)" with a flat color
  content = content.replace(/fill="url\(#.*?\)"/g, `fill="${TARGET_COLOR}"`);

  // Remove Defs, Pattern, Use, Image blocks (and content inside)
  content = content.replace(/<Defs>[\s\S]*?<\/Defs>/g, '');

  // Optionally remove xlinkHref if still present
  content = content.replace(/xlinkHref=".*?"/g, '');

  // Save changes
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Cleaned ${path.basename(filePath)}`);
}

fs.readdirSync(directory).forEach(file => {
  if (file.endsWith('.tsx')) {
    cleanSvgFile(path.join(directory, file));
  }
});
