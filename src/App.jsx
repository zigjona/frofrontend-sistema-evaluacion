import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import FormularioJerarquico from './components/FormularioJerarquico';
import AdminLayout from './components/AdminLayout';
import AdminPanelIndicador from './components/AdminPanelIndicador';
import AdminPanelFacultad from './components/AdminPanelFacultad';
import AdminPanelCriterio from './components/AdminPanelCriterio.jsx';
import TablaJerarquica from './components/TablaJerarquica.jsx';
import AdminPanelCrearPregunta from './components/AdminPanelCrearPregunta.jsx';
import AdminPanelCrearRespuesta from './components/AdminPanelCrearRespuesta.jsx';
import AdminPanelCrearUsuario from './components/AdminPanelCrearUsuario.jsx';
import AdminPanelRespuestasRegistradas from './components/AdminPanelRespuestasRegistradas.jsx';

function App() {
  const [rol, setRol] = useState(localStorage.getItem('rol') || '');
  const navigate = useNavigate(); // 🚀 redirección

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    setRol('');
    navigate('/'); // por si acaso
  };

  const handleLogin = (nuevoRol) => {
    setRol(nuevoRol);
    if (nuevoRol === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  if (!rol) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Bienvenido ({rol})</h1>
        <button onClick={cerrarSesion} className="bg-red-500 text-white px-3 py-1 rounded">
          Cerrar sesión
        </button>
      </div>

      <Routes>
        <Route path="/" element={<FormularioJerarquico />} />
        {rol === 'admin' && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<FormularioJerarquico />} />
            <Route path="facultadApp" element={<AdminPanelFacultad />} />
            <Route path="criterioApp" element={<AdminPanelCriterio />} />
            <Route path="indicadorApp" element={<AdminPanelIndicador />} />
            <Route path="tablaJerarquicaApp" element={<TablaJerarquica />} />
            <Route path="crearPreguntaApp" element={<AdminPanelCrearPregunta />} />
            <Route path="crearRespuestaApp" element={<AdminPanelCrearRespuesta />} />
            <Route path="crearUsuarioApp" element={<AdminPanelCrearUsuario />} />
            <Route path="respuestasRegistradasApp" element={<AdminPanelRespuestasRegistradas />} />
          </Route>
        )}
      </Routes>
    </div>
  );
}




export default App;
