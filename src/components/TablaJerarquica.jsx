import React, { useEffect, useState } from 'react';

export default function TablaJerarquica() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const res = await fetch('http://localhost:4000/api/indicadores');
      const indicadores = await res.json();

      // Suponemos que cada indicador viene poblado hasta facultad
      // (populate subcriterio → criterio → programa → facultad)
      setDatos(indicadores);
    };

    cargarDatos();
  }, []);

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-bold mb-4">Tabla Jerárquica</h2>
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-300">
          <tr>
            <th className="border px-4 py-2">Crietrio</th>
           {/** <th className="border px-4 py-2">Programa</th> */}
            <th className="border px-4 py-2">Indicador</th>
             {/** <th className="border px-4 py-2">Subcriterio</th>*/}
            <th className="border px-4 py-2">Fuente de informacion</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((ind) => (
            <tr key={ind._id} className="bg-gray-100 hover:bg-gray-200">
              <td className="border px-4 py-2">
                {ind.criterio?.facultad?.nombre || 'N/A'}
              </td>
              <td className="border px-4 py-2">
                {ind.criterio?.nombre || 'N/A'}
              </td>
              
              <td className="border px-4 py-2">{ind.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
