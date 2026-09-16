# Quick Start Guide - Velora Accessories

## ⚡ 5-Minute Setup

### 1. Install & Run
```bash
cd velora-accessories
npm install
npm run dev
```
That's it! The site opens at `http://localhost:3000`

---

## 🎮 How to Use

### Browsing Products
1. See all products on the homepage
2. Click category buttons to filter
3. Each product shows:
   - Product name
   - Category
   - Price in LKR
   - Availability status (✓ In Stock or ✗ Pre-order)

### Access Admin Panel
1. Click **"Admin Panel"** button in top-right
2. A modal window opens with management tools

---

## 📊 Admin Panel Guide

### View Products
- All products displayed in a table
- See stats: Total, In Stock, Pre-order counts

### Add New Product
1. Click **"+ Add Product"** button
2. Fill in the form:
   - **Product Name**: e.g., "Gold Earrings"
   - **Category**: Select from dropdown
   - **Price**: Enter in LKR (e.g., 2500)
   - **Emoji/Icon**: Any emoji (✨, 💎, ❤️, etc.)
   - **Description**: Short description
3. Click **"Add Product"**

### Edit Product
1. Click **"Edit"** button on product row
2. Form fields become editable
3. Modify any details
4. Click **"Save"** to confirm

### Delete Product
1. Click **"Delete"** button on product row
2. Product removed from inventory

### Change Availability
- Click **"Toggle"** to switch between "In Stock" and "Pre-order"
- Or click the status badge while editing

---

## 💾 Data Storage

✅ **All data is saved automatically** to your browser
- Changes persist when you close the site
- Each browser/device has separate data
- No server needed

⚠️ **Note**: Clearing browser cache will delete data

---

## 🎨 Customization Tips

### Change Logo/Text
Edit `src/App.jsx` - modify Header component text

### Change Colors
Edit `src/styles/global.css` CSS variables:
```css
--primary-gold: #d4af77;        /* Main color */
--light-bg: #f9f8f7;             /* Background */
--text-dark: #1a1a1a;            /* Text color */
```

### Add More Categories
Edit `src/components/AdminPanel.jsx`:
```javascript
const categories = ['Earrings', 'Necklaces', 'Bracelets', 'YOUR_NEW_CATEGORY'];
```

---

## 🚀 Deploy to Web

### Free Hosting Options

**Vercel (Easiest)**
```bash
npm install -g vercel
vercel
```

**Netlify**
1. Push code to GitHub
2. Connect repo at netlify.com
3. Deploy automatically

**GitHub Pages**
```bash
npm run build
# Then push dist/ folder
```

---

## 📱 Mobile Responsive

✅ Works perfectly on:
- Desktops
- Tablets
- Mobile phones
- Different screen sizes

---

## ❓ Troubleshooting

**Issue**: Data not saving
- Solution: Check if localStorage is enabled in browser

**Issue**: Styles look wrong
- Solution: Clear browser cache (Ctrl+Shift+Delete)

**Issue**: npm install fails
- Solution: Make sure Node.js 16+ is installed

**Issue**: Port 3000 already in use
- Solution: Edit `vite.config.js` and change port number

---

## 📚 File Locations

| What | Where |
|------|-------|
| Products data | `src/data/products.js` |
| Styles | `src/styles/` |
| Components | `src/components/` |
| Admin panel | `src/components/AdminPanel.jsx` |
| Colors | `src/styles/global.css` |

---

## 🎯 Next Steps

1. ✅ Run `npm install` & `npm run dev`
2. ✅ Explore the homepage
3. ✅ Click "Admin Panel" to manage products
4. ✅ Test adding/editing/deleting products
5. ✅ Customize colors and text
6. ✅ Deploy when ready!

---

**Enjoy building! 🚀✨**
