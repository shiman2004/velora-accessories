import '../styles/HeroSection.css';
import heroBgImg from '../assets/hero-bg.jpeg';

export const HeroSection = ({ onExploreClick }) => {
  return (
    <section className="hero-section full-bg-hero">
      {/* Background Image Layer */}
      <div 
        className="hero-bg-layer" 
        style={{ backgroundImage: `url(${heroBgImg})` }}
        role="img"
        aria-label="Velora Fine Pearls and Jewelry Collection"
      ></div>

      {/* Luxury Gradient Tint Overlay */}
      <div className="hero-gradient-overlay"></div>

      <div className="container hero-container">
        {/* Editorial Content Showcase */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span>VELORA ACCESSORIES • BOUTIQUE</span>
          </div>

          <h1 className="hero-title">
            The Finishing Touch <br />
            <span className="hero-title-italic">to Every Look</span>
          </h1>

          <p className="hero-subtitle">
            Curated modern jewellery, timeless bespoke accessories, and handcrafted pre-order essentials designed to elevate your everyday elegance.
          </p>

          <div className="hero-cta-group">
            <button 
              type="button" 
              className="btn-primary-hero"
              onClick={onExploreClick}
            >
              EXPLORE OUR COLLECTION
            </button>

            <a 
              href="https://instagram.com/_velora_.accessories" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary-hero"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              ORDER VIA INSTAGRAM
            </a>
          </div>

          {/* Sleek Minimalist Luxury Perks */}
          <div className="hero-perks">
            <div className="perk-item">
              <svg className="perk-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
              <span className="perk-text">Island-wide Delivery</span>
            </div>

            <div className="perk-item">
              <svg className="perk-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              </svg>
              <span className="perk-text">Pre-orders Available</span>
            </div>

            <div className="perk-item">
              <svg className="perk-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span className="perk-text">Direct Instagram DM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
