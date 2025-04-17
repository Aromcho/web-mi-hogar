"use client"

import { useState } from "react"
import "./publicar.css"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import PublishPlanCard from "../../components/PublishPlanCard/PublishPlanCard"
import { Home, User, Users, Building2, CheckCircle2, ArrowRight } from "lucide-react"

export default function PublicarPage() {
  const [selectedPlan, setSelectedPlan] = useState(null)

  const plans = [
    {
      id: "particular",
      title: "Particular",
      icon: <User size={32} />,
      price: "Gratis",
      description: "Ideal para propietarios que quieren publicar sus propiedades sin intermediarios",
      features: [
        "Hasta 3 propiedades",
        "Publicación por 60 días",
        "5 fotos por propiedad",
        "Estadísticas básicas",
        "Contacto directo con interesados",
      ],
      limitations: ["Sin destacados", "Sin renovación automática"],
      ctaText: "Publicar gratis",
      color: "#6495ed", // Color secundario
    },
    {
      id: "agente",
      title: "Agente Independiente",
      icon: <Building2 size={32} />,
      price: "$5",
      period: "por mes",
      description: "Perfecto para agentes inmobiliarios que trabajan de forma independiente",
      features: [
        "Hasta 25 propiedades",
        "Publicación ilimitada",
        "20 fotos por propiedad",
        "Estadísticas avanzadas",
        "Panel de gestión",
        "Destacados mensuales (2)",
        "Perfil profesional verificado",
      ],
      recommended: true,
      ctaText: "Comenzar ahora",
      color: "#7462e0", // Color primario
    },
    {
      id: "inmobiliaria",
      title: "Inmobiliaria",
      icon: <Building2 size={32} />,
      price: "Personalizado",
      description: "Solución completa para inmobiliarias con múltiples agentes y propiedades",
      features: [
        "Propiedades ilimitadas",
        "Múltiples usuarios",
        "50 fotos por propiedad",
        "Videos y tours virtuales",
        "API de integración",
        "Destacados ilimitados",
        "Soporte prioritario",
        "Página personalizada",
      ],
      ctaText: "Contactar ventas",
      color: "#2c3e50", // Color button-blue
    },
  ]

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId)
    // En una implementación real, aquí redirigirías al usuario al flujo de registro/pago
    setTimeout(() => {
      window.location.href = `/publicar/${planId}`
    }, 300)
  }

  return (
    <div className="publicar-container">
      <Header />

      <main>
        <section className="publicar-benefits">
          <div className="benefits-container">
            <h2>¿Por qué publicar en Mi Hogar?</h2>
            <div className="benefits-grid">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <Users size={24} />
                </div>
                <h3>Millones de visitantes</h3>
                <p>Tu propiedad será vista por miles de potenciales interesados cada día</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <CheckCircle2 size={24} />
                </div>
                <h3>Proceso simple</h3>
                <p>Publicá tu propiedad en minutos con nuestro sistema fácil de usar</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <Home size={24} />
                </div>
                <h3>Contactos de calidad</h3>
                <p>Recibí consultas de personas realmente interesadas en tu propiedad</p>
              </div>
            </div>
          </div>
        </section>

        <section className="publicar-plans">
          <div className="plans-container">
            <h2>Elegí tu plan</h2>
            <div className="plans-grid">
              {plans.map((plan) => (
                <PublishPlanCard
                  key={plan.id}
                  plan={plan}
                  isSelected={selectedPlan === plan.id}
                  onSelect={() => handleSelectPlan(plan.id)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="publicar-steps">
          <div className="steps-container">
            <h2>¿Cómo funciona?</h2>
            <div className="steps-grid">
              <div className="step-item">
                <div className="step-number">1</div>
                <h3>Elegí tu plan</h3>
                <p>Seleccioná el plan que mejor se adapte a tus necesidades</p>
              </div>
              <div className="step-arrow">
                <ArrowRight size={24} />
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <h3>Cargá tu propiedad</h3>
                <p>Completá el formulario con los datos y fotos de tu propiedad</p>
              </div>
              <div className="step-arrow">
                <ArrowRight size={24} />
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <h3>Recibí contactos</h3>
                <p>Comenzá a recibir consultas de interesados en tu propiedad</p>
              </div>
            </div>
          </div>
        </section>

        <section className="publicar-faq">
          <div className="faq-container">
            <h2>Preguntas frecuentes</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>¿Cuánto tiempo tarda en publicarse mi propiedad?</h3>
                <p>
                  Las propiedades se publican inmediatamente después de completar el formulario. Nuestro equipo realiza
                  una verificación posterior para asegurar la calidad del contenido.
                </p>
              </div>
              <div className="faq-item">
                <h3>¿Puedo modificar mi publicación después de crearla?</h3>
                <p>Sí, podés editar todos los datos de tu propiedad en cualquier momento desde tu panel de control.</p>
              </div>
              <div className="faq-item">
                <h3>¿Cómo recibo las consultas de los interesados?</h3>
                <p>
                  Recibirás las consultas por email y también podrás verlas en tu panel de control. Además, si lo
                  deseas, podés recibir notificaciones por WhatsApp.
                </p>
              </div>
              <div className="faq-item">
                <h3>¿Puedo cambiar de plan más adelante?</h3>
                <p>
                  Sí, podés actualizar tu plan en cualquier momento. El cambio se aplicará inmediatamente y se ajustará
                  el costo prorrateado.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="publicar-cta">
          <div className="cta-container">
            <h2>¿Listo para publicar tu propiedad?</h2>
            <p>Comenzá ahora y recibí contactos de interesados hoy mismo</p>
            <button className="cta-button" onClick={() => handleSelectPlan("particular")}>
              Publicar mi propiedad
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
