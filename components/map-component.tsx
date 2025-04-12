"use client"

import { useEffect, useRef, useState } from "react"

interface MapComponentProps {
  userLocation?: { lat: number; lng: number; isDefault?: boolean } | null
  trees?: any[]
  onSelectTree?: (tree: any) => void
  selectable?: boolean
  onSelectLocation?: (location: { lat: number; lng: number }) => void
  selectedLocation?: { lat: number; lng: number } | null
  center?: { lat: number; lng: number }
  zoom?: number
}

export function MapComponent({
  userLocation,
  trees = [],
  onSelectTree,
  selectable = false,
  onSelectLocation,
  selectedLocation,
  center = { lat: -34.6037, lng: -58.3816 }, // Default to Buenos Aires
  zoom = 13,
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const userMarkerRef = useRef<any>(null)
  const selectedMarkerRef = useRef<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [leaflet, setLeaflet] = useState<any>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  // Dynamically load Leaflet
  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        const L = (await import("leaflet")).default
        setLeaflet(L)
      } catch (error) {
        console.error("Failed to load Leaflet:", error)
        setMapError("Failed to load map. Please refresh the page.")
      }
    }

    loadLeaflet()
  }, [])

  // Initialize map when Leaflet is loaded
  useEffect(() => {
    if (!leaflet || !mapRef.current || leafletMapRef.current) return

    try {
      // Create map
      const map = leaflet
        .map(mapRef.current, {
          zoomControl: false, // We'll add it in a different position
          attributionControl: false, // We'll add a custom one
          fadeAnimation: false, // Disable fade animations
          zoomAnimation: true,
          markerZoomAnimation: true,
          preferCanvas: true, // Better performance
        })
        .setView([center.lat, center.lng], zoom)

      // Add zoom control to the top-right
      leaflet.control
        .zoom({
          position: "topright",
        })
        .addTo(map)

      // Add custom attribution
      leaflet.control
        .attribution({
          position: "bottomright",
          prefix: "✨ Anime Style Map | ",
        })
        .addTo(map)
        .setPrefix("✨ Anime Style Map | ")

      // Add minimalistic map style - CartoDB Positron is perfect for this
      leaflet
        .tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        })
        .addTo(map)

      // Add anime-style overlay with reduced opacity
      const overlayDiv = document.createElement("div")
      overlayDiv.className = "anime-map-overlay"
      map.getContainer().appendChild(overlayDiv)

      // Add click handler for selectable maps
      if (selectable) {
        map.on("click", (e: any) => {
          if (onSelectLocation) {
            onSelectLocation({ lat: e.latlng.lat, lng: e.latlng.lng })
          }
        })
      }

      // Force a resize to ensure the map renders correctly
      setTimeout(() => {
        map.invalidateSize()
      }, 100)

      leafletMapRef.current = map
      setMapLoaded(true)

      return () => {
        if (leafletMapRef.current) {
          leafletMapRef.current.remove()
          leafletMapRef.current = null
        }
      }
    } catch (error) {
      console.error("Error initializing map:", error)
      setMapError("Failed to initialize map. Please refresh the page.")
    }
  }, [leaflet, center, zoom, selectable, onSelectLocation])

  // Handle user location marker
  useEffect(() => {
    if (!leaflet || !leafletMapRef.current || !userLocation) return

    try {
      // Remove existing user marker
      if (userMarkerRef.current) {
        userMarkerRef.current.remove()
        userMarkerRef.current = null
      }

      // Create user location marker
      const userIcon = leaflet.divIcon({
        html: `
          <div class="relative">
            <div class="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="w-4 h-4">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
              </svg>
            </div>
            <div class="w-12 h-12 bg-blue-500 rounded-full opacity-20 absolute -left-3 -top-3"></div>
          </div>
        `,
        className: "user-location-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      const marker = leaflet
        .marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(leafletMapRef.current)
        .bindTooltip(userLocation.isDefault ? "Default Location" : "Your Location", {
          direction: "top",
          offset: [0, -10],
          className: "bg-white px-2 py-1 rounded-md text-xs shadow-md border-2 border-blue-300",
        })

      userMarkerRef.current = marker

      // Center map on user location if not default
      if (!userLocation.isDefault) {
        leafletMapRef.current.setView([userLocation.lat, userLocation.lng], zoom)
      }
    } catch (error) {
      console.error("Error adding user marker:", error)
    }
  }, [leaflet, userLocation, zoom])

  // Handle tree markers
  useEffect(() => {
    if (!leaflet || !leafletMapRef.current || !trees.length) return

    try {
      // Clear existing markers
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []

      // Add tree markers
      trees.forEach((tree) => {
        const getTreeIcon = () => {
          let iconHtml = ""
          let glowColor = ""

          // Function to get SVG for different fruit types
          const getFruitSvg = (type: string) => {
            switch (type.toLowerCase()) {
              case "lemon":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${tree.inSeason ? "#ffcc00" : "#a0a0a0"}" stroke="${tree.inSeason ? "#ffcc00" : "#a0a0a0"}" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5.51 18.49a12 12 0 0 0 16.98-16.98c-2.55 6.5-9.23 10.99-16.98 16.98Z"/>
                  <path d="M5.51 5.51c5.99 7.75 10.48 14.43 16.98 16.98C16.99 16.24 12.5 9.56 5.51 5.51Z"/>
                </svg>`
              case "fig":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${tree.inSeason ? "#553c9a" : "#a0a0a0"}" stroke="${tree.inSeason ? "#553c9a" : "#a0a0a0"}" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                  <path d="M12 6a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2z"/>
                </svg>`
              case "loquat":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${tree.inSeason ? "#f59e0b" : "#a0a0a0"}" stroke="${tree.inSeason ? "#f59e0b" : "#a0a0a0"}" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                  <path d="M12 6v12"/>
                  <path d="M6 12h12"/>
                </svg>`
              case "mulberry":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${tree.inSeason ? "#7e22ce" : "#a0a0a0"}" stroke="${tree.inSeason ? "#7e22ce" : "#a0a0a0"}" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  <path d="M17 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  <path d="M12 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>`
              case "olive":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${tree.inSeason ? "#84cc16" : "#a0a0a0"}" stroke="${tree.inSeason ? "#84cc16" : "#a0a0a0"}" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 4h-5L7 7H3.5L5 9.5l-1.5 2.5h3.5L9.5 15h5l2.5-3h3.5L19 9.5 20.5 7H17l-2.5-3z"/>
                </svg>`
              case "plum":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${tree.inSeason ? "#7c3aed" : "#a0a0a0"}" stroke="${tree.inSeason ? "#7c3aed" : "#a0a0a0"}" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="8"/>
                  <path d="M12 8v8"/>
                  <path d="M8 12h8"/>
                </svg>`
              case "pomegranate":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${tree.inSeason ? "#dc2626" : "#a0a0a0"}" stroke="${tree.inSeason ? "#dc2626" : "#a0a0a0"}" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="8"/>
                  <path d="M12 8v8"/>
                  <path d="M8.5 14a3.5 3.5 0 0 0 7 0"/>
                  <path d="M8.5 10a3.5 3.5 0 0 1 7 0"/>
                </svg>`
              case "guava":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${tree.inSeason ? "#65a30d" : "#a0a0a0"}" stroke="${tree.inSeason ? "#65a30d" : "#a0a0a0"}" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="8"/>
                  <path d="M9 12a3 3 0 0 0 6 0"/>
                </svg>`
              case "pecan":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${tree.inSeason ? "#92400e" : "#a0a0a0"}" stroke="${tree.inSeason ? "#92400e" : "#a0a0a0"}" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18"/>
                  <path d="M5 7c0 0 3.5 1 7 1s7-1 7-1"/>
                  <path d="M5 17c0 0 3.5-1 7-1s7 1 7 1"/>
                </svg>`
              case "chestnut":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${tree.inSeason ? "#854d0e" : "#a0a0a0"}" stroke="${tree.inSeason ? "#854d0e" : "#a0a0a0"}" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L7 6.5V12l5 3 5-3V6.5L12 2z"/>
                  <path d="M12 22v-7"/>
                </svg>`
              case "avocado":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${tree.inSeason ? "#3f6212" : "#a0a0a0"}" stroke="${tree.inSeason ? "#3f6212" : "#a0a0a0"}" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>`
              case "orange":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${tree.inSeason ? "#f97316" : "#a0a0a0"}" stroke="${tree.inSeason ? "#f97316" : "#a0a0a0"}" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="8"/>
                  <path d="M12 4v1"/>
                  <path d="M17.66 6.34l-.7.7"/>
                  <path d="M20 12h-1"/>
                  <path d="M17.66 17.66l-.7-.7"/>
                  <path d="M12 20v-1"/>
                  <path d="M6.34 17.66l.7-.7"/>
                  <path d="M4 12h1"/>
                  <path d="M6.34 6.34l.7.7"/>
                </svg>`
              case "tangerine":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${tree.inSeason ? "#ea580c" : "#a0a0a0"}" stroke="${tree.inSeason ? "#ea580c" : "#a0a0a0"}" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="8"/>
                  <path d="M12 4v2"/>
                  <path d="M12 18v2"/>
                  <path d="M4 12h2"/>
                  <path d="M18 12h2"/>
                </svg>`
              case "apple":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${tree.inSeason ? "#dc2626" : "#a0a0a0"}" stroke="${tree.inSeason ? "#dc2626" : "#a0a0a0"}" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 4-3 4-6.5-2 0-4.25-.5-4.25-3.5 0-1.5.5-2.5 1.5-3.5-2-.5-3-.5-4.25-.5s-2.25 0-4.25.5c1 1 1.5 2 1.5 3.5 0 3-2.25 3.5-4.25 3.5 0 3.5 1 6.5 4 6.5 1.25 0 2.5-1.06 4-1.06z"/>
                  <path d="M12 7c1.5-1.5 2-3.5 2-5.5-1.5 0-3 0-4 1.5-1 1.5-1.5 3-1.5 4.5 1.5 0 2.5-.5 3.5-0.5z"/>
                </svg>`
              default:
                return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${tree.inSeason ? "#34c759" : "#a0a0a0"}" stroke="${tree.inSeason ? "#34c759" : "#a0a0a0"}" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22v-7l-2-2"/>
                  <path d="M17 8v.8A6 6 0 0 1 13.8 20v0H10v0A6.5 6.5 0 0 1 7 8h0a5 5 0 0 1 10 0Z"/>
                  <path d="m14 14-2 2"/>
                </svg>`
            }
          }

          // Get glow color based on fruit type
          switch (tree.type.toLowerCase()) {
            case "lemon":
            case "loquat":
              glowColor = "rgba(255, 204, 0, 0.5)"
              break
            case "fig":
            case "mulberry":
            case "plum":
              glowColor = "rgba(124, 58, 237, 0.5)"
              break
            case "olive":
            case "guava":
            case "avocado":
              glowColor = "rgba(101, 163, 13, 0.5)"
              break
            case "pomegranate":
            case "apple":
              glowColor = "rgba(220, 38, 38, 0.5)"
              break
            case "pecan":
            case "chestnut":
              glowColor = "rgba(146, 64, 14, 0.5)"
              break
            case "orange":
            case "tangerine":
              glowColor = "rgba(249, 115, 22, 0.5)"
              break
            default:
              glowColor = "rgba(52, 199, 89, 0.5)"
          }

          iconHtml = `
            <div class="fruit-marker-container">
              ${tree.inSeason ? `<div class="fruit-marker-glow" style="background: radial-gradient(circle, ${glowColor} 0%, rgba(255, 255, 255, 0) 70%);"></div>` : ""}
              <div class="${tree.inSeason ? "breathing-marker" : ""} p-3 rounded-full bg-white border-2 ${tree.inSeason ? "border-pink-400" : "border-gray-300"} shadow-lg flex items-center justify-center">
                ${getFruitSvg(tree.type)}
              </div>
            </div>
          `

          return leaflet.divIcon({
            html: iconHtml,
            className: "tree-marker",
            iconSize: [50, 50],
            iconAnchor: [25, 25],
          })
        }

        const marker = leaflet
          .marker([tree.location.lat, tree.location.lng], {
            icon: getTreeIcon(),
            title: `${tree.type} Tree`,
          })
          .addTo(leafletMapRef.current)

        // Add a custom tooltip with anime style
        marker.bindTooltip(
          `
          <div class="font-bold text-sm">${tree.type} Tree</div>
          <div class="text-xs">${tree.species}</div>
          ${tree.inSeason ? '<div class="text-xs text-green-600 font-bold">✨ In Season ✨</div>' : ""}
        `,
          {
            direction: "top",
            offset: [0, -5],
            className: "bg-white px-3 py-2 rounded-lg text-xs shadow-lg border-2 border-pink-100",
          },
        )

        if (onSelectTree) {
          marker.on("click", () => onSelectTree(tree))
        }

        markersRef.current.push(marker)
      })
    } catch (error) {
      console.error("Error adding tree markers:", error)
    }
  }, [leaflet, trees, onSelectTree])

  // Handle selected location marker
  useEffect(() => {
    if (!leaflet || !leafletMapRef.current || !selectable) return

    try {
      // Remove existing selected marker
      if (selectedMarkerRef.current) {
        selectedMarkerRef.current.remove()
        selectedMarkerRef.current = null
      }

      // Add new selected marker if location is provided
      if (selectedLocation) {
        const icon = leaflet.divIcon({
          html: `
            <div class="breathing-marker">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#ff3b30" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3" fill="#ffffff"/>
              </svg>
            </div>
          `,
          className: "selected-location-marker",
          iconSize: [40, 40],
          iconAnchor: [20, 40],
        })

        const marker = leaflet
          .marker([selectedLocation.lat, selectedLocation.lng], { icon })
          .addTo(leafletMapRef.current)
          .bindTooltip("Selected Location", {
            direction: "top",
            offset: [0, -40],
            className: "bg-white px-2 py-1 rounded-md text-xs shadow-md border-2 border-red-300",
          })

        selectedMarkerRef.current = marker

        // Center map on selected location
        leafletMapRef.current.setView([selectedLocation.lat, selectedLocation.lng], zoom)
      }
    } catch (error) {
      console.error("Error adding selected location marker:", error)
    }
  }, [leaflet, selectedLocation, selectable, zoom])

  // Force map resize when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.invalidateSize()
      }
    }

    window.addEventListener("resize", handleResize)

    // Initial resize
    setTimeout(handleResize, 200)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [mapLoaded])

  return (
    <div className="w-full h-full relative">
      <div
        ref={mapRef}
        className="w-full h-full bg-gray-200"
        style={{
          opacity: 1, // Ensure full opacity
          transition: "none", // Disable transitions that might cause fading
        }}
      ></div>

      {!mapLoaded && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <div className="bg-white p-4 rounded-md shadow-md text-red-500">
            <p>{mapError}</p>
            <button
              className="mt-2 px-4 py-2 bg-pink-600 text-white rounded-md"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      )}

      {mapLoaded && !userLocation && (
        <div className="absolute top-4 left-0 right-0 mx-auto w-max bg-white p-2 rounded-md shadow-md text-sm">
          Unable to determine your location. Please use the "Use My Location" button.
        </div>
      )}
    </div>
  )
}

