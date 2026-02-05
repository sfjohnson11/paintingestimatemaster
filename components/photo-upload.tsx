"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface PhotoUploadProps {
  onPhotosChange: (photos: string[]) => void
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotosChange }) => {
  const [photos, setPhotos] = useState<string[]>([])

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newPhotos = Array.from(files).map((file) => URL.createObjectURL(file))
      const updatedPhotos = [...photos, ...newPhotos]
      setPhotos(updatedPhotos)
      onPhotosChange(updatedPhotos)
    }
  }

  const removePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index)
    setPhotos(updatedPhotos)
    onPhotosChange(updatedPhotos)
  }

  return (
    <div className="space-y-4">
      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handlePhotoUpload}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative">
            <img
              src={photo || "/placeholder.svg"}
              alt={`Uploaded photo ${index + 1}`}
              className="w-full h-32 object-cover rounded"
            />
            <Button
              onClick={() => removePhoto(index)}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
            >
              <X size={16} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PhotoUpload
