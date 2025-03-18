// This script demonstrates how to generate a KML file for Google My Maps

// Sample tree data
const trees = [
  {
    id: 1,
    type: "Apple",
    species: "Malus domestica",
    location: { lat: 40.7128, lng: -74.006 },
    inSeason: true,
    harvestSeason: "Late Summer to Fall",
    description: "Several apple trees with a mix of varieties. Good yield this year.",
    contributor: "GreenThumb",
  },
  {
    id: 2,
    type: "Cherry",
    species: "Prunus avium",
    location: { lat: 40.7138, lng: -74.008 },
    inSeason: false,
    harvestSeason: "Early Summer",
    description: "Sweet cherries, usually ready in June. Tree is on public property.",
    contributor: "FruitHunter",
  },
  {
    id: 3,
    type: "Lemon",
    species: "Citrus limon",
    location: { lat: 40.7118, lng: -74.003 },
    inSeason: true,
    harvestSeason: "Year-round in warm climates",
    description: "Small lemon tree with surprisingly good yield. Owner has given permission to harvest.",
    contributor: "CitrusLover",
  },
]

// Create KML content
function generateKML(trees) {
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
    const styleId = tree.type.toLowerCase() + "TreeStyle"

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

  return kmlContent
}

// Create CSV content
function generateCSV(trees) {
  // CSV header
  const header = "Name,Description,Latitude,Longitude,Species,Harvest Season,In Season,Contributor\n"

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

      return `"${name}","${description}",${lat},${lng},"${species}","${harvestSeason}","${inSeason}","${contributor}"`
    })
    .join("\n")

  // Combine header and rows
  return header + rows
}

// Generate and display the KML content
const kmlOutput = generateKML(trees)
console.log("=== KML OUTPUT ===")
console.log(kmlOutput)
console.log("\n")

// Generate and display the CSV content
const csvOutput = generateCSV(trees)
console.log("=== CSV OUTPUT ===")
console.log(csvOutput)

console.log("\n=== INSTRUCTIONS ===")
console.log("To import this data into Google My Maps:")
console.log("1. Go to https://www.google.com/maps/d/")
console.log("2. Open your map or create a new one")
console.log("3. Click on 'Import' in the left panel")
console.log("4. Upload the KML or CSV file")
console.log("5. Select the columns for place names and descriptions")
console.log("6. Click 'Finish' to complete the import")

