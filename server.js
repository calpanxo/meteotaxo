const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'trufot',
  database: 'sensitive_pot',
});

// Ruta para recibir los datos de temperatura y humedad desde el Wemos D1 Mini
app.post('/datos', (req, res) => {
  const { temperatura, humedad } = req.body;

  // Guardar los datos en la base de datos
  const query = 'INSERT INTO prova (temperatura, humedad) VALUES (?, ?)';
  connection.query(query, [temperatura, humedad], (error, results) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('API escuchando en el puerto 3000');
});
