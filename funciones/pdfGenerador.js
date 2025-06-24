//Para guaradra la respuesta con el responsable + pdf

import jsPDF from "jspdf";
import Swal from "sweetalert2";
import axios from "axios";
//import escudo from "../assets/escudo.png"; // Ajusta la ruta según tu proyecto

export const guardarYDescargarPDF = async ({
    indicadorId,
    criterioId,
    facultadId,
    respuestas,
    responsable,
    indicadoresFiltrados,
    criteriosFiltrados,
    facultades,
    preguntas,
    setRespuestas,
    setActualizarGraficas
}) => {
    if (!indicadorId) {
        Swal.fire('⚠️ Faltan datos', 'Debes seleccionar un indicador', 'warning');
        return;
    }

    if (!responsable) {
        Swal.fire('⚠️ Sin responsable', 'Inicia sesión de nuevo para obtener el nombre del responsable', 'warning');
        return;
    }

    const fechaActual = new Date().toISOString();

    const respuestasArray = Object.entries(respuestas).map(([preguntaId, datos]) => ({
        indicador: indicadorId,
        pregunta: preguntaId,
        valor: datos.valor || null,
        texto: datos.texto || null,
        porcentaje: datos.porcentaje || null,
        fecha: fechaActual,
        responsable: responsable
    }));

    if (respuestasArray.length === 0) {
        Swal.fire('⚠️ Sin respuestas', 'Debes llenar al menos una respuesta', 'info');
        return;
    }

    try {
        Swal.fire({
            title: 'Guardando...',
            text: 'Por favor espera',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        const res = await axios.post("https://backend-sistema-evaluacion.onrender.com/api/respuestas/multiples", {
            respuestas: respuestasArray
        });

        if (res.status === 201) {
            const indicadorNombre = indicadoresFiltrados.find((i) => i._id === indicadorId)?.nombre || 'N/A';
            const criterioNombre = criteriosFiltrados.find((c) => c._id === criterioId)?.nombre || 'N/A';
            const facultadNombre = facultades.find((f) => f._id === facultadId)?.nombre || 'N/A';

            const doc = new jsPDF();


            const escudoIzquierdo = await getImageBase64(`${window.location.origin}/Imagen1.png`);
            const escudoDerecho = await getImageBase64(`${window.location.origin}/Imagen2.png`);



            // Agrega escudos
            doc.addImage(escudoIzquierdo, "PNG", 10, 10, 30, 30);     // Izquierda
            doc.addImage(escudoDerecho, "PNG", 170, 10, 30, 30);    // Derecha

            doc.setFontSize(12);
            doc.text(`Reporte de Respuestas`, 105, 50, null, null, 'center');
            doc.text(`Responsable: ${responsable}`, 10, 60);
            doc.text(`Fecha: ${new Date(fechaActual).toLocaleString()}`, 10, 70);
            doc.text(`Criterio: ${facultadNombre}`, 10, 80);
            doc.text(`Indicador: ${criterioNombre}`, 10, 90);
            doc.text(`Fuente de Información: ${indicadorNombre}`, 10, 100);

            let offset = 110;

            respuestasArray.forEach((r) => {
                const tieneTexto = r.texto?.trim();
                const tieneValor = typeof r.valor === 'number';
                const tienePorcentaje = typeof r.porcentaje === 'number';

                if (tieneTexto || tieneValor || tienePorcentaje) {
                    const preguntaTexto = preguntas.find((p) => p._id === r.pregunta)?.texto || 'Sin texto';

                    doc.text(`Pregunta: ${preguntaTexto}`, 10, offset);
                    if (tieneTexto) doc.text(`Texto: ${r.texto}`, 10, offset + 6);
                    if (tieneValor) doc.text(`Valor: ${r.valor}`, 10, offset + 12);
                    if (tienePorcentaje) doc.text(`%: ${r.porcentaje}`, 10, offset + 18);

                    offset += 30;
                }
            });

            doc.save(`respuestas-${responsable}-${Date.now()}.pdf`);

            Swal.fire('✅ Guardado', 'Respuestas guardadas y PDF descargado', 'success');
            setRespuestas({});
            setActualizarGraficas((prev) => !prev);
        }
    } catch (error) {
        console.error("❌ Error al guardar:", error);
        Swal.fire('❌ Error', 'Ocurrió un error al guardar las respuestas', 'error');
    }
};



// 👇 función base64 (colócala al final del archivo o al principio)
const getImageBase64 = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // necesario para producción (Vercel)
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL());
    };
    img.onerror = (err) => reject(err);
  });
};

