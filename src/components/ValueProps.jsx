import '../styles/ValueProps.css';

export const ValueProps = () => {
  const items = [
    {
      icon: (
        <svg className="luxury-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
      ),
      title: 'Island-Wide Delivery',
      subtitle: 'Fast, secure courier shipping across all 25 districts in Sri Lanka.'
    },
    {
      icon: (
        <svg className="luxury-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
      title: 'Curated Pre-Orders',
      subtitle: 'Exclusive boutique pieces handpicked and ordered specifically for you.'
    },
    {
      icon: (
        <svg className="luxury-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      title: 'Instagram Concierge',
      subtitle: 'Personal styling advice, custom pre-orders & direct DM checkout.'
    }
  ];

  return (
    <section className="value-props-section">
      <div className="container">
        <div className="value-props-grid">
          {items.map((item, idx) => (
            <div key={idx} className="value-prop-card">
              <div className="value-prop-icon-wrap">{item.icon}</div>
              <h3 className="value-prop-title">{item.title}</h3>
              <p className="value-prop-subtitle">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
