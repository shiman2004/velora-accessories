import '../styles/ProductModal.css';

export const ProductModal = ({ product, onClose, isWishlisted = false, onToggleWishlist }) => {
  if (!product) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0
    }).format(price).replace('LKR', 'Rs.');
  };

  const handleInstagramOrder = () => {
    window.open('https://instagram.com/_velora_.accessories', '_blank');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="product-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="modal-body-grid">
          {/* Left Media */}
          <div className="modal-image-panel">
            <img src={product.image} alt={product.name} className="modal-product-img" />
            {product.tag && <span className="modal-tag-pill">{product.tag}</span>}
          </div>

          {/* Right Content */}
          <div className="modal-info-panel">
            <span className="modal-category-label">{product.category}</span>
            <h2 className="modal-product-title">{product.name}</h2>
            
            <div className="modal-price-status-wrap">
              <span className="modal-price">{formatPrice(product.price)}</span>
              <span className={`modal-status-badge ${product.available ? 'in-stock' : 'pre-order'}`}>
                {product.available ? 'In Stock • Ready for Delivery' : 'Pre-Order Only • Curated on Request'}
              </span>
            </div>

            <p className="modal-description">{product.description}</p>

            <div className="modal-specs-list">
              <div className="spec-row">
                <span className="spec-bullet-dot"></span>
                <span><strong>Material:</strong> Premium Stainless Steel & Alloy</span>
              </div>
              <div className="spec-row">
                <span className="spec-bullet-dot"></span>
                <span><strong>Finish:</strong> Long-Lasting, Tarnish-Resistant</span>
              </div>
              <div className="spec-row">
                <span className="spec-bullet-dot"></span>
                <span><strong>Packaging:</strong> Signature Velora Packaging</span>
              </div>
              <div className="spec-row">
                <span className="spec-bullet-dot"></span>
                <span><strong>Delivery:</strong> Delivered Across Sri Lanka</span>
              </div>
            </div>

            <div className="modal-actions-group">
              <button 
                type="button" 
                className="btn-modal-whatsapp btn-modal-instagram"
                onClick={handleInstagramOrder}
              >
                <svg className="wa-icon ig-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>ORDER VIA INSTAGRAM DM</span>
              </button>

              <button 
                type="button" 
                className={`btn-modal-wishlist ${isWishlisted ? 'active' : ''}`}
                onClick={() => onToggleWishlist(product)}
              >
                <svg className="icon" viewBox="0 0 24 24" fill={isWishlisted ? '#c5a059' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
