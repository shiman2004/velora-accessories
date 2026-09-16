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

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hello Velora Accessories,\n\nI would like to place an order for this piece:\n` +
      `Item: ${product.name}\n` +
      `Category: ${product.category}\n` +
      `Price: Rs. ${product.price}\n` +
      `Status: ${product.available ? 'In Stock' : 'Pre-Order'}\n\n` +
      `Please provide delivery timeline and payment details for Colombo / Island-wide shipping. Thank you!`
    );
    window.open(`https://wa.me/94771155641?text=${message}`, '_blank');
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
                <span><strong>Material:</strong> 18K Gold Plated Stainless Steel / Brass (Hypoallergenic)</span>
              </div>
              <div className="spec-row">
                <span className="spec-bullet-dot"></span>
                <span><strong>Finish:</strong> Tarnish-Resistant & Long-Lasting Luster</span>
              </div>
              <div className="spec-row">
                <span className="spec-bullet-dot"></span>
                <span><strong>Packaging:</strong> Signature Velora Protective Box & Pouch</span>
              </div>
              <div className="spec-row">
                <span className="spec-bullet-dot"></span>
                <span><strong>Delivery:</strong> Island-wide shipping across Sri Lanka (2-4 business days)</span>
              </div>
            </div>

            <div className="modal-actions-group">
              <button 
                type="button" 
                className="btn-modal-whatsapp"
                onClick={handleWhatsAppOrder}
              >
                <svg className="wa-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
                <span>ORDER VIA WHATSAPP</span>
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
