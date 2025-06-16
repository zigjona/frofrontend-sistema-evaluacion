import React, { useState, useEffect } from 'react';
import axios from 'axios';




const AdminPanelCrearPregunta = () => {
  const [texto, setTexto] = useState('');
  const [indicadorId, setIndicadorId] = useState('');
  const [indicadores, setIndicadores] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [tipoRespuesta, setTipoRespuesta] = useState('');



  useEffect(() => {//Hace una llamado al backend  para obtener todo slos indicadores i alamcenrlo en indicadores
    axios.get('http://localhost:4000/api/indicadores').then((res) => {
      setIndicadores(res.data);
    });
  }, []);


  useEffect(() => {
    if (indicadorId) {
      obtenerPreguntas();
    } else {
      setPreguntas([]);
    }
  }, [indicadorId]);

  const obtenerPreguntas = async () => {
    const res = await axios.get(`http://localhost:4000/api/preguntas/porIndicador/${indicadorId}`);
    setPreguntas(res.data);
  };



  {/*const guardarPregunta = async () => {
    if (!texto || !indicadorId) {
      alert("Debe completar todos los campos");
      return;
    }

    if (editandoId) {
      await axios.put(`http://localhost:4000/api/preguntas/${editandoId}`, { texto });
      setEditandoId(null);
    } else {
      await axios.post('http://localhost:4000/api/preguntas', {
        texto,
        indicador: indicadorId,
      });
    }

    setTexto('');
    obtenerPreguntas();
  };*/}

  const guardarPregunta = async () => {
  if (!texto || !indicadorId || !tipoRespuesta) {
    alert("Debe completar todos los campos, incluyendo tipo de respuesta");
    return;
  }

  if (editandoId) {
    await axios.put(`http://localhost:4000/api/preguntas/${editandoId}`, {
      texto,
      tipoRespuesta,
    });
    setEditandoId(null);
  } else {
    await axios.post('http://localhost:4000/api/preguntas', {
      texto,
      tipoRespuesta,
      indicador: indicadorId,
    });
  }

  setTexto('');
  setTipoRespuesta('');
  obtenerPreguntas();
};


  // funciones para editar y eliminar
  const editarPregunta = (pregunta) => {
    setTexto(pregunta.texto);
    setEditandoId(pregunta._id);
  };

  const eliminarPregunta = async (id) => {
    if (confirm("¿Estás seguro de eliminar esta pregunta?")) {
      await axios.delete(`http://localhost:4000/api/preguntas/${id}`);
      obtenerPreguntas();
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4">Gestionar Preguntas por fuente de información</h2>
      {/**Selecciono un a fuente de informacion(indicador) */}
      <select
        value={indicadorId}
        onChange={(e) => setIndicadorId(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      >
        <option value="">Seleccione fuente de información</option>
        {indicadores.map((i) => (
          <option key={i._id} value={i._id}>
            {i.nombre}
          </option>
        ))}
      </select>
      {/**Para ingresar el texto */}
      <input
        type="text"
        placeholder="Ingrese la pregunta"
        className="border p-2 rounded w-full mb-3"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <select
        value={tipoRespuesta}
        onChange={(e) => setTipoRespuesta(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      >
        <option value="">Seleccione el tipo de respuesta</option>
        <option value="texto">Texto</option>
        <option value="numero">Numérico</option>
        <option value="porcentaje">Porcentaje</option>
      </select>


      {/*boton par aguardar*/}
      <button
        onClick={guardarPregunta}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        {editandoId ? 'Actualizar' : 'Guardar'}
      </button>

      {preguntas.length > 0 && (
        <div>
          <h3 className="text-md font-semibold mb-2">Preguntas registradas:</h3>
          {preguntas.map((pregunta) => (
            <div
              key={pregunta._id}
              className="flex justify-between items-center p-2 border rounded mb-2"
            >
              <span>{pregunta.texto}</span>
              <div className="space-x-2">
                <button onClick={() => editarPregunta(pregunta)} className="text-blue-600 text-sm">
                  Editar
                </button>
                <button onClick={() => eliminarPregunta(pregunta._id)} className="text-red-600 text-sm">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );


};







export default AdminPanelCrearPregunta;