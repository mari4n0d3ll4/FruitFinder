"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Apple, Camera, MapPin, Upload, ArrowLeft } from "lucide-react"
import { MapComponent } from "@/components/map-component"
import { MapProvider } from "@/components/map-provider"
import { MobileNav } from "@/components/mobile-nav"

export default function ContributePage() {
  const [location, setLocation] = useState(null)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    type: "",
    species: "",
    description: "",
    harvestSeason: "",
    publicAccess: true,
    ownerPermission: false,
    photos: [],
  })

  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [locationError, setLocationError] = useState("")

  const handleLocationSelect = (coords) => {
    setLocation(coords)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSwitchChange = (name, checked) => {
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handlePhotoUpload = (e) => {
    // In a real app, this would handle file uploads
    console.log("Photo upload:", e.target.files)
    setFormData({
      ...formData,
      photos: [...formData.photos, URL.createObjectURL(e.target.files[0])],
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would submit the data to your backend
    console.log("Submitting tree data:", { ...formData, location })
    // Navigate to success page or show success message
    setStep(3)
  }

  // Updated fruit types for Buenos Aires
  const fruitTypes = [
    "Lemon",
    "Fig",
    "Loquat",
    "Mulberry",
    "Olive",
    "Plum",
    "Pomegranate",
    "Guava",
    "Pecan",
    "Chestnut",
    "Avocado",
    "Orange",
    "Tangerine",
    "Other",
  ]

  const harvestSeasons = [
    "Spring (Sep-Nov)",
    "Early Summer (Dec-Jan)",
    "Late Summer (Feb-Mar)",
    "Fall (Apr-Jun)",
    "Winter (Jul-Aug)",
    "Year-round",
  ]

  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser")
      return
    }

    setIsLoadingLocation(true)
    setLocationError("")

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setIsLoadingLocation(false)
      },
      (error) => {
        setIsLoadingLocation(false)
        setLocationError("Unable to get your location. Using default location in Buenos Aires.")
        setLocation({
          lat: -34.6037,
          lng: -58.3816,
        })
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
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center gap-2">
            <MobileNav />
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Apple className="h-5 w-5 text-pink-600" />
              <span>FruitFinder</span>
            </Link>
          </div>
          <div className="ml-4 flex items-center">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/map">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Map
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="container py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            Add a New Fruit Tree
          </h1>

          {step === 1 && (
            <Card className="border-pink-200">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 border-b border-pink-100">
                <CardTitle>Step 1: Select Location</CardTitle>
                <CardDescription>Place a pin on the map to mark the exact location of the fruit tree.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[400px] bg-gray-100 rounded-md mb-4 relative overflow-hidden border-2 border-pink-200">
                  <MapProvider>
                    <MapComponent
                      selectable={true}
                      onSelectLocation={handleLocationSelect}
                      selectedLocation={location}
                    />
                  </MapProvider>
                </div>
                <div className="flex justify-center mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={requestUserLocation}
                    disabled={isLoadingLocation}
                    className="border-pink-200 hover:bg-pink-50"
                  >
                    {isLoadingLocation ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span>
                        Getting your location...
                      </>
                    ) : (
                      <>
                        <MapPin className="h-4 w-4 mr-1" />
                        Use My Current Location
                      </>
                    )}
                  </Button>
                </div>

                {locationError && (
                  <div className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded-md">{locationError}</div>
                )}
                {location && (
                  <div className="bg-pink-50 p-3 rounded-md border border-pink-200 flex items-center mt-4">
                    <MapPin className="h-5 w-5 text-pink-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium">Location selected</p>
                      <p className="text-xs text-gray-500">
                        Latitude: {location.lat.toFixed(6)}, Longitude: {location.lng.toFixed(6)}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-pink-50 to-purple-50 border-t border-pink-100">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!location}
                  className="ml-auto bg-pink-600 hover:bg-pink-700"
                >
                  Continue
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <Card className="border-pink-200">
                <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 border-b border-pink-100">
                  <CardTitle>Step 2: Tree Information</CardTitle>
                  <CardDescription>
                    Provide details about the fruit tree to help others identify and harvest it.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="basic">Basic Info</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="photos">Photos</TabsTrigger>
                    </TabsList>
                    <TabsContent value="basic" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">Fruit Type</Label>
                        <Select
                          name="type"
                          value={formData.type}
                          onValueChange={(value) => handleSelectChange("type", value)}
                          required
                        >
                          <SelectTrigger className="border-pink-200 focus:ring-pink-500">
                            <SelectValue placeholder="Select fruit type" />
                          </SelectTrigger>
                          <SelectContent>
                            {fruitTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="species">Species (if known)</Label>
                        <Input
                          id="species"
                          name="species"
                          placeholder="Scientific name (e.g., Citrus limon)"
                          value={formData.species}
                          onChange={handleInputChange}
                          className="border-pink-200 focus:ring-pink-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="harvestSeason">Harvest Season</Label>
                        <Select
                          name="harvestSeason"
                          value={formData.harvestSeason}
                          onValueChange={(value) => handleSelectChange("harvestSeason", value)}
                          required
                        >
                          <SelectTrigger className="border-pink-200 focus:ring-pink-500">
                            <SelectValue placeholder="When is this fruit typically available?" />
                          </SelectTrigger>
                          <SelectContent>
                            {harvestSeasons.map((season) => (
                              <SelectItem key={season} value={season}>
                                {season}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>
                    <TabsContent value="details" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Describe the tree, fruit quality, and any helpful information for foragers."
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={4}
                          className="border-pink-200 focus:ring-pink-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="publicAccess">Public Access</Label>
                          <Switch
                            id="publicAccess"
                            checked={formData.publicAccess}
                            onCheckedChange={(checked) => handleSwitchChange("publicAccess", checked)}
                          />
                        </div>
                        <p className="text-sm text-gray-500">
                          Is this tree on public property or in a public right-of-way?
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="ownerPermission">Owner Permission</Label>
                          <Switch
                            id="ownerPermission"
                            checked={formData.ownerPermission}
                            onCheckedChange={(checked) => handleSwitchChange("ownerPermission", checked)}
                          />
                        </div>
                        <p className="text-sm text-gray-500">
                          If on private property, do you have the owner's permission to share this location?
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="photos" className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        {formData.photos.map((photo, index) => (
                          <div
                            key={index}
                            className="relative aspect-square rounded-md overflow-hidden border-2 border-pink-200"
                          >
                            <img src={photo || "/placeholder.svg"} alt="Tree" className="object-cover w-full h-full" />
                          </div>
                        ))}
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-pink-200 rounded-md aspect-square cursor-pointer hover:bg-pink-50 transition-colors">
                          <div className="flex flex-col items-center justify-center p-4">
                            <Camera className="h-8 w-8 text-pink-400 mb-2" />
                            <p className="text-sm font-medium text-pink-600">Add Photo</p>
                            <p className="text-xs text-gray-500">Upload images of the tree and fruit</p>
                          </div>
                          <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                        </label>
                      </div>
                      <p className="text-sm text-gray-500">
                        Photos help others identify the tree and assess fruit quality. Please include clear images of
                        the tree, leaves, and fruit if possible.
                      </p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between bg-gradient-to-r from-pink-50 to-purple-50 border-t border-pink-100">
                  <Button variant="outline" onClick={() => setStep(1)} className="border-pink-200 hover:bg-pink-50">
                    Back
                  </Button>
                  <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
                    Submit Tree
                  </Button>
                </CardFooter>
              </Card>
            </form>
          )}

          {step === 3 && (
            <Card className="border-pink-200">
              <CardHeader className="text-center bg-gradient-to-r from-pink-50 to-purple-50 border-b border-pink-100">
                <div className="mx-auto w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-2">
                  <Apple className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle>Thank You for Contributing!</CardTitle>
                <CardDescription>
                  Your tree has been added to our database and will be reviewed by our team.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pt-6">
                <p className="mb-4">
                  Your contribution helps build a more comprehensive map of free fruit resources in your community.
                </p>
                <div className="bg-pink-50 p-4 rounded-md border border-pink-200 mb-4">
                  <h3 className="font-medium text-pink-800 mb-1">What happens next?</h3>
                  <ul className="text-sm text-pink-700 text-left list-disc pl-5 space-y-1">
                    <li>Our team will review your submission within 24-48 hours</li>
                    <li>Once approved, the tree will appear on the public map</li>
                    <li>Users near this location will receive a notification about the new tree</li>
                    <li>You'll receive credit as the contributor of this location</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-4 bg-gradient-to-r from-pink-50 to-purple-50 border-t border-pink-100">
                <Button variant="outline" asChild className="border-pink-200 hover:bg-pink-50">
                  <Link href="/map">
                    <MapPin className="h-4 w-4 mr-1" />
                    Back to Map
                  </Link>
                </Button>
                <Button asChild className="bg-pink-600 hover:bg-pink-700">
                  <Link href="/contribute">
                    <Upload className="h-4 w-4 mr-1" />
                    Add Another Tree
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

