import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ValueProps } from './components/ValueProps';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
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
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Instagram Direct Message Button */}
      <a 
        href="https://instagram.com/_velora_.accessories" 
        target="_blank" 
        rel="noopener noreferrer"
        className="floating-ig-btn"
        title="Message Velora on Instagram (@_velora_.accessories)"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
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
