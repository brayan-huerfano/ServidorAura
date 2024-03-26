
const express = require('express');
const bodyParser = require('body-parser');
const { Resend } = require('resend');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para analizar solicitudes JSON
app.use(bodyParser.json());

// Middleware para configurar las cabeceras de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Configurar instancia de Resend
const resend = new Resend('re_PRDQm19G_DR8gN5EiQQ2dLB5rzvULjqjn');

// Ruta para manejar el envío de correo electrónico desde el formulario
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: "desarrolladorbrayancardona@gmail.com",
      subject: 'Mensaje de contacto',
      html: `<p>Nombre: ${name}</p><p>Correo electrónico: ${email}</p><p>Mensaje: ${message}</p>`,
    });

    if (error) {
      console.error('Error al enviar el correo:', error);
      return res.status(500).send('Error al enviar el correo');
    }

    console.log('Email enviado:', data);
    res.status(200).send('Email enviado correctamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).send('Error al enviar el correo');
  }
});

// Servir los archivos estáticos de la aplicación React
app.use(express.static(path.join(__dirname, 'build')));

// Manejar cualquier solicitud GET que no coincida con las rutas anteriores
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
