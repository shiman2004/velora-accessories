import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ValueProps } from './components/ValueProps';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { InstagramSection } from './components/InstagramSection';
import { ProductModal } from './components/ProductModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Footer } from './components/Footer';
import { AdminPage } from './pages/AdminPage';
import { useProducts } from './hooks/useProducts';
import './styles/App.css';

function App() {
  const { products, updateProduct, addProduct, deleteProduct, toggleAvailability, isUsingSupabase } = useProducts();
  const [currentView, setCurrentView] = useState('store'); // 'store' | 'admin'
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showWishlist, setShowWishlist] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync with URL Hash for direct link / bookmarking (#admin)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('store');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('veloraWishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        setWishlist([]);
      }
    }
  }, []);

  // Handle scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleToggleWishlist = (product) => {
    const exists = wishlist.some(item => item.id === product.id);
    let updated;
    if (exists) {
      updated = wishlist.filter(item => item.id !== product.id);
      showToast(`Removed "${product.name}" from wishlist`);
    } else {
      updated = [...wishlist, product];
      showToast(`Added "${product.name}" to wishlist`);
    }
    setWishlist(updated);
    localStorage.setItem('veloraWishlist', JSON.stringify(updated));
  };

  const handleRemoveWishlistItem = (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem('veloraWishlist', JSON.stringify(updated));
  };

  const handleClearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('veloraWishlist');
    showToast('Wishlist cleared');
  };

  const handleExploreClick = () => {
    const el = document.getElementById('collection-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdmin = () => {
    window.location.hash = '#admin';
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToStore = () => {
    window.location.hash = '';
    setCurrentView('store');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = ['All', 'Earrings', 'Necklaces', 'Bracelets', 'Rings', 'Bags', 'Hair Accessories'];

  // If on Admin Page view, render the dedicated Admin Portal
  if (currentView === 'admin') {
    return (
      <AdminPage
        products={products}
        onBackToStore={navigateToStore}
        onUpdateProduct={updateProduct}
        onAddProduct={addProduct}
        onDeleteProduct={deleteProduct}
        onToggleAvailability={toggleAvailability}
        isUsingSupabase={isUsingSupabase}
      />
    );
  }

  // Otherwise render Boutique Storefront
  return (
    <div className="velora-app">
      {/* 1. Header with Announcement Bar, Nav & Search */}
      <Header 
        onAdminClick={navigateToAdmin}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setShowWishlist(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        categories={categories}
      />

      {/* 2. Hero Section matching DINIDU editorial banner */}
      <HeroSection onExploreClick={handleExploreClick} />

      {/* 3. Value Propositions */}
      <ValueProps />

      {/* 4. Main Catalog Section */}
      <main className="main-content">
        <div className="container">
          <CategoryFilter 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            totalProducts={products.length}
          />

          <ProductGrid 
            products={products}
            filterCategory={activeCategory}
            searchTerm={searchTerm}
            onSelectProduct={(product) => setSelectedProduct(product)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        </div>

        {/* 5. Official Instagram Showcase */}
        <InstagramSection 
          onSelectProduct={(product) => setSelectedProduct(product)}
          products={products}
        />
      </main>

      {/* 6. Footer */}
      <Footer />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/94771155641?text=Hello%20Velora%20Accessories!%20I%20would%20like%20to%20inquire%20about%20your%20pre-order%20items." 
        target="_blank" 
        rel="noopener noreferrer"
        className="floating-wa-btn"
        title="Chat with Velora on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
        </svg>
      </a>

      {/* Floating Scroll To Top Button */}
      {showScrollTop && (
        <button 
          type="button" 
          className="floating-scroll-top"
          onClick={scrollToTop}
          title="Back to Top"
        >
          ↑
        </button>
      )}

      {/* Quick View Product Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isWishlisted={wishlist.some(item => item.id === selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Wishlist Drawer */}
      <WishlistDrawer 
        isOpen={showWishlist}
        onClose={() => setShowWishlist(false)}
        wishlist={wishlist}
        onRemoveItem={handleRemoveWishlistItem}
        onClearWishlist={handleClearWishlist}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setShowWishlist(false);
        }}
      />
    </div>
  );
}

export default App;
