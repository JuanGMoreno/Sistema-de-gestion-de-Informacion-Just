import {Proyecto} from '../models/project.js';


const getAllProjects = async (req, res) => {
    try {
        const projects = await Proyecto.findAll();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la lista de proyectos', details: error.message });
    }
};

const createProject = async (req, res) => {
    try {
        const { nombre, descripcion, estado, fecha_inicio, fecha_fin } = req.body;
        
        const project = await Proyecto.create({
            nombre,
            descripcion,
            estado,
            fecha_inicio,
            fecha_fin
        });

        res.status(201).json({ message: 'Proyecto creado exitosamente', project });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el proyecto', details: error.message });
    }
};

const updateProject = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, estado, fecha_inicio, fecha_fin } = req.body;
    try {
        const project = await Proyecto.findByPk(id);
        if (!project) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }else {
            project.nombre = nombre;
            project.descripcion = descripcion;
            project.estado = estado;
            project.fecha_inicio = fecha_inicio;
            project.fecha_fin = fecha_fin;
            await project.save();
            res.status(200).json({ message: 'Proyecto actualizado exitosamente', project });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el proyecto', details: error.message });
    }
};

const deleteProject = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        await Proyecto.destroy({ where: { id } });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el proyecto', details: error.message });
    }
};

export default {
    getAllProjects,
    createProject,
    updateProject,
    deleteProject
}; 