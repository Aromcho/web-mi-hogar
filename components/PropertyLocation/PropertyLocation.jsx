"use client"

import { useState, useEffect } from "react"
import "./PropertyLocation.css"
import { MapPin, Navigation } from "lucide-react"

export default function PropertyLocation({ property }) {
  const { address, location } = property
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // En una implementación real, aquí cargaríamos un mapa interactivo
    // como Google Maps, Mapbox, etc.
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleOpenDirections = () => {
    if (location && location.lat && location.lng) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`, "_blank")
    } else {
      // Si no tenemos coordenadas, usamos la dirección
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, "_blank")
    }
  }

  return (
    <div className="property-location">
      <h2 className="section-title">Ubicación</h2>

      <div className="location-address">
        <MapPin size={18} />
        <p>{address}</p>
      </div>

      <div className="location-map-container">
        {!mapLoaded ? (
          <div className="map-loading">
            <div className="loading-spinner"></div>
            <p>Cargando mapa...</p>
          </div>
        ) : (
          <div className="location-map">
            {/* Aquí iría el mapa real */}
            <div className="map-placeholder">
              <MapPin size={32} />
              <div className="map-pin-ripple"></div>
            </div>
          </div>
        )}
      </div>

      <div className="location-actions">
        <button className="directions-button" onClick={handleOpenDirections}>
          <Navigation size={18} />
          Cómo llegar
        </button>

        <div className="location-disclaimer">
          <p>La ubicación mostrada es aproximada para proteger la privacidad del propietario.</p>
        </div>
      </div>

      <div className="location-nearby">
        <h3>Puntos de interés cercanos</h3>
        <div className="nearby-items">
          <div className="nearby-item">
            <span className="nearby-icon transport"></span>
            <div className="nearby-info">
              <p className="nearby-title">Transporte</p>
              <p className="nearby-detail">Estación de subte a 300m</p>
              <p className="nearby-detail">Parada de colectivo a 100m</p>
            </div>
          </div>

          <div className="nearby-item">
            <span className="nearby-icon education"></span>
            <div className="nearby-info">
              <p className="nearby-title">Educación</p>
              <p className="nearby-detail">Escuela primaria a 500m</p>
              <p className="nearby-detail">Universidad a 1.2km</p>
            </div>
          </div>

          <div className="nearby-item">
            <span className="nearby-icon health"></span>
            <div className="nearby-info">
              <p className="nearby-title">Salud</p>
              <p className="nearby-detail">Hospital a 800m</p>
              <p className="nearby-detail">Farmacia a 200m</p>
            </div>
          </div>

          <div className="nearby-item">
            <span className="nearby-icon shopping"></span>
            <div className="nearby-info">
              <p className="nearby-title">Comercios</p>
              <p className="nearby-detail">Supermercado a 400m</p>
              <p className="nearby-detail">Shopping a 1.5km</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
