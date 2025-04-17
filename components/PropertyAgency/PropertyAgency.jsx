import "./PropertyAgency.css"
import Image from "next/image"
import { Phone, Mail, Building2, Clock } from "lucide-react"
import Link from "next/link"

export default function PropertyAgency({ agency }) {
  const { name, logo, agent, properties_count, years_experience } = agency

  return (
    <div className="property-agency">
      <h2 className="agency-title">Inmobiliaria</h2>

      <div className="agency-info">
        <div className="agency-logo">
          <Image
            src={logo || "/placeholder.svg?height=80&width=80"}
            alt={name}
            width={80}
            height={80}
            className="logo-image"
          />
        </div>

        <div className="agency-details">
          <h3 className="agency-name">{name}</h3>

          <div className="agency-stats">
            <div className="agency-stat">
              <Building2 size={16} />
              <span>{properties_count} propiedades</span>
            </div>
            <div className="agency-stat">
              <Clock size={16} />
              <span>{years_experience} años de experiencia</span>
            </div>
          </div>
        </div>
      </div>

      {agent && (
        <div className="agent-info">
          <div className="agent-photo">
            <Image
              src={agent.photo || "/placeholder.svg?height=60&width=60"}
              alt={agent.name}
              width={60}
              height={60}
              className="agent-image"
            />
          </div>

          <div className="agent-details">
            <h3 className="agent-name">{agent.name}</h3>
            <p className="agent-title">Agente inmobiliario</p>

            <div className="agent-contact">
              <Link href={`tel:${agent.phone}`} className="agent-contact-item">
                <Phone size={16} />
                <span>{agent.phone}</span>
              </Link>

              <Link href={`mailto:${agent.email}`} className="agent-contact-item">
                <Mail size={16} />
                <span>{agent.email}</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      <Link href={`/agency/${encodeURIComponent(name)}`}>
        <button className="view-agency-button">Ver todas las propiedades</button>
      </Link>
    </div>
  )
}
