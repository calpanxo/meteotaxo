import React, { useEffect, useState } from 'react';

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/prova'); // Cambia la URL según la configuración de tu servidor Node.js
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Tabla de datos</h2>
      <table>
        <thead>
          <tr>
            <th>Temperatura</th>
            <th>Humedad</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.temperatura}</td>
              <td>{item.humedad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
