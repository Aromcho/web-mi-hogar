"use client"

import "./alquilar.css"
import { useState, useEffect } from "react"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import PropertyFiltersRent from "../../components/PropertyFiltersRent/PropertyFiltersRent"
import PropertyGrid from "../../components/PropertyGrid/PropertyGrid"
import { MapPin, List, Grid, Calendar } from 'lucide-react'

export default function AlquilarPage() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState("grid") // grid o list
  const [showMap, setShowMap] = useState(false)
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
    location: "",
    rentPeriod: "monthly", // monthly, temporary, yearly
    availableFrom: "",
  })

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // En un entorno real, aquí se enviarían los filtros al backend
        const response = await fetch(
          "http://localhost:3003/properties/search?operation_type=Alquiler",
        )
        if (!response.ok) throw new Error("Network response was not ok")

        const data = await response.json()
        setProperties(data.objects || [])
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    // Simulamos un pequeño retraso para mostrar el estado de carga
    const timer = setTimeout(() => {
      fetchProperties()
    }, 1000)

    return () => clearTimeout(timer)
  }, [filters])


  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid")
  }

  const toggleMapView = () => {
    setShowMap(!showMap)
  }

  return (
    <div className="alquilar-container">
      <Header />

      <main>
        <div className="alquilar-hero">
          <div className="alquilar-hero-content">
            <h1>Propiedades en Alquiler</h1>
            <p>Encuentra el lugar perfecto para vivir entre nuestra selección de alquileres</p>
          </div>
        </div>

        <div className="alquilar-content">
          <div className="alquilar-toolbar">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Buscar por ubicación, características..."
                className="search-input"
                value={filters.location}
                onChange={(e) => handleFilterChange({ location: e.target.value })}
              />
            </div>

            <div className="view-options">
              <button
                className={`view-option-button ${viewMode === "grid" ? "active" : ""}`}
                onClick={toggleViewMode}
                title="Vista de cuadrícula"
              >
                <Grid size={20} />
              </button>
              <button
                className={`view-option-button ${viewMode === "list" ? "active" : ""}`}
                onClick={toggleViewMode}
                title="Vista de lista"
              >
                <List size={20} />
              </button>
              <button
                className={`view-option-button map-button ${showMap ? "active" : ""}`}
                onClick={toggleMapView}
                title="Ver en mapa"
              >
                <MapPin size={20} />
                <span>Mapa</span>
              </button>
            </div>
          </div>

          <div className="alquilar-layout">
            <aside className="filters-sidebar">
              <PropertyFiltersRent filters={filters} onFilterChange={handleFilterChange} />
            </aside>

            <div className="properties-content">
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Cargando propiedades...</p>
                </div>
              ) : error ? (
                <div className="error-message">
                  <p>Error al cargar propiedades: {error}</p>
                  <button className="retry-button" onClick={() => setLoading(true)}>
                    Reintentar
                  </button>
                </div>
              ) : showMap ? (
                <div className="map-container">
                  <div className="map-placeholder">
                    <MapPin size={48} />
                    <p>Mapa de propiedades en alquiler</p>
                    <span>Aquí se mostraría un mapa interactivo con las propiedades</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="rent-info-banner">
                    <Calendar size={20} />
                    <p>
                      <strong>Consejo:</strong> Programa visitas con anticipación. Las propiedades en alquiler suelen
                      ocuparse rápidamente.
                    </p>
                  </div>
                  <PropertyGrid properties={properties} viewMode={viewMode} isRental={true} />
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

