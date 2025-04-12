"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, DollarSign, CalendarIcon, Camera } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface HarvestFormProps {
  treeId: number
  treeName: string
  onSuccess?: () => void
}

export function HarvestForm({ treeId, treeName, onSuccess }: HarvestFormProps) {
  const [formData, setFormData] = useState({
    harvestDate: new Date().toISOString().split("T")[0],
    kilograms: "",
    notes: "",
    photos: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [estimatedValue, setEstimatedValue] = useState(0)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Calculate estimated value when kilograms change
    if (name === "kilograms" && !isNaN(Number.parseFloat(value))) {
      // Assuming average value of $3 per kg
      setEstimatedValue(Number.parseFloat(value) * 3)
    }
  }

  const handlePhotoUpload = (e) => {
    // In a real app, this would handle file uploads
    console.log("Photo upload:", e.target.files)
    setFormData({
      ...formData,
      photos: [...formData.photos, URL.createObjectURL(e.target.files[0])],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // In a real app, this would submit to an API
      console.log("Submitting harvest data:", { treeId, ...formData, estimatedValue })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess(true)
      setIsSubmitting(false)

      // Reset form after success
      setTimeout(() => {
        setSuccess(false)
        setFormData({
          harvestDate: new Date().toISOString().split("T")[0],
          kilograms: "",
          notes: "",
          photos: [],
        })
        setEstimatedValue(0)
        if (onSuccess) onSuccess()
      }, 2000)
    } catch (err) {
      setError("Failed to submit harvest data. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-green-200">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
        <CardTitle>Report Harvest</CardTitle>
        <CardDescription>Record how much fruit you harvested from this {treeName} tree</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {success && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <AlertDescription className="text-green-700">
              Harvest recorded successfully! Thank you for contributing to our community data.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-4 bg-red-50 border-red-200">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="harvestDate">Harvest Date</Label>
            <div className="flex">
              <div className="relative flex-1">
                <CalendarIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="harvestDate"
                  name="harvestDate"
                  type="date"
                  className="pl-8 border-green-200 focus:border-green-400 focus:ring-green-400"
                  value={formData.harvestDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="kilograms">Amount Harvested (kg)</Label>
            <div className="flex">
              <div className="relative flex-1">
                <Scale className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="kilograms"
                  name="kilograms"
                  type="number"
                  step="0.1"
                  min="0.1"
                  placeholder="Enter amount in kilograms"
                  className="pl-8 border-green-200 focus:border-green-400 focus:ring-green-400"
                  value={formData.kilograms}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {estimatedValue > 0 && (
            <div className="bg-green-50 p-3 rounded-md border border-green-200 flex items-center">
              <DollarSign className="h-5 w-5 text-green-600 mr-2" />
              <div>
                <p className="text-sm font-medium">Estimated Value</p>
                <p className="text-sm text-green-700">${estimatedValue.toFixed(2)} USD</p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Quality of fruit, ease of harvest, etc."
              className="border-green-200 focus:border-green-400 focus:ring-green-400"
              value={formData.notes}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Photos (Optional)</Label>
            <div className="grid grid-cols-2 gap-4">
              {formData.photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-md overflow-hidden border-2 border-green-200"
                >
                  <img src={photo || "/placeholder.svg"} alt="Harvest" className="object-cover w-full h-full" />
                </div>
              ))}
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-green-200 rounded-md aspect-square cursor-pointer hover:bg-green-50 transition-colors">
                <div className="flex flex-col items-center justify-center p-4">
                  <Camera className="h-8 w-8 text-green-400 mb-2" />
                  <p className="text-sm font-medium text-green-600">Add Photo</p>
                  <p className="text-xs text-gray-500">Show your harvest</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              </label>
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Record Harvest"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-green-50 to-emerald-50 border-t border-green-100 text-xs text-gray-500">
        Your contributions help us track the impact of urban foraging and improve our data.
      </CardFooter>
    </Card>
  )
}

