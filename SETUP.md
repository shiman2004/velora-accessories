# 🚀 Velora Accessories - Installation & Setup

## ⚡ Quick Start (2 Minutes)

```bash
# 1. Navigate to the project folder
cd velora-accessories

# 2. Install all dependencies
npm install

# 3. Start the development server
npm run dev
```

**That's it!** Your site will open at `http://localhost:3000` 🎉

---

## 📋 What You Get

✅ **Complete E-Commerce Site**
- Modern, minimal design with gold accents
- Product showcase with filtering
- Full admin panel for management

✅ **8 Sample Products**
- Gold earrings, necklaces, bracelets, etc.
- Pre-configured with prices and availability

✅ **Admin Panel Features**
- Add, edit, delete products
- Toggle availability status
- Real-time inventory tracking
- All in an beautiful modal interface

✅ **Data Persistence**
- All changes auto-saved to browser storage
- No backend server needed
- Data persists across sessions

✅ **Fully Responsive**
- Works on desktop, tablet, mobile
- Beautiful on any screen size

✅ **Production Ready**
- Clean, organized code
- Best practices implemented
- Ready to deploy

---

## 📂 Project Contents

### 22 Files Total:
- **3 Documentation files** (README, QUICKSTART, PROJECT_GUIDE)
- **7 React Components** (Header, ProductCard, ProductGrid, etc.)
- **6 CSS files** (Beautiful, responsive styling)
- **1 Custom Hook** (Product management)
- **1 Data file** (Sample products)
- **3 Config files** (package.json, vite.config.js, index.html)

---

## 🎯 Getting Started Steps

### Step 1️⃣: Install Dependencies
```bash
npm install
```
This downloads React, Vite, and all necessary packages (~250MB)

### Step 2️⃣: Run Development Server
```bash
npm run dev
```
Your browser automatically opens the site

### Step 3️⃣: Explore the App
- Browse products on the homepage
- Click category buttons to filter
- Click **"Admin Panel"** button (top right) to manage products

### Step 4️⃣: Test Admin Panel
- Add a new product
- Edit an existing product
- Delete a product
- Toggle availability status

---

## 🎮 Using the Admin Panel

### Access
Click **"Admin Panel"** button in the top-right corner

### Features

**📊 View Products**
- See all products in a table
- Statistics: Total, In Stock, Pre-order counts

**➕ Add Product**
```
1. Click "+ Add Product"
2. Enter product details:
   - Name: "Gold Ring"
   - Category: Select from dropdown
   - Price: e.g., 3500 (in LKR)
   - Emoji: Pick any emoji (💎, ✨, ❤️, etc.)
   - Description: "Elegant gold ring"
3. Click "Add Product"
✅ New product appears immediately!
```

**✏️ Edit Product**
```
1. Click "Edit" button on any product
2. Form fields become editable
3. Change any details
4. Click "Save"
✅ Changes saved instantly!
```

**🗑️ Delete Product**
```
1. Click "Delete" button
✅ Product removed from inventory
```

**🔄 Toggle Status**
```
1. Click "Toggle" button to switch:
   ✓ In Stock  ↔️  ✗ Pre-order
✅ Status updated immediately
```

---

## 💾 Your Data

### How It Works
- All products stored in **browser's localStorage**
- Automatically saves after every action
- Data persists when you close the site
- No internet connection needed (offline-first)

### Important Notes
- ⚠️ Data is stored **locally** (not on a server)
- ⚠️ Clearing browser cache will delete data
- 💡 Backup: Use browser's export feature
- 🔄 Each browser/device has separate data

### Backup Your Data
To export products to JSON:
```javascript
// In browser console:
console.log(JSON.stringify(JSON.parse(localStorage.getItem('veloraProducts')), null, 2))
// Copy and save to a file
```

---

## 🎨 Customization

### Change Logo/Title
Edit `src/App.jsx`:
```jsx
<h1 className="logo">
  <span className="logo-text">Your Brand Name</span>
</h1>
```

