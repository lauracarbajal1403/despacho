import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    console.log("MENSAJES RECIBIDOS:", messages);
    console.log(
      "API KEY EXISTE:",
      typeof process.env.OPENAI_API_KEY === "string"
    );

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY no definida" },
        { status: 500 }
      );
    }

    // Filtrar mensajes vacíos o inválidos
    const validMessages = messages
      .filter((msg: any) => msg.content && msg.content.trim() !== "")
      .map((msg: any) => ({
        role: msg.role, // OpenAI usa "user", "assistant", "system"
        content: msg.content.trim()
      }));

    // Verificar que hay al menos un mensaje válido
    if (validMessages.length === 0) {
      return NextResponse.json(
        { error: "No hay mensajes válidos para procesar" },
        { status: 400 }
      );
    }

    console.log("MENSAJES ENVIADOS A OPENAI:", JSON.stringify(validMessages, null, 2));

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // o "gpt-4" si tienes acceso
          messages: validMessages,
          temperature: 0.7,
        }),
      }
    );

    if (!openaiRes.ok) {
      const err = await openaiRes.text();
      console.error("OpenAI error:", err);
      return NextResponse.json(
        { error: "Error desde OpenAI" },
        { status: 500 }
      );
    }

    const result = await openaiRes.json();
    return NextResponse.json({
      text: result.choices[0].message.content,
    });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { error: "Error al procesar el mensaje" },
      { status: 500 }
    );
  }
}
