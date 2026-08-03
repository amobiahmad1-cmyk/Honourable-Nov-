import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../data';

export interface CartItem extends Product {
  cartId: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const clearCart = () => {
    setItems([]);
  };

  const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
    setItems(current => {
      const defaultSize = size || (product.sizes?.length ? product.sizes[0] : undefined);
      const defaultColor = color || (product.colors?.length ? product.colors[0] : undefined);
      const cartId = `${product.id}-${defaultSize || ''}-${defaultColor || ''}`;
      
      const existing = current.find(item => item.cartId === cartId);
      if (existing) {
        return current.map(item => 
          item.cartId === cartId 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...current, { 
        ...product, 
        cartId, 
        quantity, 
        selectedSize: defaultSize, 
        selectedColor: defaultColor 
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setItems(current => current.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setItems(current => 
      current.map(item => 
        item.cartId === cartId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      isCartOpen, 
      setIsCartOpen, 
      cartTotal, 
      cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
