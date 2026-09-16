import '../styles/HeroSection.css';

export const HeroSection = ({ onExploreClick }) => {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        {/* Left Editorial Copy */}
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

          {/* Sleek Minimalist Luxury Perks (No emojis) */}
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
          </div>
        </div>

        {/* Right Editorial Model Imagery */}
        <div className="hero-media-wrapper">
          <div className="hero-image-card">
            <img 
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1000&auto=format&fit=crop&q=85" 
              alt="Velora Fine Jewellery & Accessories" 
              className="hero-image"
            />
            {/* Overlay Tag */}
            <div className="floating-hero-tag top-tag">
              <div className="tag-indicator-dot"></div>
              <div className="tag-text">
                <p className="tag-label">Modern Jewellery</p>
                <p className="tag-sub">Curated Edition</p>
              </div>
            </div>

            <div className="floating-hero-tag bottom-tag">
              <svg className="tag-location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <div className="tag-text">
                <p className="tag-label">Colombo, Sri Lanka</p>
                <p className="tag-sub">Boutique Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
