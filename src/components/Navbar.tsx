import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag, Heart, X, User, Shield, Settings } from "lucide-react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const { cartCount, setIsCartOpen } = useCart();
  const { isAuthenticated, openAuthModal } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/shop?search=' + encodeURIComponent(searchQuery.trim()));
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate('/orders');
    } else {
      openAuthModal();
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled 
            ? "bg-white/95 backdrop-blur-md py-4 shadow-sm border-gray-100" 
            : isHome 
              ? "bg-transparent py-6" 
              : "bg-white py-6 border-gray-100"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Left Navigation */}
          <div className="flex items-center gap-4 md:gap-6">
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className={cn("w-6 h-6", !isScrolled && isHome ? "text-white" : "text-brand-navy")} />
            </button>
            
            

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-sm uppercase tracking-widest font-semibold transition-colors hover:opacity-70",
                    !isScrolled && isHome ? "text-white" : "text-brand-navy",
                    location.pathname === link.path && "opacity-70"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Logo */}
          <Link 
            to="/" 
            className={cn(
              "font-playfair text-2xl md:text-3xl font-bold tracking-wider absolute left-1/2 -translate-x-1/2",
              !isScrolled && isHome ? "text-white" : "text-brand-navy"
            )}
          >
            HONOURABLE NOVÈ
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={() => setIsSearchOpen(true)} className={cn("hover:opacity-70 transition-opacity", !isScrolled && isHome ? "text-white" : "text-brand-navy")}>
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={handleUserClick}
              className={cn("hover:opacity-70 transition-opacity", !isScrolled && isHome ? "text-white" : "text-brand-navy")}
            >
              <User className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/shop')} className={cn("hidden md:block hover:opacity-70 transition-opacity", !isScrolled && isHome ? "text-white" : "text-brand-navy")} title="Favorites">
              <Heart className="w-5 h-5" />
            </button>
            <button 
              className={cn("relative hover:opacity-70 transition-opacity", !isScrolled && isHome ? "text-white" : "text-brand-navy")}
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-brand-navy text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <Link 
              to="/orders"
              className={cn("hidden lg:block hover:opacity-70 transition-opacity uppercase tracking-widest text-xs font-semibold ml-2", !isScrolled && isHome ? "text-white" : "text-brand-navy")}
            >
              Orders
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-[70] p-6 shadow-2xl flex flex-col md:hidden"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-playfair text-xl font-bold text-brand-navy">HONOURABLE NOVÈ</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6 text-brand-navy" />
                </button>
              </div>
              
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-lg uppercase tracking-widest font-semibold text-brand-navy border-b border-gray-100 pb-4"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/orders"
                  className="text-lg uppercase tracking-widest font-semibold text-brand-navy border-b border-gray-100 pb-4"
                >
                  Orders
                </Link>
                
              </nav>

              <div className="mt-auto flex flex-col gap-4">
                <button 
                  onClick={() => {
                    handleUserClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-brand-navy font-semibold uppercase tracking-widest text-sm"
                >
                  <User className="w-5 h-5" /> {isAuthenticated ? 'Account / Orders' : 'Sign In'}
                </button>
                <button className="flex items-center gap-3 text-brand-navy font-semibold uppercase tracking-widest text-sm">
                  <Heart className="w-5 h-5" /> Wishlist
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    
      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 w-full flex items-center justify-between">
              <span className="font-playfair text-2xl md:text-3xl font-bold tracking-wider text-brand-navy">SEARCH</span>
              <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-brand-black" />
              </button>
            </div>
            <div className="flex-grow flex items-center justify-center p-6">
              <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
                <input 
                  type="text" 
                  autoFocus
                  placeholder="What are you looking for?" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-2xl md:text-4xl pb-4 border-b-2 border-brand-navy focus:outline-none bg-transparent placeholder-gray-300 text-brand-navy font-light"
                />
                <button type="submit" className="absolute right-0 bottom-4 text-brand-navy hover:opacity-70 transition-opacity">
                  <Search className="w-8 h-8" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
