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
        
        const cleanImageUrl = (url: string | undefined): string => {
          if (!url) return '';
          if (url.includes('<img') || url.includes('href=')) {
            const match = url.match(/src=["'](.*?)["']/);
            if (match && match[1]) return match[1];
            const hrefMatch = url.match(/href=["'](.*?)["']/);
            if (hrefMatch && hrefMatch[1] && hrefMatch[1].match(/\.(jpeg|jpg|gif|png|avif|webp|svg)$/i)) {
               return hrefMatch[1];
            }
          }
          return url;
        };
        
        if (data && data.length > 0) {
          const cleanedData = data.map(p => ({
            ...p,
            image: cleanImageUrl(p.image),
            images: p.images ? p.images.map(cleanImageUrl) : []
          }));
          setProducts(cleanedData);
        } else {
          // If empty, seed with initial products
          const { error: insertError } = await supabase.from('products').insert(PRODUCTS);
          if (!insertError) {
            setProducts(PRODUCTS);
          } else {
            console.error('Failed to seed products:', insertError);
            setProducts(PRODUCTS); // Fallback to memory if insert fails so app doesn't break visually
          }
        }
      } catch (err) {
        console.error('Supabase fetch failed for products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const updateProduct = async (updatedProduct: Product) => {
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
