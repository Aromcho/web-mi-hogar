import "./FeatureCards.css"
import { Search, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function FeatureCards() {
  const features = [
    {
      icon: <Search size={24} />,
      title: "Búsqueda inteligente con IA",
      description:
        "Encuentra tu propiedad ideal en minutos. Nuestra IA aprende de tus gustos y te sugiere según tus intereses.",
      link: "/busqueda",
    },
    {
      icon: <Clock size={24} />,
      title: "Publicá tu propiedad en minutos",
      description:
        "Sacá unas fotos y listo. Te ayudamos a generar el anuncio ideal con texto, precio sugerido y públicación automatizada.",
      link: "/publicar",
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Invertí desde donde estés",
      description:
        "Accede a oportunidades sin ser experto. Te mostramos opciones con alto potencial y datos para decidir con seguridad.",
      link: "/invertir",
    },
  ]

  return (
    <div className="feature-cards-container">
      {features.map((feature, index) => (
        <div className="feature-card" key={index}>
          <div className="feature-icon">{feature.icon}</div>
          <h3 className="feature-card-title">{feature.title}</h3>
          <p className="feature-description">{feature.description}</p>
          <Link href={feature.link}>
            <button className="feature-button">Conocer más</button>
          </Link>
        </div>
      ))}
    </div>
  )
}
