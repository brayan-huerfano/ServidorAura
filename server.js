const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para analizar solicitudes JSON
app.use(bodyParser.json());

// Middleware para configurar las cabeceras de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://aurapazservidor:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Ruta para manejar el envío de correo electrónico desde el formulario
app.post('/send-email', (req, res) => {
  // Simplemente devuelve los datos recibidos en la solicitud
  res.json(req.body);
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
