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
              The finishing touch to every look. Curated modern jewellery, timeless bespoke accessories, and handcrafted lifestyle essentials designed to elevate your everyday elegance.
            </p>
            <div className="footer-social-links">
              <a href="https://instagram.com/_velora_.accessories" target="_blank" rel="noopener noreferrer" className="social-pill" title="Instagram">
                <span>Instagram @_velora_.accessories</span>
              </a>
              <a href="https://tiktok.com/@_velora.accessories" target="_blank" rel="noopener noreferrer" className="social-pill" title="TikTok">
                <span>TikTok</span>
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
              <li><a href="https://instagram.com/_velora_.accessories" target="_blank" rel="noopener noreferrer">How Pre-Orders Work</a></li>
              <li><a href="https://instagram.com/_velora_.accessories" target="_blank" rel="noopener noreferrer">Island-wide Shipping Info</a></li>
              <li><a href="https://instagram.com/_velora_.accessories" target="_blank" rel="noopener noreferrer">Jewelry Care Guide</a></li>
              <li><a href="https://instagram.com/_velora_.accessories" target="_blank" rel="noopener noreferrer">Instagram DM Concierge</a></li>
            </ul>
          </div>

          {/* Col 4: Direct Inquiries */}
          <div className="footer-col">
            <h4 className="footer-col-title">OFFICIAL BOUTIQUE</h4>
            <div className="footer-contact-details">
              <p className="contact-row">
                <svg className="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <a href="https://instagram.com/_velora_.accessories" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  @_velora_.accessories
                </a>
              </p>
              <p className="contact-row">
                <svg className="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                <span>Island-wide Courier Delivery</span>
              </p>
              <p className="contact-row">
                <svg className="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
                <span>Pre-Orders & Curated Catalog</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} Velora Accessories. All Rights Reserved.</p>
          <p className="footer-credit">The finishing touch to every look</p>
        </div>
      </div>
    </footer>
  );
};
