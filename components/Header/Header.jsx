import "./Header.css"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link href="/">
            <div className="logo">
              <Image src="/logo.png" alt="Mi Hogar Logo" width={40} height={40} />
              <span className="logo-text"><span className="mi">Mi</span><span className="hogar"> Hogar</span></span>
            </div>
          </Link>
        </div>
           <div className="nav-container">
        <nav className="main-nav">
          <ul className="nav-list">
            <li>
              <Link href="/alquilar">Alquilar</Link>
            </li>
            <li>
              <Link href="/comprar">Comprar</Link>
            </li>
            <li>
              <Link href="/publicar">Publicar</Link>
            </li>
            <li>
              <Link href="/about">Quienes somos</Link>
            </li>
            <li>
              <Link href="/ayuda">Ayuda</Link>
            </li>
            <li>
              <Link href="/ayuda">Invertí</Link>
            </li>
          </ul>
        </nav>

        <div className="auth-button">
          <Link href="/login">
            <button className="login-button">Ingresar</button>
          </Link>
        </div>
        </div>
      </div>
    </header>
  )
}
