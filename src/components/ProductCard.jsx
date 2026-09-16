import '../styles/ProductCard.css';

export const ProductCard = ({ product, onSelect, isWishlisted = false, onToggleWishlist }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0
    }).format(price).replace('LKR', 'Rs.');
  };

  const handleWhatsAppInquiry = (e) => {
    e.stopPropagation();
    const msg = encodeURIComponent(
      `Hello Velora Accessories,\nI am interested in placing an order for:\n\n` +
      `Product: ${product.name}\n` +
      `Category: ${product.category}\n` +
      `Price: Rs. ${product.price}\n` +
      `Status: ${product.available ? 'In Stock' : 'Pre-Order'}\n\n` +
      `Please let me know how to proceed with payment and delivery in Sri Lanka. Thank you!`
    );
    window.open(`https://wa.me/94771155641?text=${msg}`, '_blank');
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

        {/* WhatsApp Order Action */}
        <button 
          type="button" 
          className="card-order-action-btn"
          onClick={handleWhatsAppInquiry}
        >
          <svg className="wa-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
          </svg>
          <span>Pre-Order via WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
