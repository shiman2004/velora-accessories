import { useState } from 'react';
import '../styles/Header.css';

export const Header = ({ 
  onAdminClick, 
  wishlistCount = 0, 
  onOpenWishlist, 
  searchTerm = '', 
  onSearchChange,
  activeCategory = 'All',
  onSelectCategory,
  categories = []
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-header">
      {/* 1. Top Announcement Bar - Seamless Single-Line Auto-Loop Marquee */}
      <div className="announcement-bar">
        <div className="announcement-marquee-track">
          <div className="marquee-content">
            <span className="marquee-item">✦ Standard delivery available islandwide (Sri Lanka) & worldwide</span>
            <span className="marquee-item">✦ Pre-orders only</span>
            <span className="marquee-item">✦ Orders & Inquiries on Instagram: <a href="https://instagram.com/_velora_.accessories" target="_blank" rel="noopener noreferrer">@_velora_.accessories</a></span>
            <span className="marquee-item">✦ Velora Accessories Official Boutique</span>
          </div>
          {/* Duplicate for infinite seamless smooth loop */}
          <div className="marquee-content" aria-hidden="true">
            <span className="marquee-item">✦ Standard delivery available islandwide (Sri Lanka) & worldwide</span>
            <span className="marquee-item">✦ Pre-orders only</span>
            <span className="marquee-item">✦ Orders & Inquiries on Instagram: <a href="https://instagram.com/_velora_.accessories" target="_blank" rel="noopener noreferrer">@_velora_.accessories</a></span>
            <span className="marquee-item">✦ Velora Accessories Official Boutique</span>
          </div>
        </div>
      </div>

      {/* 2. Main Branding & Upper Navigation Bar */}
      <div className="main-header">
        <div className="container header-inner">
          {/* Left: Instagram DM & Service Info */}
          <div className="header-left">
            <a href="https://instagram.com/_velora_.accessories" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="header-contact-item ig-link"
               title="Instagram Direct Message">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>@_velora_.accessories</span>
            </a>
            
            <span className="header-divider"></span>
            
            <span className="header-contact-item" title="Delivery Info">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
              <span>Island-wide Delivery</span>
            </span>
          </div>

          {/* Center: Official Velora Script Logo */}
          <div className="header-logo-container">
            <a href="/" className="brand-logo" title="Velora Accessories">
              <span className="brand-script">Velora</span>
              <span className="brand-sub">ACCESSORIES</span>
            </a>
          </div>

          {/* Right: Search, Wishlist, WhatsApp Order, Admin */}
          <div className="header-right">
            {/* Search Bar / Toggle */}
            <div className={`search-wrapper ${showSearch ? 'active' : ''}`}>
              <input 
                type="text" 
                placeholder="Search jewelry, bags..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
              />
              <button 
                type="button" 
                className="action-icon-btn search-toggle"
                onClick={() => setShowSearch(!showSearch)}
                title="Search Products"
              >
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <span className="btn-label">Search</span>
              </button>
            </div>

            {/* Wishlist Button */}
            <button 
              type="button" 
              className="action-icon-btn wishlist-btn"
              onClick={onOpenWishlist}
              title="View Saved Items"
            >
              <div className="icon-with-badge">
                <svg className="icon heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
              </div>
            </button>

            {/* Mobile Hamburger */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12"/>
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18"/>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Luxury Category Navigation Bar (Matches DINIDU sub-menu) */}
      <nav className={`category-nav-bar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="container">
          <ul className="category-nav-list">
            {categories.map((cat) => (
              <li key={cat} className="category-nav-item">
                <button
                  type="button"
                  className={`category-nav-link ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => {
                    onSelectCategory(cat);
                    setMobileMenuOpen(false);
                    const catalogEl = document.getElementById('collection-catalog');
                    if (catalogEl) {
                      catalogEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {cat.toUpperCase()}
                </button>
              </li>
            ))}
            <li className="category-nav-item">
              <a 
                href="#boutique-info" 
                className="category-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                ABOUT US
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
