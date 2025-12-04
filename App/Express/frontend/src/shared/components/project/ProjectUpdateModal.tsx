import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { useState } from "react"
import ProjectForm, { type FormValues } from "./ProjectForm"
import type { Project } from "../../../models/project"

export type DeleteProjectModalProps = {
  trigger?: React.ReactNode
  onConfirm: (data: FormValues) => Promise<void> | void
  defaultValues?: Partial<Project>
  textButton?: string
  title?: string
  confirmLabel?: string
  cancelLabel?: string
}

const ProjectUpdateModal = ({
  trigger,
  onConfirm,
  defaultValues,
  textButton,
  title,
  cancelLabel ,
}: DeleteProjectModalProps) => {
  const [open, setOpen] = useState(false)

  const handleConfirm = async (data: FormValues) => {
    try {
      
      await onConfirm(data)
      setOpen(false)
  } catch (error) {
      console.error("Error updating project:", error)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} size={{ mdDown: "full", md: "lg" }}>
      <Dialog.Trigger asChild>
        {trigger ?? (
          <Button variant="outline" size="sm" colorPalette="red">
            {textButton}
          </Button>
        )}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body display={"flex"} flexDirection="column" gap="4" justifyContent={"end"}>
                <ProjectForm formId="project-update-form" defaultValues={defaultValues} onSubmit={handleConfirm} />
                <Dialog.ActionTrigger asChild>
                <Button variant="outline">{cancelLabel}</Button>
              </Dialog.ActionTrigger>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default ProjectUpdateModal
