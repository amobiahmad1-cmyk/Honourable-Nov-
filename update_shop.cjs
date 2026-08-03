const fs = require('fs');
let code = fs.readFileSync('src/pages/Shop.tsx', 'utf8');

code = code.replace(/import { PRODUCTS, CATEGORIES } from "\.\.\/data";/, 'import { CATEGORIES } from "../data";\nimport { useProducts } from "../context/ProductContext";');
code = code.replace(/export function Shop\(\) {/, 'export function Shop() {\n  const { products } = useProducts();');
// replace PRODUCTS with products
code = code.replace(/PRODUCTS\.filter/g, 'products.filter');
code = code.replace(/PRODUCTS\.length/g, 'products.length');

fs.writeFileSync('src/pages/Shop.tsx', code);
