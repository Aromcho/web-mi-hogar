import "./PropertyGrid.css"
import PropertyCard from "../PropertyCard/PropertyCard"
import PropertyListItem from "../PropertyListItem/PropertyListItem"

export default function PropertyGrid({ properties, viewMode }) {
  if (!properties || properties.length === 0) {
    return (
      <div className="no-properties">
        <p>No se encontraron propiedades con los filtros seleccionados.</p>
      </div>
    )
  }

  return (
    <div className={`property-grid ${viewMode === "list" ? "list-view" : ""}`}>
      {properties.map((property) =>
        viewMode === "list" ? (
          <PropertyListItem key={property._id} property={property} />
        ) : (
          <PropertyCard key={property._id} property={property} />
        ),
      )}
    </div>
  )
}
