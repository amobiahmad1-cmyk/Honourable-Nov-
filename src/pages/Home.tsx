import React from "react";
import { HeroSlider } from "../components/HeroSlider";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";
import { useContent } from "../context/ContentContext";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export function Home() {
  const { products } = useProducts();
  const { content } = useContent();
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="min-h-screen bg-brand-white">
      <HeroSlider />

      {/* Categories Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl font-medium mb-4">Curated Collections</h2>
          <p className="text-gray-500 tracking-wider uppercase text-sm">Discover our premium range</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Leather Goods", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800" },
            { name: "Timepieces", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800" },
            { name: "Accessories", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800" },
          ].map((cat, idx) => (
            <Link to="/shop" key={idx} className="group relative aspect-[3/4] overflow-hidden bg-brand-gray">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
              <img src={cat.img} alt={cat.name} className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                <h3 className="text-white font-playfair text-3xl font-medium mb-4">{cat.name}</h3>
                <span className="text-white/90 uppercase tracking-widest text-sm border-b border-white/50 pb-1">Shop Now</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-brand-gray/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <h2 className="font-playfair text-4xl font-medium mb-4">Signature Pieces</h2>
              <p className="text-gray-500 tracking-wider uppercase text-sm">Timeless style without compromise</p>
            </div>
            <Link to="/shop" className="uppercase tracking-widest text-sm font-semibold border-b border-brand-black pb-1 hover:text-gray-500 transition-colors">
              View All Products
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="relative py-40 overflow-hidden bg-brand-navy">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=1920" alt="Promotional Banner" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-5xl md:text-6xl font-medium mb-6 leading-tight"
          >
            The Essence of Luxury.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/80 mb-10 max-w-xl">{content.home.heroSubtitle}</motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/shop" className="inline-block bg-white text-brand-navy px-10 py-4 uppercase tracking-widest font-semibold text-sm hover:bg-gray-100 transition-colors">
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl font-medium mb-4">New Arrivals</h2>
            <p className="text-gray-500 tracking-wider uppercase text-sm">The latest additions</p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features/Values */}
      <section className="py-24 bg-brand-gray/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm text-brand-navy">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-medium mb-3">Premium Quality</h3>
              <p className="text-gray-500 text-sm">Uncompromising standards in every detail.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm text-brand-navy">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-medium mb-3">Secure Payments</h3>
              <p className="text-gray-500 text-sm">100% secure processing for all transactions.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm text-brand-navy">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-medium mb-3">Global Support</h3>
              <p className="text-gray-500 text-sm">Dedicated customer service around the clock.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
