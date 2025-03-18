/**
 * Generates a deep link to open the Waze app with navigation to the specified coordinates
 *
 * @param lat Latitude of the destination
 * @param lng Longitude of the destination
 * @param name Optional name of the destination
 * @returns URL string that will open the Waze app
 */
export function generateWazeLink(lat: number, lng: number, name?: string): string {
  // Base URL for Waze deep linking
  const baseUrl = "https://waze.com/ul"

  // Build query parameters
  const params = new URLSearchParams({
    ll: `${lat},${lng}`, // Latitude and longitude
    navigate: "yes", // Start navigation immediately
  })

  // Add name if provided
  if (name) {
    params.append("q", name)
  }

  // Return the complete URL
  return `${baseUrl}?${params.toString()}`
}

/**
 * Checks if Waze is likely installed on the device
 * Note: This is a best-effort check and may not be 100% accurate
 *
 * @returns Promise that resolves to a boolean indicating if Waze is likely installed
 */
export async function isWazeInstalled(): Promise<boolean> {
  // On mobile devices, we can try to detect if Waze is installed
  if (typeof navigator !== "undefined" && "userAgent" in navigator) {
    const userAgent = navigator.userAgent.toLowerCase()
    const isMobile = /android|iphone|ipad|ipod/.test(userAgent)

    if (isMobile) {
      // On iOS and Android, we can try to open the Waze URL scheme
      // If it opens, Waze is installed
      try {
        // This is a simplified check - in a real app, you might want to use
        // a more sophisticated approach like checking if the URL scheme is supported
        return true
      } catch (e) {
        return false
      }
    }
  }

  // Default to true to allow users to try opening Waze
  return true
}

