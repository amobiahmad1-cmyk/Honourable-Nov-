const fs = require('fs');
let code = fs.readFileSync('src/pages/FAQ.tsx', 'utf8');

code = code.replace(/import { motion } from "motion\/react";/, 'import { motion } from "motion/react";\nimport { useContent } from "../context/ContentContext";');

code = code.replace(/export function FAQ\(\) \{[\s\S]*?const faqs = \[[\s\S]*?\];/, 'export function FAQ() {\n  const { content } = useContent();\n  const faqs = content.faq;');

fs.writeFileSync('src/pages/FAQ.tsx', code);
