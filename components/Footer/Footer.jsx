import "./Footer.css"
import Link from "next/link"
import { Facebook, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h2>Mi Hogar</h2>
            <p>Somos una plataforma innovadora que conectamos personas con propiedades de manera inteligente.</p>
            <Link href="/about">
              <button className="more-info-button">Más información</button>
            </Link>
          </div>

          <div className="footer-links">
            <div className="footer-links-column">
              <h3>Enlaces</h3>
              <ul>
                <li>
                  <Link href="/conoce-mihogar">Conoce MiHogar</Link>
                </li>
                <li>
                  <Link href="/seguridad">Seguridad en MiHogar</Link>
                </li>
                <li>
                  <Link href="/ayuda">Centro de ayuda</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-download">
            <h3>DESCARGA LA APLICACIÓN</h3>
            <div className="app-buttons">
              <Link href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                <button className="app-button">
                  <span>Google Play</span>
                </button>
              </Link>
              <Link href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                <button className="app-button">
                  <span>App Store</span>
                </button>
              </Link>
            </div>
            <div className="social-links">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="legal-links">
            <Link href="/privacidad">Aviso de privacidad</Link>
            <Link href="/terminos">Términos y condiciones de uso</Link>
            <Link href="/cookies">Política de cookies</Link>
            <Link href="/preferencias">Preferencias de cookies</Link>
            <Link href="/manual">Manual de usuario</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
