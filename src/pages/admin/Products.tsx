import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, Filter, Edit2, Trash2, X, AlertTriangle } from 'lucide-react';
import { Product } from "../../data";
import { useProducts } from "../../context/ProductContext";
import React from "react";

export function AdminProducts() {
  const { products, setProducts, addProduct, updateProduct, deleteProduct } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    images: '',
    description: '',
    originalPrice: '',
    colors: '',
    sizes: '',
    videoUrl: ''
  });

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setFormData({
      name: '',
      price: '',
      category: 'clothing',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (product: Product) => {
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
      sizes: product.sizes ? product.sizes.join(', ') : '',
      videoUrl: product.videoUrl || ''
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleAddProduct = (e: React.FormEvent) => {
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
      videoUrl: formData.videoUrl.trim() || undefined,
    };
    if (newProduct.images.length === 0) newProduct.images = [newProduct.image];
    addProduct(newProduct);
    setIsAddModalOpen(false);
  };

  const handleEditProduct = (e: React.FormEvent) => {
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
      videoUrl: formData.videoUrl.trim() || undefined,
    };
    if (updatedProduct.images.length === 0) updatedProduct.images = [updatedProduct.image];
    updateProduct(updatedProduct);
    setIsEditModalOpen(false);
  };

  const handleDeleteProduct = () => {
    if (!currentProduct) return;
    setProducts(products.filter(p => p.id !== currentProduct.id));
    setIsDeleteModalOpen(false);
    setCurrentProduct(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-medium text-brand-black mb-1">Products</h1>
          <p className="text-gray-500 text-sm">Manage your inventory, prices, and product details.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-brand-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-sm"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-navy bg-white"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto items-center">
            <Filter size={16} className="text-gray-400" />
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium bg-white focus:outline-none focus:border-brand-navy capitalize"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Product</th>
                <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Category</th>
                <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Price</th>
                <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Stock</th>
                <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden shrink-0">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-brand-navy line-clamp-1">{product.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 capitalize">{product.category}</td>
                  <td className="py-4 px-6 text-sm font-medium">₦{product.price.toFixed(2)}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${Number(product.id) % 2 === 0 ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                      {Number(product.id) % 2 === 0 ? 'In Stock (45)' : 'Low Stock (4)'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700">Active</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(product)}
                        className="p-1.5 text-gray-400 hover:text-brand-navy transition-colors rounded hover:bg-gray-100"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => openDeleteModal(product)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal (Add/Edit) */}
      <AnimatePresence>
        {(isAddModalOpen || isEditModalOpen) && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => {
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-xl z-50 overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="font-playfair text-xl font-medium text-brand-black">
                  {isAddModalOpen ? 'Add New Product' : 'Edit Product'}
                </h3>
                <button 
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                  }}
                  className="text-gray-400 hover:text-brand-navy transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={isAddModalOpen ? handleAddProduct : handleEditProduct} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Main Image</label>
                  {formData.image && (
                    <div className="mb-3">
                      <img src={formData.image} alt="Main preview" className="w-24 h-24 object-cover rounded-lg border border-gray-200" onError={(e) => (e.currentTarget.style.display = 'none')} onLoad={(e) => (e.currentTarget.style.display = 'block')} />
                    </div>
                  )}
                  <input type="url" name="image" required value={formData.image} onChange={handleInputChange} placeholder="Enter image URL" className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">All Images</label>
                  {formData.images && (
                    <div className="flex gap-2 mb-3 overflow-x-auto py-1">
                      {formData.images.split(',').map((url, i) => url.trim() && (
                        <img key={i} src={url.trim()} alt={`Gallery ${i}`} className="w-16 h-16 object-cover rounded border border-gray-200 shrink-0" onError={(e) => (e.currentTarget.style.display = 'none')} onLoad={(e) => (e.currentTarget.style.display = 'block')} />
                      ))}
                    </div>
                  )}
                  <textarea name="images" required rows={2} value={formData.images} onChange={handleInputChange} placeholder="Enter comma separated image URLs" className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
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
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Video URL (Optional)</label>
                  <input type="url" name="videoUrl" value={formData.videoUrl} onChange={handleInputChange} placeholder="Enter video or YouTube URL" className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>
                <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-white border-t border-gray-100 p-2">
                  <button type="button" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="px-5 py-2.5 border border-gray-200 text-brand-black rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="bg-brand-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-opacity-90 transition-colors">
                    {isAddModalOpen ? 'Create Product' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && currentProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsDeleteModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-xl shadow-xl z-50 p-6 text-center"
            >
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={24} />
              </div>
              <h3 className="font-playfair text-xl font-medium text-brand-black mb-2">Delete Product</h3>
              <p className="text-gray-500 text-sm mb-6">
                Are you sure you want to delete <span className="font-semibold text-brand-black">{currentProduct.name}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-brand-black rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteProduct}
                  className="flex-1 bg-red-600 text-white py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
