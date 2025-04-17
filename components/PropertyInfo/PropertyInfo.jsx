import "./PropertyInfo.css"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Bed, Bath, Square, Calendar, Clock, Eye, CheckCircle2, Shield, Sparkles } from "lucide-react"

export default function PropertyInfo({ property }) {
  const {
    publication_title,
    description = "Sin descripción disponible.",
    address = "Dirección no disponible",
    operations = [],
    surface_total = 0,
    roofed_surface = 0, // viene así del backend
    rooms = {},
    features = {},
    isTemporary,
    availableFrom = "A confirmar",
    created_at,
    views = 0,
  } = property

  const isRental = operations[0]?.operation_type === "Alquiler"
  const price = operations[0]?.prices?.[0]?.price
  const currency = isRental ? "$" : "US$"
  const period = isRental ? "/mes" : ""
  const expenses = operations[0]?.expenses
  const deposit = operations[0]?.deposit

  const formattedPrice =
    typeof price === "number" ? price.toLocaleString() : price || "No informado"
  const formattedExpenses =
    typeof expenses === "number" ? expenses.toLocaleString() : expenses || "-"
  const formattedDeposit =
    typeof deposit === "number" ? deposit.toLocaleString() : deposit || "-"

  let timeAgo = ""
  try {
    const publicationDate = created_at ? new Date(created_at) : new Date()
    timeAgo = formatDistanceToNow(publicationDate, {
      addSuffix: true,
      locale: es,
    })
  } catch {
    timeAgo = "hace poco"
  }

  const locationParts = address.split(",")
  const mainAddress = locationParts[0]
  const cityProvince = locationParts.slice(1).join(",").trim()
  const surface_covered  = roofed_surface || surface_total

  return (
    <div className="property-info">
      <div className="property-info-header">
        <div className="property-info-title-section">
          <h1 className="property-title">{publication_title}</h1>
          <p className="property-address">
            {mainAddress}
            <span className="property-city">{cityProvince}</span>
          </p>
        </div>

        <div className="property-info-price-section">
          <div className="property-price-container">
            <span className="property-price-label">Precio {isRental ? "de alquiler" : "de venta"}</span>
            <span className="property-price">
              {currency}
              {formattedPrice}
              {period}
            </span>
          </div>

          {isRental && expenses && (
            <div className="property-expenses">
              <span className="expenses-label">Expensas:</span>
              <span className="expenses-value">${formattedExpenses}</span>
            </div>
          )}

          {isRental && deposit && (
            <div className="property-deposit">
              <span className="deposit-label">Depósito:</span>
              <span className="deposit-value">${formattedDeposit}</span>
            </div>
          )}
        </div>
      </div>

      <div className="property-info-stats">
        <div className="property-stat">
          <Square size={18} />
          <span className="stat-value">{surface_total} m² totales</span>
        </div>
        <div className="property-stat">
          <Square size={18} />
          <span className="stat-value">{surface_covered} m² cubiertos</span>
        </div>
        <div className="property-stat">
          <Bed size={18} />
          <span className="stat-value">
            {rooms.bedrooms} dormitorio{rooms.bedrooms !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="property-stat">
          <Bath size={18} />
          <span className="stat-value">
            {rooms.bathrooms} baño{rooms.bathrooms !== 1 ? "s" : ""}
          </span>
        </div>
        {isRental && (
          <div className="property-stat">
            <Calendar size={18} />
            <span className="stat-value">Disponible: {availableFrom}</span>
          </div>
        )}
        {isRental && isTemporary && (
          <div className="property-stat temporary">
            <Clock size={18} />
            <span className="stat-value">Alquiler temporario</span>
          </div>
        )}
      </div>

      <div className="property-info-meta">
        <div className="property-meta-item">
          <Clock size={14} />
          <span>Publicado {timeAgo}</span>
        </div>
        <div className="property-meta-item">
          <Eye size={14} />
          <span>{views} visitas</span>
        </div>
      </div>

      <div className="property-description">
        <h2 className="section-title">Descripción</h2>
        <p className="description-text">{description}</p>
      </div>

      <div className="property-features-section">
        <h2 className="section-title">Características</h2>

        <div className="features-container">
          {features.amenities && features.amenities.length > 0 && (
            <div className="feature-group">
              <h3 className="feature-group-title">
                <Sparkles size={18} />
                Amenities
              </h3>
              <ul className="feature-list">
                {features.amenities.map((amenity, index) => (
                  <li key={index} className="feature-item">
                    <CheckCircle2 size={16} />
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {features.general && features.general.length > 0 && (
            <div className="feature-group">
              <h3 className="feature-group-title">
                <CheckCircle2 size={18} />
                Características generales
              </h3>
              <ul className="feature-list">
                {features.general.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <CheckCircle2 size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {features.security && features.security.length > 0 && (
            <div className="feature-group">
              <h3 className="feature-group-title">
                <Shield size={18} />
                Seguridad
              </h3>
              <ul className="feature-list">
                {features.security.map((security, index) => (
                  <li key={index} className="feature-item">
                    <CheckCircle2 size={16} />
                    {security}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
