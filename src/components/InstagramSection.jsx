import '../styles/InstagramSection.css';

export const InstagramSection = ({ onSelectProduct, products = [] }) => {
  const instagramFeedItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80",
      caption: "Geometric Gold Hoops. The finishing touch to every look.",
      likes: '142',
      isCarousel: true,
      linkedProduct: products.find(p => p.id === 1)
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
      caption: "Knotted Heart Snake Chain Pendant in 18K Gold Finish.",
      likes: '289',
      isCarousel: true,
      linkedProduct: products.find(p => p.id === 2)
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1611591477287-a128e469d76c?w=800&auto=format&fit=crop&q=80",
      caption: "Layered bracelet stack on white marble backdrop.",
      likes: '198',
      isCarousel: false,
      linkedProduct: products.find(p => p.id === 3)
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&auto=format&fit=crop&q=80",
      caption: "Black Clover Motif Bangle & Bracelet Duo. Exclusive Pre-Order.",
      likes: '356',
      isCarousel: true,
      linkedProduct: products.find(p => p.id === 4)
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80",
      caption: "Onyx Stone Geometry on Gold Snake Chain.",
      likes: '215',
      isCarousel: true,
      linkedProduct: products.find(p => p.id === 5)
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80",
      caption: "Ruched Dumpling Croissant Shoulder Bag. Ivory Minimalist Edit.",
      likes: '412',
      isCarousel: false,
      linkedProduct: products.find(p => p.id === 6)
    }
  ];

  return (
    <section className="instagram-section" id="instagram-section">
      <div className="container">
        {/* Instagram Profile Header Card */}
        <div className="ig-profile-card">
          <div className="ig-avatar-wrap">
            <div className="ig-avatar">
              <span className="ig-avatar-logo">Velora</span>
            </div>
          </div>

          <div className="ig-profile-info">
            <div className="ig-username-row">
              <h3 className="ig-handle">_velora_.accessories</h3>
              <a 
                href="https://instagram.com/_velora_.accessories" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ig-follow-btn"
              >
                Follow on Instagram
              </a>
            </div>

            <div className="ig-stats-row">
              <span><strong>12</strong> posts</span>
              <span><strong>1,384</strong> followers</span>
              <span><strong>803</strong> following</span>
            </div>

            <div className="ig-bio">
              <p className="ig-bio-name">Velora | Lifestyle Boutique</p>
              <p className="ig-bio-category">Boutique • Accessories</p>
              <p className="ig-bio-text">The finishing touch to every look</p>
              <p className="ig-bio-text">Colombo, Sri Lanka • Island-wide delivery</p>
              <p className="ig-bio-text">Pre-orders only</p>
            </div>
          </div>
        </div>

        {/* 6-Photo Feed Grid */}
        <div className="ig-feed-grid">
          {instagramFeedItems.map((post) => (
            <div 
              key={post.id} 
              className="ig-post-card"
              onClick={() => post.linkedProduct && onSelectProduct(post.linkedProduct)}
            >
              <img src={post.image} alt={post.caption} className="ig-post-img" />
              
              {post.isCarousel && (
                <span className="ig-carousel-icon" title="Carousel">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="#ffffff">
                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/>
                  </svg>
                </span>
              )}

              <div className="ig-post-hover">
                <div className="ig-hover-stat">
                  <svg className="ig-heart-icon" viewBox="0 0 24 24" fill="#ffffff" width="16" height="16">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <span>{post.likes}</span>
                </div>
                <p className="ig-hover-caption">{post.caption}</p>
                <span className="ig-view-tag">Shop Item</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
