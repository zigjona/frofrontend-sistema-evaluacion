import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import GraficoPorPregunta from './GraficoPorPregunta';
import GraficoPastelPromedios from './GraficoPastelPromedios';



export default function FormularioJerarquico() {
    //Estados que alamacenan datos traidos desde el backend(MOngo DB)
    const [facultadId, setFacultadId] = useState('');//String del Id de facultades(almacena una facultad)
    const [facultades, setFacultades] = useState([]);//(Array)Lista completa de facultades traidas del backend(almacena muchas facultades)
    //Crea una variable de estado llamada programasFiltrados que inicialmente es un array vacío ([]).
    //Crea una función setProgramasFiltrados que se usa para actualizar ese estado.
    const [programasFiltrados, setProgramasFiltrados] = useState([]);
    const [criterios, setCriterios] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    //Agrega estados nuevos para controlar los filtros:
    const [criteriosFiltrados, setCriteriosFiltrados] = useState([]);
    const [criterioId, setCriterioId] = useState('');


    const [indicadores, setIndicadores] = useState([]);
    const [indicadoresFiltrados, setIndicadoresFiltrados] = useState([]);
    const [indicadorId, setIndicadorId] = useState('');
    const [respuestasPorPregunta, setRespuestasPorPregunta] = useState({});//Crea un estado para almacenar las respuestas de cada pregunta 
    const [texto, setTexto] = useState('');
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState({});


    //par aguardar la respuesta
    // Fragmento modificado del componente React para guardar respuestas con console.log
    const guardarRespuestas = async () => {
        if (!indicadorId) {
            alert("Debes seleccionar un indicador antes de guardar respuestas.");
            return;
        }

        const respuestasArray = Object.entries(respuestas).map(([preguntaId, datos]) => ({
            indicador: indicadorId,
            pregunta: preguntaId,
            valor: datos.valor || null,
            texto: datos.texto || null,
            porcentaje: datos.porcentaje || null,
            fecha: new Date().toISOString()
        }));

        try {
            const res = await axios.post("http://localhost:4000/api/respuestas/multiples", {
                respuestas: respuestasArray
            });

            if (res.status === 201) {
                alert("✅ Todas las respuestas se guardaron correctamente.");
                setRespuestas({}); // Limpiar después de guardar si deseas
            } else {
                alert("⚠️ Ocurrió un problema al guardar las respuestas.");
            }
        } catch (error) {
            console.error("❌ Error al guardar respuestas agrupadas:", error);
            alert("Error al guardar respuestas agrupadas.");
        }
    };





    useEffect(() => {
        //Dentro del useEffect se hacen llamadas HTTP con Axios para llenar los estados con datos reales desde 
        // rutas como /api/facultades, /api/programas, etc.
        axios.get('http://localhost:4000/api/facultades').then((res) => {
            setFacultades(res.data);
        });
        axios.get('http://localhost:4000/api/criterios').then((res) => {
            setCriterios(res.data);
        });


        axios.get('http://localhost:4000/api/indicadores?subcriterioId=...')

        axios.get('http://localhost:4000/api/usuarios').then((res) => {
            setUsuarios(res.data);
        });
    }, []);

    ////Filtra criterio cuando cambia la facultad:
    useEffect(() => {
        if (facultadId) {
            axios
                .get(`http://localhost:4000/api/criterios/porFacultad/${facultadId}`)
                .then((res) => {
                    setCriteriosFiltrados(res.data);
                    console.log('Criterios filtrados por facultad:', res.data);
                });
        } else {
            setCriteriosFiltrados([]);//
        }
    }, [facultadId]);

    //Filtra indicadores cuando cambia el criterio:
    useEffect(() => {
        const obtenerIndicadores = async () => {
            if (!criterioId) {
                setIndicadoresFiltrados([]);
                return;
            }

            try {
                const res = await axios.get(`http://localhost:4000/api/indicadores?criterioId=${criterioId}`);
                setIndicadoresFiltrados(res.data);
            } catch (error) {
                console.error('Error al obtener indicadores por criterio:', error);
            }
        };

        obtenerIndicadores();
    }, [criterioId]);


    //Para mostar la pregunta que ingresa el administrador en su panel correspondiente

    useEffect(() => {
        if (indicadorId) {
            axios
                .get(`http://localhost:4000/api/preguntas/porIndicador/${indicadorId}`)
                .then((res) => setPreguntas(res.data))
                .catch((err) => {
                    console.error('Error al cargar preguntas:', err);
                    setPreguntas([]);
                });
        } else {
            setPreguntas([]);
        }
    }, [indicadorId]);


    //Para guardar la pregunta que ingresa el administrador
    const guardarPregunta = async () => {
        if (!texto || !indicadorId) {
            alert("Debes ingresar la pregunta y seleccionar un indicador.");
            return;
        }

        await axios.post('http://localhost:4000/api/preguntas', {
            texto,
            indicador: indicadorId,
        });

        alert('Pregunta guardada');
        setTexto('');
    };
    //Para guaradra la respuesta

    const enviarRespuesta = async () => {
        if (!indicadorId || !respuesta) {
            return alert('Seleccione un indicador y una respuesta');
        }

        await fetch('http://localhost:4000/api/respuestas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ indicador: indicadorId, valor: respuesta }),
        });

        alert('Respuesta guardada');
    };

    return (
        <div className="flex w-full min-h-screen gap-6 px-6 mt-10">
            <Helmet>
                <title>Sistema de Evaluación Académica</title>
            </Helmet>

            {/* Panel izquierdo: Formulario principal */}
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-3/4">
                <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">
                    Sistema de Evaluación Académica
                </h1>

                {/* Aquí va TODO el formulario */}
                {/* Conserva aquí tu <div className="bg-white rounded-lg shadow p-6"> y su contenido tal como ya lo tienes */}
                {/* Aquí va TODO el formulario */}
                <div className="bg-white rounded-lg shadow p-6">
                    {/* Sección Jerárquica */}
                    {/* (todo tu formulario va aquí como ya lo tienes) */}
                    {/* Copia todo el formulario desde <div className="mb-6"> hasta el último </div> */}
                    {/* OMITIDO aquí para no duplicarlo, pero debes dejarlo como está */}
                    {/* Sección Jerárquica */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-4">Selección Jerárquica</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Selección de Facultad */}
                            <select
                                value={facultadId}
                                onChange={(e) => {
                                    setFacultadId(e.target.value);
                                    console.log('Facultad seleccionada:', e.target.value);
                                }}
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Seleccione un criterio</option>
                                {facultades.map((f) => (
                                    <option key={f._id} value={f._id}>
                                        {f.nombre}
                                    </option>
                                ))}
                            </select>



                            {/* Criterio */}
                            <select className="border p-2 rounded w-full" value={criterioId}
                                onChange={(e) => setCriterioId(e.target.value)} disabled={!facultadId}>
                                <option value="">Seleccione un indicador</option>
                                {criteriosFiltrados.map((c) => (
                                    <option key={c._id} value={c._id}>{c.nombre}</option>
                                ))}
                            </select>



                            {/* Indicador */}
                            <select className="border p-2 rounded w-full" value={indicadorId}
                                onChange={(e) => setIndicadorId(e.target.value)} disabled={!criterioId}>
                                <option value="">Seleccione una fuente de informacion</option>
                                {indicadoresFiltrados.map((i) => (
                                    <option key={i._id} value={i._id}>{i.nombre}</option>
                                ))}
                            </select>



                        </div>
                    </div>

                    {/* Evaluación del Elemento */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-4">Evaluación del Elemento</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/*Para evaluar el elemento deacuerdo a los niveles de satisfaccion*/}
                            <div>
                                <label className="block mb-1 text-sm font-medium">
                                    Línea Base (Satisfacción)
                                </label>
                                <input type="range" className="w-full" />
                            </div>



                            {/*hasta aqui para evaluar el elemento deacuerdo a los niveles de satisfaccion */}
                            {/*Encuesta por  indicador(indicador en el codigo)(en la logica del usuario es por fuente de informacion)------------------------------------------------------------- */}
                            <div className="md:col-span-2">

                                {indicadorId && (
                                    <div className="mt-4">
                                        <h2 className="text-md font-semibold mb-4">Preguntas asociadas a fuente de información</h2>

                                        {preguntas.length > 0 ? (
                                            preguntas.map((pregunta, index) => (
                                                <div key={index} className="mb-6 border p-4 rounded bg-gray-50">
                                                    <p className="font-medium mb-2">{pregunta.texto}</p>
                                                    {/* Campo de respuesta manual */}
                                                    {/* Antes de cada div se tiene unas condiciones para que al usuario le aparesca la opcion que ell administrador le asigna*/}
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        {/* Texto */}
                                                        {pregunta.tipoRespuesta === 'texto' && (
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Respuesta (Texto)</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Ingrese observación o análisis"
                                                                    className="border p-2 rounded w-full"
                                                                    value={respuestas[pregunta._id]?.texto || ''}
                                                                    onChange={(e) =>
                                                                        setRespuestas((prev) => {
                                                                            const actual = prev[pregunta._id] || {};
                                                                            return {
                                                                                ...prev,
                                                                                [pregunta._id]: {
                                                                                    ...actual,
                                                                                    texto: e.target.value,
                                                                                },
                                                                            };
                                                                        })
                                                                    }
                                                                />

                                                            </div>
                                                        )}

                                                        {/* Valor numérico */}
                                                        {pregunta.tipoRespuesta === 'numero' && (
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Valor (número)</label>
                                                                <input
                                                                    type="number"
                                                                    className="border p-2 rounded w-full"
                                                                    value={respuestas[pregunta._id]?.valor || ''}
                                                                    onChange={(e) =>
                                                                        setRespuestas((prev) => {
                                                                            const actual = prev[pregunta._id] || {};
                                                                            return {
                                                                                ...prev,
                                                                                [pregunta._id]: {
                                                                                    ...actual,
                                                                                    valor: parseFloat(e.target.value),
                                                                                },
                                                                            };
                                                                        })
                                                                    }
                                                                />

                                                            </div>
                                                        )}

                                                        {/* Porcentaje */}
                                                        {pregunta.tipoRespuesta === 'porcentaje' && (
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Porcentaje (%)</label>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    max={100}
                                                                    className="border p-2 rounded w-full"
                                                                    value={respuestas[pregunta._id]?.porcentaje || ''}
                                                                    onChange={(e) =>
                                                                        setRespuestas((prev) => {
                                                                            const actual = prev[pregunta._id] || {};
                                                                            return {
                                                                                ...prev,
                                                                                [pregunta._id]: {
                                                                                    ...actual,
                                                                                    porcentaje: parseFloat(e.target.value),
                                                                                },
                                                                            };
                                                                        })
                                                                    }
                                                                />

                                                            </div>
                                                        )}
                                                        {/*<GraficoPorPregunta preguntaId={pregunta._id} tipo={pregunta.tipoRespuesta} />*/}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 italic">No hay preguntas registradas para este indicador.</p>
                                        )}
                                    </div>
                                )}
                                {/**Para hacer una impresion en linea */}
                                <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                                    {JSON.stringify(respuestas, null, 2)}
                                </pre>

                                <button
                                    onClick={guardarRespuestas}
                                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Guardar todas las respuestas
                                </button>

                            </div>



                            {/*----------*/}
                            <div className="md:col-span-2 ...">
                                <label className="block mb-1 text-sm font-medium">Objetivo Táctico</label>
                                <input type="text" className="border p-2 rounded w-full" />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Actividad</label>
                                <select className="border p-2 rounded w-full">
                                    <option>Seleccione una opción</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Presupuesto</label>
                                <input type="number" className="border p-2 rounded w-full" />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Fecha de Inicio</label>
                                <input type="date" className="border p-2 rounded w-full" />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Fecha de Fin</label>
                                <input type="date" className="border p-2 rounded w-full" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block mb-1 text-sm font-medium">Responsable</label>
                                <input type="text" className="border p-2 rounded w-full" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block mb-1 text-sm font-medium">Fuente de Información</label>
                                <textarea className="border p-2 rounded w-full" rows="3"></textarea>
                            </div>


                        </div>
                    </div>

                </div>


            </div>

            {/* Panel derecho: adicional */}
            <div className="w-2/5 bg-white shadow-md rounded p-4">
                <h2 className="text-lg font-bold mb-4 text-center text-gray-800">
                    Panel Derecho
                </h2>
                <div className="text-sm text-gray-600">
                    Aquí puedes mostrar:
                    <ul className="list-disc list-inside mt-2">
                        <li>Estadísticas</li>
                        <li>Resumen de selección</li>
                        <li>Indicadores activos</li>
                        <li>Notas rápidas</li>
                    </ul>
                    {/**Aqui va el grafico */}

                    {preguntas
                        .filter((pregunta) => pregunta.tipoRespuesta !== 'texto')
                        .map((pregunta) => (
                            <div key={pregunta._id} className="mb-6 border p-4 rounded bg-gray-50">
                                <p className="font-medium mb-2">{pregunta.texto}</p>

                                <GraficoPorPregunta
                                    preguntaId={pregunta._id}
                                    tipo={pregunta.tipoRespuesta}
                                />
                            </div>
                        ))}

                    <GraficoPastelPromedios />


                </div>
            </div>
        </div>
    );
}
