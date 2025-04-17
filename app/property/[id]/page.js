"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import "./property-detail.css"
import Header from "../../../components/Header/Header"
import Footer from "../../../components/Footer/Footer"
import PropertyGallery from "../../../components/PropertyGallery/PropertyGallery"
import PropertyInfo from "../../../components/PropertyInfo/PropertyInfo"
import PropertyLocation from "../../../components/PropertyLocation/PropertyLocation"
import PropertyContact from "../../../components/PropertyContact/PropertyContact"
import PropertyAgency from "../../../components/PropertyAgency/PropertyAgency"
import SimilarProperties from "../../../components/SimilarProperties/SimilarProperties"
import { ArrowLeft, Share2, Heart, Printer } from 'lucide-react'
import Link from "next/link"


export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (!id) return;
  
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:3003/properties/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProperty();
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: property?.publication_title || "Propiedad en Mi Hogar",
          text: `Mira esta propiedad: ${property?.address}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error compartiendo:", error))
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Enlace copiado al portapapeles")
    }
  }

  const handlePrint = () => {
    window.print()
  }

  // Propiedad de ejemplo
  

  // Propiedades similares de ejemplo
  const similarProperties = [
    {
      _id: "sim1",
      publication_title: "",
      address: "Av. Coronel Díaz 2345, Palermo, CABA",
      operations: [{ prices: [{ price: 1100, period: "Mensual" }] }],
      photos: [{ thumb: "/property2.jpg" }],
      surface_total: 55,
      rooms: { bedrooms: 1, bathrooms: 1 },
      isTemporary: false,
      availableFrom: "Inmediata",
    },
    {
      _id: "sim2",
      publication_title: "",
      address: "Av. Scalabrini Ortiz 3456, Palermo, CABA",
      operations: [{ prices: [{ price: 1300, period: "Mensual" }] }],
      photos: [{ thumb: "/property3.jpg" }],
      surface_total: 70,
      rooms: { bedrooms: 2, bathrooms: 1 },
      isTemporary: false,
      availableFrom: "01/06/2023",
    },
    {
      _id: "sim3",
      publication_title: "",
      address: "Av. Luis María Campos 1234, Palermo, CABA",
      operations: [{ prices: [{ price: 1450, period: "Mensual" }] }],
      photos: [{ thumb: "/property1.jpg" }],
      surface_total: 75,
      rooms: { bedrooms: 2, bathrooms: 2 },
      isTemporary: true,
      availableFrom: "Inmediata",
    },
  ]

  if (loading) {
    return (
      <div className="property-detail-container">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando información de la propiedad...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="property-detail-container">
        <Header />
        <div className="error-container">
          <h2>Error al cargar la propiedad</h2>
          <p>{error || "No se pudo encontrar la propiedad solicitada"}</p>
          <Link href="/alquilar">
            <button className="back-button">
              <ArrowLeft size={16} />
              Volver a la búsqueda
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const isRental = property.operations?.[0]?.operation_type === "Alquiler"

  return (
    <div className="property-detail-container">
      <Header />

      <main className="property-detail-main">
        <div className="property-detail-header">
          <div className="property-detail-breadcrumb">
            <Link href={isRental ? "/alquilar" : "/comprar"}>
              <button className="back-button">
                <ArrowLeft size={16} />
                Volver a {isRental ? "Alquileres" : "Ventas"}
              </button>
            </Link>
          </div>

          <div className="property-detail-actions">
            <button className="action-button" onClick={handleShare}>
              <Share2 size={18} />
              <span className="action-text">Compartir</span>
            </button>
            <button className={`action-button ${isFavorite ? "favorite-active" : ""}`} onClick={toggleFavorite}>
              <Heart size={18} fill={isFavorite ? "#ff4757" : "none"} />
              <span className="action-text">Favorito</span>
            </button>
            <button className="action-button" onClick={handlePrint}>
              <Printer size={18} />
              <span className="action-text">Imprimir</span>
            </button>
          </div>
        </div>

        <PropertyGallery photos={property.photos} title={property.publication_title} />

        <div className="property-detail-content">
          <div className="property-detail-main-content">
            <PropertyInfo property={property} />
            <PropertyLocation property={property} />
          </div>

          <div className="property-detail-sidebar">
            <PropertyContact property={property} />
            <PropertyAgency agency={property.branch} />
          </div>
        </div>

        <div className="property-detail-similar">
          <SimilarProperties properties={similarProperties} isRental={isRental} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
