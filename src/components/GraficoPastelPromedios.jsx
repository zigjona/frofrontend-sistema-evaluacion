import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57'];

const GraficoPastelPromedios = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://backend-sistema-evaluacion.onrender.com/respuestas/promedios')
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error al cargar promedios:", err));
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-md font-semibold mb-4">Promedios por Pregunta</h2>
      {data.length === 0 ? (
        <p>No hay datos aún</p>
      ) : (
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="promedio"
            nameKey="nombre"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
};

export default GraficoPastelPromedios;
