import { Link } from "react-router-dom";
import { motion } from "motion/react";

export function SizeGuide() {
  return (
    <div className="min-h-screen bg-brand-white pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-16">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl font-medium mb-4"
          >
            Size Guide
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 uppercase tracking-widest text-sm"
          >
            Find your perfect fit
          </motion.p>
        </div>

        <div className="space-y-16">
          {/* Clothing Size Guide */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl font-medium mb-8">Clothing (Men)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-gray/50">
                    <th className="py-4 px-6 font-semibold uppercase tracking-wider text-sm border-b border-gray-200">Size</th>
                    <th className="py-4 px-6 font-semibold uppercase tracking-wider text-sm border-b border-gray-200">Chest (cm)</th>
                    <th className="py-4 px-6 font-semibold uppercase tracking-wider text-sm border-b border-gray-200">Waist (cm)</th>
                    <th className="py-4 px-6 font-semibold uppercase tracking-wider text-sm border-b border-gray-200">Hip (cm)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium">S</td>
                    <td className="py-4 px-6">92 - 96</td>
                    <td className="py-4 px-6">76 - 80</td>
                    <td className="py-4 px-6">92 - 96</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium">M</td>
                    <td className="py-4 px-6">96 - 100</td>
                    <td className="py-4 px-6">80 - 84</td>
                    <td className="py-4 px-6">96 - 100</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium">L</td>
                    <td className="py-4 px-6">100 - 104</td>
                    <td className="py-4 px-6">84 - 88</td>
                    <td className="py-4 px-6">100 - 104</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium">XL</td>
                    <td className="py-4 px-6">104 - 110</td>
                    <td className="py-4 px-6">88 - 94</td>
                    <td className="py-4 px-6">104 - 110</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Shoes Size Guide */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl font-medium mb-8">Footwear</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-gray/50">
                    <th className="py-4 px-6 font-semibold uppercase tracking-wider text-sm border-b border-gray-200">EU</th>
                    <th className="py-4 px-6 font-semibold uppercase tracking-wider text-sm border-b border-gray-200">UK</th>
                    <th className="py-4 px-6 font-semibold uppercase tracking-wider text-sm border-b border-gray-200">US</th>
                    <th className="py-4 px-6 font-semibold uppercase tracking-wider text-sm border-b border-gray-200">Foot Length (cm)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium">40</td>
                    <td className="py-4 px-6">6</td>
                    <td className="py-4 px-6">7</td>
                    <td className="py-4 px-6">25.4</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium">41</td>
                    <td className="py-4 px-6">7</td>
                    <td className="py-4 px-6">8</td>
                    <td className="py-4 px-6">26.2</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium">42</td>
                    <td className="py-4 px-6">8</td>
                    <td className="py-4 px-6">9</td>
                    <td className="py-4 px-6">27.1</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium">43</td>
                    <td className="py-4 px-6">9</td>
                    <td className="py-4 px-6">10</td>
                    <td className="py-4 px-6">27.9</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium">44</td>
                    <td className="py-4 px-6">10</td>
                    <td className="py-4 px-6">11</td>
                    <td className="py-4 px-6">28.8</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section>

          <div className="p-8 bg-brand-gray/30 mt-8 border-l-4 border-brand-navy">
            <h3 className="font-playfair text-xl font-medium mb-2">Need assistance?</h3>
            <p className="text-gray-600 mb-4">Our sizing generally follows standard European sizing. If you are between sizes, we recommend sizing up. For personalized sizing advice, please contact our Style Advisors.</p>
            <Link to="/contact" className="text-brand-navy font-semibold uppercase tracking-wider text-sm border-b border-brand-navy pb-1">Contact Style Advisor</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
