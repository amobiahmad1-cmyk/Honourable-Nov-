const fs = require('fs');
let code = fs.readFileSync('src/components/admin/AdminLayout.tsx', 'utf8');

// Add Globe icon if not imported
if (!code.includes('Globe')) {
  code = code.replace(/import {([^}]*)Layout([^}]*)} from 'lucide-react';/, "import {$1Layout, Globe$2} from 'lucide-react';");
}

const viewStoreBtn = `
            <Link to="/" className="hidden md:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-brand-navy border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-100 transition-all">
              <Globe size={16} /> View Store
            </Link>
            <Link to="/admin/notifications"
`;

code = code.replace(/<Link to="\/admin\/notifications"/, viewStoreBtn);

fs.writeFileSync('src/components/admin/AdminLayout.tsx', code);
