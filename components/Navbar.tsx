"use client"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const scrollToForm = () => {
    setMenuOpen(false)
    const formSection = document.getElementById("contact-form")
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 60, backgroundColor: 'white', borderBottom: '1px solid #f3f4f6' }}>
      <div style={{ padding: '0 1.5rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/Nommy.png" alt="Nommy" style={{ width: '36px', height: '36px' }} />
        </div>

        {/* Links desktop */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <a href="#beneficios" style={{ fontSize: '15px', color: '#6b7280', textDecoration: 'none' }}>Beneficios</a>
            <a href="#funcionalidades" style={{ fontSize: '15px', color: '#6b7280', textDecoration: 'none' }}>Funcionalidades</a>
            <a href="#testimonios" style={{ fontSize: '15px', color: '#6b7280', textDecoration: 'none' }}>Testimonios</a>
            <button onClick={scrollToForm} style={{ fontSize: '15px', fontWeight: 500, color: 'white', backgroundColor: '#4db8a8', padding: '10px 22px', borderRadius: '999px', border: 'none', cursor: 'pointer' }}>
              Agendar Demo
            </button>
          </div>
        )}

        {/* Hamburger mobile */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: '#374151', borderRadius: '2px', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', transition: 'all 0.2s' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: menuOpen ? 'transparent' : '#374151', borderRadius: '2px', transition: 'all 0.2s' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: '#374151', borderRadius: '2px', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none', transition: 'all 0.2s' }} />
          </button>
        )}
      </div>

      {/* Menú mobile desplegable */}
      {isMobile && menuOpen && (
        <div style={{ borderTop: '1px solid #f3f4f6', backgroundColor: 'white', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <a href="#beneficios" onClick={() => setMenuOpen(false)} style={{ fontSize: '15px', color: '#6b7280', textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>Beneficios</a>
          <a href="#funcionalidades" onClick={() => setMenuOpen(false)} style={{ fontSize: '15px', color: '#6b7280', textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>Funcionalidades</a>
          <a href="#testimonios" onClick={() => setMenuOpen(false)} style={{ fontSize: '15px', color: '#6b7280', textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>Testimonios</a>
          <button onClick={scrollToForm} style={{ fontSize: '15px', fontWeight: 500, color: 'white', backgroundColor: '#4db8a8', padding: '12px', borderRadius: '999px', border: 'none', cursor: 'pointer', width: '100%' }}>
            Agendar Demo
          </button>
        </div>
      )}
    </nav>
  )
}