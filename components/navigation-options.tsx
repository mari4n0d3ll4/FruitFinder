"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MapPin, Navigation } from "lucide-react"
import { generateWazeLink, isWazeInstalled } from "@/lib/waze-utils"

interface NavigationOptionsProps {
  location: { lat: number; lng: number }
  name?: string
}

export function NavigationOptions({ location, name }: NavigationOptionsProps) {
  const [hasWaze, setHasWaze] = useState(false)

  useEffect(() => {
    // Check if Waze is likely installed
    isWazeInstalled().then((installed) => {
      setHasWaze(installed)
    })
  }, [])

  // Generate navigation links
  const wazeLink = generateWazeLink(location.lat, location.lng, name)
  const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}&travelmode=driving`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <Navigation className="h-4 w-4 mr-1" />
          Navigate
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {hasWaze && (
          <DropdownMenuItem asChild>
            <a href={wazeLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img src="/waze-icon.svg" alt="Waze" className="h-4 w-4 mr-2" />
              Navigate with Waze
            </a>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            Google Maps Directions
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

