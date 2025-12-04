import { useState, useEffect } from "react"
import { Box, Button, Stack, Text } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import ProjectCard from "./ProjectCard"
import type { Project } from "@/models/project"
import { Toaster, toaster } from "@/components/ui/toaster"
import ProjectCreateModal from "./ProjectCreateModal"



function ProjectList() {
    const [projects, setProjects] = useState<Project[]>([])
    const buttonEditColorBg = useColorModeValue("blue.500", "blue.700")
    const buttonEditHoverBg = useColorModeValue("blue.600", "blue.600")

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:3000/proyectos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log(response)
            const data = await response.json()
            console.log(data)
            setProjects(data)
        } catch (error) {
            console.error('Error fetching project data:', error)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:3000/proyectos/${id}`, {
                method: 'DELETE',
            })
            if (!res.ok) {
                const text = await res.text()
                throw new Error(text || 'Error al eliminar el proyecto')
            }
            toaster.create({
                description: "El proyecto ha sido eliminado.",
                type: "info",
                closable: true,
                duration: 3000,

            })
            setProjects(prev => prev.filter(p => p.id !== id))
        } catch (err) {
            console.error('Error deleting project:', err)
        }
    }

    const handleEdit = async (id: number, data: Partial<Project>) => {
        try {
            const res = await fetch(`http://localhost:3000/proyectos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            if (!res.ok) {
                const text = await res.text()
                throw new Error(text || 'Error al editar el proyecto')
            }
            toaster.create({
                description: "El proyecto ha sido actualizado.",
                type: "info",
                closable: true,
                duration: 3000,

            })
            setProjects(prev => prev.map(p => p.id === id ? { ...p, ...data } : p))
        } catch (err) {
            console.error('Error editing project:', err)
        }
    }

    const handleCreate = async (data: Partial<Project>) => {
        try {
            const res = await fetch(`http://localhost:3000/proyectos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            if (!res.ok) {
                const text = await res.text()
                throw new Error(text || 'Error al crear el proyecto')
            }
            toaster.create({
                description: "El proyecto ha sido creado.",
                type: "info",
                closable: true,
                duration: 3000,

            })
            getData()
        } catch (err) {
            console.error('Error creating project:', err)
        }
    }

    return (
        <Box padding={{ base: "0.5rem", md: "1rem" }} margin={{ base: "0.5rem", md: "1rem" }}>
            <Box 
                display="flex" 
                justifyContent="space-between" 
                alignItems={{ base: "flex-start", sm: "center" }}
                flexDirection={{ base: "column", sm: "row" }}
                gap={{ base: "3", sm: "0" }}
                marginBottom={{ base: "1.5rem", md: "2rem" }}
            >
                <Text 
                    fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} 
                    fontWeight="bold"
                >
                    Lista de Proyectos
                </Text>
                <ProjectCreateModal
                    cancelLabel="Cancelar"
                    title="Crear proyecto"
                    trigger={
                        <Button 
                            bg={buttonEditColorBg}
                            _hover={{ bg: buttonEditHoverBg }}
                            color="white"
                            size={{ base: "sm", md: "md" }}
                            width={{ base: "100%", sm: "auto" }}
                        >
                            Crear Proyecto
                        </Button>
                    }
                    onConfirm={handleCreate}
                />
            </Box>

            <Stack 
                gap={{ base: "4", md: "5" }} 
                direction={{ base: "column", md: "row" }} 
                wrap="wrap" 
                justify="center"
            >
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.id ?? index}
                        id={project.id}
                        nombre={project.nombre}
                        descripcion={project.descripcion}
                        estado={project.estado}
                        fecha_inicio={project.fecha_inicio}
                        fecha_fin={project.fecha_fin}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </Stack>
            <Toaster />
        </Box>
    )
}

export default ProjectList