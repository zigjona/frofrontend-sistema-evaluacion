import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanelRespuestasRegistradas = () => {
  const [respuestas, setRespuestas] = useState([]);

  useEffect(() => {
    axios.get('https://backend-sistema-evaluacion.onrender.com/api/respuestas/todas')
      .then((res) => setRespuestas(res.data))
      .catch((err) => console.error("Error al obtener respuestas:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Respuestas Registradas</h2>
      {respuestas.map((r, i) => (
        <div key={i} className="mb-4 p-3 border rounded">
          <p><strong>Indicador:</strong> {r.indicador?.nombre}</p>
          <p><strong>Pregunta:</strong> {r.pregunta?.texto}</p>
          <p><strong>Respuesta:</strong> {r.texto || r.valor || r.porcentaje}</p>
          <p><strong>Responsable:</strong> {r.responsable}</p>
          <p><strong>Fecha:</strong> {new Date(r.fecha).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminPanelRespuestasRegistradas;
