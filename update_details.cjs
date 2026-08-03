const fs = require('fs');
let code = fs.readFileSync('src/pages/ProductDetails.tsx', 'utf8');

code = code.replace(/import { PRODUCTS } from "\.\.\/data";/, 'import { useProducts } from "../context/ProductContext";');
code = code.replace(/export function ProductDetails\(\) {/, 'export function ProductDetails() {\n  const { products } = useProducts();');
// replace PRODUCTS with products
code = code.replace(/PRODUCTS\.find/g, 'products.find');
code = code.replace(/PRODUCTS\.filter/g, 'products.filter');

fs.writeFileSync('src/pages/ProductDetails.tsx', code);
