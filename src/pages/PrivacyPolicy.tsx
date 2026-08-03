import { motion } from "motion/react";

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-brand-white pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-16">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl font-medium mb-4"
          >
            Privacy Policy
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
            <h2 className="font-playfair text-2xl font-medium text-brand-black mb-4">1. Introduction</h2>
            <p>At HONOURABLE NOVÈ, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
          </section>

          <section>
            <h2 className="font-playfair text-2xl font-medium text-brand-black mb-4">2. The Data We Collect About You</h2>
            <p>Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier, title, date of birth and gender.</li>
              <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Financial Data</strong> includes bank account and payment card details.</li>
              <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-playfair text-2xl font-medium text-brand-black mb-4">3. How We Use Your Personal Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
