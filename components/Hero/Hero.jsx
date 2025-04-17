"use client"

import "./Hero.css"
import { useState, useRef, useEffect } from "react"
import { Search, MapPin, SlidersHorizontal } from "lucide-react"
import MapModal from "../MapModal/MapModal"

export default function Hero({ searchType, setSearchType }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showMapModal, setShowMapModal] = useState(false)
  const searchInputRef = useRef(null)

  // Sugerencias de ejemplo (en una implementación real, estas vendrían de una API)
  const suggestions = [
    "Palermo, Buenos Aires",
    "Recoleta, Buenos Aires",
    "Belgrano, Buenos Aires",
    "Caballito, Buenos Aires",
    "Núñez, Buenos Aires",
    "Departamento con gimnasio",
    "Casa con piscina",
    "Departamento con balcón",
    "Oficina en microcentro",
  ].filter((suggestion) => searchQuery && suggestion.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSearch = (e) => {
    e.preventDefault()
    // Implementar lógica de búsqueda
    console.log("Buscando:", searchQuery, "Tipo:", searchType)
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
  }

  const handleClickOutside = (e) => {
    if (searchInputRef.current && !searchInputRef.current.contains(e.target)) {
      setShowSuggestions(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Encontrá tu hogar ideal</h1>

        <div className="search-container">
          <div className="search-tabs">
            <button
              className={`tab-button ${searchType === "Alquiler" ? "active" : ""}`}
              onClick={() => setSearchType("Alquiler")}
            >
              Alquilar
            </button>
            <button
              className={`tab-button ${searchType === "Venta" ? "active" : ""}`}
              onClick={() => setSearchType("Venta")}
            >
              Comprar
            </button>
            <button className="tab-button map-button" onClick={() => setShowMapModal(true)}>
              <MapPin size={18} />
              Mapa
            </button>
          </div>

          <div className="search-box" ref={searchInputRef}>
            <form onSubmit={handleSearch}>
              <div className="search-input-container">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Ingresa ubicaciones o características (ej. gimnasio)"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowSuggestions(true)
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="search-input"
                />
              </div>

              {showSuggestions && suggestions.length > 0 && (
                <div className="search-suggestions">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
                      <Search size={16} />
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="search-actions">
                <button type="submit" className="search-button">
                  Buscar
                </button>
                <button type="button" className="filter-button">
                  <SlidersHorizontal size={18} />
                  Filtrar por
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showMapModal && <MapModal onClose={() => setShowMapModal(false)} />}
    </section>
  )
}
