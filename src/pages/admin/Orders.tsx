import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Package, Search, Download } from 'lucide-react';

export function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Order ID,Customer,Date,Total,Status\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-medium text-brand-black mb-1">Orders</h1>
          <p className="text-gray-500 text-sm">View and manage customer orders.</p>
        </div>
        <button 
          onClick={handleExport}
          className="bg-white border border-gray-200 text-brand-navy px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
        >
          <Download size={16} /> Export
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-12 text-center flex flex-col items-center justify-center">
          <Package size={48} className="text-gray-300 mb-4" />
          <h3 className="text-xl font-playfair font-medium mb-2">No Orders Found</h3>
          <p className="text-gray-500 text-sm max-w-md">Your recent orders will appear here. Currently, there are no orders to display.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Order ID</th>
                  <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Customer</th>
                  <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                  <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Total</th>
                  <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-brand-navy">{order.id}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{order.customer}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{order.date}</td>
                    <td className="py-4 px-6 text-sm font-medium">{order.total}</td>
                    <td className="py-4 px-6">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
