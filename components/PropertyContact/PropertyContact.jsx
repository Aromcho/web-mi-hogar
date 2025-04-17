"use client"

import { useState } from "react"
import "./PropertyContact.css"
import { Phone, MessageSquare, Calendar, Check } from "lucide-react"
import Link from "next/link"

export default function PropertyContact({ property }) {
  const [contactMethod, setContactMethod] = useState("message")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "Me interesa esta propiedad y quisiera recibir más información.",
    date: "",
    time: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado:", formData)

    // Simulamos el envío exitoso
    setTimeout(() => {
      setSubmitted(true)
    }, 1000)
  }

  const isRental = property.operations?.[0]?.operation_type === "Alquiler"
  const propertyId = property._id
  const propertyAddress = property.address.split(",")[0]

  return (
    <div className="property-contact">
      <h2 className="contact-title">Contactar</h2>

      {!submitted ? (
        <>
          <div className="contact-tabs">
            <button
              className={`contact-tab ${contactMethod === "message" ? "active" : ""}`}
              onClick={() => setContactMethod("message")}
            >
              <MessageSquare size={18} />
              <span>Mensaje</span>
            </button>
            <button
              className={`contact-tab ${contactMethod === "visit" ? "active" : ""}`}
              onClick={() => setContactMethod("visit")}
            >
              <Calendar size={18} />
              <span>Visita</span>
            </button>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {contactMethod === "message" ? (
              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
            ) : (
              <div className="visit-fields">
                <div className="form-group">
                  <label htmlFor="date">Fecha de visita</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Hora preferida</label>
                  <select id="time" name="time" value={formData.time} onChange={handleInputChange} required>
                    <option value="">Seleccionar hora</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                  </select>
                </div>
              </div>
            )}

            <div className="form-group checkbox-group">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                Acepto los <Link href="/terminos">términos y condiciones</Link> y la{" "}
                <Link href="/privacidad">política de privacidad</Link>
              </label>
            </div>

            <button type="submit" className="submit-button">
              {contactMethod === "message" ? "Enviar mensaje" : "Solicitar visita"}
            </button>
          </form>

          <div className="contact-divider">
            <span>o contactar directamente</span>
          </div>

          <div className="direct-contact">
            <Link
              href={`tel:${property.agency?.agent?.phone || "+5491155551234"}`}
              className="direct-contact-button phone"
            >
              <Phone size={18} />
              <span>Llamar</span>
            </Link>

            <Link
              href={`https://wa.me/${property.agency?.agent?.phone?.replace(/\D/g, "") || "5491155551234"}?text=Hola, me interesa la propiedad en ${propertyAddress} (ID: ${propertyId})`}
              target="_blank"
              rel="noopener noreferrer"
              className="direct-contact-button whatsapp"
            >
              <span className="whatsapp-icon"></span>
              <span>WhatsApp</span>
            </Link>
          </div>
        </>
      ) : (
        <div className="contact-success">
          <div className="success-icon">
            <Check size={32} />
          </div>
          <h3>¡Solicitud enviada!</h3>
          <p>
            {contactMethod === "message"
              ? "Tu mensaje ha sido enviado correctamente. Te contactaremos a la brevedad."
              : "Tu solicitud de visita ha sido recibida. Te confirmaremos la fecha y hora a la brevedad."}
          </p>
          <button
            className="new-request-button"
            onClick={() => {
              setSubmitted(false)
              setFormData({
                ...formData,
                message: "Me interesa esta propiedad y quisiera recibir más información.",
                date: "",
                time: "",
              })
            }}
          >
            Realizar otra consulta
          </button>
        </div>
      )}
    </div>
  )
}
