import '../styles/ProductCard.css';

export const ProductCard = ({ product, onSelect, isWishlisted = false, onToggleWishlist }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0
    }).format(price).replace('LKR', 'Rs.');
  };

  const handleInstagramOrder = (e) => {
    e.stopPropagation();
    window.open('https://instagram.com/_velora_.accessories', '_blank');
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    onToggleWishlist?.(product);
  };

  return (
    <div className="luxury-product-card" onClick={() => onSelect?.(product)}>
      {/* Top Image Container */}
      <div className="product-media-box">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-main-img" 
          loading="lazy"
        />

        {/* Product Tag */}
        {product.tag && (
          <span className="product-top-badge">{product.tag}</span>
        )}

        {/* Wishlist Button */}
        <button 
          type="button" 
          className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <svg className="icon" viewBox="0 0 24 24" fill={isWishlisted ? '#c5a059' : 'none'} stroke={isWishlisted ? '#c5a059' : 'currentColor'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Quick View Hover Overlay */}
        <div className="product-card-overlay">
          <button type="button" className="quick-view-btn">
            QUICK VIEW
          </button>
        </div>
      </div>

      {/* Product Details Info */}
      <div className="product-details-box">
        <span className="product-meta-category">{product.category}</span>
        <h3 className="product-item-title">{product.name}</h3>
        
        <div className="product-price-stock-row">
          <span className="product-item-price">{formatPrice(product.price)}</span>
          <span className={`stock-status-badge ${product.available ? 'in-stock' : 'pre-order'}`}>
            {product.available ? 'In Stock' : 'Pre-Order'}
          </span>
        </div>

        {/* Instagram Order Action */}
        <button 
          type="button" 
          className="card-order-action-btn"
          onClick={handleInstagramOrder}
        >
          <svg className="wa-icon ig-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          <span>Order via Instagram</span>
        </button>
      </div>
    </div>
  );
};
