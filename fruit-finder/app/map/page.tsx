"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MapPin, Search, Filter, Plus, Apple, CitrusIcon as Lemon, TreesIcon as Tree, Sparkles } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { MapComponent } from "@/components/map-component"
import { MapProvider } from "@/components/map-provider"
import { MobileNav } from "@/components/mobile-nav"
import { TreeDetailCard } from "@/components/tree-detail-card"

const TreeMarker = ({ tree, onClick }) => {
  const getTreeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "apple":
        return <Apple className={`h-5 w-5 ${tree.inSeason ? "text-red-500" : "text-gray-500"}`} />
      case "lemon":
        return <Lemon className={`h-5 w-5 ${tree.inSeason ? "text-yellow-500" : "text-gray-500"}`} />
      case "fig":
        return <Tree className={`h-5 w-5 ${tree.inSeason ? "text-purple-500" : "text-gray-500"}`} />
      case "loquat":
        return <Tree className={`h-5 w-5 ${tree.inSeason ? "text-amber-500" : "text-gray-500"}`} />
      case "mulberry":
        return <Tree className={`h-5 w-5 ${tree.inSeason ? "text-purple-700" : "text-gray-500"}`} />
      case "olive":
        return <Tree className={`h-5 w-5 ${tree.inSeason ? "text-green-600" : "text-gray-500"}`} />
      case "plum":
        return <Tree className={`h-5 w-5 ${tree.inSeason ? "text-purple-600" : "text-gray-500"}`} />
      case "pomegranate":
        return <Tree className={`h-5 w-5 ${tree.inSeason ? "text-red-600" : "text-gray-500"}`} />
      case "guava":
        return <Tree className={`h-5 w-5 ${tree.inSeason ? "text-green-500" : "text-gray-500"}`} />
      case "pecan":
        return <Tree className={`h-5 w-5 ${tree.inSeason ? "text-amber-700" : "text-gray-500"}`} />
      case "chestnut":
        return <Tree className={`h-5 w-5 ${tree.inSeason ? "text-amber-800" : "text-gray-500"}`} />
      case "avocado":
        return <Tree className={`h-5 w-5 ${tree.inSeason ? "text-green-700" : "text-gray-500"}`} />
      case "orange":
        return <Tree className={`h-5 w-5 ${tree.inSeason ? "text-orange-500" : "text-gray-500"}`} />
      case "tangerine":
        return <Tree className={`h-5 w-5 ${tree.inSeason ? "text-orange-600" : "text-gray-500"}`} />
      default:
        return <Tree className={`h-5 w-5 ${tree.inSeason ? "text-green-500" : "text-gray-500"}`} />
    }
  }

  return (
    <div className="p-4 cursor-pointer hover:bg-pink-50 transition-colors duration-200" onClick={onClick}>
      <div className="flex items-start gap-3">
        <div
          className={`p-2 rounded-full ${tree.inSeason ? "bg-pink-100" : "bg-gray-100"} border border-pink-200 shadow-sm`}
        >
          {getTreeIcon(tree.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{tree.type} Tree</h3>
            {tree.inSeason && (
              <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                In Season
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">{tree.species}</p>
          <p className="text-xs text-gray-400 mt-1">Updated {tree.lastUpdated}</p>
        </div>
      </div>
    </div>
  )
}

export default function MapPage() {
  const isMobile = useMobile()
  const [selectedTree, setSelectedTree] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [radius, setRadius] = useState([1])
  const [showNotifications, setShowNotifications] = useState(true)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; isDefault?: boolean } | null>(null)

  // Replace automatic geolocation with a user-initiated approach
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [locationError, setLocationError] = useState("")

  // Memoize the handleTreeSelect function to prevent unnecessary re-renders
  const handleTreeSelect = useCallback((tree) => {
    setSelectedTree(tree)
  }, [])

  // Close the tree detail card
  const handleCloseTreeDetail = useCallback(() => {
    setSelectedTree(null)
  }, [])

  // Sample data for demonstration with local Buenos Aires fruit trees
  const trees = [
    {
      id: 1,
      type: "Lemon",
      species: "Citrus limon",
      location: { lat: -34.6037, lng: -58.3816 },
      inSeason: true,
      lastUpdated: "2 days ago",
      wikiLink: "https://en.wikipedia.org/wiki/Lemon",
      harvestSeason: "Year-round in warm climates",
      description: "Several lemon trees with good yield. Fruit is tart and juicy.",
      contributor: "CitrusLover",
      photos: ["/placeholder.svg?height=300&width=300"],
      comments: [
        {
          id: 1,
          text: "I visited yesterday and there were plenty of lemons. Easy to reach from the sidewalk!",
          author: "FruitFan",
          timestamp: "2023-03-10T14:30:00Z",
          likes: 3,
        },
        {
          id: 2,
          text: "The lemons are a bit small this season but very juicy.",
          author: "LemonLover",
          timestamp: "2023-03-05T09:15:00Z",
          likes: 1,
        },
      ],
      statusVotes: {
        stillThere: 5,
        notThere: 0,
      },
      accessInfo: {
        requirements: "Most fruits are within reach from the ground, but bring a fruit picker for the higher ones.",
        needsLadder: false,
        harvestingTips: "Gently twist and pull to remove. The riper ones come off easily.",
      },
    },
    {
      id: 2,
      type: "Fig",
      species: "Ficus carica",
      location: { lat: -34.6057, lng: -58.3845 },
      inSeason: false,
      lastUpdated: "1 week ago",
      wikiLink: "https://en.wikipedia.org/wiki/Common_fig",
      harvestSeason: "Summer to Early Fall",
      description: "Large fig tree with sweet fruits. Tree is on public property.",
      contributor: "FruitHunter",
      photos: ["/placeholder.svg?height=300&width=300"],
      comments: [],
      statusVotes: {
        stillThere: 2,
        notThere: 0,
      },
      accessInfo: {
        requirements: "Tree is quite tall. You'll need a ladder to reach most fruits.",
        needsLadder: true,
        harvestingTips: "Figs are ready when they're soft to the touch and hang down slightly.",
      },
    },
    {
      id: 3,
      type: "Loquat",
      species: "Eriobotrya japonica",
      location: { lat: -34.601, lng: -58.383 },
      inSeason: true,
      lastUpdated: "Yesterday",
      wikiLink: "https://en.wikipedia.org/wiki/Loquat",
      harvestSeason: "Spring",
      description: "Medium-sized loquat tree with sweet, tangy fruits. Owner has given permission to harvest.",
      contributor: "FruitFinder",
      photos: ["/placeholder.svg?height=300&width=300"],
      comments: [
        {
          id: 1,
          text: "The owner is very friendly! Just knock on the door before harvesting.",
          author: "LocalResident",
          timestamp: "2023-03-08T16:45:00Z",
          likes: 4,
        },
      ],
      statusVotes: {
        stillThere: 3,
        notThere: 0,
      },
      accessInfo: {
        requirements: "Tree is in a front yard. Please ask permission at the house before harvesting.",
        needsLadder: false,
        harvestingTips: "Loquats are ready when they turn golden yellow and feel slightly soft.",
      },
    },
    {
      id: 4,
      type: "Mulberry",
      species: "Morus",
      location: { lat: -34.608, lng: -58.38 },
      inSeason: true,
      lastUpdated: "3 days ago",
      wikiLink: "https://en.wikipedia.org/wiki/Morus_(plant)",
      harvestSeason: "Late Spring to Summer",
      description: "Tall mulberry tree with dark purple berries. Located in a public park.",
      contributor: "BerryPicker",
      photos: ["/placeholder.svg?height=300&width=300"],
      comments: [
        {
          id: 1,
          text: "Berries stain everything! Wear clothes you don't mind getting purple.",
          author: "PurpleFingers",
          timestamp: "2023-03-07T11:20:00Z",
          likes: 7,
        },
      ],
      statusVotes: {
        stillThere: 6,
        notThere: 0,
      },
      accessInfo: {
        requirements: "Bring something to spread under the tree to catch falling berries.",
        needsLadder: true,
        harvestingTips: "Gently shake branches to make ripe berries fall. Watch out for stains!",
      },
    },
    {
      id: 5,
      type: "Olive",
      species: "Olea europaea",
      location: { lat: -34.61, lng: -58.385 },
      inSeason: false,
      lastUpdated: "2 weeks ago",
      wikiLink: "https://en.wikipedia.org/wiki/Olive",
      harvestSeason: "Fall",
      description: "Ancient olive tree with abundant fruit. Good for pickling or oil.",
      contributor: "OliveOil",
      photos: ["/placeholder.svg?height=300&width=300"],
      comments: [],
      statusVotes: {
        stillThere: 1,
        notThere: 0,
      },
      accessInfo: {
        requirements: "Olives need processing before eating - they're very bitter raw!",
        needsLadder: false,
        harvestingTips: "Harvest when olives turn from green to purple-black for eating, or green for oil.",
      },
    },
    {
      id: 6,
      type: "Avocado",
      species: "Persea americana",
      location: { lat: -34.602, lng: -58.379 },
      inSeason: true,
      lastUpdated: "5 days ago",
      wikiLink: "https://en.wikipedia.org/wiki/Avocado",
      harvestSeason: "Year-round depending on variety",
      description: "Healthy avocado tree with creamy, buttery fruit. Located in a community garden.",
      contributor: "GuacLover",
      photos: ["/placeholder.svg?height=300&width=300"],
      comments: [
        {
          id: 1,
          text: "The community garden asks that you only take 2 avocados per person.",
          author: "GardenManager",
          timestamp: "2023-03-09T10:05:00Z",
          likes: 5,
        },
      ],
      statusVotes: {
        stillThere: 4,
        notThere: 0,
      },
      accessInfo: {
        requirements: "Community garden is open 9am-6pm. Please sign the visitor book.",
        needsLadder: true,
        harvestingTips: "Avocados don't ripen on the tree. Pick when full-sized and let ripen at home.",
      },
    },
    {
      id: 7,
      type: "Orange",
      species: "Citrus sinensis",
      location: { lat: -34.605, lng: -58.387 },
      inSeason: true,
      lastUpdated: "Yesterday",
      wikiLink: "https://en.wikipedia.org/wiki/Orange_(fruit)",
      harvestSeason: "Winter to Spring",
      description: "Sweet orange tree with juicy fruit. Easy to access from the sidewalk.",
      contributor: "CitrusLover",
      photos: ["/placeholder.svg?height=300&width=300"],
      comments: [
        {
          id: 1,
          text: "These oranges are so sweet! Perfect for juicing.",
          author: "JuiceFan",
          timestamp: "2023-03-11T08:30:00Z",
          likes: 2,
        },
      ],
      statusVotes: {
        stillThere: 3,
        notThere: 0,
      },
      accessInfo: {
        requirements: "Bring a fruit picker for the higher branches.",
        needsLadder: false,
        harvestingTips: "Oranges don't continue to ripen after picking. Choose ones with bright color.",
      },
    },
  ]

  // Default location (Buenos Aires)
  useEffect(() => {
    // Set Buenos Aires as the default location
    setUserLocation({ lat: -34.6037, lng: -58.3816, isDefault: true })
  }, [])

  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser")
      return
    }

    setIsLoadingLocation(true)
    setLocationError("")

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setIsLoadingLocation(false)
      },
      (error) => {
        setIsLoadingLocation(false)
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location access was denied. You can still use the map with the default location.")
            break
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable.")
            break
          case error.TIMEOUT:
            setLocationError("The request to get user location timed out.")
            break
          default:
            setLocationError("An unknown error occurred while requesting location.")
            break
        }
        console.log("Geolocation error:", error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b bg-white z-10">
        <div className="container flex h-14 items-center px-4">
          <div className="flex items-center gap-2">
            <MobileNav />
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Apple className="h-5 w-5 text-green-600" />
              <span className="hidden sm:inline">FruitFinder</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Filter className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm" onClick={requestUserLocation} disabled={isLoadingLocation}>
              {isLoadingLocation ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Locating...
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4 mr-1" />
                  Use My Location
                </>
              )}
            </Button>
            <Link href="/contribute">
              <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                <Plus className="h-4 w-4 mr-1" />
                Add Tree
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-full md:w-1/3 lg:w-1/4 border-r bg-white z-10 overflow-y-auto">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search for fruit trees..."
                className="pl-8 border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {locationError && <div className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded-md">{locationError}</div>}
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="radius">
                    Search Radius: {radius[0]} mile{radius[0] !== 1 ? "s" : ""}
                  </Label>
                </div>
                <Slider
                  id="radius"
                  min={0.1}
                  max={10}
                  step={0.1}
                  value={radius}
                  onValueChange={setRadius}
                  className="mt-2"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notifications" checked={showNotifications} onCheckedChange={setShowNotifications} />
                <Label htmlFor="notifications">Notify me about new trees</Label>
              </div>
            </div>
          </div>
          <Tabs defaultValue="all">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                All Trees
              </TabsTrigger>
              <TabsTrigger value="in-season" className="flex-1">
                In Season
              </TabsTrigger>
              <TabsTrigger value="nearby" className="flex-1">
                Nearby
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="p-0">
              <div className="divide-y divide-pink-100">
                {trees.map((tree) => (
                  <div key={tree.id} className={selectedTree?.id === tree.id ? "bg-pink-50" : ""}>
                    <TreeMarker tree={tree} onClick={() => handleTreeSelect(tree)} />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="in-season" className="p-0">
              <div className="divide-y divide-pink-100">
                {trees
                  .filter((tree) => tree.inSeason)
                  .map((tree) => (
                    <div key={tree.id} className={selectedTree?.id === tree.id ? "bg-pink-50" : ""}>
                      <TreeMarker tree={tree} onClick={() => handleTreeSelect(tree)} />
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="nearby" className="p-0">
              <div className="divide-y divide-pink-100">
                {trees.map((tree) => (
                  <div key={tree.id} className={selectedTree?.id === tree.id ? "bg-pink-50" : ""}>
                    <TreeMarker tree={tree} onClick={() => handleTreeSelect(tree)} />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="relative flex-1 hidden md:block">
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="relative w-full h-full">
              <MapProvider>
                <MapComponent userLocation={userLocation} trees={trees} onSelectTree={handleTreeSelect} />
              </MapProvider>

              {/* Tree detail overlay */}
              {selectedTree && <TreeDetailCard tree={selectedTree} onClose={handleCloseTreeDetail} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

