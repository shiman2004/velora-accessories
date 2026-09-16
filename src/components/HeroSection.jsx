import '../styles/HeroSection.css';
import heroBgImg from '../assets/hero-bg.jpg';

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
            <span>VELORA BOUTIQUE • COLOMBO</span>
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
              href="https://wa.me/94771155641?text=Hello%20Velora%20Accessories!%20I%20would%20like%20to%20place%20a%20pre-order%20for%20an%20item." 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary-hero"
            >
              ORDER VIA WHATSAPP
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
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="perk-text">Colombo Boutique</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
