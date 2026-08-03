const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

if (!code.includes('videoUrl?: string;')) {
  code = code.replace(/colors\?: string\[\];/, 'colors?: string[];\n  videoUrl?: string;');
  fs.writeFileSync('src/data.ts', code);
}
