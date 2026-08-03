import { motion } from 'motion/react';
import { Users, Search, Download } from 'lucide-react';

export function AdminCustomers() {
  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Name,Email,Date\nJohn Doe,john@example.com,2023-10-24\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "customers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-medium text-brand-black mb-1">Customers</h1>
          <p className="text-gray-500 text-sm">View and manage your store's registered customers.</p>
        </div>
        <button 
          onClick={handleExport}
          className="bg-white border border-gray-200 text-brand-navy px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
        >
          <Download size={16} /> Export
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-12 text-center flex flex-col items-center justify-center">
        <Users size={48} className="text-gray-300 mb-4" />
        <h3 className="text-xl font-playfair font-medium mb-2">No Customers Found</h3>
        <p className="text-gray-500 text-sm max-w-md">Your customer list will appear here once users start registering and placing orders.</p>
      </div>
    </div>
  );
}
