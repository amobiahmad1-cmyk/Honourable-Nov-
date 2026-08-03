import { motion } from "motion/react";

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-brand-white pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-16">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl font-medium mb-4"
          >
            Terms of Service
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 uppercase tracking-widest text-sm"
          >
            Last updated: {new Date().toLocaleDateString()}
          </motion.p>
        </div>

        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-8">
          <section>
            <h2 className="font-playfair text-2xl font-medium text-brand-black mb-4">1. Agreement to Terms</h2>
            <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and HONOURABLE NOVÈ ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.</p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl font-medium text-brand-black mb-4">2. Products and Pricing</h2>
            <p>All products are subject to availability. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change. We have made every effort to display as accurately as possible the colors and images of our products that appear on the website.</p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl font-medium text-brand-black mb-4">3. Purchases and Payment</h2>
            <p>We accept various forms of payment including major credit cards and PayPal. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
