import { Router } from 'express';
const router = Router();

import { getAnalytics, dataGraph } from '../controllers/analytics.controller.js';

/**
 * @swagger
 * tags:
 *   name: Análisis
 *   description: Endpoints relacionados con el análisis y visualización de proyectos
 */

/**
 * @swagger
 * /analisis:
 *   get:
 *     summary: Generar un resumen de las descripciones de los proyectos
 *     description: Usa una API de IA generativa (como Gemini) para resumir las descripciones de todos los proyectos almacenados.
 *     tags: [Análisis]
 *     responses:
 *       200:
 *         description: Resumen generado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resumen:
 *                   type: string
 *                   example: "La mayoría de los proyectos están enfocados en automatización y análisis de datos, con un enfoque en mejorar la eficiencia operativa."
 *       404:
 *         description: No hay proyectos registrados
 *       500:
 *         description: Error al generar el análisis
 */
router.get('/analisis', getAnalytics);

/**
 * @swagger
 * /graficos:
 *   get:
 *     summary: Obtener datos estadísticos de los proyectos
 *     description: Devuelve datos numéricos para construir gráficos (por ejemplo, cantidad de proyectos por estado).
 *     tags: [Análisis]
 *     responses:
 *       200:
 *         description: Datos de gráficos obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 en_proceso:
 *                   type: integer
 *                   example: 5
 *                 finalizado:
 *                   type: integer
 *                   example: 3
 *       500:
 *         description: Error al obtener los datos de los gráficos
 */
router.get('/graficos', dataGraph);

export default router;
