import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['Elemento 1', 'Elemento 2', 'Elemento 3'],
  datasets: [
    {
      label: 'Grado de Satisfacción',
      data: [3, 4, 2],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
    },
  ],
};

export default function Reportes() {
  return (
    <div>
      <h2>Reportes</h2>
      <Bar data={data} />
    </div>
  );
}
