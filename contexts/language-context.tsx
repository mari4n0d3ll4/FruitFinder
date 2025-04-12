"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string, fallback: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Simple translations object
const translations = {
  en: {
    "nav.home": "Home",
    "nav.map": "Map",
    "nav.ecotours": "EcoTours",
    "nav.about": "About",
    "button.openMap": "Open Map",
    "language.en": "English",
    "language.es": "Spanish",
    "home.title": "Discover Ready-to-Harvest Fruit in LATAM",
    "home.subtitle":
      "FruitFinder helps you locate fruit trees in Latin America that are ready to harvest. Join our community of foragers and contribute to the map.",
    "home.findFruit": "Find Fruit Near Me",
    "home.addTree": "Add a Tree",
    "home.openSource": "Open Source on GitHub",
    "home.howItWorks": "How It Works",
    "home.howItWorksDesc":
      "FruitFinder is a community-driven platform that helps you discover and share fruit trees in your area.",
    "home.discoverTrees": "Discover Trees",
    "home.discoverTreesDesc": "Find fruit trees near you. Filter by fruit type and harvest season.",
    "home.contribute": "Contribute",
    "home.contributeDesc": "Add new trees to the map, including species information and harvest times.",
    "home.getNotified": "Get Notified",
    "home.getNotifiedDesc": "Receive alerts when fruit is ready to harvest in your area.",
    "home.ecotours": "EcoTours",
    "home.ecotoursDesc": "Explore family-friendly routes to harvest multiple fruits in one trip.",
    "footer.description": "A community-driven platform for mapping and sharing fruit trees in Latin America.",
    "footer.links": "Links",
    "footer.rights": "All rights reserved.",
  },
  es: {
    "nav.home": "Inicio",
    "nav.map": "Mapa",
    "nav.ecotours": "EcoTours",
    "nav.about": "Acerca de",
    "button.openMap": "Abrir Mapa",
    "language.en": "Inglés",
    "language.es": "Español",
    "home.title": "Descubre Frutas Listas para Cosechar en LATAM",
    "home.subtitle":
      "FruitFinder te ayuda a localizar árboles frutales en América Latina que están listos para cosechar. Únete a nuestra comunidad y contribuye al mapa.",
    "home.findFruit": "Encontrar Fruta Cerca",
    "home.addTree": "Añadir un Árbol",
    "home.openSource": "Código Abierto en GitHub",
    "home.howItWorks": "Cómo Funciona",
    "home.howItWorksDesc":
      "FruitFinder es una plataforma comunitaria que te ayuda a descubrir y compartir árboles frutales en tu área.",
    "home.discoverTrees": "Descubre Árboles",
    "home.discoverTreesDesc":
      "Encuentra árboles frutales cerca de ti. Filtra por tipo de fruta y temporada de cosecha.",
    "home.contribute": "Contribuye",
    "home.contributeDesc": "Añade nuevos árboles al mapa, incluyendo información de especies y tiempos de cosecha.",
    "home.getNotified": "Recibe Notificaciones",
    "home.getNotifiedDesc": "Recibe alertas cuando la fruta esté lista para cosechar en tu área.",
    "home.ecotours": "EcoTours",
    "home.ecotoursDesc": "Explora rutas familiares para cosechar múltiples frutas en un solo viaje.",
    "footer.description": "Una plataforma comunitaria para mapear y compartir árboles frutales en América Latina.",
    "footer.links": "Enlaces",
    "footer.rights": "Todos los derechos reservados.",
  },
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en")

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  // Translation function
  const t = (key: string, fallback: string): string => {
    return translations[language][key] || fallback
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

