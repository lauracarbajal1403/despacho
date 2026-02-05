import { type NextRequest, NextResponse } from "next/server"
import { MailService } from "@/lib/mail.service"

export async function POST(request: NextRequest) {
  try {
    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !(process.env.SMTP_PASSWORD || process.env.SMTP_PASS)) {
      console.error("[contact-form] SMTP credentials are not configured")
      return NextResponse.json(
        { success: false, error: "Email service is not configured. Please add SMTP environment variables." },
        { status: 500 },
      )
    }

    const body = await request.json()
    const { nombre, apellido, telefono, email, source, recipientEmail } = body

    // Validate required fields
    if (!nombre || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: nombre and email are required" },
        { status: 400 }
      )
    }

    const recipient = recipientEmail || "contacto@nommy.mx"
    console.log("[contact-form] Sending contact form to:", recipient)

    // Send email using MailService
    const result = await MailService.SendMail({
      to: recipient,
      replyTo: email,
      subject: `Nuevo contacto desde NOMMY - ${nombre} ${apellido || ''}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6; 
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f5f5f5;
              }
              .container { 
                max-width: 600px; 
                margin: 40px auto; 
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header { 
                background: linear-gradient(135deg, #274263 0%, #2DD4BF 100%); 
                color: white; 
                padding: 40px 30px; 
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 600;
              }
              .header p {
                margin: 8px 0 0 0;
                opacity: 0.95;
                font-size: 14px;
              }
              .content { 
                padding: 40px 30px;
              }
              .field { 
                margin-bottom: 24px;
                padding-bottom: 24px;
                border-bottom: 1px solid #e5e7eb;
              }
              .field:last-child {
                border-bottom: none;
                margin-bottom: 0;
                padding-bottom: 0;
              }
              .label { 
                font-weight: 600; 
                color: #274263; 
                margin-bottom: 6px;
                font-size: 13px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              .value { 
                color: #1f2937;
                font-size: 16px;
                margin-top: 4px;
              }
              .footer { 
                background: #f9fafb;
                text-align: center; 
                padding: 20px 30px;
                color: #6b7280; 
                font-size: 13px;
                border-top: 1px solid #e5e7eb;
              }
              .badge {
                display: inline-block;
                background: #2DD4BF;
                color: white;
                padding: 4px 12px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 600;
                margin-top: 4px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📬 Nuevo Contacto</h1>
                <p>Se ha recibido un nuevo mensaje desde la landing page</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Nombre Completo</div>
                  <div class="value">${nombre}${apellido ? ' ' + apellido : ''}</div>
                </div>
                <div class="field">
                  <div class="label">📧 Email</div>
                  <div class="value">${email}</div>
                </div>
                ${
                  telefono
                    ? `
                <div class="field">
                  <div class="label">📱 Teléfono</div>
                  <div class="value">${telefono}</div>
                </div>
                `
                    : ""
                }
                ${
                  source
                    ? `
                <div class="field">
                  <div class="label">🔗 Fuente</div>
                  <div class="value">
                    <span class="badge">${source}</span>
                  </div>
                </div>
                `
                    : ""
                }
              </div>
              <div class="footer">
                <p>📅 Recibido el ${new Date().toLocaleDateString('es-MX', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
                <p style="margin-top: 8px; color: #9ca3af;">Este correo fue enviado automáticamente desde el formulario de contacto de NOMMY</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    console.log("[contact-form] Email sent successfully:", result.messageId)
    
    return NextResponse.json({ 
      success: true, 
      message: "Contact form sent successfully",
      messageId: result.messageId 
    })
  } catch (error) {
    console.error("[contact-form] Error processing contact form:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to send contact form" 
      },
      { status: 500 }
    )
  }
}