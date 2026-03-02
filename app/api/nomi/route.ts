import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // 4️⃣ HTML bonito
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

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; background:#f5f5f5; padding:20px;">
          <div style="max-width:700px;margin:auto;background:white;border-radius:12px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#274263,#2DD4BF);color:white;padding:30px;text-align:center;">
              <h1 style="margin:0;">🧠 Nueva Conversación del Chatbot</h1>
            </div>
            <div style="padding:30px;">
              ${conversationHtml}
            </div>
            <div style="background:#f9fafb;text-align:center;padding:20px;font-size:13px;color:#6b7280;">
              ${new Date().toLocaleString("es-MX")}
            </div>
          </div>
        </body>
      </html>
    `;

    // 5️⃣ Enviar correo con Resend
    await resend.emails.send({
      from: "no-reply@resend.dev",
      to: ["ventas@nommy.mx"],
      subject: "🧠 Nueva conversación – Asesoría solicitada",
      html: htmlContent,
    });

    return NextResponse.json({ text: assistantReply });

  } catch (error) {
    console.error("Error Resend:", error);
    return NextResponse.json(
      { error: "Error al procesar el mensaje" },
      { status: 500 }
    );
  }
}