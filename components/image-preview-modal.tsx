import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ImagePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
}

export function ImagePreviewModal({ isOpen, onClose, imageSrc }: ImagePreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0">
        <img src={imageSrc} alt="Preview" className="w-full h-auto" />
      </DialogContent>
    </Dialog>
  )
}

