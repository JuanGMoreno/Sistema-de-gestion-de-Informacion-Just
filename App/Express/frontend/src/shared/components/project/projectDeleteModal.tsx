import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { useState } from "react"

export type DeleteProjectModalProps = {
  itemName?: string
  trigger?: React.ReactNode
  onConfirm: () => Promise<void> | void
  textButton?: string
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
}

const ProjectDeleteModal = ({
  itemName,
  trigger,
  onConfirm,
  textButton,
  title ,
  description ,
  confirmLabel ,
  cancelLabel ,
}: DeleteProjectModalProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    try {
      setLoading(true)
      await onConfirm()
      setOpen(false)
    } finally {
      setLoading(false)
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
            <Dialog.Body>
              <p>
                {description} {itemName ? `"${itemName}" ?` : null}
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">{cancelLabel}</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={handleConfirm} loading={loading} disabled={loading}>
                {confirmLabel}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default ProjectDeleteModal
