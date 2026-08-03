import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface ContentState {
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
  };
  about: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    philosophyTitle: string;
    philosophyText1: string;
    philosophyText2: string;
    craftsmanshipTitle: string;
    craftsmanshipText: string;
    craftsmanshipImage: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    businessHours: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
}

const defaultContent: ContentState = {
  home: {
    heroTitle: "THE NEW ESSENTIALS",
    heroSubtitle: "Discover our latest collection of premium menswear, crafted for the modern gentleman.",
    heroImage: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?auto=format&fit=crop&q=80&w=1920"
  },
  about: {
    heroTitle: "Our Heritage",
    heroSubtitle: "Redefining Modern Luxury",
    heroImage: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=1920",
    philosophyTitle: "The Philosophy",
    philosophyText1: "HONOURABLE NOVÈ was born from a singular vision: to create a brand that embodies the essence of luxury while maintaining accessibility. We believe that true elegance lies in simplicity, quality craftsmanship, and timeless design.",
    philosophyText2: "Our collections are carefully curated to offer pieces that transcend seasonal trends. Each item is crafted with meticulous attention to detail, using only the finest materials sourced from around the globe. We design for the modern individual who appreciates subtlety and demands excellence.",
    craftsmanshipTitle: "Uncompromising Craftsmanship",
    craftsmanshipText: "Every stitch, every cut, and every finish is executed with precision. We partner with master artisans who have honed their skills over generations, ensuring that each product not only meets but exceeds our rigorous standards.",
    craftsmanshipImage: "https://images.unsplash.com/photo-1628149462151-507c39d569bf?auto=format&fit=crop&q=80&w=800"
  },
  contact: {
    address: "Zone 11, Agbede, Oke Odo, Tanke, Ilorin, Kwara State, Nigeria",
    phone: "+234 907 943 9075",
    email: "amobiahmad1@gmail.com",
    businessHours: "We are available 24/7 to assist you with any inquiries."
  },
  faq: [
    {
      question: "What are your shipping destinations?",
      answer: "We offer worldwide shipping to over 150 countries. Shipping costs and delivery times vary depending on the destination. You can view the specific options for your location during checkout."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order has been dispatched, you will receive a confirmation email containing a tracking number and a link to monitor your delivery status. You can also view your order status in the 'Orders' section of your account."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of delivery for a full refund or exchange, provided the item is unworn, unwashed, and retains all original tags and packaging. Please visit our Shipping & Returns page for more details."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes, all our products are delivered in our signature luxury packaging. You can also select the 'Gift' option during checkout to include a personalized message and ensure no prices are displayed on the receipt."
    },
    {
      question: "How do I care for my leather goods?",
      answer: "We recommend keeping leather products away from direct sunlight, heat, and moisture. Store them in the provided dust bag when not in use. For cleaning, use a soft, dry cloth and a specialized leather conditioner."
    }
  ]
};

interface ContentContextType {
  content: ContentState;
  updateContent: (section: keyof ContentState, newContent: any) => void;
  loading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentState>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase.from('content_settings').select('key, value');
        if (error) throw error;
        
        if (data && data.length > 0) {
          const loadedContent: any = { ...defaultContent };
          data.forEach(item => {
            if (item.key && item.value) {
              loadedContent[item.key] = item.value;
            }
          });
          setContent(loadedContent);
        } else {
          const saved = localStorage.getItem('storeContent');
          if (saved) setContent(JSON.parse(saved));
        }
      } catch (err) {
        console.warn('Supabase fetch failed for content (table might not exist). Falling back to local storage.', err);
        const saved = localStorage.getItem('storeContent');
        if (saved) setContent(JSON.parse(saved));
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('storeContent', JSON.stringify(content));
    }
  }, [content, loading]);

  const updateContent = async (section: keyof ContentState, newContent: any) => {
    setContent(prev => ({
      ...prev,
      [section]: newContent
    }));
    
    try {
      const { error } = await supabase
        .from('content_settings')
        .upsert({ key: section, value: newContent }, { onConflict: 'key' });
      if (error) console.error("Error updating content in Supabase:", error);
    } catch (err) {}
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, loading }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
};
