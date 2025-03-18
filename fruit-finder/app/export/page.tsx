"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Apple, ArrowLeft, Download, ExternalLink } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// Import the new component
import { OpenStreetMapIntegration } from "@/components/openstreetmap-integration"

// Sample data for demonstration
const trees = [
  {
    id: 1,
    type: "Naranjo",
    species: "Citrus sinensis",
    location: { lat: -34.6037, lng: -58.3816 },
    inSeason: true,
    lastUpdated: "2 days ago",
    wikiLink: "https://en.wikipedia.org/wiki/Orange_(fruit)",
    harvestSeason: "Winter (Jun-Aug)",
    description: "Sweet orange tree with good yield. Located in a public park.",
    contributor: "CitrusLover",
  },
  {
    id: 2,
    type: "Higuera",
    species: "Ficus carica",
    location: { lat: -34.598, lng: -58.3848 },
    inSeason: false,
    lastUpdated: "1 week ago",
    wikiLink: "https://en.wikipedia.org/wiki/Common_fig",
    harvestSeason: "Summer (Dec-Mar)",
    description: "Fig tree with sweet fruit. Located on public property near the sidewalk.",
    contributor: "FigHunter",
  },
  {
    id: 3,
    type: "Limonero",
    species: "Citrus limon",
    location: { lat: -34.6127, lng: -58.3765 },
    inSeason: true,
    lastUpdated: "Yesterday",
    wikiLink: "https://en.wikipedia.org/wiki/Lemon",
    harvestSeason: "Year-round",
    description: "Productive lemon tree. Owner has given permission to harvest.",
    contributor: "CitrusLover",
  },
]

export default function ExportPage() {
  const [exportSuccess, setExportSuccess] = useState(false)
  const [exportFormat, setExportFormat] = useState("")

  const handleExport = (format: string) => {
    // In a real app, this would trigger the actual export
    console.log(`Exporting in ${format} format`)
    setExportFormat(format)
    setExportSuccess(true)

    // Reset success message after 3 seconds
    setTimeout(() => {
      setExportSuccess(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-14">
      <header className="border-b bg-white fixed top-0 left-0 right-0 z-50">
        <div className="flex h-14 items-center px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Apple className="h-5 w-5 text-green-600" />
            <span>FruitFinder</span>
          </Link>
          <div className="ml-4 flex items-center">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="container py-8 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-6">Export Tree Data</h1>

          {exportSuccess && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <AlertTitle>Export Successful!</AlertTitle>
              <AlertDescription>
                Your data has been exported as {exportFormat.toUpperCase()}. You can now import it into your preferred
                mapping tool.
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Export Tree Data</CardTitle>
              <CardDescription>Export your fruit tree data to use with various mapping tools</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="kml" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="kml">KML Format</TabsTrigger>
                  <TabsTrigger value="csv">CSV Format</TabsTrigger>
                </TabsList>
                <TabsContent value="kml" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">KML Format</h3>
                    <p className="text-sm text-gray-500">
                      KML is a format that works with many mapping tools. It preserves all tree information including
                      descriptions and custom icons.
                    </p>
                    <Button onClick={() => handleExport("kml")} className="w-full bg-green-600 hover:bg-green-700">
                      <Download className="mr-2 h-4 w-4" />
                      Export as KML
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="csv" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">CSV Format</h3>
                    <p className="text-sm text-gray-500">
                      CSV is a simple format that works with many applications. Some advanced features like custom icons
                      may not be preserved.
                    </p>
                    <Button onClick={() => handleExport("csv")} className="w-full bg-green-600 hover:bg-green-700">
                      <Download className="mr-2 h-4 w-4" />
                      Export as CSV
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex-col items-start">
              <h3 className="font-medium mb-2">How to Import into Mapping Tools</h3>
              <ol className="text-sm text-gray-500 list-decimal pl-5 space-y-2">
                <li>Go to your preferred mapping tool (OpenStreetMap, QGIS, etc.)</li>
                <li>Look for an "Import" or "Add Data" option</li>
                <li>Upload the exported file</li>
                <li>Configure any display options as needed</li>
                <li>Save your map</li>
              </ol>
              <Button variant="outline" className="mt-4 w-full" asChild>
                <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open OpenStreetMap
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
        {/* Add after the main card */}
        <div className="max-w-md mx-auto mt-6">
          <OpenStreetMapIntegration trees={trees} />
        </div>
      </main>
    </div>
  )
}

