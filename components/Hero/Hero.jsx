"use client"

import "./Hero.css"
import { useState, useRef, useEffect } from "react"
import { Search, MapPin, SlidersHorizontal } from "lucide-react"
import MapModal from "../MapModal/MapModal"
import FilterPanel from "../FilterPanel/FilterPanel"
import { fetchAutocomplete } from "../../utils/fetchAutocomplete"

export default function Hero({ searchType, setSearchType }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showMapModal, setShowMapModal] = useState(false)
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [activeFilters, setActiveFilters] = useState({})
  const searchInputRef = useRef(null)
  const debounceRef = useRef(null)

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Buscando:", searchQuery, "Tipo:", searchType, "Filtros:", activeFilters)
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (sug) => {
    setSearchQuery(sug)
    setShowSuggestions(false)
  }

  const handleClickOutside = (e) => {
    if (searchInputRef.current && !searchInputRef.current.contains(e.target)) {
      setShowSuggestions(false)
    }
  }

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters)
    console.log("Filtros aplicados:", filters)
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!searchQuery) {
      setSuggestions([])
      return
    }

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      const data = await fetchAutocomplete(searchQuery)
      const list = data.map((d) => (d.secundvalue ? `${d.value}, ${d.secundvalue}` : d.value))
      setSuggestions(list)
      setShowSuggestions(true)
    }, 300) // debounce 300 ms
  }, [searchQuery])

  // Calcular si hay filtros activos
  const hasActiveFilters = Object.keys(activeFilters).some((key) => {
    if (key === "amenities" && Array.isArray(activeFilters[key])) {
      return activeFilters[key].length > 0
    }
    return activeFilters[key] !== "" && activeFilters[key] !== undefined
  })

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Elegí tu próximo capitulo</h1>

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
            <button className="tab-button" onClick={() => setShowMapModal(true)}>
              <MapPin size={18} />
              Mapa
            </button>
          </div>

          <div className="search-box" ref={searchInputRef}>
            <form onSubmit={handleSearch}>
              <div className="hero-search-input-container">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Ingresa ubicaciones o características"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  className="hero-search-input"
                />
              </div>

              {showSuggestions && suggestions.length > 0 && (
                <div className="hero-search-suggestions">
                  {suggestions.map((sug, idx) => (
                    <div key={idx} className="hero-suggestion-item" onClick={() => handleSuggestionClick(sug)}>
                      <Search size={16} />
                      <span>{sug}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="search-actions">
                <button type="submit" className="search-button">
                  Buscar
                </button>
                <button
                  type="button"
                  className={`filter-button ${hasActiveFilters ? "has-filters" : ""}`}
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                >
                  <SlidersHorizontal size={18} />
                  Filtrar por
                  {hasActiveFilters && <span className="filter-badge"></span>}
                </button>
              </div>

              {showFilterPanel && (
                <FilterPanel
                  isOpen={showFilterPanel}
                  onClose={() => setShowFilterPanel(false)}
                  onApplyFilters={handleApplyFilters}
                />
              )}
            </form>
          </div>
        </div>
      </div>

      {showMapModal && <MapModal onClose={() => setShowMapModal(false)} />}
    </section>
  )
}
