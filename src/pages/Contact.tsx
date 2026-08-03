import { motion } from "motion/react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useContent } from "../context/ContentContext";

export function Contact() {
  const { content } = useContent();
  return (
    <div className="min-h-screen bg-brand-white pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 pt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl font-medium mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 uppercase tracking-widest text-sm"
          >
            We're here to assist you
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-playfair text-2xl font-medium mb-8">Send a Message</h2>
            <form 
              className="space-y-6" 
              onSubmit={e => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const name = fd.get('name');
                const email = fd.get('email');
                const subject = fd.get('subject');
                const message = fd.get('message');
                const text = `Hello HONOURABLE NOVÈ,\n\nMy name is ${name} (${email}).\n\nSubject: ${subject}\n\nMessage:\n${message}`;
                const encoded = encodeURIComponent(text);
                window.open(`https://wa.me/${content.contact.phone.replace(/[^0-9]/g, '')}?text=${encoded}`, '_blank');
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold uppercase tracking-wider text-gray-700 mb-2">Name</label>
                  <input type="text" id="name" name="name" className="w-full bg-transparent border-b border-gray-300 pb-3 focus:outline-none focus:border-brand-navy transition-colors text-brand-black" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold uppercase tracking-wider text-gray-700 mb-2">Email</label>
                  <input type="email" id="email" name="email" className="w-full bg-transparent border-b border-gray-300 pb-3 focus:outline-none focus:border-brand-navy transition-colors text-brand-black" required />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold uppercase tracking-wider text-gray-700 mb-2">Subject</label>
                <input type="text" id="subject" name="subject" className="w-full bg-transparent border-b border-gray-300 pb-3 focus:outline-none focus:border-brand-navy transition-colors text-brand-black" required />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold uppercase tracking-wider text-gray-700 mb-2">Message</label>
                <textarea id="message" name="message" rows={4} className="w-full bg-transparent border-b border-gray-300 pb-3 focus:outline-none focus:border-brand-navy transition-colors text-brand-black resize-none" required></textarea>
              </div>
              
              <button type="submit" className="bg-brand-navy text-white px-10 py-4 uppercase tracking-widest font-semibold text-sm hover:bg-opacity-90 transition-all mt-4 w-full md:w-auto">
                Send to WhatsApp
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h2 className="font-playfair text-2xl font-medium mb-8">Get in Touch</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-gray flex items-center justify-center flex-shrink-0 text-brand-navy">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Address</h3>
                    <p className="text-gray-600 leading-relaxed max-w-xs">
                      {content.contact.address}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-gray flex items-center justify-center flex-shrink-0 text-brand-navy">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Phone</h3>
                    <p className="text-gray-600">
                      {content.contact.phone}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-gray flex items-center justify-center flex-shrink-0 text-brand-navy">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Email</h3>
                    <p className="text-gray-600">
                      {content.contact.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Business Hours</h3>
              <p className="text-gray-600">{content.contact.businessHours}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
