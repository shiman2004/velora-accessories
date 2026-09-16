import '../styles/WishlistDrawer.css';

export const WishlistDrawer = ({ isOpen, onClose, wishlist, onRemoveItem, onClearWishlist, onSelectProduct }) => {
  if (!isOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0
    }).format(price).replace('LKR', 'Rs.');
  };

  const totalPrice = wishlist.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleOrderAllInstagram = () => {
    if (wishlist.length === 0) return;
    window.open('https://instagram.com/_velora_.accessories', '_blank');
  };

  return (
    <div className="wishlist-overlay" onClick={onClose}>
      <div className="wishlist-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="wishlist-header">
          <div className="wishlist-header-title">
            <svg className="icon" viewBox="0 0 24 24" fill="#c5a059" stroke="#c5a059" width="18" height="18">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <h2>My Wishlist ({wishlist.length})</h2>
          </div>
          <button className="wishlist-close-btn" onClick={onClose} aria-label="Close wishlist">✕</button>
        </div>

        {/* Drawer Body */}
        <div className="wishlist-content">
          {wishlist.length === 0 ? (
            <div className="wishlist-empty-state">
              <div className="empty-heart-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <h3>Your wishlist is empty</h3>
              <p>Explore our curated jewelry and accessories collection and save your favorite pieces.</p>
            </div>
          ) : (
            <div className="wishlist-items-list">
              {wishlist.map((item) => (
                <div key={item.id} className="wishlist-item-row" onClick={() => onSelectProduct?.(item)}>
                  <img src={item.image} alt={item.name} className="wishlist-item-thumb" />
                  
                  <div className="wishlist-item-details">
                    <span className="wishlist-item-cat">{item.category}</span>
                    <h4 className="wishlist-item-name">{item.name}</h4>
                    <span className="wishlist-item-price">{formatPrice(item.price)}</span>
                    <span className={`wishlist-item-status ${item.available ? 'in-stock' : 'pre-order'}`}>
                      {item.available ? 'In Stock' : 'Pre-Order'}
                    </span>
                  </div>

                  <button 
                    type="button" 
                    className="wishlist-remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveItem(item.id);
                    }}
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {wishlist.length > 0 && (
          <div className="wishlist-footer">
            <div className="wishlist-total-row">
              <span>Estimated Total:</span>
              <span className="wishlist-total-val">{formatPrice(totalPrice)}</span>
            </div>

            <button 
              type="button" 
              className="wishlist-order-btn"
              onClick={handleOrderAllInstagram}
            >
              <svg className="wa-icon ig-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>ORDER WISHLIST VIA INSTAGRAM</span>
            </button>

            <button 
              type="button" 
              className="wishlist-clear-btn"
              onClick={onClearWishlist}
            >
              Clear Wishlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
