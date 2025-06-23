import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registro de componentes necesarios de ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['Elemento 1', 'Elemento 2', 'Elemento 3'],
  datasets: [
    {
      label: 'Grado de Satisfacción',
      data: [3, 4, 2],
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Reporte de Evaluación por Elemento',
      font: {
        size: 18
      }
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 5, // si es escala de 1 a 5
      title: {
        display: true,
        text: 'Nivel de Satisfacción',
      }
    },
    x: {
      title: {
        display: true,
        text: 'Elementos Evaluados',
      }
    }
  }
};

export default function Reportes() {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-700">Reportes</h2>
      <Bar data={data} options={options} />
    </div>
  );
}
