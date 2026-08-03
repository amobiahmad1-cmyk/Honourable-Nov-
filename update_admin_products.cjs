const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/Products.tsx', 'utf8');

code = code.replace(/import { PRODUCTS, Product } from "\.\.\/\.\.\/data";/, 'import { Product } from "../../data";\nimport { useProducts } from "../../context/ProductContext";');
code = code.replace(/export function AdminProducts\(\) {/, 'export function AdminProducts() {\n  const { products, setProducts, addProduct, updateProduct, deleteProduct } = useProducts();');
// remove the local state
code = code.replace(/const \[products, setProducts\] = useState<Product\[\]>\(PRODUCTS\);\n/, '');

// replace handleAddProduct
code = code.replace(
  /const handleAddProduct = \(e: React.FormEvent\) => \{[\s\S]*?setIsAddModalOpen\(false\);\n  \};/,
  `const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: 'p' + (products.length + 1),
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category === 'new_category' ? 'Other' : formData.category,
      image: formData.image,
      images: formData.images.split(',').map(s => s.trim()).filter(Boolean),
      description: formData.description,
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      colors: formData.colors.split(',').map(s => s.trim()).filter(Boolean),
      sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),
    };
    if (newProduct.images.length === 0) newProduct.images = [newProduct.image];
    addProduct(newProduct);
    setIsAddModalOpen(false);
  };`
);

// replace handleEditProduct
code = code.replace(
  /const handleEditProduct = \(e: React.FormEvent\) => \{[\s\S]*?setIsEditModalOpen\(false\);\n  \};/,
  `const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;
    const updatedProduct = {
      ...currentProduct,
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image,
      images: formData.images.split(',').map(s => s.trim()).filter(Boolean),
      description: formData.description,
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      colors: formData.colors.split(',').map(s => s.trim()).filter(Boolean),
      sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),
    };
    if (updatedProduct.images.length === 0) updatedProduct.images = [updatedProduct.image];
    updateProduct(updatedProduct);
    setIsEditModalOpen(false);
  };`
);

// replace handleDeleteProduct
code = code.replace(
  /const handleDeleteProduct = \(\) => \{[\s\S]*?setIsDeleteModalOpen\(false\);\n  \};/,
  `const handleDeleteProduct = () => {
    if (currentProduct) {
      deleteProduct(currentProduct.id);
    }
    setIsDeleteModalOpen(false);
  };`
);

fs.writeFileSync('src/pages/admin/Products.tsx', code);
