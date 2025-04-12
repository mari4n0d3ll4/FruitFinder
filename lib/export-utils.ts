// Helper functions to export tree data to different formats

// Type definitions
interface TreeLocation {
  lat: number
  lng: number
}

interface Tree {
  id: number
  type: string
  species: string
  location: TreeLocation
  inSeason: boolean
  lastUpdated: string
  wikiLink: string
  harvestSeason: string
  description: string
  contributor: string
}

/**
 * Export tree data to KML format for mapping applications
 */
export function exportToKML(trees: Tree[]): void {
  // Create KML content
  let kmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>FruitFinder Trees</name>
    <description>Edible fruit trees in your area</description>
    
    <!-- Styles for different tree types -->
    <Style id="appleTreeStyle">
      <IconStyle>
        <Icon>
          <href>https://maps.google.com/mapfiles/kml/shapes/parks.png</href>
        </Icon>
      </IconStyle>
    </Style>
    <Style id="cherryTreeStyle">
      <IconStyle>
        <Icon>
          <href>https://maps.google.com/mapfiles/kml/shapes/parks.png</href>
        </Icon>
      </IconStyle>
    </Style>
    <Style id="lemonTreeStyle">
      <IconStyle>
        <Icon>
          <href>https://maps.google.com/mapfiles/kml/shapes/parks.png</href>
        </Icon>
      </IconStyle>
    </Style>
    <Style id="defaultTreeStyle">
      <IconStyle>
        <Icon>
          <href>https://maps.google.com/mapfiles/kml/shapes/parks.png</href>
        </Icon>
      </IconStyle>
    </Style>
`

  // Add placemarks for each tree
  trees.forEach((tree) => {
    const styleId = tree.type.toLowerCase().includes("apple")
      ? "appleTreeStyle"
      : tree.type.toLowerCase().includes("cherry")
        ? "cherryTreeStyle"
        : tree.type.toLowerCase().includes("lemon")
          ? "lemonTreeStyle"
          : "defaultTreeStyle"

    kmlContent += `
    <Placemark>
      <name>${tree.type} Tree</name>
      <description>
        <![CDATA[
          <div>
            <p><strong>Species:</strong> ${tree.species}</p>
            <p><strong>Harvest Season:</strong> ${tree.harvestSeason}</p>
            <p><strong>Currently In Season:</strong> ${tree.inSeason ? "Yes" : "No"}</p>
            <p><strong>Description:</strong> ${tree.description}</p>
            <p><strong>Added by:</strong> ${tree.contributor}</p>
            <p><strong>Last Updated:</strong> ${tree.lastUpdated}</p>
            <p><a href="${tree.wikiLink}" target="_blank">Learn more about this species</a></p>
          </div>
        ]]>
      </description>
      <styleUrl>#${styleId}</styleUrl>
      <Point>
        <coordinates>${tree.location.lng},${tree.location.lat},0</coordinates>
      </Point>
    </Placemark>`
  })

  // Close KML document
  kmlContent += `
  </Document>
</kml>`

  // Create and download the file
  downloadFile(kmlContent, "fruitfinder-trees.kml", "application/vnd.google-earth.kml+xml")
}

/**
 * Export tree data to CSV format
 */
export function exportToCSV(trees: Tree[]): void {
  // CSV header
  const header =
    "Name,Description,Latitude,Longitude,Species,Harvest Season,In Season,Contributor,Last Updated,Wiki Link\n"

  // Create rows for each tree
  const rows = trees
    .map((tree) => {
      const name = `${tree.type} Tree`
      const description = tree.description.replace(/,/g, " ") // Remove commas to avoid CSV issues
      const lat = tree.location.lat
      const lng = tree.location.lng
      const species = tree.species
      const harvestSeason = tree.harvestSeason
      const inSeason = tree.inSeason ? "Yes" : "No"
      const contributor = tree.contributor
      const lastUpdated = tree.lastUpdated
      const wikiLink = tree.wikiLink

      return `"${name}","${description}",${lat},${lng},"${species}","${harvestSeason}","${inSeason}","${contributor}","${lastUpdated}","${wikiLink}"`
    })
    .join("\n")

  // Combine header and rows
  const csvContent = header + rows

  // Create and download the file
  downloadFile(csvContent, "fruitfinder-trees.csv", "text/csv")
}

/**
 * Helper function to download a file
 */
function downloadFile(content: string, filename: string, contentType: string): void {
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()

  URL.revokeObjectURL(url)
}

