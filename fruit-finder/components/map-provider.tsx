"use client"

import type React from "react"
import { useEffect } from "react"

export function MapProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Add Leaflet CSS
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    link.crossOrigin = ""
    document.head.appendChild(link)

    // Add custom anime map styles
    const style = document.createElement("style")
    style.textContent = `
      .leaflet-container {
        background-color: #f8f9fa;
        font-family: 'Comic Sans MS', cursive, sans-serif;
        will-change: transform;
        z-index: 0;
      }
      
      .leaflet-tile {
        filter: saturate(0.8) brightness(1.05);
        will-change: transform;
        backface-visibility: hidden;
      }
      
      .leaflet-control-attribution {
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 10px;
        padding: 2px 8px;
        font-family: 'Comic Sans MS', cursive, sans-serif;
        font-size: 10px;
      }
      
      .anime-map-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background: 
          linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.03) 100%),
          radial-gradient(circle at 70% 20%, rgba(255,220,255,0.05) 0%, rgba(255,255,255,0) 70%);
        z-index: 1000;
      }
      
      .breathing-marker {
        animation: breathe 2s infinite ease-in-out;
        transform-origin: center bottom;
        filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.7));
        will-change: transform;
      }
      
      @keyframes breathe {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      
      .fruit-marker-container {
        position: relative;
        will-change: transform;
      }
      
      .fruit-marker-glow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        animation: glow 2s infinite ease-in-out;
        z-index: -1;
        will-change: transform, opacity;
      }
      
      @keyframes glow {
        0%, 100% { 
          opacity: 0.5;
          transform: scale(1.2);
        }
        50% { 
          opacity: 0.8;
          transform: scale(1.5);
        }
      }
      
      /* Fix for blinking tree detail card */
      .fixed {
        transform: translateZ(0);
        will-change: transform;
        backface-visibility: hidden;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(link)
      document.head.removeChild(style)
    }
  }, [])

  return <>{children}</>
}

