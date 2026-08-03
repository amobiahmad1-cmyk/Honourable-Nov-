import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PRODUCTS, Product } from '../data';
import { supabase } from '../lib/supabase';

interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  updateProduct: (updatedProduct: Product) => void;
  addProduct: (newProduct: Product) => void;
  deleteProduct: (id: string) => void;
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          // Fallback if empty or not set up
          const saved = localStorage.getItem('storeProducts');
          setProducts(saved ? JSON.parse(saved) : PRODUCTS);
        }
      } catch (err) {
        console.warn('Supabase fetch failed (table might not exist yet). Falling back to local storage.', err);
        const saved = localStorage.getItem('storeProducts');
        setProducts(saved ? JSON.parse(saved) : PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('storeProducts', JSON.stringify(products));
    }
  }, [products, loading]);

  const updateProduct = async (updatedProduct: Product) => {
    // Optimistic update
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    try {
      const { error } = await supabase.from('products').update(updatedProduct).eq('id', updatedProduct.id);
      if (error) console.error("Error updating in Supabase:", error);
    } catch (err) {}
  };

  const addProduct = async (newProduct: Product) => {
    setProducts(prev => [...prev, newProduct]);
    try {
      const { error } = await supabase.from('products').insert([newProduct]);
      if (error) console.error("Error adding to Supabase:", error);
    } catch (err) {}
  };

  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) console.error("Error deleting from Supabase:", error);
    } catch (err) {}
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, updateProduct, addProduct, deleteProduct, loading }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
};
