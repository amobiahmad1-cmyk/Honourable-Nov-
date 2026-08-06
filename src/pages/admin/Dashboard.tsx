import { motion } from 'motion/react';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp,
  PackageSearch,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { name: 'Total Revenue', value: '₦124,500', icon: DollarSign, trend: '+12.5%', isPositive: true },
  { name: 'Total Orders', value: '845', icon: ShoppingBag, trend: '+8.2%', isPositive: true },
  { name: 'Active Customers', value: '1,240', icon: Users, trend: '+15.3%', isPositive: true },
  { name: 'Products', value: '48', icon: PackageSearch, trend: '4 Low Stock', isPositive: false },
];

const recentOrders: any[] = [];

export function AdminDashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-medium text-brand-black mb-2">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm">Welcome back. Here's what's happening with your store today.</p>
        </div>
        <Link 
          to="/"
          className="bg-brand-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-opacity-90 transition-all shadow-sm"
        >
          Return to Website
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">
                <stat.icon size={20} className="text-brand-navy" />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-gray-500 uppercase tracking-widest text-[10px] font-semibold mb-1">{stat.name}</p>
              <h3 className="font-playfair text-3xl font-medium text-brand-black">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-semibold uppercase tracking-wider text-sm text-brand-black">Recent Orders</h2>
            <Link to="/admin/orders" className="text-xs text-brand-navy hover:underline font-medium flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center border-t border-gray-100">
              <PackageSearch size={48} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-playfair font-medium mb-2">No Recent Orders</h3>
              <p className="text-gray-500 text-sm max-w-md">There are currently no recent orders to display.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Order ID</th>
                    <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Customer</th>
                    <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                    <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Total</th>
                    <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-brand-navy">{order.id}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{order.customer}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{order.date}</td>
                      <td className="py-4 px-6 text-sm font-medium">{order.total}</td>
                      <td className="py-4 px-6">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'Shipped' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Quick Actions & Notifications */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold uppercase tracking-wider text-sm text-brand-black mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/admin/products" className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-brand-navy hover:text-brand-navy transition-all group">
                <span className="text-sm font-medium">Add New Product</span>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-brand-navy" />
              </Link>
              <Link to="/admin/products" className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-brand-navy hover:text-brand-navy transition-all group">
                <span className="text-sm font-medium">Create Collection</span>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-brand-navy" />
              </Link>
              <Link to="/admin/content" className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-brand-navy hover:text-brand-navy transition-all group">
                <span className="text-sm font-medium">Edit Home Page</span>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-brand-navy" />
              </Link>
            </div>
          </div>
          
          <div className="bg-brand-navy text-white rounded-xl shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp size={100} />
            </div>
            <h2 className="font-playfair text-xl font-medium mb-2 relative z-10">Monthly Target</h2>
            <p className="text-white/70 text-sm mb-4 relative z-10">You're on track to hit your sales goal this month.</p>
            <div className="relative z-10">
              <div className="flex justify-between text-sm mb-1">
                <span>₦85,000</span>
                <span className="font-semibold">₦100,000</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full w-[85%]"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
