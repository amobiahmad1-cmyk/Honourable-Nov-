const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/Products.tsx', 'utf8');

const oldMainImage = `                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Main Image URL</label>
                  <input type="url" name="image" required value={formData.image} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>`;

const newMainImage = `                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Main Image</label>
                  {formData.image && (
                    <div className="mb-3">
                      <img src={formData.image} alt="Main preview" className="w-24 h-24 object-cover rounded-lg border border-gray-200" onError={(e) => (e.currentTarget.style.display = 'none')} onLoad={(e) => (e.currentTarget.style.display = 'block')} />
                    </div>
                  )}
                  <input type="url" name="image" required value={formData.image} onChange={handleInputChange} placeholder="Enter image URL" className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>`;

const oldAllImages = `                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">All Images (comma separated URLs)</label>
                  <textarea name="images" required rows={2} value={formData.images} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>`;

const newAllImages = `                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">All Images</label>
                  {formData.images && (
                    <div className="flex gap-2 mb-3 overflow-x-auto py-1">
                      {formData.images.split(',').map((url, i) => url.trim() && (
                        <img key={i} src={url.trim()} alt={\`Gallery \${i}\`} className="w-16 h-16 object-cover rounded border border-gray-200 shrink-0" onError={(e) => (e.currentTarget.style.display = 'none')} onLoad={(e) => (e.currentTarget.style.display = 'block')} />
                      ))}
                    </div>
                  )}
                  <textarea name="images" required rows={2} value={formData.images} onChange={handleInputChange} placeholder="Enter comma separated image URLs" className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>`;

code = code.replace(oldMainImage, newMainImage);
code = code.replace(oldAllImages, newAllImages);

fs.writeFileSync('src/pages/admin/Products.tsx', code);
