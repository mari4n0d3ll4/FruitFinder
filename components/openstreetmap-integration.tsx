"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Map, Share } from "lucide-react"

interface OpenStreetMapIntegrationProps {
  trees?: any[]
}

export function OpenStreetMapIntegration({ trees = [] }: OpenStreetMapIntegrationProps) {
  const [mapUrl, setMapUrl] = useState("")
  const [isImporting, setIsImporting] = useState(false)
  const [importSuccess, setImportSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleImport = async () => {
    try {
      setIsImporting(true)
      setError("")

      // In a real app, you would implement the actual import logic here
      // This would typically involve fetching data from the OpenStreetMap API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setImportSuccess(true)
      setIsImporting(false)
    } catch (err) {
      setError("Failed to import map data. Please check the URL and try again.")
      setIsImporting(false)
    }
  }

  const generateOsmUrl = () => {
    if (trees.length === 0) return "https://www.openstreetmap.org/"

    // Calculate the center of all trees
    const lats = trees.map((tree) => tree.location.lat)
    const lngs = trees.map((tree) => tree.location.lng)
    const centerLat = lats.reduce((a, b) => a + b, 0) / lats.length
    const centerLng = lngs.reduce((a, b) => a + b, 0) / lngs.length

    return `https://www.openstreetmap.org/#map=15/${centerLat}/${centerLng}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>OpenStreetMap Integration</CardTitle>
        <CardDescription>Connect with OpenStreetMap to import or export tree data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {importSuccess && (
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-700">Map data successfully imported!</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="bg-red-50 border-red-200">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Import from OpenStreetMap</label>
          <div className="flex gap-2">
            <Input
              placeholder="Paste your OpenStreetMap URL"
              value={mapUrl}
              onChange={(e) => setMapUrl(e.target.value)}
            />
            <Button
              onClick={handleImport}
              disabled={!mapUrl || isImporting}
              className="bg-green-600 hover:bg-green-700 whitespace-nowrap"
            >
              {isImporting ? "Importing..." : "Import"}
            </Button>
          </div>
          <p className="text-xs text-gray-500">Import trees from OpenStreetMap data</p>
        </div>

        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="flex items-center gap-2" asChild>
              <a href={generateOsmUrl()} target="_blank" rel="noopener noreferrer">
                <Map className="h-4 w-4" />
                <span>View in OpenStreetMap</span>
              </a>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share className="h-4 w-4" />
              <span>Share Map</span>
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-md border text-sm">
          <p className="font-medium">OpenStreetMap Benefits</p>
          <ul className="text-xs text-gray-500 mt-1 space-y-1 list-disc pl-4">
            <li>Free and open-source mapping platform</li>
            <li>Community-maintained data</li>
            <li>No API key required</li>
            <li>Contribute back to improve maps for everyone</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

