import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem } from './CartContext';
import { supabase } from '../lib/supabase';

export type OrderStatus = 'pending' | 'approved' | 'delivered';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (items: CartItem[], total: number) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  loading: boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase.from('orders').select('*').order('date', { ascending: false });
        if (error) throw error;
        
        if (data && data.length > 0) {
          setOrders(data);
        }
      } catch (err) {
        console.error('Supabase fetch failed for orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const addOrder = async (items: CartItem[], total: number) => {
    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      items,
      total,
      status: 'pending'
    };
    
    setOrders(current => [newOrder, ...current]);
    
    try {
      const { error } = await supabase.from('orders').insert([newOrder]);
      if (error) console.error("Error adding order to Supabase:", error);
    } catch (err) {}
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    setOrders(current => 
      current.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
    
    try {
      const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
      if (error) console.error("Error updating order status in Supabase:", error);
    } catch (err) {}
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, loading }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within OrderProvider');
  return context;
};
