const fs = require('fs');
let code = fs.readFileSync('src/pages/ProductDetails.tsx', 'utf8');

const imagesBlock = `        {/* Images */}
        <div className="w-full md:w-1/2 flex flex-col md:flex-row-reverse gap-4">
          <div className="flex-1 bg-brand-gray aspect-[3/4] overflow-hidden">
            <motion.img 
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={product.images[activeImage] || product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 flex-shrink-0">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={cn(
                  "w-20 md:w-full aspect-[3/4] flex-shrink-0 bg-brand-gray border transition-colors",
                  activeImage === idx ? "border-brand-navy" : "border-transparent"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>`;

const imagesBlockWithVideo = `        {/* Images & Video */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row-reverse gap-4">
            <div className="flex-1 bg-brand-gray aspect-[3/4] overflow-hidden">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={product.images[activeImage] || product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 flex-shrink-0">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "w-20 md:w-full aspect-[3/4] flex-shrink-0 bg-brand-gray border transition-colors",
                    activeImage === idx ? "border-brand-navy" : "border-transparent"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Video Section */}
          {product.videoUrl && (
            <div className="w-full mt-2">
              <h3 className="text-sm uppercase tracking-widest font-semibold mb-3">Product Video</h3>
              <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                {product.videoUrl.includes('youtube.com') || product.videoUrl.includes('youtu.be') ? (
                  <iframe 
                    className="w-full h-full"
                    src={product.videoUrl.includes('v=') ? "https://www.youtube.com/embed/" + product.videoUrl.split('v=')[1].split('&')[0] : product.videoUrl.includes('youtu.be/') ? "https://www.youtube.com/embed/" + product.videoUrl.split('youtu.be/')[1].split('?')[0] : product.videoUrl} 
                    title="Product Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video 
                    controls 
                    className="w-full h-full object-cover"
                    src={product.videoUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          )}
        </div>`;

code = code.replace(imagesBlock, imagesBlockWithVideo);
fs.writeFileSync('src/pages/ProductDetails.tsx', code);
