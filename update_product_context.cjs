const fs = require('fs');
let code = fs.readFileSync('src/context/ProductContext.tsx', 'utf8');

code = code.replace(/          \/\/ Fallback if empty or not set up\n          const saved = localStorage\.getItem\('storeProducts'\);\n          setProducts\(saved \? JSON\.parse\(saved\) : PRODUCTS\);/g, `          if (data && data.length > 0) {
            setProducts(data);
          } else {
            // First time setup: insert default products if empty
            const { error: insertError } = await supabase.from('products').insert(PRODUCTS);
            if (!insertError) {
              setProducts(PRODUCTS);
            }
          }`);

// Let's just rewrite the whole ProductContext to be clean
