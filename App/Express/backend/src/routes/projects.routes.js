import { Router } from 'express';
const router = Router();

import projectsController from '../controllers/projects.controller.js';

/**
 * @swagger
 * tags:
 *   name: Proyectos
 *   description: Endpoints para la gestión de proyectos
 */

/**
 * @swagger
 * /proyectos:
 *   get:
 *     summary: Obtener todos los proyectos
 *     tags: [Proyectos]
 *     responses:
 *       200:
 *         description: Lista de proyectos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: Sistema de gestión
 *                   descripcion:
 *                     type: string
 *                     example: Proyecto para automatizar procesos
 *                   estado:
 *                     type: string
 *                     example: en proceso
 *                   fecha_inicio:
 *                     type: string
 *                     format: date
 *                     example: 2025-09-15
 *                   fecha_fin:
 *                     type: string
 *                     format: date
 *                     example: 2025-12-31
 *       500:
 *         description: Error al obtener los proyectos
 */
router.get('/proyectos', projectsController.getAllProjects);

/**
 * @swagger
 * /proyectos:
 *   post:
 *     summary: Crear un nuevo proyecto
 *     tags: [Proyectos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - estado
 *               - fecha_inicio
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Proyecto IA
 *               descripcion:
 *                 type: string
 *                 example: Proyecto para analizar datos con IA
 *               estado:
 *                 type: string
 *                 example: en proceso
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *                 example: 2025-10-19
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *                 example: 2025-12-31
 *     responses:
 *       201:
 *         description: Proyecto creado correctamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post('/proyectos', projectsController.createProject);

/**
 * @swagger
 * /proyectos/{id}:
 *   put:
 *     summary: Actualizar un proyecto por ID
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proyecto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               estado:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Proyecto actualizado correctamente
 *       404:
 *         description: Proyecto no encontrado
 */
router.put('/proyectos/:id', projectsController.updateProject);

/**
 * @swagger
 * /proyectos/{id}:
 *   delete:
 *     summary: Eliminar un proyecto por ID
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Proyecto eliminado correctamente
 *       404:
 *         description: Proyecto no encontrado
 */
router.delete('/proyectos/:id', projectsController.deleteProject);

export default router;
