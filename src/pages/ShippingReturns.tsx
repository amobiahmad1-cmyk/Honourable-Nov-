import { motion } from "motion/react";

export function ShippingReturns() {
  return (
    <div className="min-h-screen bg-brand-white pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-16">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl font-medium mb-4"
          >
            Shipping & Returns
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 uppercase tracking-widest text-sm"
          >
            Delivery information and policies
          </motion.p>
        </div>

        <div className="space-y-16">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl font-medium mb-6">Shipping Policies</h2>
            <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
              <p>
                We offer complimentary express shipping on all orders over ₦500,000. All our deliveries are climate compensated and shipped using premium logistics partners to ensure your pieces arrive in perfect condition.
              </p>
              
              <h3 className="text-lg font-semibold uppercase tracking-wider text-brand-black mt-8 mb-4">Delivery Times & Costs</h3>
              <ul className="space-y-4 list-disc pl-5">
                <li><strong>Standard Delivery:</strong> 3-5 business days (₦15,000 or complimentary over ₦500,000)</li>
                <li><strong>Express Delivery:</strong> 1-2 business days (₦25,000)</li>
                <li><strong>Same Day Delivery:</strong> Available in select metropolitan areas for orders placed before 12 PM (₦45,000)</li>
              </ul>
              
              <p>
                Please note that all orders are dispatched from our central distribution center. Orders placed during weekends or public holidays will be processed on the following business day.
              </p>
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl font-medium mb-6">Return Policies</h2>
            <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
              <p>
                We hope you are delighted with your purchase. If you are not perfectly satisfied, you may request a return for your item(s) within 30 days of receiving your order.
              </p>
              
              <h3 className="text-lg font-semibold uppercase tracking-wider text-brand-black mt-8 mb-4">Conditions for Return</h3>
              <ul className="space-y-4 list-disc pl-5">
                <li>Items must be returned in their original condition, unworn, unwashed, and with all tags attached.</li>
                <li>Shoes must be tried on a carpeted surface and returned in their original, undamaged shoe box.</li>
                <li>Bags and accessories must be returned with their original dust bags and authenticity cards.</li>
                <li>Personalized or made-to-order items cannot be returned or exchanged.</li>
              </ul>
              
              <h3 className="text-lg font-semibold uppercase tracking-wider text-brand-black mt-8 mb-4">How to Return</h3>
              <p>
                To initiate a return, please log in to your account and navigate to the 'Orders' section, or contact our customer care team. We offer complimentary return shipping via our courier partners.
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
