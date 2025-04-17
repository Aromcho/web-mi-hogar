"use client"

import "./about.css"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import MisionVision from "../../components/MisionVision/MisionVision"
import FeatureCards from "../../components/FeatureCards/FeatureCards"

export default function About() {
  return (
    <div className="about-container">
      <Header />

      <main>
        <div className="about-hero">
          <div className="about-hero-text">
            <h1>Encuentra tu hogar ideal</h1>
            <button className="hero-button">Mi Hogar</button>
            <p>Tu plataforma de confianza para encontrar el hogar perfecto.</p>
          </div>
          <div className="about-hero-image">
            <img src="/muck-mobile.png" alt="Hero Image" />
          </div>
        </div>
        <section className="section-blue">
          <h2 className="section-blue-title">Sobre nosotros</h2>
          <p className="section-blue-description">
          En Mi Hogar combinamos la tecnologia y la experiencia inmobiliaria para conectar personas y propiedades de manera inteligente.
          </p>
          </section>
        <section className="mision-vision-section">
          <MisionVision />
        </section>

        <section className="why-choose-section">
          <h2 className="section-title">¿Por qué elegir Mi Hogar?</h2>
          <FeatureCards />
        </section>
      </main>

      <Footer />
    </div>
  )
}
