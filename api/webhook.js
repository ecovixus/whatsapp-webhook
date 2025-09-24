export default function handler(req, res) {
  const VERIFY_TOKEN = "ecovixus_token"; // usa el mismo que pondrás en Meta

  if (req.method === "GET") {
    // Meta manda un GET para verificar el webhook
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge); // OK con el challenge
    } else {
      return res.status(403).end("Forbidden"); // Respuesta más segura
    }
  }

  if (req.method === "POST") {
    console.log("📩 Evento recibido:", JSON.stringify(req.body, null, 2));
    return res.status(200).end("EVENT_RECEIVED"); // Meta espera un 200 OK
  }

  return res.status(404).end("Not Found");
}
