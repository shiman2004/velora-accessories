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

  const handleOrderAllWhatsApp = () => {
    if (wishlist.length === 0) return;

    let itemsList = wishlist.map((item, idx) => 
      `${idx + 1}. ${item.name} (${item.category}) - Rs. ${item.price} [${item.available ? 'In Stock' : 'Pre-Order'}]`
    ).join('\n');

    const msg = encodeURIComponent(
      `Hello Velora Accessories,\n\nI would like to place an order for my saved items:\n\n` +
      `${itemsList}\n\n` +
      `Estimated Total: ${formatPrice(totalPrice)}\n` +
      `Delivery: Colombo / Island-wide\n\n` +
      `Please let me know how to proceed with payment and confirmation. Thank you!`
    );

    window.open(`https://wa.me/94771155641?text=${msg}`, '_blank');
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
              onClick={handleOrderAllWhatsApp}
            >
              <svg className="wa-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
              <span>PRE-ORDER ALL ON WHATSAPP</span>
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
