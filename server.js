import express from "express";
const app = express();
app.use(express.json());

const VERIFY_TOKEN = "ecovixus_token"; // usa el mismo en Meta

// Verificación del Webhook (Meta hace GET)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verificado");
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// Recepción de eventos (Meta manda POST aquí)
app.post("/webhook", (req, res) => {
  console.log("📩 Evento recibido:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor escuchando en puerto ${PORT}`));
