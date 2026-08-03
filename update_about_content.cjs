const fs = require('fs');
let code = fs.readFileSync('src/pages/About.tsx', 'utf8');

code = code.replace(/import { motion } from "motion\/react";/, 'import { motion } from "motion/react";\nimport { useContent } from "../context/ContentContext";');

code = code.replace(/export function About\(\) {/, 'export function About() {\n  const { content } = useContent();');

// Replace Hero Background
code = code.replace(/src="https:\/\/images\.unsplash\.com\/photo-1591561954557-26941169b49e\?auto=format&fit=crop&q=80&w=1920"/, `src={content.about.heroImage}`);

// Replace Hero Title & Subtitle
code = code.replace(/Our Heritage/, `{content.about.heroTitle}`);
code = code.replace(/Redefining Modern Luxury/, `{content.about.heroSubtitle}`);

// Replace Philosophy Title & Text
code = code.replace(/The Philosophy/, `{content.about.philosophyTitle}`);
code = code.replace(/HONOURABLE NOVÈ was born from a singular vision: to create a brand that embodies the essence of luxury while maintaining accessibility\. We believe that true elegance lies in simplicity, quality craftsmanship, and timeless design\./, `{content.about.philosophyText1}`);
code = code.replace(/Our collections are carefully curated to offer pieces that transcend seasonal trends\. Each item is crafted with meticulous attention to detail, using only the finest materials sourced from around the globe\. We design for the modern individual who appreciates subtlety and demands excellence\./, `{content.about.philosophyText2}`);

// Replace Craftsmanship Title, Text, & Image
code = code.replace(/Uncompromising Craftsmanship/, `{content.about.craftsmanshipTitle}`);
code = code.replace(/Every stitch, every cut, and every finish is executed with precision\. We partner with master artisans who have honed their skills over generations, ensuring that each product not only meets but exceeds our rigorous standards\./, `{content.about.craftsmanshipText}`);
code = code.replace(/src="https:\/\/images\.unsplash\.com\/photo-1628149462151-507c39d569bf\?auto=format&fit=crop&q=80&w=800"/, `src={content.about.craftsmanshipImage}`);

fs.writeFileSync('src/pages/About.tsx', code);
