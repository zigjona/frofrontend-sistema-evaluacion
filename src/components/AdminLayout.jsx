import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {






  return (
    <div className="min-h-screen bg-gray-100 p-4 flex gap-6">
      {/* Menú lateral siempre visible */}
      <aside className="w-60 bg-white border border-gray-300 shadow-lg rounded-md p-4">
        <h2 className="font-bold text-lg mb-4 text-center">Panel de Administración</h2>
        <ul className="flex flex-col divide-y">
          <li>
            <Link to="facultadApp" className="block px-4 py-2 hover:bg-gray-100">Criterio</Link>
          </li>
         {/** <li>
            <Link to="programaApp" className="block px-4 py-2 hover:bg-gray-100">Programa</Link>
          </li> */}
          <li>
            <Link to="criterioApp" className="block px-4 py-2 hover:bg-gray-100">Indicador</Link>
          </li>
           {/** <li>
            <Link to="subCriterioApp" className="block px-4 py-2 hover:bg-gray-100">Subcriterio</Link>
          </li> */}
          <li>
            <Link to="indicadorApp" className="block px-4 py-2 hover:bg-gray-100">Fuente de informacion</Link>
          </li>
          <li>
            <Link to="tablaJerarquicaApp" className="block px-4 py-2 hover:bg-gray-100">Tabla completa</Link>
          </li>
          <li>
            <Link to="crearPreguntaApp" className="block px-4 py-2 hover:bg-gray-100">Crear pregunta por indicador</Link>
          </li>
         {/** <li>
            <Link to="crearRespuestaApp" className="block px-4 py-2 hover:bg-gray-100">Crear respuesta por pregunta y fuente de informacion</Link>
          </li>*/} 
           <li>
            <Link to="crearUsuarioApp" className="block px-4 py-2 hover:bg-gray-100">Crear usuario</Link>
          </li>
           <li>
            <Link to="respuestasRegistradasApp" className="block px-4 py-2 hover:bg-gray-100">Ver quienes ingresaron</Link>
          </li>

        </ul>
      </aside>

      {/* Contenido del panel */}
      <main className="flex-1 mt-2">
        {/*<h1 className="text-xl font-bold mb-4">Bienvenido (admin)</h1>*/}
        <Outlet />
      </main>
      {/* Panel derecho - Personalizable */}
     {/** <aside className="w-72 bg-white border-l border-gray-300 shadow-md p-4">
        <h2 className="font-bold text-lg mb-4 text-center">Panel Lateral Derecho</h2>
        <p className="text-sm text-gray-700">Aquí puedes agregar filtros, resumen, gráficos u otra información.</p>
      </aside>*/}
    </div>
  );
};

export default AdminLayout;
