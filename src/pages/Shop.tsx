import React from "react";
import { useState } from "react";
import { CATEGORIES } from "../data";
import { useProducts } from "../context/ProductContext";
import { ProductCard } from "../components/ProductCard";
import { motion } from "motion/react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

export function Shop() {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = products.filter(
    (product) => activeCategory === "All" || product.category === activeCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0; // featured/default
  });

  return (
    <div className="min-h-screen bg-brand-white pt-24 pb-24">
      {/* Header */}
      <div className="bg-brand-gray/30 py-16 mb-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl font-medium mb-4"
          >
            The Collection
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 text-sm text-gray-500 tracking-wider uppercase"
          >
            <span>Home</span>
            <span>/</span>
            <span className="text-brand-black">Shop</span>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12">
        {/* Sidebar / Filters */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="sticky top-32">
            <h3 className="font-playfair text-xl font-medium mb-6 border-b border-gray-200 pb-4 flex items-center gap-2">
              <SlidersHorizontal size={20} />
              Filters
            </h3>
            
            <div className="mb-10">
              <h4 className="uppercase tracking-widest text-sm font-semibold mb-4 text-gray-500">Categories</h4>
              <ul className="flex flex-col gap-3">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "text-left text-sm transition-colors uppercase tracking-wider",
                        activeCategory === cat 
                          ? "text-brand-navy font-semibold" 
                          : "text-gray-500 hover:text-brand-navy"
                      )}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?auto=format&fit=crop&q=80&w=600" 
                alt="Promotion" 
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="mt-4 text-center">
                <p className="font-playfair font-medium text-lg">Essential Accessories</p>
                <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Discover Now</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <p className="text-gray-500 text-sm">Showing {sortedProducts.length} results</p>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 uppercase tracking-widest">Sort by:</span>
              <div className="relative">
                <select 
                  className="appearance-none bg-transparent border border-gray-200 px-4 py-2 pr-10 text-sm font-medium uppercase tracking-wider text-brand-navy focus:outline-none cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {sortedProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
