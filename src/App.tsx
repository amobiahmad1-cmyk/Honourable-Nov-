import { ContentProvider } from "./context/ContentContext";
import { ProductProvider } from "./context/ProductContext";
import { AdminNotifications } from "./pages/admin/Notifications";
import { AdminOrders } from "./pages/admin/Orders";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { ProductDetails } from "./pages/ProductDetails";
import { Orders } from "./pages/Orders";
import { FAQ } from "./pages/FAQ";
import { ShippingReturns } from "./pages/ShippingReturns";
import { SizeGuide } from "./pages/SizeGuide";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { CartDrawer } from "./components/CartDrawer";
import { AuthModal } from "./components/AuthModal";

// Admin
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminLogin } from "./pages/admin/Login";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { AdminProducts } from "./pages/admin/Products";
import { AdminContentManager } from "./pages/admin/ContentManager";
import { AdminSettings } from "./pages/admin/Settings";
import { AdminMessages } from "./pages/admin/Messages";
import { AdminMedia } from "./pages/admin/Media";
import { AdminCustomers } from "./pages/admin/Customers";
import { AdminPages } from "./pages/admin/Pages";
import { AdminTestimonials } from "./pages/admin/Testimonials";
import { AdminProtectedRoute } from "./components/admin/AdminProtectedRoute";

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CartDrawer />
      <AuthModal />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <AuthProvider>
        <ContentProvider>
        <ProductProvider>
        <OrderProvider>
          <CartProvider>
            <Router>
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route element={<AdminProtectedRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/notifications" element={<AdminNotifications />} />
                    <Route path="/admin/orders" element={<AdminOrders />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/customers" element={<AdminCustomers />} />
                    <Route path="/admin/messages" element={<AdminMessages />} />
                    <Route path="/admin/media" element={<AdminMedia />} />
                    <Route path="/admin/pages" element={<AdminPages />} />
                    <Route path="/admin/testimonials" element={<AdminTestimonials />} />
                    <Route path="/admin/content" element={<AdminContentManager />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                  </Route>
                </Route>

                {/* Public Routes */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/shipping-returns" element={<ShippingReturns />} />
                  <Route path="/size-guide" element={<SizeGuide />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                </Route>
              </Routes>
            </Router>
          </CartProvider>
        </OrderProvider>
        </ProductProvider>
        </ContentProvider>
      </AuthProvider>
    </AdminAuthProvider>
  );
}
