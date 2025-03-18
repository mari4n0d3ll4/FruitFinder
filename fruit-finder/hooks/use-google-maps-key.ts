"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export const useGoogleMapsKey = () => {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if we have an API key in localStorage
    const storedKey = localStorage.getItem("GOOGLE_MAPS_API_KEY")

    // Check if we have an environment variable
    const envKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || window.ENV?.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (storedKey) {
      setApiKey(storedKey)
    } else if (envKey) {
      setApiKey(envKey)
    } else {
      // Redirect to API key entry page if neither exists
      router.push("/api-key")
    }

    setIsLoading(false)
  }, [router])

  return { apiKey, isLoading }
}

