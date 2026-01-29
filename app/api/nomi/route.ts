import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1️⃣ OpenAI
    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages,
          temperature: 0.6,
        }),
      }
    );

    if (!openaiRes.ok) {
      throw new Error("OpenAI error");
    }

    const result = await openaiRes.json();
    const assistantReply = result.choices[0].message.content;

    // 2️⃣ Conversación completa (user + assistant)
    const fullConversation = [
      ...messages,
      { role: "assistant", content: assistantReply },
    ];

    // 3️⃣ Formatear conversación para email
    const conversationHtml = fullConversation
      .map(
        (msg) => `
          <p>
            <strong>${msg.role === "user" ? "Usuario" : "Assistant"}:</strong><br/>
            ${msg.content}
          </p>
        `
      )
      .join("");

    // 4️⃣ Enviar correo
    await resend.emails.send({
      from: "Nominik <onboarding@nommy.mx>",
      to: ["ventas@nommy.mx"],
      subject: "💬 Nueva conversación en Nominik",
      html: `
        <h3>Conversación completa del chatbot</h3>
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

