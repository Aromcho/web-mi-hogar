import "./SimilarProperties.css"
import PropertyCard from "../PropertyCard/PropertyCard"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function SimilarProperties({ properties, isRental = false }) {
  if (!properties || properties.length === 0) {
    return null
  }

  return (
    <div className="similar-properties">
      <div className="similar-header">
        <h2 className="similar-title">Propiedades similares</h2>
        <Link href={isRental ? "/alquilar" : "/comprar"} className="view-all-link">
          <span>Ver todas</span>
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="similar-grid">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} isRental={isRental} />
        ))}
      </div>
    </div>
  )
}
