"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface PhotoGalleryProps {
  photos: {
    src: string
    alt: string
    caption?: string
  }[]
  className?: string
}

export function PhotoGallery({ photos, className = "" }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  return (
    <>
      <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg border-2 border-pink-200 cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedPhoto(index)}
          >
            <div className="aspect-square">
              <img src={photo.src || "/placeholder.svg"} alt={photo.alt} className="w-full h-full object-cover" />
            </div>
            {photo.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-white/80 p-2 text-xs text-center">
                {photo.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={selectedPhoto !== null} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-transparent border-none">
          {selectedPhoto !== null && (
            <div className="relative">
              <img
                src={photos[selectedPhoto].src || "/placeholder.svg"}
                alt={photos[selectedPhoto].alt}
                className="w-full rounded-lg border-4 border-white shadow-xl"
              />
              {photos[selectedPhoto].caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white text-center rounded-b-lg">
                  {photos[selectedPhoto].caption}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

