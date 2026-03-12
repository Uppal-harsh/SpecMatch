const fs = require('fs');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if(file.endsWith('.js') || file.endsWith('.jsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('app').concat(walk('components'));
let count = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  // Replace all dynamic neon tailwind shadows with standard shadow-md
  let newContent = content.replace(/shadow-\[0_0_[^\]]+\]/g, 'shadow-md');
  // Specifically target the drop-shadows on FlowingMenu text that might have glow
  newContent = newContent.replace(/drop-shadow-.*?(\s|"|')/g, '$1');
  
  if(content !== newContent) {
    fs.writeFileSync(f, newContent);
    console.log("Updated", f);
    count++;
  }
});
console.log(`Finished updating ${count} files.`);
