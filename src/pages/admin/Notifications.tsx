import { motion } from 'motion/react';
import { Bell } from 'lucide-react';

export function AdminNotifications() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-medium text-brand-black mb-1">Notifications</h1>
          <p className="text-gray-500 text-sm">View recent alerts, updates, and system messages.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-12 text-center flex flex-col items-center justify-center">
        <Bell size={48} className="text-gray-300 mb-4" />
        <h3 className="text-xl font-playfair font-medium mb-2">No New Notifications</h3>
        <p className="text-gray-500 text-sm max-w-md">You're all caught up! New alerts will appear here.</p>
      </div>
    </div>
  );
}
