import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { Proyecto } from '../models/project.js';

dotenv.config();



const ai = new GoogleGenAI({});

const getAnalytics = async (req, res) => {
    const proyectos = await Proyecto.findAll({ attributes: ["descripcion"] });
    if (proyectos.length === 0) {
        return res.status(404).json({ message: "No hay proyectos registrados." });
    }

    const texto = proyectos.map(p => p.descripcion).join("\n");

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `
      Genera un resumen general de las siguientes descripciones de proyectos.
      Resalta los temas comunes y los estados de progreso.

      Descripciones:
      ${texto}
    `,
        });
        res.status(200).json({ analysis: response.candidates[0].content.parts[0].text });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los análisis', details: error.message });
    }
}

const dataGraph = async (req, res) => {
    try {
        const proyectos = await Proyecto.findAll({ attributes: ["estado"] });
    if (proyectos.length === 0) {
        return res.status(404).json({ message: "No hay proyectos registrados." });
    }
    const estadosCount = proyectos.reduce((acc, proyecto) => {
        acc[proyecto.estado] = (acc[proyecto.estado] || 0) + 1;
        return acc;
    }, {});

    res.status(200).json(estadosCount);
    }catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos para gráficos', details: error.message });
    }
}

export { getAnalytics, dataGraph };
