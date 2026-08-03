const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/Products.tsx', 'utf8');

// Update formData initialization
code = code.replace(
  /sizes: ''\n  }\);/,
  `sizes: '',\n    videoUrl: ''\n  });`
);

// Update openEditModal
code = code.replace(
  /sizes: product\.sizes \? product\.sizes\.join\(', '\) : ''\n    \}\);/,
  `sizes: product.sizes ? product.sizes.join(', ') : '',\n      videoUrl: product.videoUrl || ''\n    });`
);

// Update handleAddProduct
code = code.replace(
  /sizes: formData\.sizes\.split\(','\)\.map\(s => s\.trim\(\)\)\.filter\(Boolean\),\n    \};/,
  `sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),\n      videoUrl: formData.videoUrl.trim() || undefined,\n    };`
);

// Update handleEditProduct
code = code.replace(
  /sizes: formData\.sizes\.split\(','\)\.map\(s => s\.trim\(\)\)\.filter\(Boolean\),\n    \};/,
  `sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),\n      videoUrl: formData.videoUrl.trim() || undefined,\n    };`
);

// Add form field below sizes
const sizesField = `<label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Sizes (comma separated)</label>
                    <input type="text" name="sizes" value={formData.sizes} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                  </div>
                </div>`;

const videoField = `${sizesField}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Video URL (Optional)</label>
                  <input type="url" name="videoUrl" value={formData.videoUrl} onChange={handleInputChange} placeholder="Enter video or YouTube URL" className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>`;

code = code.replace(sizesField, videoField);

fs.writeFileSync('src/pages/admin/Products.tsx', code);
