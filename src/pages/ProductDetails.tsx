import { useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Heart, ShoppingBag, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import { useCart } from "../context/CartContext";

export function ProductDetails() {
  const { products } = useProducts();
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    if (product) {
      if (product.sizes?.length) setSelectedSize(product.sizes[0]);
      if (product.colors?.length) setSelectedColor(product.colors[0]);
    }
  }, [product, id]);

  if (!product) {
    return <div className="min-h-screen pt-32 text-center text-xl">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-brand-white pt-24 pb-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-b border-gray-100 mb-12">
        <div className="flex items-center gap-2 text-xs text-gray-500 tracking-widest uppercase">
          <Link to="/" className="hover:text-brand-black transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-brand-black transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-brand-black">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* Images & Video */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row-reverse gap-4">
            <div className="flex-1 bg-brand-gray aspect-[3/4] overflow-hidden">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={product.images[activeImage] || product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 flex-shrink-0">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "w-20 md:w-full aspect-[3/4] flex-shrink-0 bg-brand-gray border transition-colors",
                    activeImage === idx ? "border-brand-navy" : "border-transparent"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Video Section */}
          {product.videoUrl && (
            <div className="w-full mt-2">
              <h3 className="text-sm uppercase tracking-widest font-semibold mb-3">Product Video</h3>
              <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                {product.videoUrl.includes('youtube.com') || product.videoUrl.includes('youtu.be') ? (
                  <iframe 
                    className="w-full h-full"
                    src={product.videoUrl.includes('v=') ? "https://www.youtube.com/embed/" + product.videoUrl.split('v=')[1].split('&')[0] : product.videoUrl.includes('youtu.be/') ? "https://www.youtube.com/embed/" + product.videoUrl.split('youtu.be/')[1].split('?')[0] : product.videoUrl} 
                    title="Product Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video 
                    controls 
                    className="w-full h-full object-cover"
                    src={product.videoUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-sm text-gray-500 uppercase tracking-widest">{product.category}</span>
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-medium mt-2 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="text-2xl font-medium">₦{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">₦{product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="border-t border-gray-100 pt-8 mb-8 space-y-6">
              {/* Colors */}
              {product.colors && (
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-semibold mb-3">Color</h3>
                  <div className="flex gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "px-4 py-2 border text-sm uppercase tracking-wider transition-colors",
                          selectedColor === color ? "border-brand-navy bg-brand-navy text-white" : "border-gray-200 text-gray-500 hover:border-brand-navy"
                        )}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm uppercase tracking-widest font-semibold">Size</h3>
                    <Link to="/size-guide" className="text-xs text-gray-500 border-b border-gray-400 uppercase tracking-wider hover:text-brand-navy hover:border-brand-navy transition-colors">Size Guide</Link>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "w-12 h-12 flex items-center justify-center border text-sm uppercase tracking-wider transition-colors",
                          selectedSize === size ? "border-brand-navy bg-brand-navy text-white" : "border-gray-200 text-gray-500 hover:border-brand-navy"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-sm uppercase tracking-widest font-semibold mb-3">Quantity</h3>
                <div className="flex items-center border border-gray-200 w-32">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-gray-500 hover:text-brand-navy transition-colors">-</button>
                  <span className="flex-1 text-center text-sm font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-gray-500 hover:text-brand-navy transition-colors">+</button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-brand-navy text-white py-4 uppercase tracking-widest font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 hover:bg-opacity-90"
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <button className="w-14 h-14 flex items-center justify-center border border-gray-200 text-gray-500 hover:border-brand-navy hover:text-brand-navy transition-colors">
                <Heart size={20} />
              </button>
            </div>
            
            {/* Meta */}
            <div className="mt-12 text-sm text-gray-500 flex flex-col gap-2 border-t border-gray-100 pt-8">
              <p><span className="font-semibold text-brand-black mr-2">SKU:</span> {product.id.toUpperCase()}-001</p>
              <p><span className="font-semibold text-brand-black mr-2">Category:</span> {product.category}</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Details Tabs */}
      <div className="max-w-7xl mx-auto px-6 mt-24">
        <div className="border-b border-gray-200">
          <ul className="flex gap-8">
            <li className="pb-4 border-b-2 border-brand-navy text-brand-navy uppercase tracking-widest text-sm font-semibold cursor-pointer">
              Description
            </li>
            <li className="pb-4 border-b-2 border-transparent text-gray-400 hover:text-brand-navy uppercase tracking-widest text-sm font-semibold cursor-pointer transition-colors">
              Additional Info
            </li>
            <li className="pb-4 border-b-2 border-transparent text-gray-400 hover:text-brand-navy uppercase tracking-widest text-sm font-semibold cursor-pointer transition-colors">
              Reviews (0)
            </li>
          </ul>
        </div>
        <div className="py-8 max-w-3xl text-gray-600 leading-relaxed">
          <p>
            Experience unparalleled craftsmanship with this exceptional piece. Carefully constructed using premium materials to ensure both durability and elegance. The meticulous attention to detail is evident in every stitch and finish, making it a perfect addition to any sophisticated collection. Designed for those who appreciate the finer things in life, offering style without compromise.
          </p>
        </div>
      </div>
    </div>
  );
}
