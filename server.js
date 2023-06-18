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

// Definir el endpoint para obtener los datos de la tabla "prova"
app.get('/api/prova', (req, res) => {
    // Realizar la consulta a la base de datos
    connection.query('SELECT * FROM prova', (error, results) => {
      if (error) {
        console.error('Error al consultar la base de datos:', error);
        res.status(500).json({ error: 'Error al consultar la base de datos' });
      } else {
        // Enviar los resultados como respuesta
        res.json(results);
      }
    });
  });
  

// Iniciar el servidor
app.listen(3000, () => {
  console.log('API escuchando en el puerto 3000');
});
