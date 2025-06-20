import React, { useEffect, useState } from 'react';

const AdminPanelIndicador = () => {
  const [facultades, setFacultades] = useState([]);
  const [criterios, setCriterios] = useState([]);
  const [indicadores, setIndicadores] = useState([]);
  const [facultadId, setFacultadId] = useState('');
  const [criterioId, setCriterioId] = useState('');
  const [nombreIndicador, setNombreIndicador] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('https://backend-sistema-evaluacion.onrender.com/api/facultades')
      .then(res => res.json())
      .then(data => setFacultades(data));
  }, []);

  useEffect(() => {
    if (facultadId) {
      fetch(`https://backend-sistema-evaluacion.onrender.com/api/criterios/porFacultad/${facultadId}`)
        .then(res => res.json())
        .then(data => setCriterios(data));
    } else {
      setCriterios([]);
    }
  }, [facultadId]);

  useEffect(() => {
    if (criterioId) {
      fetch(`https://backend-sistema-evaluacion.onrender.com/api/indicadores/porCriterio/${criterioId}`)
        .then(res => res.json())
        .then(data => setIndicadores(data));
    } else {
      setIndicadores([]);
    }
  }, [criterioId]);

  const guardarIndicador = async () => {
    if (!nombreIndicador.trim() || !criterioId || !facultadId) {
      setMensaje('Todos los campos son obligatorios.');
      return;
    }

    const url = editandoId
      ? `https://backend-sistema-evaluacion.onrender.com/api/indicadores/${editandoId}`
      : 'https://backend-sistema-evaluacion.onrender.com/api/indicadores';

    const metodo = editandoId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre: nombreIndicador,
        criterio: criterioId,
        facultad: facultadId,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMensaje(editandoId ? 'Indicador actualizado.' : 'Indicador creado.');
      setNombreIndicador('');
      setEditandoId(null);
      fetch(`https://backend-sistema-evaluacion.onrender.com/api/indicadores/porCriterio/${criterioId}`)
        .then(res => res.json())
        .then(data => setIndicadores(data))
        .catch(error => {
          console.error('Error al actualizar la lista de indicadores:', error);
          setIndicadores([]);
        });
    } else {
      setMensaje(data.message || 'Error al guardar indicador.');
    }
  };

  const editarIndicador = (i) => {
    setNombreIndicador(i.nombre);
    setEditandoId(i._id);
  };

  const eliminarIndicador = async (id) => {
    if (!window.confirm('¿Eliminar este indicador?')) return;

    const res = await fetch(`https://backend-sistema-evaluacion.onrender.com/api/indicadores/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setMensaje('Indicador eliminado.');
      fetch(`https://backend-sistema-evaluacion.onrender.com/api/indicadores/porCriterio/${criterioId}`)
        .then(res => res.json())
        .then(data => setIndicadores(data));
    } else {
      setMensaje('Error al eliminar indicador.');
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {editandoId ? 'Editar Indicador' : 'Crear Fuente de información'}
      </h2>

      <input
        type="text"
        value={nombreIndicador}
        onChange={(e) => setNombreIndicador(e.target.value)}
        placeholder="Nombre fuente de infromacion"
        className="border p-2 w-full mb-2 rounded"
      />

      <select value={facultadId} onChange={(e) => setFacultadId(e.target.value)} className="border p-2 w-full mb-2 rounded">
        <option value="">Seleccione criterio</option>
        {facultades.map((f) => <option key={f._id} value={f._id}>{f.nombre}</option>)}
      </select>

      <select value={criterioId} onChange={(e) => setCriterioId(e.target.value)} className="border p-2 w-full mb-2 rounded">
        <option value="">Seleccione indicador</option>
        {criterios.map((c) => <option key={c._id} value={c._id}>{c.nombre}</option>)}
      </select>

      <button onClick={guardarIndicador} className="bg-blue-600 text-white px-4 py-2 rounded">
        {editandoId ? 'Actualizar Indicador' : 'Guardar fuente de informacion'}
      </button>

      {mensaje && (
        <p className={`mt-4 text-center ${mensaje.includes('Error') || mensaje.includes('obligatorios') ? 'text-red-600' : 'text-green-600'}`}>
          {mensaje}
        </p>
      )}

      <hr className="my-6" />
      <h3 className="text-xl font-semibold mb-2">Fuentes de informacion registradas</h3>
      <ul className="space-y-2">
        {indicadores.map((i) => {
          const criterio = i?.criterio?.nombre || 'Sin asignar';
          const facultad = i?.criterio?.facultad?.nombre || 'Sin asignar';

          return (
            <li key={i._id} className="border-b pb-2">
              <p className="font-semibold">{i.nombre}</p>
              <p className="text-sm text-gray-600">
                Criterio: {criterio}<br />
                Facultad: {facultad}<br />
              </p>
              <div className="space-x-2 mt-2">
                <button onClick={() => editarIndicador(i)} className="text-blue-600">Editar</button>
                <button onClick={() => eliminarIndicador(i._id)} className="text-red-600">Eliminar</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminPanelIndicador;
