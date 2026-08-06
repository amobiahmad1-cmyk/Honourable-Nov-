import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, Filter, Edit2, Trash2, X, AlertTriangle, Eye, UploadCloud } from 'lucide-react';
import { Product } from "../../data";
import { useProducts } from "../../context/ProductContext";
import React from "react";
import { Link } from 'react-router-dom';

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
    stock: '100',
    status: 'Active',
    isFeatured: false,
    colors: '',
    sizes: ''
  });

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      let finalValue = value;
      if (name === 'images' && typeof value === 'string' && value.includes('<')) {
        // Remove <a> tags completely
        finalValue = finalValue.replace(/<a[^>]*>/gi, '').replace(/<\/a>/gi, '');
        // Replace <img> tags with their src URL
        finalValue = finalValue.replace(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi, '$1');
      }
      setFormData(prev => ({ ...prev, [name]: finalValue }));
    }
  };

  const openAddModal = () => {
    setFormData({
      name: '',
      price: '',
      category: 'clothing',
      image: '',
      images: '',
      description: '',
      stock: '100',
      status: 'Active',
      isFeatured: false,
      colors: '',
      sizes: ''
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
      stock: product.stock !== undefined ? product.stock.toString() : '100',
      status: product.status || 'Active',
      isFeatured: product.isFeatured || false,
      colors: product.colors ? product.colors.join(', ') : '',
      sizes: product.sizes ? product.sizes.join(', ') : ''
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
      id: 'p' + Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.images.split(',')[0]?.trim() || '',
      images: formData.images.split(',').map(s => s.trim()).filter(Boolean),
      description: formData.description,
      stock: parseInt(formData.stock) || 0,
      status: formData.status,
      isFeatured: formData.isFeatured,
      colors: formData.colors.split(',').map(s => s.trim()).filter(Boolean),
      sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),
    };
    if (newProduct.images.length === 0 && newProduct.image) {
       newProduct.images = [newProduct.image];
    } else if (newProduct.images.length > 0 && !newProduct.image) {
       newProduct.image = newProduct.images[0];
    }
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
      image: formData.images.split(',')[0]?.trim() || '',
      images: formData.images.split(',').map(s => s.trim()).filter(Boolean),
      description: formData.description,
      stock: parseInt(formData.stock) || 0,
      status: formData.status,
      isFeatured: formData.isFeatured,
      colors: formData.colors.split(',').map(s => s.trim()).filter(Boolean),
      sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),
    };
    if (updatedProduct.images.length === 0 && updatedProduct.image) {
       updatedProduct.images = [updatedProduct.image];
    } else if (updatedProduct.images.length > 0 && !updatedProduct.image) {
       updatedProduct.image = updatedProduct.images[0];
    }
    updateProduct(updatedProduct);
    setIsEditModalOpen(false);
  };

  const handleDeleteProduct = () => {
    if (!currentProduct) return;
    deleteProduct(currentProduct.id);
    setIsDeleteModalOpen(false);
    setCurrentProduct(null);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const newImages = formData.images
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .filter((_, index) => index !== indexToRemove)
      .join(', ');
    setFormData(prev => ({ ...prev, images: newImages }));
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
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">Product</th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">Price</th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">Stock</th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => {
                const stock = product.stock !== undefined ? product.stock : 124;
                const status = product.status || 'Active';
                const isInStock = stock > 0 && status !== 'Inactive';
                
                return (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden shrink-0">
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-brand-navy truncate max-w-[200px]">{product.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5 capitalize">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm font-bold text-gray-900">₦{product.price.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-gray-700 font-medium">{stock}</td>
                    <td className="py-4 px-6">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isInStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {isInStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2 text-gray-400">
                        <Link to={`/product/${product.id}`} className="p-2 hover:text-brand-navy transition-colors rounded-lg hover:bg-gray-100" title="View">
                          <Eye size={18} />
                        </Link>
                        <button 
                          onClick={() => openEditModal(product)}
                          className="p-2 hover:text-brand-navy transition-colors rounded-lg hover:bg-gray-100"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => openDeleteModal(product)}
                          className="p-2 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      <AnimatePresence>
        {(isAddModalOpen || isEditModalOpen) && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-black/60 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden my-4"
            >
              <div className="flex justify-between items-center p-6 bg-white border-b border-gray-200 sticky top-0 z-10">
                <h3 className="font-playfair text-2xl font-bold text-brand-black">
                  {isAddModalOpen ? 'Add New Product' : 'Update Product Details'}
                </h3>
                <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-brand-black transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={isAddModalOpen ? handleAddProduct : handleEditProduct} className="p-6 space-y-6">
                
                {/* General Information */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-bold text-brand-black mb-4">General Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy focus:outline-none" placeholder="e.g. Satin Paint" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea name="description" required rows={3} value={formData.description} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy focus:outline-none" placeholder="Premium washable finish..." />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input type="text" name="category" required value={formData.category} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy focus:outline-none" placeholder="e.g. Emulsion" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₦)</label>
                        <input type="number" name="price" required min="0" step="0.01" value={formData.price} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-brand-navy focus:ring-1 focus:ring-brand-navy focus:outline-none" placeholder="18500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Media */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-bold text-brand-black mb-4">Media (Max 3)</h4>
                  
                  {formData.images && (
                    <div className="flex gap-4 mb-4 flex-wrap">
                      {formData.images.split(',').map((url, i) => url.trim() && (
                        <div key={i} className="relative w-32 h-32 rounded-lg border border-gray-200 overflow-hidden group">
                          <img src={url.trim()} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(i)}
                            className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors">
                    <UploadCloud className="mx-auto h-8 w-8 text-brand-navy mb-3" />
                    <p className="text-sm font-medium text-brand-black mb-1">Enter image URLs separated by comma</p>
                    <p className="text-xs text-gray-500 mb-4">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                    <textarea 
                      name="images" 
                      required 
                      rows={2} 
                      value={formData.images} 
                      onChange={handleInputChange} 
                      placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" 
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-brand-navy focus:outline-none" 
                    />
                  </div>
                </div>

                {/* Status & Inventory */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-bold text-brand-black mb-4">Status & Inventory</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select name="status" value={formData.status} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-brand-navy focus:outline-none">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                      <input type="number" name="stock" required min="0" value={formData.stock} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-brand-navy focus:outline-none" placeholder="100" />
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-navy"></div>
                      </label>
                      <span className="text-sm font-medium text-gray-700">Featured Product</span>
                    </div>
                  </div>
                </div>

                {/* Available Sizes & Colors */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-bold text-brand-black mb-4">Attributes</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Available Sizes (comma separated)</label>
                      <input type="text" name="sizes" value={formData.sizes} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-brand-navy focus:outline-none" placeholder="S, M, L, XL or 20L, 10L" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Available Colors (comma separated)</label>
                      <input type="text" name="colors" value={formData.colors} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-brand-navy focus:outline-none" placeholder="Red, Blue, Green" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="bg-brand-navy text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-opacity-90 transition-colors">
                    {isAddModalOpen ? 'Create Product' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && currentProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">Delete Product?</h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete <span className="font-bold text-gray-900">{currentProduct.name}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteProduct}
                  className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
