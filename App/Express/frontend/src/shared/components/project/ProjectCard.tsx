import { Box, Button, Card, Status } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import ProjectDeleteModal from "./projectDeleteModal"
import ProjectUpdateModal from "./ProjectUpdateModal"
import type { Project } from "@/models/project"

interface ProjectCardProps {
  id: number,
  nombre: string,
  descripcion: string,
  estado: string,
  fecha_inicio: string,
  fecha_fin: string,
  onDelete?: (id: number) => Promise<void> | void
  onEdit?: (id: number,data : Partial<Project>) => Promise<void> | void
}

const ProjectCard = ({ id, nombre, descripcion, estado, fecha_inicio, fecha_fin, onDelete, onEdit }: ProjectCardProps) => {
  const buttonDeleteColorBg = useColorModeValue("red.500", "red.700")
  const buttonDeleteHoverBg = useColorModeValue("red.600", "red.600")
  const buttonEditColorBg = useColorModeValue("blue.500", "blue.700")
  const buttonEditHoverBg = useColorModeValue("blue.600", "blue.600")


  const handleColorStatus = (status: string) => {
    switch (status) {
      case 'definido':
        return 'blue'
      case 'en proceso':
        return 'orange'
      case 'finalizado':
        return 'green'
      case 'bloqueo':
        return 'red'
      default:
        return 'gray'
    }
  }

   const DateHandler = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <Card.Root 
      width={{ base: "100%", sm: "340px", md: "380px", lg: "420px" }} 
      maxWidth="100%"
      animation="fade-in 0.5s" 
      margin={{ base: "0.5rem", md: "1rem" }}
    >
      <Card.Body gap="2">
        <Card.Title 
          mt="2" 
          fontSize={{ base: "lg", md: "xl" }}
        >
          {nombre}
        </Card.Title>
        <Card.Description 
          fontSize={{ base: "sm", md: "md" }}
          lineClamp={{ base: 3, md: 4 }}
        >
          {descripcion}
        </Card.Description>
        <Card.Description fontSize={{ base: "sm", md: "md" }}>
          <Box 
            as="span" 
            fontWeight="bold"
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            alignItems={{ base: "flex-start", sm: "center" }}
            gap={{ base: "1", sm: "0" }}
          >
            <Box>Estado:</Box>
            <Status.Root 
              colorPalette={handleColorStatus(estado)} 
              marginLeft={{ base: 0, sm: 3 }}
              size={{ base: "sm", md: "md" }}
            >
              <Status.Indicator />
              {estado}
            </Status.Root>
          </Box>
        </Card.Description>
        <Card.Description fontSize={{ base: "xs", md: "sm" }}>
          <Box as="span" fontWeight="semibold">Inicio:</Box> {DateHandler(fecha_inicio)}
        </Card.Description>
        <Card.Description fontSize={{ base: "xs", md: "sm" }}>
          <Box as="span" fontWeight="semibold">Fin:</Box> {DateHandler(fecha_fin)}
        </Card.Description>
      </Card.Body>
      <Card.Footer 
        justifyContent="flex-end"
        flexDirection={{ base: "column", sm: "row" }}
        gap={{ base: "2", sm: "3" }}
      >
        <ProjectUpdateModal
          trigger={
            <Button 
              variant="outline" 
              bg={buttonEditColorBg} 
              _hover={{ bg: buttonEditHoverBg }} 
              color="white"
              size={{ base: "sm", md: "md" }}
              width={{ base: "100%", sm: "auto" }}
            >
              editar
            </Button>
          }
          onConfirm={async (data) => {
            if (onEdit) await onEdit(id, data)
          }}
          defaultValues={{
            nombre,
            descripcion,
            estado,
            fecha_inicio,
            fecha_fin
          }}
          cancelLabel="Cancelar"
        />
        <ProjectDeleteModal
          itemName={nombre}
          textButton="Eliminar"
          title="Confirmar eliminación"
          description="Esta seguro que desea eliminar este elemento "
          confirmLabel="Eliminar"
          cancelLabel="Cancelar"
          onConfirm={async () => {
            if (onDelete) await onDelete(id)
          }}
          trigger={
            <Button 
              variant="outline" 
              bg={buttonDeleteColorBg} 
              _hover={{ bg: buttonDeleteHoverBg }} 
              color="white"
              size={{ base: "sm", md: "md" }}
              width={{ base: "100%", sm: "auto" }}
            >
              eliminar
            </Button>
          }
        />
      </Card.Footer>
    </Card.Root>
  )
}

export default ProjectCard
