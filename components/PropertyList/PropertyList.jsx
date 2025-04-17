import "./PropertyList.css"
import PropertyCard from "../PropertyCard/PropertyCard"

export default function PropertyList({ properties = [] }) {
  // Si no hay propiedades, mostrar datos de ejemplo
  const demoProperties =
    properties.length > 0
      ? properties
      : [
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
        ]

  return (
    <div className="property-list-container">
      <div className="property-row">
        {demoProperties.slice(0, 3).map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
      <div className="property-row">
        {demoProperties.slice(3, 6).map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  )
}
