import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-24 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
        
        {/* Brand Info */}
        <div className="flex flex-col gap-6">
          <Link to="/" className="font-playfair text-2xl font-bold tracking-wider text-white">
            HONOURABLE NOVÈ
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Elegant. Affordable Luxury. Timeless Fashion. Premium Experience. Redefining modern luxury for the discerning individual.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-playfair text-lg font-semibold mb-6 uppercase tracking-wider">Explore</h3>
          <ul className="flex flex-col gap-4">
            <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">New Arrivals</Link></li>
            <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Collections</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Our Story</Link></li>
            <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Accessories</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="font-playfair text-lg font-semibold mb-6 uppercase tracking-wider">Customer Care</h3>
          <ul className="flex flex-col gap-4">
            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Contact Us</Link></li>
            <li><Link to="/shipping-returns" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Shipping & Returns</Link></li>
            <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">FAQ</Link></li>
            <li><Link to="/size-guide" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider">Size Guide</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-playfair text-lg font-semibold mb-6 uppercase tracking-wider">Newsletter</h3>
          <p className="text-gray-400 text-sm mb-6">
            Subscribe to receive updates on new arrivals, special offers and other discount information.
          </p>
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent border-b border-gray-600 pb-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
              required
            />
            <button type="submit" className="text-left text-sm font-semibold uppercase tracking-widest mt-2 hover:text-gray-300 transition-colors">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-xs tracking-wider">
          &copy; {new Date().getFullYear()} HONOURABLE NOVÈ. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6">
          <Link to="/privacy-policy" className="text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-wider">Privacy Policy</Link>
          <Link to="/terms-of-service" className="text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-wider">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
