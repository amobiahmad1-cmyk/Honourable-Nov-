export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  isNew?: boolean;
  sizes?: string[];
  colors?: string[];
  videoUrl?: string;
  stock?: number;
  status?: string;
  isFeatured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Classic Chronograph Watch",
    category: "Watches",
    price: 1250,
    originalPrice: 1500,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1599643478524-fb66f70a00ea?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A timeless masterpiece featuring a minimalist black dial, stainless steel case, and a premium leather strap. Designed for the modern gentleman who values precision and elegance.",
    isNew: true,
    colors: ["Black", "Silver", "Gold"]
  },
  {
    id: "p2",
    name: "Signature Leather Tote",
    category: "Bags",
    price: 850,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Crafted from Italian full-grain leather, this spacious tote bag combines everyday functionality with uncompromising luxury. Features gold-tone hardware and a soft suede interior.",
    colors: ["Tan", "Black", "Navy"]
  },
  {
    id: "p3",
    name: "Aviator Sunglasses",
    category: "Accessories",
    price: 320,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Polarized lenses framed in lightweight titanium. These aviator sunglasses offer 100% UV protection with a timeless silhouette suitable for any occasion.",
    isNew: true
  },
  {
    id: "p4",
    name: "Midnight Velvet Loafers",
    category: "Shoes",
    price: 540,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Handcrafted in Italy, these velvet loafers feature a sleek profile with subtle grosgrain trim. Perfect for evening wear and formal events.",
    sizes: ["40", "41", "42", "43", "44"]
  },
  {
    id: "p5",
    name: "Essential Leather Belt",
    category: "Accessories",
    price: 180,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A versatile leather belt with a brushed matte buckle. Made from vegetable-tanned leather that develops a beautiful patina over time.",
    sizes: ["32", "34", "36", "38"],
    colors: ["Black", "Brown"]
  },
  {
    id: "p6",
    name: "Noir Essence Perfume",
    category: "Lifestyle",
    price: 210,
    image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800"
    ],
    description: "An intoxicating blend of dark woods, subtle spices, and rich vanilla. Housed in a minimalist glass flacon, it's the signature scent of sophistication.",
    isNew: true
  },
  {
    id: "p7",
    name: "Premium Cashmere Sweater",
    category: "Clothing",
    price: 350,
    image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Ultra-soft, 100% cashmere sweater designed with a relaxed fit. The perfect layering piece for transitional weather, offering unmatched comfort and understated elegance.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Grey", "Cream"]
  },
  {
    id: "p8",
    name: "Minimalist Cuff Bracelet",
    category: "Jewelry",
    price: 290,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A sleek, understated cuff bracelet cast in solid sterling silver. Designed to be worn alone or stacked for a subtle statement.",
    colors: ["Silver", "Gold", "Rose Gold"]
  },
  {
    id: "p9",
    name: "Classic Oxford Shirt",
    category: "Clothing",
    price: 145,
    image: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Tailored from premium Egyptian cotton, this Oxford shirt features a crisp collar and Mother of Pearl buttons. A wardrobe staple that perfectly balances formal and casual.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Light Blue"]
  }
];

export const CATEGORIES = [
  "All",
  "Clothing",
  "Shoes",
  "Watches",
  "Bags",
  "Accessories",
  "Jewelry",
  "Lifestyle"
];
