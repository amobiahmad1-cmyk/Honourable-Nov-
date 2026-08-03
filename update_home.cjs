const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = code.replace(/import { PRODUCTS } from "\.\.\/data";/, 'import { useProducts } from "../context/ProductContext";');
code = code.replace(/export function Home\(\) {/, 'export function Home() {\n  const { products } = useProducts();');
// replace PRODUCTS with products
code = code.replace(/PRODUCTS\.slice/g, 'products.slice');

fs.writeFileSync('src/pages/Home.tsx', code);
