const fs = require('fs');
let code = fs.readFileSync('src/pages/Contact.tsx', 'utf8');

code = code.replace(/import { Mail, Phone, MapPin } from "lucide-react";/, 'import { Mail, Phone, MapPin } from "lucide-react";\nimport { useContent } from "../context/ContentContext";');

code = code.replace(/export function Contact\(\) {/, 'export function Contact() {\n  const { content } = useContent();');

// Replace contact fields
code = code.replace(/Zone 11, Agbede, Oke Odo, Tanke, Ilorin, Kwara State, Nigeria/, `{content.contact.address}`);
code = code.replace(/\+234 907 943 9075/, `{content.contact.phone}`);
code = code.replace(/amobiahmad1@gmail\.com/, `{content.contact.email}`);
code = code.replace(/We are available 24\/7 to assist you with any inquiries\./, `{content.contact.businessHours}`);

// Update WhatsApp number logic
code = code.replace(/https:\/\/wa\.me\/2349079439075/, `https://wa.me/\${content.contact.phone.replace(/[^0-9]/g, '')}`);

fs.writeFileSync('src/pages/Contact.tsx', code);
