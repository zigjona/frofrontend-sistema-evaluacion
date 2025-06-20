import React, { useEffect, useState } from 'react';

const AdminPanelCriterio = () => {
  const [facultades, setFacultades] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [criterios, setCriterios] = useState([]);
  const [facultadId, setFacultadId] = useState('');
 // const [programaId, setProgramaId] = useState('');
  const [nombreCriterio, setNombreCriterio] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {//llamada global
    obtenerFacultades();
    obtenerProgramas();
    obtenerCriterios();
  }, []);
  useEffect(() => {
    if (facultadId) {
      // Obtener programas por facultad
      fetch(`http://localhost:4000/api/programas/porFacultad/${facultadId}`)
        .then(res => res.json())
        .then(data => setProgramas(data));

      // Obtener criterios por facultad
      fetch(`http://localhost:4000/api/criterios/porFacultad/${facultadId}`)
        .then(res => res.json())
        .then(data => setCriterios(data));
    } else {
      setProgramas([]);
      setCriterios([]);
    }
  }, [facultadId]);


  const obtenerFacultades = async () => {
    const res = await fetch('http://localhost:4000/api/facultades');
    const data = await res.json();
    setFacultades(data);
  };

  const obtenerProgramas = async () => {
    const res = await fetch('http://localhost:4000/api/programas');
    const data = await res.json();
    setProgramas(data);
  };

  const obtenerCriterios = async () => {
    const res = await fetch('http://localhost:4000/api/criterios');
    const data = await res.json();
    setCriterios(data);
  };

  const crearOEditarCriterio = async () => {
    // Validación de campos crear criterio no este vacio
    if (!nombreCriterio.trim() || !facultadId) {
      setMensaje('Todos los campos son obligatorios.');
      return;
    }
    const url = editandoId
      ? `https://backend-sistema-evaluacion.onrender.com/api/criterios/${editandoId}`
      : 'https://backend-sistema-evaluacion.onrender.com/api/criterios';

    const metodo = editandoId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre: nombreCriterio,
       // programa: programaId,
        facultad: facultadId,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMensaje(editandoId ? 'Criterio actualizado.' : 'Criterio creado.');
      setNombreCriterio('');
     // setProgramaId('');
      setFacultadId('');
      setEditandoId(null);
      obtenerCriterios();
    } else {
      setMensaje(data.message || 'Error al guardar criterio.');
    }
  };

  const editarCriterio = (criterio) => {
    setNombreCriterio(criterio.nombre);
    //setProgramaId(criterio.programa?._id || '');
    setFacultadId(criterio.facultad?._id || '');
    setEditandoId(criterio._id);
  };

  const eliminarCriterio = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este criterio?')) return;

    const res = await fetch(`https://backend-sistema-evaluacion.onrender.com/api/criterios/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setMensaje('Criterio eliminado.');
      obtenerCriterios();
    } else {
      setMensaje('Error al eliminar el criterio.');
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {editandoId ? 'Editar Criterio' : 'Crear indicador'}
      </h2>

      <input
        type="text"
        value={nombreCriterio}
        onChange={(e) => setNombreCriterio(e.target.value)}
        placeholder="Nombre del indicador"
        className="border p-2 w-full mb-2 rounded"
      />

      <select
        value={facultadId}
        onChange={(e) => setFacultadId(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      >
        <option value="">Selecciona un criterio</option>
        {facultades.map((f) => (
          <option key={f._id} value={f._id}>
            {f.nombre}
          </option>
        ))}
      </select>

    {/** <select
        value={programaId}
        onChange={(e) => setProgramaId(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      >
        <option value="">Selecciona un programa</option>
        {programas.map((p) => (
          <option key={p._id} value={p._id}>
            {p.nombre}
          </option>
        ))}
      </select> */} 

      <button
        onClick={crearOEditarCriterio}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {editandoId ? 'Actualizar Criterio' : 'Guardar Indicador'}
      </button>

      {mensaje && <p className="mt-4 text-center text-green-600">{mensaje}</p>}

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-2">Indicadores registrados</h3>
      <ul className="space-y-2">
        {criterios.map((criterio) => (
          <li
            key={criterio._id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-semibold">{criterio.nombre}</p>
              <p className="text-sm text-gray-500">
                Programa: {criterio.programa?.nombre || 'Sin asignar'}<br />
                Facultad: {criterio.facultad?.nombre || 'Sin asignar'}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => editarCriterio(criterio)}
                className="text-blue-600"
              >
                Editar
              </button>
              <button
                onClick={() => eliminarCriterio(criterio._id)}
                className="text-red-600"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>{/**Hasta aqui va */}
    </div>
  );
};

export default AdminPanelCriterio;
