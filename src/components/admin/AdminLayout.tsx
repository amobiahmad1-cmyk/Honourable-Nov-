import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  LogOut,
  FileText,
  Menu,
  X,
  Search,
  Bell,
  Mail,
  Image as ImageIcon,
  Star,
  Users,
  Layout, Globe
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { cn } from '../../lib/utils';

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Orders', path: '/admin/orders', icon: Package },
  { name: 'Products', path: '/admin/products', icon: Package },
  { name: 'Customers', path: '/admin/customers', icon: Users },
  { name: 'Messages', path: '/admin/messages', icon: Mail },
  { name: 'Media', path: '/admin/media', icon: ImageIcon },
  { name: 'Pages', path: '/admin/pages', icon: Layout },
  { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
  { name: 'Content Manager', path: '/admin/content', icon: FileText },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { adminLogout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-brand-navy text-white flex-shrink-0 z-20 overflow-hidden flex flex-col"
          >
            <div className="p-6 h-20 flex items-center border-b border-white/10 shrink-0">
              <Link to="/admin" className="font-playfair text-2xl font-medium tracking-wide">
                HONOURABLE NOVÈ
              </Link>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4">
              {sidebarLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path));
                return (
                  <Link 
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all uppercase tracking-wider text-xs font-semibold",
                      isActive ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <link.icon size={18} />
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="p-4 border-t border-white/10 shrink-0">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-all uppercase tracking-wider text-xs font-semibold text-white/60 hover:bg-white/5 hover:text-white"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-gray-500 hover:text-brand-navy hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full border border-gray-200 focus-within:border-brand-navy focus-within:bg-white transition-all">
              <Search size={16} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search everywhere..."
                className="bg-transparent border-none focus:outline-none text-sm w-64 text-brand-black placeholder-gray-400"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            
            <Link to="/" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-brand-navy border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-100 transition-all">
              <Globe size={16} /> View Store
            </Link>
            <Link to="/admin/notifications"
 className="p-2 text-gray-500 hover:text-brand-navy hover:bg-gray-100 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Link>
            <div className="h-8 w-8 rounded-full bg-brand-navy text-white flex items-center justify-center font-playfair font-medium text-sm">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
