"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Scale, Users, TreesIcon } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function HarvestStats() {
  const { language } = useLanguage()

  // In a real app, these would be fetched from an API
  const [stats, setStats] = useState({
    totalKg: 0,
    totalValue: 0,
    totalUsers: 0,
    totalTrees: 0,
  })

  useEffect(() => {
    // Simulate loading data
    const loadStats = async () => {
      // In a real app, fetch from API
      // For demo, we'll use mock data
      setStats({
        totalKg: 12458,
        totalValue: 37374,
        totalUsers: 1243,
        totalTrees: 876,
      })
    }

    loadStats()
  }, [])

  // Animation for counting up
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => {
        if (prev.totalKg >= 12458) {
          clearInterval(interval)
          return prev
        }
        return {
          totalKg: Math.min(prev.totalKg + 50, 12458),
          totalValue: Math.min(prev.totalValue + 150, 37374),
          totalUsers: Math.min(prev.totalUsers + 5, 1243),
          totalTrees: Math.min(prev.totalTrees + 3, 876),
        }
      })
    }, 20)

    return () => clearInterval(interval)
  }, [])

  const labels = {
    en: {
      kg: "Kilograms Harvested",
      value: "Value Saved (USD)",
      users: "Community Members",
      trees: "Trees Mapped",
    },
    es: {
      kg: "Kilogramos Cosechados",
      value: "Valor Ahorrado (USD)",
      users: "Miembros de la Comunidad",
      trees: "Árboles Mapeados",
    },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-green-200">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Scale className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-3xl font-bold text-green-600">{stats.totalKg.toLocaleString()}</h3>
          <p className="text-sm text-gray-500 mt-1">{labels[language].kg}</p>
        </CardContent>
      </Card>

      <Card className="border-amber-200">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
            <DollarSign className="h-6 w-6 text-amber-600" />
          </div>
          <h3 className="text-3xl font-bold text-amber-600">${stats.totalValue.toLocaleString()}</h3>
          <p className="text-sm text-gray-500 mt-1">{labels[language].value}</p>
        </CardContent>
      </Card>

      <Card className="border-blue-200">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-3xl font-bold text-blue-600">{stats.totalUsers.toLocaleString()}</h3>
          <p className="text-sm text-gray-500 mt-1">{labels[language].users}</p>
        </CardContent>
      </Card>

      <Card className="border-pink-200">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center mb-4">
            <TreesIcon className="h-6 w-6 text-pink-600" />
          </div>
          <h3 className="text-3xl font-bold text-pink-600">{stats.totalTrees.toLocaleString()}</h3>
          <p className="text-sm text-gray-500 mt-1">{labels[language].trees}</p>
        </CardContent>
      </Card>
    </div>
  )
}

