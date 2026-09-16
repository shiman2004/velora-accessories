# Velora Accessories - E-Commerce Showcase

A minimal, aesthetic e-commerce website for **Velora Accessories** - a lifestyle boutique based in Colombo, Sri Lanka. Features a beautiful product showcase and a fully functional admin panel for managing products, inventory, and availability status.

## 🎨 Design Features

- **Minimal & Aesthetic**: Clean design with gold accents and neutral tones
- **Responsive**: Fully mobile-optimized layout
- **Product Management**: Admin panel to add, edit, delete products
- **Inventory System**: Toggle product availability status
- **Category Filtering**: Browse products by category
- **Local Storage**: Data persists in browser

## 📁 Project Structure

```
velora-accessories/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Top navigation
│   │   ├── CategoryFilter.jsx       # Category filter buttons
│   │   ├── ProductCard.jsx          # Individual product card
│   │   ├── ProductGrid.jsx          # Product grid layout
│   │   └── AdminPanel.jsx           # Admin dashboard
│   ├── hooks/
│   │   └── useProducts.js           # Product management hook
│   ├── data/
│   │   └── products.js              # Initial product data
│   ├── styles/
│   │   ├── global.css               # Global styles & variables
│   │   ├── App.css
│   │   ├── Header.css
│   │   ├── CategoryFilter.css
│   │   ├── ProductCard.css
│   │   ├── ProductGrid.css
│   │   └── AdminPanel.css
│   ├── App.jsx                      # Main app component
│   └── main.jsx                     # React entry point
├── index.html                       # HTML template
├── vite.config.js                   # Vite configuration
├── package.json                     # Dependencies
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Navigate to project directory:**
```bash
cd velora-accessories
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output files will be in the `dist/` directory.

## 🎯 Features

### 👥 User Features
- Browse products by category
- View product details (name, price, availability)
- Responsive mobile design
- Smooth animations and interactions

### 🔧 Admin Features

Click the **"Admin Panel"** button in the header to access:

- **View All Products**: See complete inventory in a table
- **Add Products**: Create new products with:
  - Name & Category
  - Price in LKR
  - Emoji/Icon
  - Description
- **Edit Products**: Update any product details
- **Delete Products**: Remove products from inventory
- **Toggle Availability**: Mark products as "In Stock" or "Pre-order"
- **View Stats**: See total, in-stock, and pre-order counts

### 💾 Data Persistence
- All changes are automatically saved to browser's localStorage
- Data persists across sessions and page refreshes
- No backend required

## 🎨 Customization

### Colors
Edit CSS variables in `src/styles/global.css`:
```css
:root {
  --primary-gold: #d4af77;
  --dark-bg: #0f0f0f;
  --light-bg: #f9f8f7;
  /* ... more colors */
}
```

### Products
Initial products are in `src/data/products.js`. Add/edit products via:
1. Admin Panel UI (recommended)
2. Or directly edit `products.js`

### Categories
Available categories in AdminPanel:
- Earrings
- Necklaces
- Bracelets
- Rings
- Hair Accessories

Add more categories by updating `AdminPanel.jsx`

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔐 Security Notes

- This is a **client-side only** application
- All data stored in browser localStorage
- For production, implement:
  - Backend API
  - Database
  - Authentication
  - Admin protection

## 📦 Technologies Used

- **React 18**: UI framework
- **Vite**: Build tool
- **CSS3**: Styling with CSS variables
- **LocalStorage API**: Data persistence

## 🎁 Sample Products

8 sample products included:
- Gold Hoop Earrings - Rs. 2,500
- Heart Gold Necklace - Rs. 3,500
- Gold Chain Bracelet - Rs. 2,000
- Black Stone Pendant - Rs. 3,000 (Pre-order)
- Gold Bangle - Rs. 4,000
- White Hair Clip - Rs. 1,500
- Gold Drop Earrings - Rs. 2,800
- Minimalist Ring Set - Rs. 3,200 (Pre-order)

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Netlify
1. Push to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages
1. Update `vite.config.js` with your repo name
2. Run: `npm run build`
3. Push `dist` folder to `gh-pages` branch

## 📝 License

This project is created for Velora Accessories.

## 💡 Future Enhancements

- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Backend API integration
- [ ] Payment gateway
- [ ] Customer reviews
- [ ] Wishlist feature
- [ ] Search functionality
- [ ] Image uploads
- [ ] Analytics dashboard

## 📞 Support

For questions or issues, contact the Velora Accessories team.

---

**Created with ❤️ for Velora Accessories**
