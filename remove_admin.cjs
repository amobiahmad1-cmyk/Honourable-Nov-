const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Replace desktop admin link
code = code.replace(/<Link[^>]*to="\/admin\/login"[^>]*>[\s\S]*?<\/Link>/g, '');

fs.writeFileSync('src/components/Navbar.tsx', code);
