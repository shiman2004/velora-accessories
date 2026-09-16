import '../styles/Footer.css';

export const Footer = () => {
  return (
    <footer className="site-footer" id="boutique-info">
      <div className="container">
        {/* Top Footer Grid */}
        <div className="footer-top-grid">
          {/* Col 1: Brand & Bio */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <span className="footer-script-logo">Velora</span>
              <span className="footer-sub-logo">ACCESSORIES</span>
            </div>
            <p className="footer-bio">
              The finishing touch to every look. Modern jewellery, signature 18K gold plated accessories, and curated lifestyle essentials handpicked for you in Colombo, Sri Lanka.
            </p>
            <div className="footer-social-links">
              <a href="https://instagram.com/_velora_.accessories" target="_blank" rel="noopener noreferrer" className="social-pill" title="Instagram">
                <span>Instagram</span>
              </a>
              <a href="https://tiktok.com/@_velora.accessories" target="_blank" rel="noopener noreferrer" className="social-pill" title="TikTok">
                <span>TikTok</span>
              </a>
              <a href="https://wa.me/94771155641" target="_blank" rel="noopener noreferrer" className="social-pill" title="WhatsApp">
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">COLLECTIONS</h4>
            <ul className="footer-links-list">
              <li><a href="#collection-catalog">Earrings & Hoops</a></li>
              <li><a href="#collection-catalog">Necklaces & Pendants</a></li>
              <li><a href="#collection-catalog">Bracelets & Bangles</a></li>
              <li><a href="#collection-catalog">Statement Rings</a></li>
              <li><a href="#collection-catalog">Bags & Clutches</a></li>
              <li><a href="#collection-catalog">Hair Accessories</a></li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Ordering */}
          <div className="footer-col">
            <h4 className="footer-col-title">BOUTIQUE CARE</h4>
            <ul className="footer-links-list">
              <li><a href="https://wa.me/94771155641?text=Hi,%20how%20do%20pre-orders%20work?" target="_blank" rel="noopener noreferrer">How Pre-Orders Work</a></li>
              <li><a href="https://wa.me/94771155641?text=Hi,%20what%20is%20your%20island-wide%20delivery%20timeline?" target="_blank" rel="noopener noreferrer">Island-wide Shipping Info</a></li>
              <li><a href="https://wa.me/94771155641?text=Hi,%20can%20you%20share%20jewelry%20care%20instructions?" target="_blank" rel="noopener noreferrer">18K Gold Plated Care Guide</a></li>
              <li><a href="https://wa.me/94771155641" target="_blank" rel="noopener noreferrer">WhatsApp Concierge</a></li>
            </ul>
          </div>

          {/* Col 4: Location & Direct Inquiries */}
          <div className="footer-col">
            <h4 className="footer-col-title">COLOMBO BOUTIQUE</h4>
            <div className="footer-contact-details">
              <p className="contact-row">
                <svg className="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Colombo, Sri Lanka</span>
              </p>
              <p className="contact-row">
                <svg className="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                <span>Island-wide courier delivery</span>
              </p>
              <p className="contact-row">
                <svg className="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>WhatsApp: +94 77 115 5641</span>
              </p>
              <p className="contact-row">
                <svg className="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
                <span>Pre-orders only • Fresh imports</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} Velora Accessories. All Rights Reserved. Colombo, Sri Lanka.</p>
          <p className="footer-credit">The finishing touch to every look</p>
        </div>
      </div>
    </footer>
  );
};
