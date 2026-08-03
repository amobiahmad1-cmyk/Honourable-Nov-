const fs = require('fs');
let code = fs.readFileSync('src/components/HeroSlider.tsx', 'utf8');

code = code.replace(/import { cn } from "\.\.\/lib\/utils";/, 'import { cn } from "../lib/utils";\nimport { useContent } from "../context/ContentContext";');

code = code.replace(/export function HeroSlider\(\) \{/, 'export function HeroSlider() {\n  const { content } = useContent();');

code = code.replace(/const SLIDES = \[/, 'const RAW_SLIDES = [');

code = code.replace(/const \[currentSlide, setCurrentSlide\] = useState\(0\);/, `  const SLIDES = [
    {
      id: 1,
      image: content.home.heroImage,
      title: content.home.heroTitle,
      subtitle: content.home.heroSubtitle,
      cta: "Shop Collection",
      link: "/shop"
    },
    RAW_SLIDES[1],
    RAW_SLIDES[2]
  ];
  const [currentSlide, setCurrentSlide] = useState(0);`);

fs.writeFileSync('src/components/HeroSlider.tsx', code);
