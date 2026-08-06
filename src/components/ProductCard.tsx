import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { Product } from "../data";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
  className?: string;
  key?: React.Key | string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("group flex flex-col", className)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-gray mb-4">
        <Link to={`/product/${product.id}`} className="absolute inset-0 z-10" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-brand-navy text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider">
              New
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-red-900 text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider">
              Sale
            </span>
          )}
        </div>

        {/* Image */}
        <img 
          src={product.image || (product.images && product.images[0]) || ''} 
          alt={product.name}
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover Actions (just heart now) */}
        <div className="absolute bottom-4 right-4 z-20 flex justify-end opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button className="bg-white/90 backdrop-blur text-brand-black p-3 hover:bg-brand-navy hover:text-white transition-colors">
            <Heart size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1 flex-grow">
        <span className="text-sm text-gray-500 uppercase tracking-widest">{product.category}</span>
        <Link to={`/product/${product.id}`} className="font-playfair text-lg font-medium text-brand-navy hover:text-opacity-70 transition-colors line-clamp-1">
          {product.name}
        </Link>
        <div className="flex items-center gap-3 mt-1">
          <span className="font-medium">₦{product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm">₦{product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>

      <button
        onClick={() => addToCart(product)}
        className="mt-4 w-full border border-brand-navy py-3 text-sm font-semibold uppercase tracking-wider text-brand-navy hover:bg-brand-navy hover:text-white transition-colors flex items-center justify-center gap-2"
      >
        <ShoppingBag size={16} />
        Add to Cart
      </button>
    </motion.div>
  );
}
