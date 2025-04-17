"use client"

import "./comprar.css"
import { useState, useEffect } from "react"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import PropertyFilters from "../../components/PropertyFilters/PropertyFilters"
import PropertyGrid from "../../components/PropertyGrid/PropertyGrid"
import { MapPin, List, Grid } from "lucide-react"

export default function ComprarPage() {
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
  })

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // En un entorno real, aquí se enviarían los filtros al backend
        const response = await fetch(
          "http://localhost:3003/properties/search?operation_type=Venta",
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

  // Propiedades de ejemplo para mostrar
  const demoProperties = [
    {
      _id: "1",
      publication_title: "",
      address: "Calle 36 entre Necochea y Miramar, Mar Azul, Provincia de Buenos Aires",
      operations: [{ prices: [{ price: 269000 }] }],
      photos: [{ thumb: "/property1.jpg" }],
      surface_total: 25,
      rooms: { bedrooms: 1, bathrooms: 1 },
    },
    {
      _id: "2",
      publication_title: "",
      address: "Calle 36 entre Necochea y Miramar, Mar Azul, Provincia de Buenos Aires",
      operations: [{ prices: [{ price: 269000 }] }],
      photos: [{ thumb: "/property2.jpg" }],
      surface_total: 25,
      rooms: { bedrooms: 1, bathrooms: 1 },
    },
    {
      _id: "3",
      publication_title: "",
      address: "Calle 36 entre Necochea y Miramar, Mar Azul, Provincia de Buenos Aires",
      operations: [{ prices: [{ price: 269000 }] }],
      photos: [{ thumb: "/property3.jpg" }],
      surface_total: 25,
      rooms: { bedrooms: 1, bathrooms: 1 },
    },
    {
      _id: "4",
      publication_title: "",
      address: "Calle 36 entre Necochea y Miramar, Mar Azul, Provincia de Buenos Aires",
      operations: [{ prices: [{ price: 269000 }] }],
      photos: [{ thumb: "/property1.jpg" }],
      surface_total: 25,
      rooms: { bedrooms: 1, bathrooms: 1 },
    },
    {
      _id: "5",
      publication_title: "",
      address: "Calle 36 entre Necochea y Miramar, Mar Azul, Provincia de Buenos Aires",
      operations: [{ prices: [{ price: 269000 }] }],
      photos: [{ thumb: "/property2.jpg" }],
      surface_total: 25,
      rooms: { bedrooms: 1, bathrooms: 1 },
    },
    {
      _id: "6",
      publication_title: "",
      address: "Calle 36 entre Necochea y Miramar, Mar Azul, Provincia de Buenos Aires",
      operations: [{ prices: [{ price: 269000 }] }],
      photos: [{ thumb: "/property3.jpg" }],
      surface_total: 25,
      rooms: { bedrooms: 1, bathrooms: 1 },
    },
    {
      _id: "7",
      publication_title: "",
      address: "Calle 36 entre Necochea y Miramar, Mar Azul, Provincia de Buenos Aires",
      operations: [{ prices: [{ price: 269000 }] }],
      photos: [{ thumb: "/property1.jpg" }],
      surface_total: 25,
      rooms: { bedrooms: 1, bathrooms: 1 },
    },
    {
      _id: "8",
      publication_title: "",
      address: "Calle 36 entre Necochea y Miramar, Mar Azul, Provincia de Buenos Aires",
      operations: [{ prices: [{ price: 269000 }] }],
      photos: [{ thumb: "/property2.jpg" }],
      surface_total: 25,
      rooms: { bedrooms: 1, bathrooms: 1 },
    },
    {
      _id: "9",
      publication_title: "",
      address: "Calle 36 entre Necochea y Miramar, Mar Azul, Provincia de Buenos Aires",
      operations: [{ prices: [{ price: 269000 }] }],
      photos: [{ thumb: "/property3.jpg" }],
      surface_total: 25,
      rooms: { bedrooms: 1, bathrooms: 1 },
    },
  ]

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
    <div className="comprar-container">
      <Header />

      <main>
        <div className="comprar-hero">
          <div className="comprar-hero-content">
            <h1>Propiedades en Venta</h1>
            <p>Encuentra la propiedad de tus sueños entre nuestra amplia selección</p>
          </div>
        </div>

        <div className="comprar-content">
          <div className="comprar-toolbar">
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

          <div className="comprar-layout">
            <aside className="filters-sidebar">
              <PropertyFilters filters={filters} onFilterChange={handleFilterChange} />
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
                    <p>Mapa de propiedades</p>
                    <span>Aquí se mostraría un mapa interactivo con las propiedades</span>
                  </div>
                </div>
              ) : (
                <PropertyGrid properties={properties} viewMode={viewMode} />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
