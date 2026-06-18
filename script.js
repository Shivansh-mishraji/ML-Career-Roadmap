const fs = require('fs');
const path = require('path');
const dir = 'webapp/src/components';

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.jsx')) {
    let p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');
    let newContent = content.split('className="glass-panel"').join('className="glass-card-premium"');
    if (content !== newContent) {
      fs.writeFileSync(p, newContent);
      console.log('Updated ' + file);
    }
  }
});
