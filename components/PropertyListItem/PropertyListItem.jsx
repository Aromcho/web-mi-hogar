import "./PropertyListItem.css"
import Image from "next/image"
import { Bed, Bath, Square } from "lucide-react"
import Link from "next/link"

export default function PropertyListItem({ property }) {
  const { _id, publication_title, address, operations, photos, surface_total, rooms } = property

  const price = operations?.[0]?.prices?.[0]?.price ?? "No informado"
  const imageUrl = photos?.[0]?.thumb || "/placeholder.svg?height=200&width=300"
  const title = publication_title || ""
  const location = address || "Ubicación no disponible"
  const locationParts = location.split(",")
  const mainAddress = locationParts[0]
  const cityProvince = locationParts.slice(1).join(",").trim()

  const bedrooms = rooms?.bedrooms || 1
  const bathrooms = rooms?.bathrooms || 1
  const surface = surface_total || 25

  return (
    <Link href={`/property/${_id}`}>
      <div className="property-list-item">
        <div className="property-list-image">
          {imageUrl.startsWith("/") ? (
            <Image src={imageUrl || "/placeholder.svg"} alt={title} width={300} height={200} className="property-img" />
          ) : (
            <img src={imageUrl || "/placeholder.svg"} alt={title} className="property-img" />
          )}
        </div>

        <div className="property-list-content">
          <div className="property-list-info">
            <h3 className="property-list-address">{mainAddress}</h3>
            <p className="property-list-location">{cityProvince}</p>
            <div className="property-list-features">
              <div className="list-feature">
                <Square size={16} />
                <span>{surface} m²</span>
              </div>
              <div className="list-feature">
                <Bed size={16} />
                <span>{bedrooms} hab.</span>
              </div>
              <div className="list-feature">
                <Bath size={16} />
                <span>{bathrooms} baño</span>
              </div>
            </div>
          </div>

          <div className="property-list-price">
            <p className="price-tag">US${typeof price === "number" ? price.toLocaleString() : price}</p>
            <button className="contact-button">Contactar</button>
          </div>
        </div>
      </div>
    </Link>
  )
}
