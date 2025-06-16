import React, { useEffect, useState } from 'react';
import axios from 'axios';

//const AdminOpcionesRespuesta = () => {
const AdminPanelCrearRespuesta = () => {


    const [preguntas, setPreguntas] = useState([]);
    const [preguntaId, setPreguntaId] = useState('');
    const [texto, setTexto] = useState('');
    const [valor, setValor] = useState('');
    const [opciones, setOpciones] = useState([]);

    useEffect(() => {
        // Obtener todas las preguntas
        axios.get('http://localhost:4000/api/preguntas').then((res) => {
            setPreguntas(res.data);
        });
    }, []);

    useEffect(() => {
        if (preguntaId) {
            axios
                .get(`http://localhost:4000/api/opciones/porPregunta/${preguntaId}`)
                .then((res) => setOpciones(res.data));
        } else {
            setOpciones([]);
        }
    }, [preguntaId]);

    const guardarOpcion = async () => {
        if (!texto || !valor || !preguntaId) return alert('Completa todos los campos');

        await axios.post('http://localhost:4000/api/opciones', {
            texto,
            valor: Number(valor),
            pregunta: preguntaId,
        });

        setTexto('');
        setValor('');
        const res = await axios.get(`http://localhost:4000/api/opciones/porPregunta/${preguntaId}`);
        setOpciones(res.data);
    };

    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold mb-4">Crear Opciones de Respuesta</h2>

            <select
                className="w-full border p-2 rounded mb-3"
                value={preguntaId}
                onChange={(e) => setPreguntaId(e.target.value)}
            >
                <option value="">Seleccione una pregunta</option>
                {preguntas.map((p) => (
                    <option key={p._id} value={p._id}>
                        {p.texto}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Texto de la opción (Ej: Muy de acuerdo)"
                className="w-full border p-2 rounded mb-2"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
            />

            <input
                type="number"
                placeholder="Valor (Ej: 4)"
                className="w-full border p-2 rounded mb-4"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
            />

            <button
                onClick={guardarOpcion}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
            >
                Guardar Opción
            </button>

            <h3 className="text-md font-semibold mb-2">Opciones Registradas:</h3>
            {opciones.map((o) => (
                <div key={o._id} className="flex justify-between p-2 border rounded mb-2">
                    <span>{o.texto} — Valor: {o.valor}</span>
                </div>
            ))}
        </div>
    );
};

export default AdminPanelCrearRespuesta;
