import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { isAuthenticated, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    
    addOrder(items, cartTotal);
    clearCart();
    setIsCartOpen(false);
    navigate('/orders');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-[90%] max-w-md bg-white z-[90] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-playfair text-2xl font-medium">Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                  <ShoppingBag size={48} className="mb-4 text-gray-300" />
                  <p className="font-semibold uppercase tracking-widest text-sm mb-6">Your cart is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="border border-brand-navy px-8 py-3 uppercase tracking-widest text-xs font-semibold hover:bg-brand-navy hover:text-white transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  {items.map((item) => (
                    <div key={item.cartId} className="flex gap-4">
                      <div className="w-24 h-32 bg-gray-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-playfair font-medium text-lg leading-tight">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.cartId)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X size={18} />
                            </button>
                          </div>
                          
                          <div className="mt-1 text-xs text-gray-500 uppercase tracking-wider space-y-1">
                            {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                            {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-200">
                            <button 
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-gray-50 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-gray-50 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-medium">₦{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm uppercase tracking-widest font-semibold text-gray-500">Subtotal</span>
                  <span className="font-playfair text-2xl font-medium">₦{cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mb-6">Shipping & taxes calculated at checkout</p>
                <button
                  onClick={handleCheckout}
                  className="w-full block text-center bg-brand-navy text-white py-4 uppercase tracking-widest text-sm font-semibold hover:bg-opacity-90 transition-opacity"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
