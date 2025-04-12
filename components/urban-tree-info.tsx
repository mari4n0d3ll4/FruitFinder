import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export function UrbanTreeInfo() {
  const urbanTrees = [
    {
      name: "Naranjo (Orange)",
      scientific: "Citrus sinensis",
      season: "Winter (Jun-Aug)",
      description: "Common in Buenos Aires. Provides sweet oranges and beautiful fragrance when flowering.",
    },
    {
      name: "Limonero (Lemon)",
      scientific: "Citrus limon",
      season: "Year-round",
      description: "Hardy citrus tree that can produce fruit throughout the year in Buenos Aires climate.",
    },
    {
      name: "Higuera (Fig)",
      scientific: "Ficus carica",
      season: "Summer (Dec-Mar)",
      description: "Well-adapted to urban environments. Produces sweet figs that don't ship well commercially.",
    },
    {
      name: "Níspero (Loquat)",
      scientific: "Eriobotrya japonica",
      season: "Spring (Sep-Nov)",
      description: "One of the first fruits of spring, often overlooked but delicious when fully ripe.",
    },
    {
      name: "Mora (Mulberry)",
      scientific: "Morus alba/nigra",
      season: "Spring-Summer (Oct-Jan)",
      description: "Fast-growing tree that produces abundant berries. Often planted as street trees.",
    },
    {
      name: "Palta (Avocado)",
      scientific: "Persea americana",
      season: "Fall-Winter (Apr-Aug)",
      description: "Increasingly common in Buenos Aires gardens. Requires good drainage.",
    },
    {
      name: "Durazno (Peach)",
      scientific: "Prunus persica",
      season: "Summer (Dec-Feb)",
      description: "Deciduous tree with beautiful pink blossoms in spring followed by juicy fruits.",
    },
    {
      name: "Caqui (Persimmon)",
      scientific: "Diospyros kaki",
      season: "Fall (Apr-Jun)",
      description: "Ornamental tree with bright orange fruits that must be fully ripe before eating.",
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Common Urban Fruit Trees in Buenos Aires</h3>

      <Accordion type="single" collapsible className="w-full">
        {urbanTrees.map((tree, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                {tree.name}
                <Badge variant="outline" className="ml-2">
                  {tree.season}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 py-2">
                <p className="text-sm italic text-gray-500">{tree.scientific}</p>
                <p className="text-sm">{tree.description}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

