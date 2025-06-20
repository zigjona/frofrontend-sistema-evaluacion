import React, { useEffect, useState } from 'react';
export default function TablaJerarquica() {

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const res = await fetch('https://backend-sistema-evaluacion.onrender.com/api/indicadores/');// igual que el nombre de la funcion en la
        //ruta del archivo indicadores
        const indicadores = await res.json();
        console.log("🔍 Datos recibidos:", indicadores);
        console.log("👉 ¿Es un array?:", Array.isArray(indicadores));
        // Suponemos que cada indicador viene poblado hasta facultad
        // (populate subcriterio → criterio → programa → facultad)
        setDatos(Array.isArray(indicadores) ? indicadores : []);
       // setDatos(indicadores);
      } catch (error) {
        console.error("❌ Error al cargar datos:", error);
      }
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
          {datos.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center text-gray-500 py-4">
                No hay datos disponibles.
              </td>
            </tr>
          ) : (
            datos.map((ind) => {
              const facultadNombre = ind.criterio?.facultad?.nombre || 'N/A';
              const criterioNombre = ind.criterio?.nombre || 'N/A';
              const indicadorNombre = ind.nombre || 'N/A';

              return (
                <tr key={ind._id} className="bg-gray-100 hover:bg-gray-200">
                  <td className="border px-4 py-2">{facultadNombre}</td>
                  <td className="border px-4 py-2">{criterioNombre}</td>
                  <td className="border px-4 py-2">{indicadorNombre}</td>
                </tr>
              );
            })
          )}
        </tbody>

      </table>
    </div>
  );
}


//export default TablaJerarquica;