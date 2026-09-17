import { useState, useRef } from 'react';
import '../styles/AdminPage.css';

const ADMIN_PASSWORDS = [
  import.meta.env.VITE_ADMIN_PASSWORD,
  'velora2026',
  'velora@admin',
  'velora123'
].filter(Boolean);

export const AdminPage = ({ 
  products = [], 
  onBackToStore, 
  onUpdateProduct, 
  onAddProduct, 
  onDeleteProduct, 
  onToggleAvailability,
  isUsingSupabase = false
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('velora_admin_auth') === 'true' || 
           sessionStorage.getItem('velora_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [notification, setNotification] = useState(null);
  const [imageInputMode, setImageInputMode] = useState('upload'); // 'upload' | 'url'
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    const entered = passwordInput.trim();
    if (ADMIN_PASSWORDS.includes(entered)) {
      setTimeout(() => {
        setIsAuthenticated(true);
        localStorage.setItem('velora_admin_auth', 'true');
        sessionStorage.setItem('velora_admin_auth', 'true');
        setIsLoggingIn(false);
        setPasswordInput('');
      }, 300);
    } else {
      setTimeout(() => {
        setLoginError('Incorrect password. Please verify and try again.');
        setIsLoggingIn(false);
      }, 300);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('velora_admin_auth');
    sessionStorage.removeItem('velora_admin_auth');
    onBackToStore();
  };

  const [formData, setFormData] = useState({
    name: '',
    category: 'Earrings',
    price: '',
    image: '',
    tag: 'New',
    description: '',
    available: true
  });

  const categories = ['Earrings', 'Necklaces', 'Bracelets', 'Rings', 'Bags', 'Hair Accessories'];
  const availableTags = ['Best Seller', 'New', 'Trending', 'Exclusive', 'Pre-Order', 'Popular', 'Lifestyle'];

  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Image File Compression & Upload Handler
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    setUploadingImage(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress image using canvas
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 1000;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to high-quality compressed JPEG data URL
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setFormData(prev => ({ ...prev, image: dataUrl }));
        setUploadingImage(false);
        triggerNotification('Image uploaded successfully ✨');
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      image: product.image || '',
      tag: product.tag || 'New',
      description: product.description || '',
      available: product.available
    });
    setImageInputMode(product.image?.startsWith('data:') ? 'upload' : 'upload');
    setShowAddForm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    onUpdateProduct(editingProduct.id, {
      name: formData.name,
      category: formData.category,
      price: parseInt(formData.price) || 0,
      image: formData.image || 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80',
      tag: formData.tag,
      description: formData.description,
      available: formData.available
    });

    triggerNotification(`Updated "${formData.name}" successfully`);
    setEditingProduct(null);
    setFormData({ name: '', category: 'Earrings', price: '', image: '', tag: 'New', description: '', available: true });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.category && formData.price) {
      onAddProduct({
        name: formData.name,
        category: formData.category,
        price: parseInt(formData.price) || 0,
        image: formData.image || 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80',
        tag: formData.tag,
        description: formData.description || 'Curated luxury piece from Velora Accessories.',
        available: formData.available
      });

      triggerNotification(`Added new accessory: "${formData.name}"`);
      setShowAddForm(false);
      setFormData({ name: '', category: 'Earrings', price: '', image: '', tag: 'New', description: '', available: true });
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the boutique catalog?`)) {
      onDeleteProduct(id);
      triggerNotification(`Deleted "${name}"`);
    }
  };

  const handleCancelForm = () => {
    setEditingProduct(null);
    setShowAddForm(false);
    setFormData({ name: '', category: 'Earrings', price: '', image: '', tag: 'New', description: '', available: true });
  };

  // Metrics
  const totalItems = products.length;
  const inStockCount = products.filter(p => p.available).length;
  const preOrderCount = products.filter(p => !p.available).length;
  const totalCatalogValue = products.reduce((acc, p) => acc + (p.price || 0), 0);

  // Filtered list
  const filteredProducts = products.filter(product => {
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || 
      (statusFilter === 'in-stock' && product.available) ||
      (statusFilter === 'pre-order' && !product.available);
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  // If not authenticated, show luxury login screen
  if (!isAuthenticated) {
    return (
      <div className="admin-login-layout">
        <div className="admin-login-card">
          <div className="admin-login-brand">
            <span className="admin-login-script">Velora</span>
            <span className="admin-login-sub">ADMINISTRATION PORTAL</span>
          </div>

          <div className="admin-login-header">
            <h2 className="admin-login-title">Boutique Sign In</h2>
            <p className="admin-login-desc">Enter your boutique password to manage catalog & inventory</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="admin-login-form">
            <div className="admin-input-group">
              <label htmlFor="admin-password">Admin Password</label>
              <div className="password-input-wrap">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  placeholder="Enter admin password..."
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (loginError) setLoginError('');
                  }}
                  className={loginError ? 'input-error' : ''}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="admin-login-error">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{loginError}</span>
              </div>
            )}

            <button type="submit" className="btn-login-submit" disabled={isLoggingIn}>
              {isLoggingIn ? 'Authenticating...' : 'Sign In to Portal'}
            </button>
          </form>

          <div className="admin-login-footer">
            <button type="button" className="btn-login-back" onClick={onBackToStore}>
              ← Back to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page-layout">
      {/* 1. Admin Top Navbar */}
      <header className="admin-navbar">
        <div className="admin-nav-container">
          <div className="admin-brand-group">
            <div className="admin-nav-logo">
              <span className="admin-script">Velora</span>
              <span className="admin-portal-tag">PORTAL</span>
            </div>
            <div className="admin-badge-group">
              <span className="admin-badge-pill">CMS</span>
              <span className={`db-status-badge ${isUsingSupabase ? 'connected' : 'local'}`} title={isUsingSupabase ? 'Connected to Supabase live database' : 'Running in local mode'}>
                <span className="status-dot"></span>
                <span className="db-status-text">{isUsingSupabase ? 'Live DB' : 'Local'}</span>
              </span>
            </div>
          </div>

          <div className="admin-nav-actions">
            <button 
              type="button" 
              className="btn-back-to-store"
              onClick={onBackToStore}
              title="Return to customer boutique storefront"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span className="btn-text-full">Storefront</span>
            </button>

            <button 
              type="button" 
              className="btn-admin-logout"
              onClick={handleLogout}
              title="Log out of Admin Portal"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span className="btn-text-full">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {notification && (
        <div className="admin-toast">
          <span>{notification}</span>
        </div>
      )}

      {/* 2. Main Admin Workspace Container */}
      <main className="admin-workspace-container">
        {/* Page Title & Add Button Row */}
        <div className="admin-header-row">
          <div className="admin-title-wrap">
            <span className="admin-eyebrow">DASHBOARD & INVENTORY</span>
            <h1 className="admin-page-title">Catalog Management</h1>
            <p className="admin-page-subtitle">
              Manage inventory, prices, photo uploads, and boutique availability.
            </p>
          </div>

          <button 
            type="button" 
            className={`btn-primary-add ${showAddForm ? 'is-active' : ''}`}
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingProduct(null);
            }}
          >
            {showAddForm ? (
              <>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <span>Close Form</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Add New Accessory</span>
              </>
            )}
          </button>
        </div>

        {/* 3. Analytics KPI Cards (Mobile-Optimized 2x2 Grid) */}
        <div className="admin-kpi-grid">
          <div className="kpi-card">
            <div className="kpi-top">
              <span className="kpi-label">TOTAL ITEMS</span>
              <div className="kpi-icon-badge icon-items">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
              </div>
            </div>
            <span className="kpi-value">{totalItems}</span>
            <span className="kpi-sub">Boutique items</span>
          </div>

          <div className="kpi-card">
            <div className="kpi-top">
              <span className="kpi-label">IN STOCK</span>
              <div className="kpi-icon-badge icon-stock">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <span className="kpi-value status-stock">{inStockCount}</span>
            <span className="kpi-sub">Ready to ship</span>
          </div>

          <div className="kpi-card">
            <div className="kpi-top">
              <span className="kpi-label">PRE-ORDER</span>
              <div className="kpi-icon-badge icon-preorder">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
            </div>
            <span className="kpi-value status-preorder">{preOrderCount}</span>
            <span className="kpi-sub">Made-to-order</span>
          </div>

          <div className="kpi-card">
            <div className="kpi-top">
              <span className="kpi-label">CATALOG VALUE</span>
              <div className="kpi-icon-badge icon-value">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
            <span className="kpi-value">Rs. {totalCatalogValue.toLocaleString()}</span>
            <span className="kpi-sub">Total inventory</span>
          </div>
        </div>

        {/* 4. Add / Edit Product Panel */}
        {(showAddForm || editingProduct) && (
          <div className="admin-editor-card">
            <div className="editor-card-header">
              <div className="editor-card-title-wrap">
                <span className="editor-badge-eyebrow">{editingProduct ? 'EDITING MODE' : 'NEW CREATION'}</span>
                <h2>{editingProduct ? `Edit: ${editingProduct.name}` : 'Add New Boutique Accessory'}</h2>
              </div>
              <button 
                type="button" 
                className="editor-close-btn" 
                onClick={handleCancelForm}
                aria-label="Close editor"
              >
                ✕
              </button>
            </div>

            <form onSubmit={editingProduct ? handleSaveEdit : handleAddSubmit} className="admin-editor-form">
              <div className="form-fields-grid">
                <div className="admin-input-group">
                  <label>Product Name <span className="req-star">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Geometric Gold Hoop Earrings"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="admin-input-group">
                  <label>Category <span className="req-star">*</span></label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="admin-input-group">
                  <label>Price (Rs. / LKR) <span className="req-star">*</span></label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="e.g. 3500"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>

                <div className="admin-input-group">
                  <label>Highlight Badge</label>
                  <select
                    value={formData.tag}
                    onChange={(e) => setFormData({...formData, tag: e.target.value})}
                  >
                    {availableTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>

                {/* Media Image Upload Section */}
                <div className="admin-input-group full-width">
                  <div className="media-section-header">
                    <label>Product Photo <span className="req-star">*</span></label>
                    <div className="image-mode-tabs">
                      <button
                        type="button"
                        className={`image-mode-btn ${imageInputMode === 'upload' ? 'active' : ''}`}
                        onClick={() => setImageInputMode('upload')}
                      >
                        📁 Device Upload
                      </button>
                      <button
                        type="button"
                        className={`image-mode-btn ${imageInputMode === 'url' ? 'active' : ''}`}
                        onClick={() => setImageInputMode('url')}
                      >
                        🔗 Web URL
                      </button>
                    </div>
                  </div>

                  {imageInputMode === 'upload' ? (
                    <div 
                      className="image-dropzone-box"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageFileChange}
                      />
                      
                      {formData.image ? (
                        <div className="dropzone-preview-content">
                          <img src={formData.image} alt="Uploaded preview" className="dropzone-preview-img" />
                          <div className="dropzone-preview-info">
                            <span className="dropzone-success-text">✓ Photo ready</span>
                            <button 
                              type="button" 
                              className="btn-change-photo"
                              onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                              }}
                            >
                              Tap to Choose Another
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="dropzone-empty-content">
                          <div className="dropzone-icon-circle">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                              <circle cx="8.5" cy="8.5" r="1.5"/>
                              <polyline points="21 15 16 10 5 21"/>
                            </svg>
                          </div>
                          <p className="dropzone-main-text">
                            <strong>Tap to choose photo</strong> from gallery or camera
                          </p>
                          <p className="dropzone-sub-text">
                            Auto-compressed for fast loading (PNG, JPG, WEBP)
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="url-input-wrap">
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/... or direct image link"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                      />
                      {formData.image && (
                        <div className="image-preview-box">
                          <img src={formData.image} alt="Preview" className="preview-thumb" />
                          <span className="preview-caption">Live Preview</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="admin-input-group full-width">
                  <label>Description & Material Details</label>
                  <textarea
                    rows="3"
                    placeholder="18K gold plated, hypoallergenic, tarnish-resistant finish..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="admin-input-group full-width">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.available}
                      onChange={(e) => setFormData({...formData, available: e.target.checked})}
                    />
                    <span><strong>Ready In Stock</strong> (Uncheck to mark as Made-to-Order / Pre-Order)</span>
                  </label>
                </div>
              </div>

              <div className="editor-actions-row">
                <button type="submit" className="btn-save-primary" disabled={uploadingImage}>
                  {uploadingImage ? 'Processing Photo...' : (editingProduct ? 'Save Changes' : 'Publish Accessory')}
                </button>
                <button type="button" className="btn-cancel-secondary" onClick={handleCancelForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 5. Filter & Search Controls */}
        <div className="admin-table-filters-card">
          <div className="filter-search-box">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search accessories by name, category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="search-clear-btn" 
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="filter-selects-group">
            <div className="select-wrap">
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="admin-select"
              >
                <option value="All">All Categories ({products.length})</option>
                {categories.map(cat => {
                  const count = products.filter(p => p.category === cat).length;
                  return <option key={cat} value={cat}>{cat} ({count})</option>;
                })}
              </select>
            </div>

            <div className="select-wrap">
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="admin-select"
              >
                <option value="All">All Statuses</option>
                <option value="in-stock">In Stock ({inStockCount})</option>
                <option value="pre-order">Pre-Order ({preOrderCount})</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter & Quick summary */}
        <div className="admin-results-bar">
          <span className="results-count-text">
            Showing <strong>{filteredProducts.length}</strong> of {products.length} products
          </span>
          {(searchQuery || categoryFilter !== 'All' || statusFilter !== 'All') && (
            <button 
              type="button" 
              className="btn-reset-filters"
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('All');
                setStatusFilter('All');
              }}
            >
              Reset Filters ↺
            </button>
          )}
        </div>

        {/* 6A. MOBILE-FRIENDLY PRODUCT CARDS LIST (Active on <= 768px) */}
        <div className="admin-mobile-cards-list">
          {filteredProducts.length === 0 ? (
            <div className="admin-empty-state-card">
              <div className="empty-state-icon">🔍</div>
              <h3>No Accessories Found</h3>
              <p>Try adjusting your search query or filters.</p>
              <button 
                type="button" 
                className="btn-empty-reset"
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('All');
                  setStatusFilter('All');
                }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            filteredProducts.map(product => (
              <div key={product.id} className="admin-mobile-card">
                {/* Header Row: Image + Main Details */}
                <div className="mobile-card-main">
                  <img 
                    src={product.image || 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80'} 
                    alt={product.name} 
                    className="mobile-card-img" 
                  />
                  <div className="mobile-card-info">
                    <div className="mobile-card-tags">
                      <span className="table-category-tag">{product.category}</span>
                      {product.tag && (
                        <span className="table-badge-tag">{product.tag}</span>
                      )}
                    </div>
                    <h3 className="mobile-card-title">{product.name}</h3>
                    <div className="mobile-card-price">
                      Rs. {product.price?.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Middle: Description snippet if available */}
                {product.description && (
                  <p className="mobile-card-desc">
                    {product.description.length > 85 ? `${product.description.slice(0, 85)}...` : product.description}
                  </p>
                )}

                {/* Bottom Row: Status Toggle + Edit/Delete Actions */}
                <div className="mobile-card-footer">
                  <button
                    type="button"
                    className={`mobile-status-btn ${product.available ? 'in-stock' : 'pre-order'}`}
                    onClick={() => {
                      onToggleAvailability(product.id);
                      triggerNotification(`Status changed to ${!product.available ? 'In Stock' : 'Pre-Order'} for "${product.name}"`);
                    }}
                    title="Tap to toggle in-stock / pre-order status"
                  >
                    <span className="status-dot"></span>
                    <span>{product.available ? 'In Stock' : 'Pre-Order'}</span>
                  </button>

                  <div className="mobile-action-group">
                    <button 
                      type="button" 
                      className="btn-mobile-edit"
                      onClick={() => handleEdit(product)}
                      title="Edit accessory"
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      <span>Edit</span>
                    </button>

                    <button 
                      type="button" 
                      className="btn-mobile-delete"
                      onClick={() => handleDelete(product.id, product.name)}
                      title="Delete accessory"
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 6B. DESKTOP FULL TABLE (Active on > 768px) */}
        <div className="admin-table-wrapper-card admin-desktop-table-container">
          <table className="admin-full-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Highlight</th>
                <th>Inventory Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="table-empty-cell">
                    No products match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-table-cell">
                        <img src={product.image} alt={product.name} className="table-product-image" />
                        <div>
                          <strong className="product-name-title">{product.name}</strong>
                          <p className="product-desc-snippet">{product.description?.slice(0, 60)}...</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="table-category-tag">{product.category}</span>
                    </td>
                    <td>
                      <strong>Rs. {product.price?.toLocaleString()}</strong>
                    </td>
                    <td>
                      {product.tag ? (
                        <span className="table-badge-tag">{product.tag}</span>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        className={`status-toggle-pill ${product.available ? 'in-stock' : 'pre-order'}`}
                        onClick={() => {
                          onToggleAvailability(product.id);
                          triggerNotification(`Toggled status for "${product.name}"`);
                        }}
                        title="Click to toggle availability"
                      >
                        {product.available ? 'In Stock' : 'Pre-Order'}
                      </button>
                    </td>
                    <td className="text-right">
                      <div className="table-action-btns">
                        <button 
                          type="button" 
                          className="btn-action-edit"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>
                        <button 
                          type="button" 
                          className="btn-action-delete"
                          onClick={() => handleDelete(product.id, product.name)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
