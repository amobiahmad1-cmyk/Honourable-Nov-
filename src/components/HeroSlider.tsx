import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { useContent } from "../context/ContentContext";

const RAW_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1920",
    title: "Luxury Redefined.",
    subtitle: "Style Without Compromise.",
    cta: "Shop Collection",
    link: "/shop"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1920",
    title: "Timeless Elegance.",
    subtitle: "Premium Italian Leather Handbags.",
    cta: "Explore Bags",
    link: "/shop"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1920",
    title: "Precision & Prestige.",
    subtitle: "Discover the New Chronograph Series.",
    cta: "View Watches",
    link: "/shop"
  }
];

export function HeroSlider() {
  const { content } = useContent();
    const SLIDES = [
    {
      id: 1,
      image: content.home.heroImage,
      title: content.home.heroTitle,
      subtitle: content.home.heroSubtitle,
      cta: "Shop Collection",
      link: "/shop"
    },
    RAW_SLIDES[1],
    RAW_SLIDES[2]
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-brand-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0"
        >
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          
          <img
            src={SLIDES[currentSlide].image}
            alt={SLIDES[currentSlide].title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-white/80 uppercase tracking-[0.3em] text-sm md:text-base font-semibold mb-6"
            >
              {SLIDES[currentSlide].subtitle}
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white font-medium mb-10 max-w-4xl leading-tight"
            >
              {SLIDES[currentSlide].title}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <Link 
                to={SLIDES[currentSlide].link}
                className="inline-block bg-white text-brand-black px-10 py-4 uppercase tracking-widest font-semibold text-sm hover:bg-brand-navy hover:text-white transition-colors duration-300"
              >
                {SLIDES[currentSlide].cta}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-brand-black transition-colors rounded-full"
      >
        <ChevronLeft size={24} strokeWidth={1} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-brand-black transition-colors rounded-full"
      >
        <ChevronRight size={24} strokeWidth={1} />
      </button>

      {/* Pagination */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={cn(
              "h-1 transition-all duration-500",
              currentSlide === idx ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 right-12 z-30 hidden md:flex flex-col items-center gap-4">
        <span className="text-white uppercase tracking-widest text-[10px] rotate-90 origin-right">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-bounce" />
        </div>
      </div>
    </div>
  );
}
