import '../styles/CategoryFilter.css';

export const CategoryFilter = ({ categories, activeCategory, onCategoryChange, totalProducts = 0 }) => {
  return (
    <div className="catalog-header-bar" id="collection-catalog">
      <div className="catalog-title-wrapper">
        <span className="section-eyebrow">CURATED EDIT</span>
        <h2 className="section-main-title">
          {activeCategory === 'All' ? 'Complete Collection' : `${activeCategory}`}
        </h2>
        <p className="section-description">
          Explore {totalProducts} timeless accessories and jewelry pieces crafted to elevate your presence.
        </p>
      </div>

      <div className="category-pill-scroll">
        <div className="category-pill-container">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`category-pill ${activeCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
