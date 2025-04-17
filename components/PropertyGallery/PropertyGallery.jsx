"use client"

import { useState } from "react"
import "./PropertyGallery.css"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react"

export default function PropertyGallery({ photos, title }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1))
  }

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setShowLightbox(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setShowLightbox(false)
    document.body.style.overflow = "auto"
  }

  const handleLightboxPrevious = () => {
    setLightboxIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1))
  }

  const handleLightboxNext = () => {
    setLightboxIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className="property-gallery">
      <div className="gallery-main">
        <div
          className="gallery-main-image"
          onClick={() => openLightbox(currentIndex)}
        >
          <Image
            src={
              photos[currentIndex]?.image ||
              "/placeholder.svg?height=500&width=800"
            }
            alt={title || "Imagen de propiedad"}
            width={800}
            height={500}
            className="main-image"
          />
          <button
            className="fullscreen-button"
            onClick={() => openLightbox(currentIndex)}
          >
            <Maximize2 size={20} />
          </button>
        </div>
        <button className="gallery-nav-button prev" onClick={handlePrevious}>
          <ChevronLeft size={24} />
        </button>
        <button className="gallery-nav-button next" onClick={handleNext}>
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="gallery-thumbnails">
        {photos.map((photo, index) => (
          <div
            key={index}
            className={`gallery-thumbnail ${
              index === currentIndex ? "active" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={photo.thumb || "/placeholder.svg?height=100&width=100"}
              alt={`Thumbnail ${index + 1}`}
              width={100}
              height={100}
              className="thumbnail-image"
            />
          </div>
        ))}
      </div>

      {showLightbox && (
        <div className="lightbox">
          <div className="lightbox-overlay" onClick={closeLightbox}></div>
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={closeLightbox}>
              <X size={24} />
            </button>
            <div className="lightbox-image-container">
              <Image
                src={
                  photos[lightboxIndex]?.image ||
                  "/placeholder.svg?height=800&width=1200"
                }
                alt={title || "Imagen de propiedad"}
                width={1200}
                height={800}
                className="lightbox-image"
              />
            </div>
            <button
              className="lightbox-nav-button prev"
              onClick={handleLightboxPrevious}
            >
              <ChevronLeft size={32} />
            </button>
            <button
              className="lightbox-nav-button next"
              onClick={handleLightboxNext}
            >
              <ChevronRight size={32} />
            </button>
            <div className="lightbox-counter">
              {lightboxIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
