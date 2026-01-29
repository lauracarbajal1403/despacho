import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nombre, telefono, email, empresa, giro, puesto } = body

    // Validar que todos los campos estén presentes
    if (!nombre || !telefono || !email || !empresa || !giro || !puesto) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // Enviar el correo usando Resend
    const data = await resend.emails.send({
      from: "Nommy Demo <onboarding@resend.dev>",
      to: ["ventas@nommy.mx"],
      subject: `Nueva solicitud de DEMO - ${empresa}`,
      html: `
        <h2>Nueva Solicitud de DEMO</h2>
        <p><strong>Nombre Completo:</strong> ${nombre}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Correo Electrónico:</strong> ${email}</p>
        <p><strong>Empresa:</strong> ${empresa}</p>
        <p><strong>Giro:</strong> ${giro}</p>
        <p><strong>Puesto:</strong> ${puesto}</p>
      `,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return NextResponse.json({ error: "Error al enviar el correo" }, { status: 500 })
  }
}
