const fs = require('fs');
let code = fs.readFileSync('src/context/AdminAuthContext.tsx', 'utf8');
code = code.replace(/localStorage\.getItem\('isAdminAuthenticated'\)/g, "sessionStorage.getItem('isAdminAuthenticated')");
code = code.replace(/localStorage\.setItem\('isAdminAuthenticated', String\(isAdminAuthenticated\)\)/g, "sessionStorage.setItem('isAdminAuthenticated', String(isAdminAuthenticated))");
fs.writeFileSync('src/context/AdminAuthContext.tsx', code);
