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
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      ),
      title: 'Instant WhatsApp Concierge',
      subtitle: 'Personal assistance, custom styling advice, and smooth order checkout.'
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
