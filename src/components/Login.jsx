import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [correo, setCorreo] = useState('');
  const [password, setContraseña] = useState('');
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     //const res = await fetch('http://localhost:4000/api/auth/login',
        const res = await fetch('https://backend-sistema-evaluacion.onrender.com/api/auth/login',
        {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('rol', data.rol);
        localStorage.setItem('nombreUsuario', data.nombre); //  Se guarda el nombre
        onLogin(data.rol);
      } else {
        alert(data.mensaje || 'Error al iniciar sesión');
      }
    } catch (err) {
      alert("Error de red o del servidor");
      console.error(err);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
      <input
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Correo"
        required
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type={mostrarContraseña ? 'text' : 'password'}
        value={password}
        onChange={(e) => setContraseña(e.target.value)}
        placeholder="Contraseña"
        required
        className="w-full p-2 mb-1 border rounded"
      />
      <button
        type="button"
        onClick={() => setMostrarContraseña(!mostrarContraseña)}
        className="text-sm text-blue-600 mb-3"
      >
        {mostrarContraseña ? 'Ocultar password' : 'Mostrar password'}
      </button>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Iniciar sesión
      </button>
    </form>
  );
};

export default Login;
