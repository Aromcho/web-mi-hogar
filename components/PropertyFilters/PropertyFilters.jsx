"use client"

import "./PropertyFilters.css"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function PropertyFilters({ filters, onFilterChange }) {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    characteristics: true,
    amenities: true,
    propertyType: true,
  })

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const propertyTypes = [
    { id: "casa", label: "Casa" },
    { id: "departamento", label: "Departamento" },
    { id: "ph", label: "PH" },
    { id: "terreno", label: "Terreno" },
    { id: "cochera", label: "Cochera" },
    { id: "oficina", label: "Oficina Comercial" },
    { id: "local", label: "Local Comercial" },
  ]

  const amenities = [
    { id: "pool", label: "Piscina" },
    { id: "gym", label: "Gimnasio" },
    { id: "security", label: "Seguridad 24hs" },
    { id: "balcony", label: "Balcón" },
    { id: "garden", label: "Jardín" },
    { id: "garage", label: "Cochera" },
    { id: "elevator", label: "Ascensor" },
    { id: "laundry", label: "Lavadero" },
  ]

  const handlePriceChange = (e) => {
    const { name, value } = e.target
    onFilterChange({ [name]: value })
  }

  const handlePropertyTypeChange = (type) => {
    onFilterChange({ propertyType: type })
  }

  const handleBedroomsChange = (value) => {
    onFilterChange({ bedrooms: value })
  }

  const handleBathroomsChange = (value) => {
    onFilterChange({ bathrooms: value })
  }

  return (
    <div className="property-filters">
      <h2 className="filters-title">Filtros</h2>

      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleSection("price")}>
          <h3>Precio</h3>
          {expandedSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {expandedSections.price && (
          <div className="filter-content">
            <div className="price-inputs">
              <div className="input-group">
                <label>Mínimo</label>
                <div className="currency-input">
                  <span className="currency-symbol">US$</span>
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handlePriceChange}
                    placeholder="Desde"
                  />
                </div>
              </div>
              <div className="input-group">
                <label>Máximo</label>
                <div className="currency-input">
                  <span className="currency-symbol">US$</span>
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handlePriceChange}
                    placeholder="Hasta"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleSection("characteristics")}>
          <h3>Características</h3>
          {expandedSections.characteristics ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {expandedSections.characteristics && (
          <div className="filter-content">
            <div className="characteristic-group">
              <label>Dormitorios</label>
              <div className="button-group">
                <button className={filters.bedrooms === "1" ? "active" : ""} onClick={() => handleBedroomsChange("1")}>
                  1+
                </button>
                <button className={filters.bedrooms === "2" ? "active" : ""} onClick={() => handleBedroomsChange("2")}>
                  2+
                </button>
                <button className={filters.bedrooms === "3" ? "active" : ""} onClick={() => handleBedroomsChange("3")}>
                  3+
                </button>
                <button className={filters.bedrooms === "4" ? "active" : ""} onClick={() => handleBedroomsChange("4")}>
                  4+
                </button>
              </div>
            </div>

            <div className="characteristic-group">
              <label>Baños</label>
              <div className="button-group">
                <button
                  className={filters.bathrooms === "1" ? "active" : ""}
                  onClick={() => handleBathroomsChange("1")}
                >
                  1+
                </button>
                <button
                  className={filters.bathrooms === "2" ? "active" : ""}
                  onClick={() => handleBathroomsChange("2")}
                >
                  2+
                </button>
                <button
                  className={filters.bathrooms === "3" ? "active" : ""}
                  onClick={() => handleBathroomsChange("3")}
                >
                  3+
                </button>
              </div>
            </div>

            <div className="characteristic-group">
              <label>Superficie</label>
              <div className="range-inputs">
                <input type="range" min="0" max="500" step="10" defaultValue="0" />
                <div className="range-values">
                  <span>0 m²</span>
                  <span>500+ m²</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleSection("propertyType")}>
          <h3>Tipo de propiedad</h3>
          {expandedSections.propertyType ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {expandedSections.propertyType && (
          <div className="filter-content">
            <div className="checkbox-group">
              {propertyTypes.map((type) => (
                <div className="checkbox-item" key={type.id}>
                  <input
                    type="checkbox"
                    id={`type-${type.id}`}
                    checked={filters.propertyType === type.id}
                    onChange={() => handlePropertyTypeChange(type.id)}
                  />
                  <label htmlFor={`type-${type.id}`}>{type.label}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleSection("amenities")}>
          <h3>Comodidades</h3>
          {expandedSections.amenities ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {expandedSections.amenities && (
          <div className="filter-content">
            <div className="checkbox-group">
              {amenities.map((amenity) => (
                <div className="checkbox-item" key={amenity.id}>
                  <input type="checkbox" id={`amenity-${amenity.id}`} />
                  <label htmlFor={`amenity-${amenity.id}`}>{amenity.label}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button className="apply-filters-button">Aplicar filtros</button>
      <button className="clear-filters-button">Limpiar filtros</button>
    </div>
  )
}
