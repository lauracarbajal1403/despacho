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

    // 4️⃣ HTML bonito para correo
    const conversationHtml = fullConversation
      .map(
        (msg) => `
        <p>
          <strong>${msg.role === "user" ? "Usuario" : "Nominik"}:</strong><br/>
          ${msg.content}
        </p>
      `
      )
      .join("");

    // 5️⃣ Enviar correo
    await resend.emails.send({
      from: "Nominik <onboarding@nommy.mx>",
      to: ["ventas@nommy.mx"],
      subject: "🧠 Nueva conversación – Asesoría solicitada",
      html: `
        <h2>Conversación completa del chatbot</h2>
        ${conversationHtml}
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
