import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = "YOUR-TOKEN";

app.post("/api/chat", async (req, res) => {
  try {
    const { messages, model } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://dockyai.vercel.app",
        "X-Title": "DockyAI"
      },
      body: JSON.stringify({
        model: model || "gpt-4o-mini",
        messages
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Erreur API OpenRouter:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Serveur DockyAI actif sur le port ${PORT}`));