### Change Colors
Edit `src/styles/global.css`:
```css
:root {
  --primary-gold: #d4af77;      /* Main color */
  --light-bg: #f9f8f7;           /* Background */
  --text-dark: #1a1a1a;          /* Text color */
}
```

### Add Product Categories
Edit `src/components/AdminPanel.jsx`:
```javascript
const categories = [
  'Earrings', 
  'Necklaces', 
  'Bracelets', 
  'YOUR_NEW_CATEGORY'  // Add here
];
```

### Customize Footer
Edit `src/App.jsx` Footer section

---

## 📱 Testing

### Test on Different Devices
```bash
# Desktop
npm run dev
# Then visit http://localhost:3000

# Mobile (same network)
# Visit http://[YOUR-IP]:3000 from mobile
```

### Test Admin Panel
1. Add a product
2. Edit it
3. Delete it
4. Reload page → data persists ✓

### Test Responsiveness
- Resize browser window
- Open DevTools (F12) → Device Emulation
- Test on phone/tablet

---

## 🚀 Deployment

### Deploy to Vercel (Easiest)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy with one command
vercel

# Follow prompts, done! 🎉
```

### Deploy to Netlify
1. Push code to GitHub
2. Go to netlify.com
3. Connect your GitHub repo
4. It deploys automatically!

### Deploy to Your Own Server
```bash
# Build for production
npm run build

# Upload the 'dist' folder to your server
# Configure server to serve dist/index.html
```

---

## 🛠️ Development Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Update dependencies
npm update

# Check for security issues
npm audit

# Fix security issues
npm audit fix
```

---

## ⚙️ System Requirements

- **Node.js**: 16.0.0 or higher
- **npm**: 7.0.0 or higher
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)

### Check Your Version
```bash
node --version
npm --version
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| **npm install fails** | Try: `npm install --legacy-peer-deps` |
| **Port 3000 in use** | Edit `vite.config.js` and change port number |
| **Styles not loading** | Clear browser cache: Ctrl+Shift+Delete |
| **Data disappeared** | Check if you cleared browser storage |
| **Build fails** | Delete `node_modules`, run `npm install` again |
| **npm is slow** | Try using `yarn` instead of `npm` |

---

## 📚 File Guide

| File | Purpose |
|------|---------|
| `README.md` | Full documentation |
| `QUICKSTART.md` | 5-minute setup guide |
| `PROJECT_GUIDE.md` | Deep dive into architecture |
| `SETUP.md` | This file - installation guide |
| `src/App.jsx` | Main app component |
| `src/components/` | Reusable UI components |
| `src/styles/` | CSS styling |
| `src/hooks/useProducts.js` | Product management logic |
| `src/data/products.js` | Sample product data |
| `package.json` | Dependencies & scripts |
| `vite.config.js` | Build configuration |

---

## 🎓 Next Steps

1. ✅ Run `npm install`
2. ✅ Run `npm run dev`
3. ✅ Explore the interface
4. ✅ Test admin panel
5. ✅ Customize colors/text
6. ✅ Add your products
7. ✅ Deploy online
8. ✅ Share with customers!

---

## 📞 Need Help?

### Check Documentation
- README.md - Full guide
- QUICKSTART.md - Quick reference
- PROJECT_GUIDE.md - Technical details

### Common Questions

**Q: Where are products stored?**
A: In browser's localStorage. No database needed.

**Q: Can I add images?**
A: Currently uses emojis. To add images, upload to a folder and update Product component.

**Q: How do I protect the admin panel?**
A: Add login with authentication (requires backend).

**Q: Can I sell products?**
A: Add payment gateway (Stripe, PayPal) integration.

---

## 🎉 You're Ready!

Everything is set up and ready to go. Just run:

```bash
cd velora-accessories
npm install
npm run dev
```

Your beautiful e-commerce site awaits! 🚀✨

---

**Happy coding! Let us know if you need any help.** 💙
