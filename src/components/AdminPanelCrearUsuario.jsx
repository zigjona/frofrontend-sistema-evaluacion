// 3. FRONTEND - Componente para el ADMIN (AdminCrearUsuario.jsx)
import React, { useState } from 'react';
import axios from 'axios';

export default function AdminPanelCrearUsuario() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('usuario');

  const crearUsuario = async () => {
    try {
      await axios.post('http://localhost:4000/api/usuarios', {
        nombre,
        correo,
        password,
        rol,
      });
      alert('Usuario creado');
      setNombre('');
      setCorreo('');
      setPassword('');
      setRol('usuario');
    } catch (err) {
      alert('Error al crear usuario');
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Crear Usuario</h2>
      <input className="border p-2 mb-2 w-full" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input className="border p-2 mb-2 w-full" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
      <input className="border p-2 mb-2 w-full" placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <select className="border p-2 mb-4 w-full" value={rol} onChange={(e) => setRol(e.target.value)}>
        <option value="usuario">Usuario</option>
        <option value="admin">Administrador</option>
      </select>
      <button onClick={crearUsuario} className="bg-blue-600 text-white px-4 py-2 rounded">Crear</button>
    </div>
  );
}

