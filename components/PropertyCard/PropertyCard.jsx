import "./PropertyCard.css"
import Image from "next/image"
import { Bed, Bath, Square, Clock, MessageSquare, Share2 } from 'lucide-react'
import Link from "next/link"

export default function PropertyCard({ property, isRental = false }) {
  const {
    _id,
    publication_title,
    address,
    operations,
    photos,
    surface_total,
    rooms,
    isTemporary,
    availableFrom,
    branch,
    location
  } = property
  
  const title = publication_title || "Propiedad sin título"
  const mainAddress = address?.trim() || "Dirección no disponible"
  const cityProvince = location?.name?.trim() || "Ubicación no especificada"
  const imageUrl = photos?.[0]?.thumb || "/placeholder.svg?height=200&width=300"
  const price = operations?.[0]?.prices?.[0]?.price ?? "No informado"
  const bedrooms = rooms?.bedrooms ?? 1
  const bathrooms = rooms?.bathrooms ?? 1
  const surface = surface_total ?? 25
  const agencyLogo = branch?.logo || "/logo.png"

  
  const handleShare = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (navigator.share) {
      navigator
        .share({
          title: title || "Propiedad en Mi Hogar",
          text: `Mira esta propiedad: ${location}`,
          url: window.location.origin + `/property/${_id}`,
        })
        .catch((error) => console.log("Error compartiendo:", error))
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(window.location.origin + `/property/${_id}`)
      alert("Enlace copiado al portapapeles")
    }
  }
  
  const handleContact = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // Aquí se podría abrir un modal de contacto o redirigir a la página de contacto
    window.location.href = `/property/${_id}#contact`
  }

  return (
    <Link href={`/property/${_id}`}>
      <div className="property-card">
        <div className="property-image">
          {imageUrl.startsWith("/") ? (
            <Image src={imageUrl || "/placeholder.svg"} alt={title} width={300} height={200} className="property-img" />
          ) : (
            <img src={imageUrl || "/placeholder.svg"} alt={title} className="property-img" />
          )}

          {isRental && isTemporary && <div className="property-badge temporary">Temporario</div>}
          
          <div className="property-agency-logo">
            <Image src={agencyLogo || "/placeholder.svg"} alt="Logo inmobiliaria" width={30} height={30} className="agency-logo-img" />
          </div>
        </div>

        <div className="property-content">
          <h3 className="property-address">{mainAddress}</h3>
          <p className="property-location">{cityProvince}</p>

          <p className="property-price">
            {isRental
              ? `$${typeof price === "number" ? price.toLocaleString() : price}/mes`
              : `US$${typeof price === "number" ? price.toLocaleString() : price}`}
          </p>

          {isRental && (
            <div className="property-availability">
              <Clock size={14} />
              <span>Disponible: {availableFrom}</span>
            </div>
          )}

          <div className="property-features">
            <div className="feature">
              <Square size={16} />
              <span>{surface} m²</span>
            </div>
            <div className="feature">
              <Bed size={16} />
              <span>{bedrooms} hab.</span>
            </div>
            <div className="feature">
              <Bath size={16} />
              <span>{bathrooms} baño</span>
            </div>
          </div>
          
          <div className="property-actions">
            <button className="property-action-btn contact-btn" onClick={handleContact}>
              <MessageSquare size={16} />
              <span>Contactar</span>
            </button>
            <button className="property-action-btn share-btn" onClick={handleShare}>
              <Share2 size={16} />
              <span>Compartir</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
