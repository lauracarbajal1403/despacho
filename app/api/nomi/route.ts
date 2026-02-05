import { NextResponse } from "next/server";
import { MailService } from "@/lib/mail.service";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY no definida" },
        { status: 500 }
      );
    }

    // 1️⃣ Limpiar mensajes
    const validMessages = messages
      .filter((msg: any) => msg.content && msg.content.trim() !== "")
      .map((msg: any) => ({
        role: msg.role,
        content: msg.content.trim(),
      }));

    if (validMessages.length === 0) {
      return NextResponse.json(
        { error: "No hay mensajes válidos" },
        { status: 400 }
      );
    }

    // 2️⃣ Llamar a OpenAI
    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: validMessages,
          temperature: 0.7,
        }),
      }
    );

    const result = await openaiRes.json();
    const assistantReply = result.choices[0].message.content;

    // 3️⃣ Conversación completa
    const fullConversation = [
      ...validMessages,
      { role: "assistant", content: assistantReply },
    ];

    // 4️⃣ HTML bonito para correo
    const conversationHtml = fullConversation
      .map(
        (msg) => `
        <div style="margin-bottom: 20px; padding: 15px; background-color: ${
          msg.role === "user" ? "#f3f4f6" : "#e0f2fe"
        }; border-radius: 8px;">
          <strong style="color: ${
            msg.role === "user" ? "#274263" : "#0369a1"
          };">${msg.role === "user" ? "Usuario" : "Nominik"}:</strong><br/>
          <p style="margin: 8px 0 0 0; color: #1f2937;">${msg.content}</p>
        </div>
      `
      )
      .join("");

    // 5️⃣ Enviar correo con MailService
    await MailService.SendMail({
      to: "ventas@nommy.mx",
      subject: "🧠 Nueva conversación – Asesoría solicitada",
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
                max-width: 700px; 
                margin: 40px auto; 
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header { 
                background: linear-gradient(135deg, #274263 0%, #2DD4BF 100%); 
                color: white; 
                padding: 30px; 
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
              }
              .content { 
                padding: 30px;
              }
              .footer { 
                background: #f9fafb;
                text-align: center; 
                padding: 20px;
                color: #6b7280; 
                font-size: 13px;
                border-top: 1px solid #e5e7eb;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🧠 Nueva Conversación del Chatbot</h1>
              </div>
              <div class="content">
                <h2 style="color: #274263; margin-top: 0;">Conversación completa</h2>
                ${conversationHtml}
              </div>
              <div class="footer">
                <p>📅 ${new Date().toLocaleDateString('es-MX', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
                <p style="margin-top: 8px; color: #9ca3af;">
                  Este correo fue enviado automáticamente desde el chatbot de NOMMY
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ text: assistantReply });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al procesar el mensaje" },
      { status: 500 }
    );
  }
}