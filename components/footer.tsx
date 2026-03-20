"use client"
import { useState, useEffect } from 'react'
import { Phone, Mail, Linkedin, Facebook, Instagram, ChevronDown } from 'lucide-react'

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const toggle = (section: string) =>
    setOpenSection(prev => prev === section ? null : section)

  const socialLinks = [
    { href: 'https://www.linkedin.com/in/nommy-m%C3%A9xico-a797a1376/', icon: <Linkedin size={16} /> },
    { href: 'https://www.facebook.com/profile.php?id=61578598203669', icon: <Facebook size={16} /> },
    { href: 'https://www.instagram.com/nommymexico/', icon: <Instagram size={16} /> },
  ]

  const legalLinks = [
    { label: 'Términos y condiciones', href: 'https://nommy.mx/terminos' },
    { label: 'Aviso de privacidad', href: 'https://nommy.mx/aviso' },
  ]

  const contactLinks = [
    { label: '(33) 15179175', href: 'https://wa.me/523315179175', icon: <Phone size={14} /> },
    { label: 'ventas@nommy.mx', href: 'mailto:ventas@nommy.mx', icon: <Mail size={14} /> },
  ]

  const linkStyle = (hover = false): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: '8px',
    fontSize: '14px', color: hover ? 'white' : '#94a3b8',
    textDecoration: 'none', marginBottom: '10px', transition: 'color 0.2s',
  })

  // ── DESKTOP ──────────────────────────────────────────────
  if (!isMobile) return (
    <footer style={{ backgroundColor: '#0f1e2e', color: 'white', padding: '60px 24px 32px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <img src="/logoblanco.png" alt="Nommy" style={{ width: '40px', height: '40px' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#1e3a5f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4db8a8' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#4db8a8'; e.currentTarget.style.color = 'white' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#1e3a5f'; e.currentTarget.style.color = '#4db8a8' }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#4db8a8', letterSpacing: '0.1em', marginBottom: '16px' }}>LEGAL</p>
            {legalLinks.map((l, i) => (
              <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" style={linkStyle()}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
              >{l.label}</a>
            ))}
          </div>

          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#4db8a8', letterSpacing: '0.1em', marginBottom: '16px' }}>CONTACTO</p>
            {contactLinks.map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" style={linkStyle()}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
              >{c.icon}{c.label}</a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1e3a5f', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>© {new Date().getFullYear()} Nommy. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )

  // ── MOBILE ───────────────────────────────────────────────
  return (
    <footer style={{ backgroundColor: '#0f1e2e', color: 'white', padding: '40px 20px 24px' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>

        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
            <img src="/logoblanco.png" alt="Nommy" style={{ width: '40px', height: '40px' }} />
            <span style={{ fontSize: '22px', fontWeight: 700 }}>Nommy</span>
          </div>
          <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.7, margin: '0 0 20px' }}>
            La plataforma de nómina más estable para despachos contables.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            {socialLinks.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1e3a5f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4db8a8' }}
              >{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Accordion — Legal */}
        <div style={{ borderTop: '1px solid #1e3a5f' }}>
          {[
            { id: 'legal', label: 'Legal', links: legalLinks.map(l => ({ ...l, icon: null })) },
            { id: 'contacto', label: 'Contacto', links: contactLinks },
          ].map(section => (
            <div key={section.id} style={{ borderBottom: '1px solid #1e3a5f' }}>
              <button
                onClick={() => toggle(section.id)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', background: 'none', border: 'none', color: 'white', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}
              >
                {section.label}
                <ChevronDown size={18} color="#4db8a8" style={{ transform: openSection === section.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {openSection === section.id && (
                <div style={{ paddingBottom: '16px' }}>
                  {section.links.map((l, i) => (
                    <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#94a3b8', textDecoration: 'none', padding: '8px 0' }}
                    >
                      {'icon' in l && l.icon}{l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ marginTop: '28px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 4px' }}>© {new Date().getFullYear()} Nommy. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}