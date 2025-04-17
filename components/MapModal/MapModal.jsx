"use client"

import { useState, useEffect } from "react"
import { X, Search, MapPin } from "lucide-react"
import "./MapModal.css"

export default function MapModal({ onClose }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [mapLoaded, setMapLoaded] = useState(false)
  const [locations, setLocations] = useState([
    { id: 1, name: "Palermo", lat: -34.588, lng: -58.412, properties: 120 },
    { id: 2, name: "Recoleta", lat: -34.587, lng: -58.393, properties: 85 },
    { id: 3, name: "Belgrano", lat: -34.562, lng: -58.461, properties: 93 },
    { id: 4, name: "Caballito", lat: -34.619, lng: -58.443, properties: 67 },
    { id: 5, name: "Núñez", lat: -34.545, lng: -58.461, properties: 42 },
  ])

  useEffect(() => {
    // Simular carga del mapa
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="map-modal-overlay">
      <div className="map-modal">
        <div className="map-modal-header">
          <h2>Buscar en el mapa</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="map-search-container">
          <div className="map-search-input-container">
            <Search size={20} className="map-search-icon" />
            <input
              type="text"
              placeholder="Buscar por ubicación"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="map-search-input"
            />
          </div>
        </div>

        <div className="map-content">
          <div className="map-sidebar">
            <h3>Ubicaciones</h3>
            <div className="location-list">
              {filteredLocations.map((location) => (
                <div key={location.id} className="location-item">
                  <MapPin size={18} />
                  <div className="location-details">
                    <span className="location-name">{location.name}</span>
                    <span className="location-properties">{location.properties} propiedades</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="map-container">
            {!mapLoaded ? (
              <div className="map-loading">
                <div className="loading-spinner"></div>
                <p>Cargando mapa...</p>
              </div>
            ) : (
              <div className="map-placeholder">
                <div className="map-pins">
                  {locations.map((location) => (
                    <div
                      key={location.id}
                      className="map-pin"
                      style={{
                        left: `${Math.random() * 80 + 10}%`,
                        top: `${Math.random() * 80 + 10}%`,
                      }}
                    >
                      <div className="pin-marker">
                        <span className="pin-count">{location.properties}</span>
                      </div>
                      <div className="pin-pulse"></div>
                    </div>
                  ))}
                </div>
                <div className="map-attribution">Mapa interactivo (simulado para demostración)</div>
              </div>
            )}
          </div>
        </div>

        <div className="map-modal-footer">
          <button className="apply-map-button" onClick={onClose}>
            Aplicar ubicación
          </button>
        </div>
      </div>
    </div>
  )
}
