const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/Products.tsx', 'utf8');

// Replace the formData initial state
code = code.replace(
  /const \[formData, setFormData\] = useState\(\{[\s\S]*?\}\);/,
  `const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    images: '',
    description: '',
    originalPrice: '',
    colors: '',
    sizes: ''
  });`
);

// Replace openEditModal
code = code.replace(
  /const openEditModal = \(product: Product\) => \{[\s\S]*?setIsEditModalOpen\(true\);\n  \};/,
  `const openEditModal = (product: Product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      images: product.images ? product.images.join(', ') : '',
      description: product.description || '',
      originalPrice: product.originalPrice ? product.originalPrice.toString() : '',
      colors: product.colors ? product.colors.join(', ') : '',
      sizes: product.sizes ? product.sizes.join(', ') : ''
    });
    setIsEditModalOpen(true);
  };`
);

// Replace handleAddProduct
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
    setProducts([...products, newProduct]);
    setIsAddModalOpen(false);
  };`
);

// Replace handleEditProduct
code = code.replace(
  /const handleEditProduct = \(e: React.FormEvent\) => \{[\s\S]*?setIsEditModalOpen\(false\);\n  \};/,
  `const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;
    const updatedProducts = products.map(p => {
      if (p.id === currentProduct.id) {
        return {
          ...p,
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
      }
      return p;
    });
    // Fix empty images
    updatedProducts.forEach(p => {
      if (p.images.length === 0) p.images = [p.image];
    });
    setProducts(updatedProducts);
    setIsEditModalOpen(false);
  };`
);

// We also need to update the form fields in the JSX.
// We'll just rewrite the form completely. Let's replace the whole form tag.

const newForm = `<form onSubmit={isAddModalOpen ? handleAddProduct : handleEditProduct} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Product Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Description</label>
                  <textarea name="description" required rows={3} value={formData.description} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Price (₦)</label>
                    <input type="number" name="price" required min="0" step="0.01" value={formData.price} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Original Price (₦)</label>
                    <input type="number" name="originalPrice" min="0" step="0.01" value={formData.originalPrice} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none bg-white capitalize">
                    {categories.filter(c => c !== 'all').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                    <option value="new_category">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Main Image URL</label>
                  <input type="url" name="image" required value={formData.image} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">All Images (comma separated URLs)</label>
                  <textarea name="images" required rows={2} value={formData.images} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Colors (comma separated)</label>
                    <input type="text" name="colors" value={formData.colors} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Sizes (comma separated)</label>
                    <input type="text" name="sizes" value={formData.sizes} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                  </div>
                </div>
                <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-white border-t border-gray-100 p-2">
                  <button type="button" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="px-5 py-2.5 border border-gray-200 text-brand-black rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="bg-brand-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-opacity-90 transition-colors">
                    {isAddModalOpen ? 'Create Product' : 'Save Changes'}
                  </button>
                </div>
              </form>`;

code = code.replace(/<form onSubmit=\{isAddModalOpen \? handleAddProduct : handleEditProduct\} className="p-6 space-y-4">[\s\S]*?<\/form>/, newForm);

fs.writeFileSync('src/pages/admin/Products.tsx', code);
