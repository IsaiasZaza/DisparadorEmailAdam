require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.get('/', async (req, res) => {
  res.send({ 'api': 'online' })
})

app.post("/enviar-email", async (req, res) => {
  const { nome, email, whatsapp, mensagem } = req.body;

  if (!nome || !email || !whatsapp || !mensagem) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"${nome}" <${email}>`,
      to: "cetmacetma7@gmail.com", // E-mail que receberá as mensagens
      subject: "Nova mensagem do formulário",
      text: `Nome: ${nome}\nE-mail: ${email}\nWhatsApp: ${whatsapp}\n\nMensagem: ${mensagem}`,
    });

    res.json({ success: true, message: "E-mail enviado com sucesso!", info });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = 3004;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));