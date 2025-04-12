"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FruitGalleryProps {
  className?: string
}

export function FruitGallery({ className = "" }: FruitGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const fruits = [
    {
      name: "Lemon",
      image: "/placeholder.svg?height=300&width=300&text=Lemon",
      color: "bg-yellow-400",
      textColor: "text-yellow-800",
      description: "Tart and juicy, perfect for drinks and cooking",
    },
    {
      name: "Fig",
      image: "/placeholder.svg?height=300&width=300&text=Fig",
      color: "bg-purple-400",
      textColor: "text-purple-800",
      description: "Sweet and soft with a unique texture",
    },
    {
      name: "Mulberry",
      image: "/placeholder.svg?height=300&width=300&text=Mulberry",
      color: "bg-purple-600",
      textColor: "text-purple-50",
      description: "Juicy berries with a balance of sweetness and tartness",
    },
    {
      name: "Avocado",
      image: "/placeholder.svg?height=300&width=300&text=Avocado",
      color: "bg-green-600",
      textColor: "text-green-50",
      description: "Creamy and nutritious, perfect for many dishes",
    },
    {
      name: "Orange",
      image: "/placeholder.svg?height=300&width=300&text=Orange",
      color: "bg-orange-400",
      textColor: "text-orange-800",
      description: "Sweet and tangy, packed with vitamin C",
    },
  ]

  const nextSlide = () => {
    setActiveIndex((current) => (current === fruits.length - 1 ? 0 : current + 1))
  }

  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? fruits.length - 1 : current - 1))
  }

  return (
    <div className={`relative overflow-hidden rounded-xl border-4 border-white shadow-xl ${className}`}>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {fruits.map((fruit, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <div className="relative aspect-square">
              <img src={fruit.image || "/placeholder.svg"} alt={fruit.name} className="w-full h-full object-cover" />
              <div className={`absolute bottom-0 left-0 right-0 ${fruit.color} p-4`}>
                <h3 className={`text-xl font-bold ${fruit.textColor}`}>{fruit.name}</h3>
                <p className={`text-sm ${fruit.textColor}`}>{fruit.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-white rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-white rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-1">
        {fruits.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === activeIndex ? "bg-white" : "bg-white/50"}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

