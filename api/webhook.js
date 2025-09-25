import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Verificación de Meta
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }

  if (req.method === "POST") {
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    console.log("📩 Evento recibido:", JSON.stringify(value, null, 2));

    // Si es una llamada entrante
    if (value?.call) {
      const from = value.call.from;

      await fetch(`https://graph.facebook.com/v20.0/${process.env.PHONE_NUMBER_ID}/messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: from,
          type: "text",
          text: { body: "¡Hola! Gracias por tu llamada 📲. En un momento te devolveremos la llamada." }
        })
      });
    }

    return res.sendStatus(200);
  }
}
