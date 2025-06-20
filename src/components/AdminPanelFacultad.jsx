import React, { useState, useEffect } from 'react';

const AdminPanelFacultad = () => {
  const [nombreFacultad, setNombreFacultad] = useState('');/**obtengo nombre facultad de la db */
  const [facultades, setFacultades] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState('');

  const token = localStorage.getItem('token');

  const obtenerFacultades = async () => {
    const res = await fetch('https://backend-sistema-evaluacion.onrender.com/api/facultades');
    const data = await res.json();
    setFacultades(data);
  };

  useEffect(() => {
    obtenerFacultades();
  }, []);

  const crearFacultad = async () => {
    setMensaje('');
    const res = await fetch('https://backend-sistema-evaluacion.onrender.com/api/facultades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nombre: nombreFacultad }),
    });
    const data = await res.json();
    if (res.ok) {
      setMensaje('Facultad creada exitosamente.');
      setNombreFacultad('');
      obtenerFacultades();
    } else {
      setMensaje(data.message || 'Error al crear facultad.');
    }
  };
  //Elimino facultad
  const eliminarFacultad = async (id) => {
    const res = await fetch(`https://backend-sistema-evaluacion.onrender.com/api/facultades/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setMensaje('Facultad eliminada.');
      obtenerFacultades();
    } else {
      setMensaje(data.message || 'Error al eliminar.');
    }
  };
//Editar o actualizar facultad
  const actualizarFacultad = async (id) => {
    const res = await fetch(`https://backend-sistema-evaluacion.onrender.com/api/facultades/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nombre: nuevoNombre }),
    });
    const data = await res.json();
    if (res.ok) {
      setMensaje('Facultad actualizada.');
      setEditandoId(null);
      obtenerFacultades();
    } else {
      setMensaje(data.message || 'Error al actualizar.');
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Panel de Administración</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Crear criterios</h3>
        <input
          type="text"
          value={nombreFacultad}
          onChange={(e) => setNombreFacultad(e.target.value)}
          placeholder="Nombre del crietrio"
          className="border p-2 w-full mb-2 rounded"
        />
        <button
          onClick={crearFacultad}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Guardar Criterio
        </button>
      </div>

      <h3 className="font-semibold mb-2">Listado de Criterios</h3>
      <ul>
        {facultades.map((facultad) => (
          <li
            key={facultad._id}
            className="flex justify-between items-center border-b py-2"
          >
            {editandoId === facultad._id ? (
              <>
                <input
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  className="border p-1 rounded w-full mr-2"
                />
                <button
                  onClick={() => actualizarFacultad(facultad._id)}
                  className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditandoId(null)}
                  className="text-sm text-gray-600"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <span className="flex flex-col">
                  <strong>{facultad.nombre}</strong>
                  <small className="text-gray-500">ID: {facultad._id}</small>
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditandoId(facultad._id);
                      setNuevoNombre(facultad.nombre);
                    }}
                    className="text-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarFacultad(facultad._id)}
                    className="text-red-600"
                  >
                    Eliminar
                  </button>
                  {/*Aqui almaceno id facultad para luego usarlo */}
                   <button
                    onClick={() => {
                      localStorage.setItem('facultadSeleccionadaId', facultad._id);
                      alert(`Facultad "${facultad.nombre}" seleccionada para usar en programas.`);
                    }}
                    className="text-purple-600 text-sm"
                  >
                    Usar para programa
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {mensaje && <p className="mt-4 text-center text-green-600">{mensaje}</p>}
    </div>
  );
};

export default AdminPanelFacultad;
