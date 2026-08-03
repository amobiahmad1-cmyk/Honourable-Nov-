const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = code.replace(/import \{ useProducts \} from "\.\.\/context\/ProductContext";/, 'import { useProducts } from "../context/ProductContext";\nimport { useContent } from "../context/ContentContext";');

code = code.replace(/export function Home\(\) \{[\s\S]*?const newArrivals = products\.filter\(p => p\.isNew\)\.slice\(0, 4\);/, `export function Home() {\n  const { products } = useProducts();\n  const { content } = useContent();\n  const featuredProducts = products.slice(0, 4);\n  const newArrivals = products.filter(p => p.isNew).slice(0, 4);`);

code = code.replace(/<motion\.h1[^>]*>\s*THE NEW ESSENTIALS\s*<\/motion\.h1>/, `<motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-playfair text-5xl md:text-7xl font-medium text-white mb-6 leading-tight max-w-4xl">{content.home.heroTitle}</motion.h1>`);

code = code.replace(/<motion\.p[^>]*>[\s\S]*?<\/motion\.p>/, `<motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white\/80 mb-10 max-w-xl">{content.home.heroSubtitle}</motion.p>`);

code = code.replace(/src="https:\/\/images\.unsplash\.com\/photo-1490367532201-b9bc1dc483f6\?auto=format&fit=crop&q=80&w=1920"/, `src={content.home.heroImage}`);

fs.writeFileSync('src/pages/Home.tsx', code);
