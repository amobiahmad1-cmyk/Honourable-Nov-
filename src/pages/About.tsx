import { motion } from "motion/react";
import { useContent } from "../context/ContentContext";

export function About() {
  const { content } = useContent();
  return (
    <div className="min-h-screen bg-brand-white">
      {/* Hero */}
      <div className="relative h-[60vh] bg-brand-black flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={content.about.heroImage} 
            alt="About HONOURABLE NOVÈ" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl md:text-7xl font-medium text-white mb-4"
          >
            {content.about.heroTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 uppercase tracking-[0.2em] text-sm md:text-base font-semibold"
          >
            {content.about.heroSubtitle}
          </motion.p>
        </div>
      </div>

      {/* Story */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-playfair text-3xl font-medium mb-8">{content.about.philosophyTitle}</h2>
        <p className="text-gray-600 leading-relaxed text-lg mb-8">
          {content.about.philosophyText1}
        </p>
        <p className="text-gray-600 leading-relaxed text-lg">
          {content.about.philosophyText2}
        </p>
      </section>

      {/* Imagery & Values */}
      <section className="py-24 bg-brand-gray/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-playfair text-3xl font-medium mb-6">{content.about.craftsmanshipTitle}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {content.about.craftsmanshipText}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-navy mt-2" />
                  <span className="text-gray-600">Sustainably sourced premium materials.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-navy mt-2" />
                  <span className="text-gray-600">Ethical manufacturing processes.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-navy mt-2" />
                  <span className="text-gray-600">Designed to last a lifetime.</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src={content.about.craftsmanshipImage} 
                alt="Craftsmanship" 
                className="w-full aspect-[4/5] object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
