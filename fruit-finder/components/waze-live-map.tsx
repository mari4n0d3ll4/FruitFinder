"use client"

import { useEffect, useRef } from "react"

interface WazeLiveMapProps {
  lat: number
  lng: number
  zoom?: number
}

export function WazeLiveMap({ lat, lng, zoom = 15 }: WazeLiveMapProps) {
  const mapRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Resize handler to make the map responsive
    const handleResize = () => {
      if (mapRef.current) {
        const width = mapRef.current.parentElement?.clientWidth || 400
        mapRef.current.style.height = `${width * 0.75}px`
      }
    }

    // Initial sizing
    handleResize()

    // Add resize listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Construct the Waze Live Map URL
  const wazeMapUrl = `https://embed.waze.com/iframe?zoom=${zoom}&lat=${lat}&lon=${lng}&pin=1`

  return (
    <div className="w-full rounded-md overflow-hidden border">
      <iframe
        ref={mapRef}
        src={wazeMapUrl}
        width="100%"
        height="300"
        allowFullScreen
        loading="lazy"
        title="Waze Live Map"
      ></iframe>
    </div>
  )
}

