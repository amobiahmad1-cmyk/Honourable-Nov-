import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useContent } from "../context/ContentContext";

export function FAQ() {
  const { content } = useContent();
  const faqs = content.faq;

  return (
    <div className="min-h-screen bg-brand-white pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-16">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl font-medium mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 uppercase tracking-widest text-sm"
          >
            We're here to help
          </motion.p>
        </div>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-200 pb-8"
            >
              <h3 className="font-playfair text-xl font-medium mb-4">{faq.question}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center border-t border-gray-200 pt-16">
          <h3 className="font-playfair text-2xl font-medium mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-8">Our customer care team is available 24/7 to assist you.</p>
          <Link to="/contact" className="inline-block bg-brand-navy text-white px-10 py-4 uppercase tracking-widest font-semibold text-sm hover:bg-opacity-90 transition-all">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
