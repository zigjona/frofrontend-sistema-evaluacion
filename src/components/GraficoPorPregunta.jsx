
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import axios from 'axios';
import { useState, useEffect } from 'react';

const GraficoPorPregunta = ({ preguntaId, tipo }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!preguntaId || !tipo === 'texto') return;// <-- aquí excluyes preguntas de tipo texto

    axios.get(`http://localhost:4000/api/respuestas/agrupado/${preguntaId}`)
      .then((res) => {
        const formateado = res.data.map((item, i) => ({
          nombre: `Trimestral ${i + 1}`,
          valor: tipo === 'porcentaje' ? item.promedioPorcentaje : item.promedioValor,
        }));
        setData(formateado);
      })
      .catch((err) => console.error("❌ Error al obtener datos:", err));
  }, [preguntaId, tipo]);

  if (tipo === 'texto') return null; // <-- Esto evita renderizar el gráfico si es texto

  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold mb-2">Gráfico de resultados</h3>
      {data.length === 0 ? (
        <p className="text-gray-500 italic">No hay datos aún</p>
      ) : (
        <LineChart width={500} height={250} data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="nombre" />
          <YAxis domain={[0, tipo === 'porcentaje' ? 100 : 'auto']} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="valor" stroke="#8884d8" />
        </LineChart>
      )}
    </div>
  );
};

export default GraficoPorPregunta;
