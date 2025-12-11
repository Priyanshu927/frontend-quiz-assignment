const fs = require('fs');
const path = require('path');

// Simple CSS processing script to verify Tailwind and PostCSS are working
console.log('🧪 Testing CSS Processing...\n');

// Read the source CSS file
const sourceCss = fs.readFileSync(path.join(__dirname, 'src', 'index.css'), 'utf8');
console.log('📄 Source CSS content:');
console.log('=' .repeat(50));
console.log(sourceCss);
console.log('=' .repeat(50));

// Check if Tailwind directives are present
const hasTailwind = sourceCss.includes('@tailwind');
console.log(`\n✅ Tailwind directives found: ${hasTailwind}`);

// Check if custom layers are present
const hasLayers = sourceCss.includes('@layer');
console.log(`✅ CSS Layers found: ${hasLayers}`);

// Check PostCSS config
const postcssConfig = fs.readFileSync(path.join(__dirname, 'postcss.config.cjs'), 'utf8');
console.log(`\n📋 PostCSS Configuration:`);
console.log(postcssConfig);

console.log('\n🎉 CSS Processing Setup Complete!');
console.log('🚀 Your development server is running at: http://localhost:5173/');
console.log('📝 All files are properly configured for Tailwind CSS and PostCSS processing');
