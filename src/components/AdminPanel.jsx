import { useState } from 'react';
import '../styles/AdminPanel.css';

export const AdminPanel = ({ products, onClose, onUpdateProduct, onAddProduct, onDeleteProduct, onToggleAvailability }) => {
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Earrings',
    price: '',
    image: '',
    tag: 'New',
    description: ''
  });

  const categories = ['Earrings', 'Necklaces', 'Bracelets', 'Rings', 'Bags', 'Hair Accessories'];
  const availableTags = ['Best Seller', 'New', 'Trending', 'Exclusive', 'Pre-Order', 'Popular', 'Lifestyle'];

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      image: product.image || '',
      tag: product.tag || 'New',
      description: product.description || ''
    });
    setShowAddForm(false);
  };

  const handleSaveEdit = (id) => {
    onUpdateProduct(id, {
      name: formData.name,
      category: formData.category,
      price: parseInt(formData.price) || 0,
      image: formData.image || 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
      tag: formData.tag,
      description: formData.description
    });
    setEditingId(null);
    setFormData({ name: '', category: 'Earrings', price: '', image: '', tag: 'New', description: '' });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (formData.name && formData.category && formData.price) {
      onAddProduct({
        name: formData.name,
        category: formData.category,
        price: parseInt(formData.price) || 0,
        image: formData.image || 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80',
        tag: formData.tag,
        description: formData.description || 'Curated luxury piece from Velora Accessories.',
        available: true
      });
      setShowAddForm(false);
      setFormData({ name: '', category: 'Earrings', price: '', image: '', tag: 'New', description: '' });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ name: '', category: 'Earrings', price: '', image: '', tag: 'New', description: '' });
  };

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-panel" onClick={(e) => e.stopPropagation()}>
        <div className="admin-header">
          <div className="admin-header-title">
            <span className="admin-badge">VELORA CMS</span>
            <h2>Product Catalog Manager</h2>
          </div>
          <button className="admin-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="admin-content">
          <div className="admin-toolbar">
            <button 
              type="button"
              className="btn-add-product"
              onClick={() => {
                setShowAddForm(!showAddForm);
                setEditingId(null);
              }}
            >
              {showAddForm ? '✕ Close Form' : '+ Add New Boutique Item'}
            </button>
          </div>

          {showAddForm && (
            <div className="admin-form-card">
              <h3>Create New Accessory</h3>
              <form className="admin-grid-form" onSubmit={handleAddProduct}>
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gold Clover Bracelet"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Price (LKR / Rs.)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 3500"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Highlight Tag</label>
                  <select
                    value={formData.tag}
                    onChange={(e) => setFormData({...formData, tag: e.target.value})}
                  >
                    {availableTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... or direct image link"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Description & Material Specs</label>
                  <textarea
                    rows="3"
                    placeholder="18K gold plated, hypoallergenic, delicate finish..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="form-action-row full-width">
                  <button type="submit" className="btn-save-item">
                    Add to Catalog
                  </button>
                  <button type="button" className="btn-cancel" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Catalog Table */}
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Product Details</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className={editingId === product.id ? 'editing-row' : ''}>
                    {editingId === product.id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            placeholder="Image URL"
                            value={formData.image}
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                            className="inline-input"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="inline-input"
                          />
                          <input
                            type="text"
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="inline-input mt-1"
                          />
                        </td>
                        <td>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            className="inline-select"
                          >
                            {categories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                            className="inline-input"
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn-status-toggle"
                            onClick={() => onToggleAvailability(product.id)}
                          >
                            {product.available ? '✓ In Stock' : '⏳ Pre-order'}
                          </button>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button className="btn-table-save" onClick={() => handleSaveEdit(product.id)}>
                              Save
                            </button>
                            <button className="btn-table-cancel" onClick={handleCancelEdit}>
                              Cancel
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <img src={product.image} alt={product.name} className="table-thumb-img" />
                        </td>
                        <td>
                          <strong>{product.name}</strong>
                          {product.tag && <span className="table-tag-badge">{product.tag}</span>}
                          <p className="table-sub-desc">{product.description?.slice(0, 55)}...</p>
                        </td>
                        <td><span className="table-cat-pill">{product.category}</span></td>
                        <td><strong>Rs. {product.price?.toLocaleString()}</strong></td>
                        <td>
                          <button 
                            type="button" 
                            className={`table-stock-btn ${product.available ? 'in-stock' : 'pre-order'}`}
                            onClick={() => onToggleAvailability(product.id)}
                            title="Click to toggle availability"
                          >
                            {product.available ? '✓ In Stock' : '⏳ Pre-order'}
                          </button>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button className="btn-table-edit" onClick={() => handleEdit(product)}>
                              Edit
                            </button>
                            <button className="btn-table-delete" onClick={() => onDeleteProduct(product.id)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Metrics Bar */}
          <div className="admin-stats-bar">
            <div className="stat-box">
              <span className="stat-label">Total Catalog</span>
              <span className="stat-number">{products.length} Items</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Ready In Stock</span>
              <span className="stat-number in-stock-text">{products.filter(p => p.available).length}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Pre-Order Queue</span>
              <span className="stat-number preorder-text">{products.filter(p => !p.available).length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
