const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/Dashboard.tsx', 'utf8');

// replace recentOrders with empty array just to show it handles it, or just leave the data but add empty state
code = code.replace(
  /<div className="overflow-x-auto">[\s\S]*?<\/table>\s*<\/div>/,
  `{recentOrders.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center border-t border-gray-100">
              <PackageSearch size={48} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-playfair font-medium mb-2">No Recent Orders</h3>
              <p className="text-gray-500 text-sm max-w-md">There are currently no recent orders to display.</p>
            </div>
          ) : (
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
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-brand-navy">{order.id}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{order.customer}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{order.date}</td>
                      <td className="py-4 px-6 text-sm font-medium">{order.total}</td>
                      <td className="py-4 px-6">
                        <span className={\`text-xs font-medium px-2.5 py-1 rounded-full \${
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'Shipped' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }\`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}`
);

// We will also empty the array so the empty state is visible
code = code.replace(/const recentOrders = \[[\s\S]*?\];/, 'const recentOrders: any[] = [];');

fs.writeFileSync('src/pages/admin/Dashboard.tsx', code);
