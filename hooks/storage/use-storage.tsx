import {
  uploadImage as uploadImageService,
  deleteImage as deleteImageService,
} from "@/lib/supabase/storage/upload-client"
import { useState } from "react"

export default function useStorage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const uploadImage = async (
    file: File,
    callback: ((arg0: string) => void) | null,
  ) => {
    setIsLoading(true)
    const { imageUrl, error } = await uploadImageService({
      file: file,
    })
    setIsLoading(false)

    if (error) {
      console.error(error)
      return
    }

    callback?.(imageUrl)
  }

  const deleteImage = async (imageUrl: string) => {
    setIsDeleting(true)
    await deleteImageService(imageUrl)
    setIsDeleting(false)
  }

  return { uploadImage, deleteImage, isLoading, isDeleting }
}
