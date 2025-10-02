import express from "express";
import fetch from "node-fetch";

try {
  const dotenv = await import("dotenv");
  dotenv.config();
} catch (error) {
  if (error?.code !== "ERR_MODULE_NOT_FOUND") {
    console.error("Error al cargar dotenv:", error);
  }
}
const app = express();
app.use(express.json());
app.use(express.static("public"));

// Verificación webhook
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// Eventos entrantes
app.post("/webhook", async (req, res) => {
  const entry = req.body.entry?.[0];
  const changes = entry?.changes?.[0];
  const value = changes?.value;

  console.log("📩 Evento recibido:", JSON.stringify(value, null, 2));

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

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
