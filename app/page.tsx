"use client"
import type React from "react"
import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

import { Phone, Check, Linkedin, Globe, Facebook, Instagram } from 'lucide-react'
import  NominikChatbot  from "@/app/nominik"
export default function HomePage() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    empresa: "",
    giro: "",
    puesto: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [showThanksModal, setShowThanksModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  
  const scrollToForm = () => {
    const formSection = document.getElementById("contact-form")
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }
  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  setMessage("")

  try {
    const response = await fetch("/api/send-demo-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (response.ok) {
      // Abrir página de agradecimiento en nueva pestaña
      window.open('/gracias', '_blank')
      
      // Limpiar formulario
      setFormData({
        nombre: "",
        telefono: "",
        email: "",
        empresa: "",
        giro: "",
        puesto: "",
      })
    } else {
      setMessage(data.error || "Hubo un error al agendar el demo. Por favor intenta de nuevo.")
    }
    } catch (error) {
      setMessage("Error al enviar la solicitud. Por favor intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#1a7d8c] to-[#2d5a7b] text-white px-6 py-20 flex items-center">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Para despachos que <span className="block">prefieren lo estratégico,</span>
              <span className="block">no lo operativo.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Haz crecer tu despacho mientras Nommy se encarga de las nóminas.
            </p>
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-[#4db8a8] hover:bg-[#3da898] text-white text-lg px-8 py-6 rounded-full"
            >
              ¡Quiero ser parte de Nommy!
            </Button>
          </div>
          <div className="relative">
            <Image
              src="/images/despa.jpeg"
              alt="Nommy Platform Preview"
              width={800}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits List */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Beneficios de contratar Nommy para <span className="text-[#4FD1C5]">despachos contables:</span>
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="text-purple-500 text-xl">⚙️</div>
                  <p className="text-lg text-gray-700">
                    Accede a historiales de movimientos, recibos y reportes.
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="text-purple-500 text-xl">⚙️ </div>
                  <p className="text-lg text-gray-700">Modificaciones de empleados al IDSE desde una plataforma 100% estable.</p>
                </div>

                <div className="flex gap-4">
                  <div className="text-purple-500 text-xl">⚙️ </div>
                  <p className="text-lg text-gray-700">Cumplimiento garantizado con IMSS.</p>
                </div>


                <div className="flex gap-4">
                  <div className="text-red-500 text-xl">🎁</div>
                  <p className="text-lg">
                    <span className="text-[#274263] font-bold">HASTA 2 MESES GRATIS</span>{" "}
                    <span className="text-gray-700">al contratar tu plan anual</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="bg-[#274263] text-white px-6 py-4 -mx-8 -mt-8 mb-8 rounded-t-lg">
                <h3 className="text-2xl font-bold">Datos personales</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-gray-700 font-semibold">
                    Nombre Completo
                  </Label>
                  <Input
                    id="nombre"
                    type="text"
                    className="w-full"
                    placeholder=""
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono" className="text-gray-700 font-semibold">
                    Número Telefónico
                  </Label>
                  <Input
                    id="telefono"
                    type="tel"
                    className="w-full"
                    placeholder="(123) 456-7890"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-semibold">
                    Correo Electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="w-full"
                    placeholder="correo@dominio.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="empresa" className="text-gray-700 font-semibold">
                    Nombre de la Empresa
                  </Label>
                  <Input
                    id="empresa"
                    type="text"
                    className="w-full"
                    placeholder=""
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="giro" className="text-gray-700 font-semibold">
                    Giro
                  </Label>
                  <Input
                    id="giro"
                    type="text"
                    className="w-full"
                    placeholder=""
                    value={formData.giro}
                    onChange={(e) => setFormData({ ...formData, giro: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="puesto" className="text-gray-700 font-semibold">
                    Puesto
                  </Label>
                  <Input
                    id="puesto"
                    type="text"
                    className="w-full"
                    placeholder=""
                    value={formData.puesto}
                    onChange={(e) => setFormData({ ...formData, puesto: e.target.value })}
                    required
                  />
                </div>

                {submitMessage && (
                  <div
                    className={`p-4 rounded-lg text-center ${
                      submitMessage.includes("éxito") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#4db8a8] hover:bg-[#3da898] text-white text-lg py-6 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : "Agendar DEMO"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-[#274263]">
                <span className="text-[#4FD1C5]">Enfócate en</span> atraer más clientes 
                <span className="text-[#4FD1C5]"> y brindar </span> estrategias fiscales de valor.
              </h2>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-[#274263]">
                <span className="text-[#4FD1C5]">Gracias a su</span> sistema multiusuario,
                <span className="text-[#4FD1C5]"> tu equipo trabaja de forma colaborativa y eficiente,</span> reduciendo errores y tiempo operativo.
              </h2>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl p-12 relative overflow-hidden">
                <img
                  src="/images/si.png"
                  alt="Automatización de tiempo y dinero"
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#4FD1C5] rounded-tl-full opacity-80" />
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#2C5F6F] rounded-tl-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Benefits Overview Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 max-w-4xl mx-auto">
            <h1 className="text-[#2C5F6F] text-4xl md:text-5xl font-bold text-center mb-16 text-balance">
                <span className="text-[#2C5F6F]">Transforma tu nómina. </span><span className="text-[#4FD1C5]">Transforma tu empresa</span>
              </h1>
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl"
                src="https://www.youtube.com/embed/QT3XvJe3pPc"
                title="Nommy Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Conoce los beneficios que <span className="text-[#2C5F6F]">nom</span>
              <span className="text-[#4FD1C5]">my</span> tiene para ti....
            </h2>

            <div className="grid md:grid-cols-3 gap-0 mt-12 overflow-hidden rounded-xl shadow-lg">
              <div className="bg-[#4FD1C5] text-white p-8 md:p-12">
                <div className="text-5xl md:text-6xl font-bold mb-4 opacity-90">01</div>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                  Timbrado automático sin intervención manual.
                </h3>
              </div>
              <div className="bg-[#3DB9AD] text-white p-8 md:p-12">
                <div className="text-5xl md:text-6xl font-bold mb-4 opacity-90">02</div>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                  Colaboración en equipo gracias al acceso multiusuario.
                </h3>
              </div>
              <div className="bg-[#2FA89C] text-white p-8 md:p-12">
                <div className="text-5xl md:text-6xl font-bold mb-4 opacity-90">03</div>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                  Cumplimiento garantizado con las normas fiscales vigentes.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Focus Section */}
      

      {/* Final CTA Section */}
      <section className="relative min-h-[600px] bg-gradient-to-br from-[#1a7d8c] to-[#2d5a7b] text-white px-6 py-20 flex items-center">
        <div className="container mx-auto text-center space-y-8">
          <h2 className="text-5xl lg:text-6xl font-bold text-balance">
            Prueba Nommy
            <span className="block mt-2">y olvídate de la nómina.</span>
          </h2>
          <Button
            onClick={scrollToForm}
            size="lg"
            className="bg-[#4db8a8] hover:bg-[#3da898] text-white text-lg px-8 py-6 rounded-full"
          >
            ¡Quiero mi DEMO!
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center mb-8">
            <div className="text-[#1e3a5f]">
              <p className="font-semibold mb-2">Ventas</p>
              <a
                href="https://wa.me/523315179175"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 group hover:text-[#1e3a5f] transition-colors duration-300"
              >
                <Phone className="w-5 h-5 text-[#1e3a5f] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-[#1e3a5f] group-hover:text-[#1e3a5f]">(33) 15179175</span>
              </a>
            </div>

            <div className="flex justify-center">
              <div className="text-[#1e3a5f] text-10xl font-bold flex flex-col items-center gap-1">
                <img src="Nommy.png" alt="Nommy Logo" className="w-24 h-24" />
              </div>
            </div>

            <div className="text-[#1e3a5f] text-right">
              <p className="font-semibold mb-2 text-[#1e3a5f]">Email</p>
              <p>ventas@nommy.mx</p>
            </div>
          </div>

          <div className="border-t border-[#4db8c4] pt-8">
            <div className="flex justify-between items-center">
              <a
                href="https://drive.google.com/file/d/1cFTxtE8PW_hOgmomy2i56W1SArO7J-dV/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-left font-bold space-x-3 group hover:text-[#1e3a5f] transition-colors duration-300"
              >Política de privacidad</a>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/nommy-m%C3%A9xico-a797a1376/?trk=public-profile-join-page"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#4db8c4] rounded-full flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                
                <a
                  href="https://www.facebook.com/profile.php?id=61578598203669"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#4db8c4] rounded-full flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://www.instagram.com/nommymexico/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#4db8c4] rounded-full flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                
              </div>
            </div>
          </div>
        </div>
      </footer>
      < NominikChatbot />
    </div>
    
  )
}
