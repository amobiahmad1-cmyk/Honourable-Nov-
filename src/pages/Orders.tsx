import { motion } from "motion/react";
import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Package, Clock, CheckCircle, Truck, User } from "lucide-react";
import { cn } from "../lib/utils";

export function Orders() {
  const { orders, updateOrderStatus } = useOrders();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={20} className="text-yellow-600" />;
      case 'approved': return <CheckCircle size={20} className="text-blue-600" />;
      case 'delivered': return <Truck size={20} className="text-green-600" />;
      default: return <Package size={20} className="text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending Approval';
      case 'approved': return 'Approved - Processing';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-white pt-24 pb-24 flex flex-col items-center justify-center text-center px-6">
        <User size={64} className="text-gray-300 mb-6" />
        <h1 className="font-playfair text-4xl font-medium mb-4">Account Access Required</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Please sign in or create an account to view your order history and receipts.</p>
        <button 
          onClick={openAuthModal}
          className="bg-brand-navy text-white px-10 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-opacity-90 transition-all"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-white pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8 pt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl font-medium mb-4"
          >
            Your Orders
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 uppercase tracking-widest text-sm"
          >
            Welcome back, {user?.name}
          </motion.p>
        </div>
        
        <div className="flex justify-center mb-16">
          <button 
            onClick={logout}
            className="text-xs uppercase tracking-widest text-gray-500 border-b border-gray-400 hover:text-brand-navy hover:border-brand-navy transition-colors"
          >
            Sign Out
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 border border-gray-100">
            <Package size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="font-semibold uppercase tracking-widest text-sm mb-6 text-gray-500">No orders found</p>
            <Link 
              to="/shop"
              className="inline-block bg-brand-navy text-white px-8 py-3 uppercase tracking-widest text-xs font-semibold hover:bg-opacity-90 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 shadow-sm"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b border-gray-100 bg-gray-50">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider mb-1">Order #{order.id}</p>
                    <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}</p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={cn(
                        "text-sm font-semibold uppercase tracking-wider",
                        order.status === 'pending' ? 'text-yellow-700' :
                        order.status === 'approved' ? 'text-blue-700' :
                        'text-green-700'
                      )}>
                        {getStatusText(order.status)}
                      </span>
                    </div>

                    {/* Admin Simulator Buttons (For demo purposes) */}
                    <div className="ml-4 flex gap-2 border-l pl-4 border-gray-300">
                      <span className="text-[10px] uppercase text-gray-400 tracking-widest self-center mr-2">Simulate:</span>
                      {order.status === 'pending' && (
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'approved')}
                          className="text-[10px] font-bold uppercase tracking-wider bg-gray-200 px-2 py-1 hover:bg-gray-300 transition-colors"
                        >
                          Approve
                        </button>
                      )}
                      {order.status === 'approved' && (
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="text-[10px] font-bold uppercase tracking-wider bg-gray-200 px-2 py-1 hover:bg-gray-300 transition-colors"
                        >
                          Deliver
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.cartId} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0 last:pb-0">
                        <div className="w-16 h-20 bg-gray-100 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <Link to={`/product/${item.id}`} className="font-playfair font-medium text-brand-navy hover:opacity-70 transition-opacity">
                            {item.name}
                          </Link>
                          <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                            {item.selectedSize && <span className="mr-3">Size: {item.selectedSize}</span>}
                            {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">₦{(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 border-t border-gray-100 bg-brand-white flex justify-between items-center">
                  <span className="text-sm font-semibold uppercase tracking-wider">Total</span>
                  <span className="font-playfair text-xl font-medium">₦{order.total.toFixed(2)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
