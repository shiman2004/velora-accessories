import { ProductCard } from './ProductCard';
import '../styles/ProductGrid.css';

export const ProductGrid = ({ 
  products, 
  filterCategory, 
  searchTerm = '', 
  onSelectProduct,
  wishlist = [],
  onToggleWishlist
}) => {
  const filteredProducts = products.filter(product => {
    const matchesCategory = filterCategory === 'All' || product.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="product-grid-empty">
        <div className="empty-icon-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
        <h3 className="empty-title">No accessories found</h3>
        <p className="empty-subtitle">
          We couldn't find any products matching your current selection.
        </p>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      <div className="luxury-product-grid">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onSelect={onSelectProduct}
            isWishlisted={wishlist.some(item => item.id === product.id)}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </div>
  );
};
