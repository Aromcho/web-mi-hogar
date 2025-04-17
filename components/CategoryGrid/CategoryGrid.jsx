import "./CategoryGrid.css"

export default function CategoryGrid() {
  // Categorías de propiedades con sus íconos (SVG inline para mayor control)
  const categories = [
    {
      name: "Alquiler temporal",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ),
    },
    {
      name: "Departamentos",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="8" y1="10" x2="16" y2="10" />
          <line x1="8" y1="14" x2="16" y2="14" />
          <line x1="8" y1="18" x2="16" y2="18" />
        </svg>
      ),
    },
    {
      name: "Casas",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      name: "Terrenos",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 14v6m-3-3h6M9 11.27V9.27c0-1.5-1.8-2-3-1l-3 2.5 3 2.5c1.2 1 3 .5 3-1z" />
          <path d="M7 22V11.27" />
          <path d="M22 19c0-9-4-12-11-12C4 7 2 9 2 13c0 5 7 9 10 9" />
        </svg>
      ),
    },
    {
      name: "Cocheras",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M10 9h4" />
          <path d="M10 13h4" />
          <path d="M10 17h4" />
        </svg>
      ),
    },
    {
      name: "Oficinas",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 12v6m-3-3h6" />
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 4v4" />
          <path d="M15 4v4" />
          <path d="M4 9h16" />
        </svg>
      ),
    },
    {
      name: "Locales",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 3h20v5H2z" />
          <path d="M20 8v13H4V8" />
          <path d="M2 8h20" />
          <path d="M12 12v9" />
        </svg>
      ),
    },
    {
      name: "Quintas",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 14v6m-3-3h6M9 11.27V9.27c0-1.5-1.8-2-3-1l-3 2.5 3 2.5c1.2 1 3 .5 3-1z" />
          <path d="M7 22V11.27" />
          <path d="M22 19c0-9-4-12-11-12C4 7 2 9 2 13c0 5 7 9 10 9" />
        </svg>
      ),
    },
  ]

  return (
    <div className="category-grid-container">
      <h2 className="category-title">¿Qué estás buscando?</h2>
      <div className="category-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <div className="category-icon-container">{category.icon}</div>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
