"use client"
import type React from "react"
import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import NominikChatbot from "@/app/nominik"
import { Clock, Shield, BarChart3, CheckCircle2, Users } from 'lucide-react'

const LOGOS = [
  { src: "/Simplytech.png",         alt: "Simplytech"    },
  { src: "/Ricatto.png",            alt: "Ricatto"       },
  { src: "/MXHEALTH.png",           alt: "MX Health"     },
  { src: "/Logo-intela.png",        alt: "Intela"        },
  { src: "/Novogas.png",            alt: "Novogas"       },
  { src: "/Logo_Alertyx_white.png", alt: "Alertyx"       },
  { src: "/Logo.png",               alt: "Logo"          },
  { src: "/Bizhub.png",             alt: "Bizhub"        },
  { src: "/Linkepro.png",           alt: "Linkepro"      },
  { src: "/Factor.png",             alt: "Factor"        },
  { src: "/BrisSandoval.png",       alt: "Bris Sandoval" },
  { src: "/Abogados.png",           alt: "Abogados"      },
]

export default function HomePage() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    empresa: "",
    colaboradores: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const scrollToForm = () => {
    const formSection = document.getElementById("contact-form")
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    window.open('/gracias', '_blank')
    try {
      const response = await fetch("/api/send-demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (response.ok) {
        setFormData({ nombre: "", telefono: "", email: "", empresa: "", colaboradores: "" })
      } else {
        setMessage(data.error || "Hubo un error. Por favor intenta de nuevo.")
      }
    } catch {
      setMessage("Error al enviar. Por favor intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">

      {/* ── HERO + FORM ── */}
      <section id="contact-form" style={{ background: 'linear-gradient(135deg, #f0faf8 0%, #e8f4f8 100%)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>

          {/* Left */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#e0f7f3', color: '#274263', fontSize: '12px', fontWeight: 600, padding: '6px 14px', borderRadius: '999px', marginBottom: '24px', letterSpacing: '0.05em' }}>
              ⚡ EXCLUSIVO PARA DESPACHOS CONTABLES
            </div>

            <h1 style={{ fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 800, color: '#1a2e4a', lineHeight: 1.1, marginBottom: '20px' }}>
              Menos <span style={{ color: '#4db8a8' }}>Operación,</span><br />
              Más <em style={{ color: '#9ca3af', fontStyle: 'italic' }}>Estrategia.</em>
            </h1>

            <p style={{ fontSize: '17px', color: '#4b5563', lineHeight: 1.7, marginBottom: '32px', maxWidth: '480px' }}>
              Deja que Nommy automatice la nómina de tus clientes mientras tú te enfocas en brindar asesoría fiscal de alto valor. La plataforma más estable para IDSE, IMSS y Timbrado.
            </p>

            <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e0f7f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={18} color="#4db8a8" />
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#1a2e4a', margin: 0 }}>Cumplimiento SAT</p>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>100% Garantizado</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e8eef8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={18} color="#274263" />
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#1a2e4a', margin: 0 }}>Multiusuario</p>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Colaboración Real</p>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#e0f7f3', border: '1px solid #b2e8e0', borderRadius: '12px', padding: '14px 18px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px' }}>⭐</span>
              <p style={{ fontSize: '14px', color: '#274263', fontWeight: 600, margin: 0 }}>
                ¡Promoción Especial! Obtén hasta 2 meses GRATIS en tu plan anual.
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '36px', boxShadow: '0 4px 32px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1a2e4a', marginBottom: '24px' }}>
              Solicita una Demo Personalizada
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>NOMBRE COMPLETO</label>
                <Input placeholder="Ej. Juan Pérez" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>EMAIL CORPORATIVO</label>
                  <Input type="email" placeholder="juan@despacho.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>WHATSAPP / TELÉFONO</label>
                  <Input type="tel" placeholder="33 1234 5678" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} required />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>NOMBRE DEL DESPACHO</label>
                <Input placeholder="Contadores Asociados S.C." value={formData.empresa} onChange={(e) => setFormData({ ...formData, empresa: e.target.value })} required />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>NÚMERO DE COLABORADORES</label>
                <select
                  value={formData.colaboradores}
                  onChange={(e) => setFormData({ ...formData, colaboradores: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', color: formData.colaboradores ? '#1a2e4a' : '#9ca3af', outline: 'none' }}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="1-5">1 – 5</option>
                  <option value="6-20">6 – 20</option>
                  <option value="21-50">21 – 50</option>
                  <option value="50+">Más de 50</option>
                </select>
              </div>

              {message && (
                <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#fee2e2', color: '#991b1b', fontSize: '14px' }}>{message}</div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                style={{ backgroundColor: '#274263', color: 'white', padding: '14px', borderRadius: '10px', fontWeight: 700, fontSize: '16px', border: 'none', cursor: 'pointer', marginTop: '4px' }}
              >
                {isLoading ? "Enviando..." : "Solicitar Demo Gratis →"}
              </button>
              <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', margin: 0 }}>
                Al solicitar la demo, aceptas nuestros términos y aviso de privacidad.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ── LOGOS ── */}
      <section style={{ padding: '48px 24px', backgroundColor: '#65cec0', borderBottom: '1px solid #d0eeea' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: '#274263', letterSpacing: '0.12em', marginBottom: '32px' }}>
            CONFÍAN EN NOMMY PARA SUS DESPACHOS
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
            {LOGOS.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                style={{ height: '36px', width: 'auto', objectFit: 'contain', opacity: 0.55, filter: 'grayscale(1)', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.55')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUÉ NOMMY ── */}
      <section id="beneficios" style={{ padding: '80px 24px', backgroundColor: '#f8fafb' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#1a2e4a', marginBottom: '16px' }}>
            ¿Por qué los despachos líderes eligen Nommy?
          </h2>
          <p style={{ fontSize: '17px', color: '#6b7280', maxWidth: '600px', margin: '0 auto 56px', lineHeight: 1.6 }}>
            El procesamiento manual de nómina es lento, propenso a errores y no escala. Nommy transforma tu flujo de trabajo operativo en una ventaja competitiva.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { icon: <Clock size={22} color="#4db8a8" />, bg: '#e0f7f3', title: 'Ahorra 15+ horas al mes', desc: 'Automatiza el timbrado masivo y cálculos complejos sin intervención manual constante.' },
              { icon: <Shield size={22} color="#274263" />, bg: '#e8eef8', title: 'Cero Errores en IDSE', desc: 'Conexión directa y estable con el IMSS para movimientos afiliatorios sin dolores de cabeza.' },
              { icon: <BarChart3 size={22} color="#7c3aed" />, bg: '#ede9fe', title: 'Reportes en un Clic', desc: 'Accede a historiales, reportes de nómina y acumulados de forma instantánea para tus clientes.' },
            ].map((card, i) => (
              <div key={i} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', textAlign: 'left', border: '1px solid #f0f0f0' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1a2e4a', marginBottom: '10px' }}>{card.title}</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUNCIONALIDADES ── */}
      <section id="funcionalidades" style={{ padding: '80px 24px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#1a2e4a', marginBottom: '32px', lineHeight: 1.2 }}>
              Todo lo que tu despacho necesita en un solo lugar.
            </h2>
            {[
              { title: 'Timbrado Automático', desc: 'Emisión de CFDI masiva sin errores.' },
              { title: 'Gestión Multi-empresa', desc: 'Controla todos tus clientes desde un panel centralizado.' },
              { title: 'Portal del Empleado', desc: 'Tus clientes pueden dar acceso a sus empleados para descargar recibos.' },
              { title: 'Cálculos Fiscales Precisos', desc: 'ISR, IMSS, Infonavit y estatales siempre actualizados.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', marginBottom: '22px' }}>
                <CheckCircle2 size={20} color="#4db8a8" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: '#1a2e4a', margin: '0 0 2px' }}>{item.title}</p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
            
          </div>

          <div style={{ position: 'relative' }}>
            <Image src="/images/despa.jpeg" alt="Nommy plataforma" width={600} height={450} style={{ width: '100%', height: 'auto', borderRadius: '16px', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '-16px', left: '24px', backgroundColor: 'white', borderRadius: '12px', padding: '14px 20px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#e8eef8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={18} color="#274263" />
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Usuarios Activos</p>
                <p style={{ fontSize: '16px', fontWeight: 800, color: '#1a2e4a', margin: 0 }}>+1,200 Contadores</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section id="testimonios" style={{ padding: '80px 24px', backgroundColor: '#1a2e4a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: 'white', marginBottom: '12px' }}>
            Lo que dicen nuestros socios
          </h2>
          <p style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '56px' }}>
            Más que un software, somos el brazo tecnológico de tu despacho.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { text: '"Nommy nos permitió duplicar nuestra cartera de clientes de nómina sin contratar más personal operativo. La estabilidad del IDSE es impresionante."', name: 'Lic. Roberto Sánchez', role: 'Socio Director en RS Contadores' },
              { text: '"El soporte técnico es excepcional. Siempre están actualizados con los cambios del SAT y el IMSS, lo que me da mucha tranquilidad."', name: 'CP. María Elena Ruiz', role: 'Consultora Fiscal Independiente' },
              { text: '"La interfaz es tan intuitiva que mi equipo aprendió a usarla en un día. Los reportes automatizados nos ahorran horas de Excel."', name: 'Dr. Alejandro G.', role: 'Despacho Global Tax' },
            ].map((t, i) => (
              <div key={i} style={{ backgroundColor: '#243650', borderRadius: '14px', padding: '28px', textAlign: 'left', border: '1px solid #2d4a6b' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(5)].map((_, j) => <span key={j} style={{ color: '#4db8a8', fontSize: '16px' }}>★</span>)}
                </div>
                <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '20px', fontStyle: 'italic' }}>{t.text}</p>
                <p style={{ fontSize: '14px', fontWeight: 700, color: 'white', margin: '0 0 2px' }}>{t.name}</p>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEGUNDO FORMULARIO ── */}
      <section style={{ padding: '80px 24px', backgroundColor: '#f8fafb' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#1a2e4a', marginBottom: '12px', lineHeight: 1.2 }}>
            ¿Listo para transformar la nómina de tu despacho?
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '40px' }}>
            Únete a los cientos de despachos que ya están escalando su negocio con Nommy.
          </p>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '36px', boxShadow: '0 2px 24px rgba(0,0,0,0.06)', border: '1px solid #e8f0fe' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1a2e4a', marginBottom: '24px' }}>Comienza hoy mismo</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>NOMBRE COMPLETO</label>
                <Input placeholder="Ej. Juan Pérez" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>EMAIL CORPORATIVO</label>
                  <Input type="email" placeholder="juan@despacho.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>WHATSAPP / TELÉFONO</label>
                  <Input type="tel" placeholder="33 1234 5678" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} required />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>NOMBRE DEL DESPACHO</label>
                <Input placeholder="Contadores Asociados S.C." value={formData.empresa} onChange={(e) => setFormData({ ...formData, empresa: e.target.value })} required />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>NÚMERO DE COLABORADORES</label>
                <select
                  value={formData.colaboradores}
                  onChange={(e) => setFormData({ ...formData, colaboradores: e.target.value })}
                  required
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', color: formData.colaboradores ? '#1a2e4a' : '#9ca3af', outline: 'none' }}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="1-5">1 – 5</option>
                  <option value="6-20">6 – 20</option>
                  <option value="21-50">21 – 50</option>
                  <option value="50+">Más de 50</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                style={{ backgroundColor: '#274263', color: 'white', padding: '14px', borderRadius: '10px', fontWeight: 700, fontSize: '16px', border: 'none', cursor: 'pointer', marginTop: '4px' }}
              >
                {isLoading ? "Enviando..." : "Solicitar Demo Gratis →"}
              </button>
              <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', margin: 0 }}>
                Al solicitar la demo, aceptas nuestros términos y aviso de privacidad.
              </p>
            </form>
          </div>
        </div>
      </section>

      <NominikChatbot />
    </div>
  )
}