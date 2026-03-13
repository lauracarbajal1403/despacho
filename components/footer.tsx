"use client"
import { Phone, Mail, Linkedin, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0f1e2e', color: 'white', padding: '60px 24px 32px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Top */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <img src="/Nommy.png" alt="Nommy" style={{ width: '40px', height: '40px' }} />
             
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { href: 'https://www.linkedin.com/in/nommy-m%C3%A9xico-a797a1376/', icon: <Linkedin size={16} /> },
                { href: 'https://www.facebook.com/profile.php?id=61578598203669', icon: <Facebook size={16} /> },
                { href: 'https://www.instagram.com/nommymexico/', icon: <Instagram size={16} /> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#1e3a5f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4db8a8', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4db8a8', e.currentTarget.style.color = 'white')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1e3a5f', e.currentTarget.style.color = '#4db8a8')}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#4db8a8', letterSpacing: '0.1em', marginBottom: '16px' }}>LEGAL</p>
            {[
              { label: 'Términos y condiciones', href: 'https://nommy.mx/terminos' },
              { label: 'Aviso de privacidad', href: 'https://nommy.mx/aviso' },
            ].map((l, i) => (
              <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', fontSize: '14px', color: '#94a3b8', textDecoration: 'none', marginBottom: '10px', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#4db8a8', letterSpacing: '0.1em', marginBottom: '16px' }}>CONTACTO</p>
            <a href="https://wa.me/523315179175" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#94a3b8', textDecoration: 'none', marginBottom: '10px' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
            >
              <Phone size={14} /> (33) 15179175
            </a>
            <a href="mailto:ventas@nommy.mx"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#94a3b8', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
            >
              <Mail size={14} /> ventas@nommy.mx
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid #1e3a5f', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>
            © {new Date().getFullYear()} Nommy. Todos los derechos reservados.
          </p>
         
        </div>
      </div>
    </footer>
  )
}