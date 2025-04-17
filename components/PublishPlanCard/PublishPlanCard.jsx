"use client"

import "./PublishPlanCard.css"
import { CheckCircle2 } from "lucide-react"

export default function PublishPlanCard({ plan, isSelected, onSelect }) {
  const { id, title, icon, price, period, description, features, limitations, recommended, ctaText, color } = plan

  return (
    <div
      className={`publish-plan-card ${isSelected ? "selected" : ""} ${recommended ? "recommended" : ""}`}
      style={{ "--plan-color": color }}
    >
      {recommended && <div className="recommended-badge">Recomendado</div>}

      <div className="plan-header">
        <div className="plan-icon" style={{ backgroundColor: color }}>
          {icon}
        </div>
        <h3 className="plan-title">{title}</h3>
      </div>

      <div className="plan-price">
        <span className="price">{price}</span>
        {period && <span className="period">{period}</span>}
      </div>

      <p className="plan-description">{description}</p>

      <ul className="plan-features">
        {features.map((feature, index) => (
          <li key={index} className="feature-item">
            <CheckCircle2 size={16} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {limitations && limitations.length > 0 && (
        <ul className="plan-limitations">
          {limitations.map((limitation, index) => (
            <li key={index} className="limitation-item">
              <span>{limitation}</span>
            </li>
          ))}
        </ul>
      )}

      <button className="plan-cta-button" onClick={onSelect} style={{ backgroundColor: color }}>
        {ctaText}
      </button>
    </div>
  )
}
