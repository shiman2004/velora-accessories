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
      {/* 1. Top Announcement Bar (Matches reference navy header) */}
      <div className="announcement-bar">
        <div className="container announcement-content">
          <span>
            Standard delivery available islandwide (Sri Lanka) & worldwide. 
            <a href="#instagram-section" className="learn-more-link"> Follow Us on Instagram</a>
          </span>
          <span className="announcement-tagline">• Pre-orders only</span>
        </div>
      </div>

      {/* 2. Main Branding & Upper Navigation Bar */}
      <div className="main-header">
        <div className="container header-inner">
          {/* Left: Contact, Boutique Location & Socials */}
          <div className="header-left">
            <a href="https://wa.me/94771155641?text=Hello%20Velora%20Accessories,%20I%20would%20like%20to%20inquire%20about%20your%20collection." 
               target="_blank" 
               rel="noopener noreferrer" 
               className="header-contact-item"
               title="WhatsApp Inquiries">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>+94 77 115 5641</span>
            </a>
            
            <span className="header-divider"></span>
            
            <a href="#boutique-info" className="header-contact-item" title="Boutique Location">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Colombo</span>
            </a>

            <span className="header-divider"></span>

            <a href="https://instagram.com/_velora_.accessories" target="_blank" rel="noopener noreferrer" className="header-contact-item ig-link">
              <span>@_velora_.accessories</span>
            </a>
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
