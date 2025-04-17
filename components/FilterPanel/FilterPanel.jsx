"use client"

import { useState, useEffect, useRef } from "react"
import "./FilterPanel.css"
import {
  X,
  DollarSign,
  Home,
  Building,
  Warehouse,
  LandPlot,
  Bed,
  Bath,
  Square,
  PocketIcon as Pool,
  Dumbbell,
  Shield,
  Wind,
  Car,
  CableCarIcon as Elevator,
  Wifi,
  Trees,
  UtensilsCrossed,
  Tv,
  Snowflake,
  Flame,
  ParkingCircle,
  CheckCircle2,
  Trash2,
} from "lucide-react"

export default function FilterPanel({ isOpen, onClose, onApplyFilters }) {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
    minArea: "",
    maxArea: "",
    amenities: [],
  })

  const panelRef = useRef(null)

  // Efecto para cerrar el panel al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Función para manejar los cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  // Función para manejar los cambios en los checkboxes de amenities
  const handleAmenityToggle = (amenity) => {
    setFilters((prev) => {
      const newAmenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity]

      return {
        ...prev,
        amenities: newAmenities,
      }
    })
  }

  // Función para aplicar los filtros
  const applyFilters = () => {
    onApplyFilters(filters)
    onClose()
  }

  // Función para resetear los filtros
  const resetFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
      propertyType: "",
      minArea: "",
      maxArea: "",
      amenities: [],
    })
  }

  // Lista de amenities con sus iconos
  const amenitiesList = [
    { id: "pool", label: "Piscina", icon: <Pool size={16} /> },
    { id: "gym", label: "Gimnasio", icon: <Dumbbell size={16} /> },
    { id: "security", label: "Seguridad 24hs", icon: <Shield size={16} /> },
    { id: "balcony", label: "Balcón", icon: <Wind size={16} /> },
    { id: "garage", label: "Cochera", icon: <Car size={16} /> },
    { id: "elevator", label: "Ascensor", icon: <Elevator size={16} /> },
    { id: "internet", label: "Internet", icon: <Wifi size={16} /> },
    { id: "garden", label: "Jardín", icon: <Trees size={16} /> },
    { id: "bbq", label: "Parrilla", icon: <UtensilsCrossed size={16} /> },
    { id: "tv", label: "TV Cable", icon: <Tv size={16} /> },
    { id: "ac", label: "Aire acondicionado", icon: <Snowflake size={16} /> },
    { id: "heating", label: "Calefacción", icon: <Flame size={16} /> },
  ]

  if (!isOpen) return null

  return (
    <div className="filter-panel-overlay">
      <div className="filter-panel" ref={panelRef}>
        <div className="filter-panel-header">
          <h3>Filtros de búsqueda</h3>
          <button className="close-filter-panel-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="filter-panel-content">
          <div className="filter-section price-section">
            <h4 className="filter-title">
              <DollarSign size={20} className="filter-icon" />
              Precio
            </h4>
            <div className="price-inputs">
              <div className="input-group">
                <label>Mínimo</label>
                <div className="currency-input">
                  <span className="currency-symbol">$</span>
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Desde"
                  />
                </div>
              </div>
              <div className="input-group">
                <label>Máximo</label>
                <div className="currency-input">
                  <span className="currency-symbol">$</span>
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Hasta"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="filter-section property-type-section">
            <h4 className="filter-title">
              <Home size={20} className="filter-icon" />
              Tipo de propiedad
            </h4>
            <div className="property-type-buttons">
              <button
                className={`property-type-button ${filters.propertyType === "casa" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, propertyType: "casa" })}
              >
                <Home size={18} />
                <span>Casa</span>
              </button>
              <button
                className={`property-type-button ${filters.propertyType === "departamento" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, propertyType: "departamento" })}
              >
                <Building size={18} />
                <span>Departamento</span>
              </button>
              <button
                className={`property-type-button ${filters.propertyType === "ph" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, propertyType: "ph" })}
              >
                <Warehouse size={18} />
                <span>PH</span>
              </button>
              <button
                className={`property-type-button ${filters.propertyType === "terreno" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, propertyType: "terreno" })}
              >
                <LandPlot size={18} />
                <span>Terreno</span>
              </button>
            </div>
          </div>

          <div className="filter-section rooms-section">
            <div className="rooms-container">
              <div className="bedrooms-container">
                <h4 className="filter-title">
                  <Bed size={20} className="filter-icon" />
                  Habitaciones
                </h4>
                <div className="room-buttons">
                  <button
                    className={`room-button ${filters.bedrooms === "1" ? "active" : ""}`}
                    onClick={() => setFilters({ ...filters, bedrooms: "1" })}
                  >
                    1+
                  </button>
                  <button
                    className={`room-button ${filters.bedrooms === "2" ? "active" : ""}`}
                    onClick={() => setFilters({ ...filters, bedrooms: "2" })}
                  >
                    2+
                  </button>
                  <button
                    className={`room-button ${filters.bedrooms === "3" ? "active" : ""}`}
                    onClick={() => setFilters({ ...filters, bedrooms: "3" })}
                  >
                    3+
                  </button>
                  <button
                    className={`room-button ${filters.bedrooms === "4" ? "active" : ""}`}
                    onClick={() => setFilters({ ...filters, bedrooms: "4" })}
                  >
                    4+
                  </button>
                </div>
              </div>

              <div className="bathrooms-container">
                <h4 className="filter-title">
                  <Bath size={20} className="filter-icon" />
                  Baños
                </h4>
                <div className="room-buttons">
                  <button
                    className={`room-button ${filters.bathrooms === "1" ? "active" : ""}`}
                    onClick={() => setFilters({ ...filters, bathrooms: "1" })}
                  >
                    1+
                  </button>
                  <button
                    className={`room-button ${filters.bathrooms === "2" ? "active" : ""}`}
                    onClick={() => setFilters({ ...filters, bathrooms: "2" })}
                  >
                    2+
                  </button>
                  <button
                    className={`room-button ${filters.bathrooms === "3" ? "active" : ""}`}
                    onClick={() => setFilters({ ...filters, bathrooms: "3" })}
                  >
                    3+
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="filter-section area-section">
            <h4 className="filter-title">
              <Square size={20} className="filter-icon" />
              Superficie (m²)
            </h4>
            <div className="area-inputs">
              <div className="input-group">
                <label>Mínima</label>
                <input
                  type="number"
                  name="minArea"
                  value={filters.minArea}
                  onChange={handleFilterChange}
                  placeholder="Desde"
                />
              </div>
              <div className="input-group">
                <label>Máxima</label>
                <input
                  type="number"
                  name="maxArea"
                  value={filters.maxArea}
                  onChange={handleFilterChange}
                  placeholder="Hasta"
                />
              </div>
            </div>
          </div>

          <div className="filter-section amenities-section">
            <h4 className="filter-title">
              <CheckCircle2 size={20} className="filter-icon" />
              Amenities
            </h4>
            <div className="amenities-grid">
              {amenitiesList.map((amenity) => (
                <div
                  key={amenity.id}
                  className={`amenity-checkbox ${filters.amenities.includes(amenity.id) ? "active" : ""}`}
                  onClick={() => handleAmenityToggle(amenity.id)}
                >
                  <div className="amenity-icon">{amenity.icon}</div>
                  <span className="amenity-label">{amenity.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-section parking-section">
            <h4 className="filter-title">
              <ParkingCircle size={20} className="filter-icon" />
              Estacionamiento
            </h4>
            <div className="parking-options">
              <button
                className={`parking-button ${filters.parking === "included" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, parking: "included" })}
              >
                Incluido
              </button>
              <button
                className={`parking-button ${filters.parking === "optional" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, parking: "optional" })}
              >
                Opcional
              </button>
              <button
                className={`parking-button ${filters.parking === "none" ? "active" : ""}`}
                onClick={() => setFilters({ ...filters, parking: "none" })}
              >
                No necesario
              </button>
            </div>
          </div>
        </div>

        <div className="filter-panel-footer">
          <button className="reset-filters-button" onClick={resetFilters}>
            <Trash2 size={16} />
            <span>Limpiar filtros</span>
          </button>
          <button className="apply-filters-button" onClick={applyFilters}>
            <CheckCircle2 size={16} />
            <span>Aplicar filtros</span>
          </button>
        </div>
      </div>
    </div>
  )
}
