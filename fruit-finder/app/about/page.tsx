import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Apple, Leaf, Users, MapPin, Github, AlertTriangle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Apple className="h-6 w-6 text-pink-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              FruitFinder
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link className="text-sm font-medium hover:text-pink-600 transition-colors" href="/">
              Home
            </Link>
            <Link className="text-sm font-medium hover:text-pink-600 transition-colors" href="/map">
              Map
            </Link>
            <Link className="text-sm font-medium text-pink-600" href="/about">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/map">
              <Button className="bg-pink-600 hover:bg-pink-700">
                <MapPin className="mr-2 h-4 w-4" />
                Open Map
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                  About FruitFinder
                </h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connecting communities through shared fruit resources
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div>
                <img
                  alt="People harvesting fruit from a community tree"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  src="/placeholder.svg?height=400&width=600"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Our Mission</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    FruitFinder was created with a simple mission: to reduce food waste, promote community sharing, and
                    connect people with the abundant fruit resources that often go unharvested in our neighborhoods.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Why We Started</h3>
                  <p className="max-w-[600px] text-gray-500">
                    Every year, millions of pounds of fruit from urban trees go to waste. Meanwhile, many people lack
                    access to fresh, healthy food. We saw an opportunity to bridge this gap by creating a platform that
                    makes it easy to find, share, and harvest local fruit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Values</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The principles that guide our community and platform
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 md:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
                  <Leaf className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold">Sustainability</h3>
                <p className="text-gray-500">
                  We believe in reducing waste and promoting sustainable food systems by utilizing the abundant
                  resources already growing in our communities.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
                  <Users className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold">Community</h3>
                <p className="text-gray-500">
                  FruitFinder fosters connections between neighbors and builds stronger communities through sharing and
                  collaboration.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
                  <Apple className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold">Food Access</h3>
                <p className="text-gray-500">
                  We're committed to improving access to fresh, healthy food for everyone, regardless of economic status
                  or location.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Important Disclaimers Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Important Information</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Safety guidelines and official information you should know
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl space-y-8">
              <Card className="border-amber-200">
                <CardHeader className="bg-amber-50 border-b border-amber-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <CardTitle className="text-amber-800">Safety Recommendations</CardTitle>
                  </div>
                  <CardDescription className="text-amber-700">
                    Important guidelines for safely harvesting and consuming urban fruit
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Food Safety</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>
                        <strong>Always thoroughly wash all fruits</strong> before consuming them to remove any dirt,
                        debris, or potential contaminants.
                      </li>
                      <li>Inspect fruit carefully for signs of disease, pests, or damage before consumption.</li>
                      <li>
                        Be aware that urban fruit trees may have been exposed to pollution, pesticides, or other
                        environmental contaminants.
                      </li>
                      <li>
                        If you have allergies or health concerns, consult with a healthcare professional before
                        consuming foraged fruit.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Harvesting Etiquette</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>
                        Always respect private property and obtain permission before harvesting from trees on private
                        land.
                      </li>
                      <li>Take only what you need and leave plenty for others and wildlife.</li>
                      <li>Be gentle with trees and avoid breaking branches or damaging the tree while harvesting.</li>
                      <li>Clean up any fallen fruit or debris after harvesting.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50 border-b border-blue-200">
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-blue-800">Official Information</CardTitle>
                  </div>
                  <CardDescription className="text-blue-700">
                    Important information from local authorities regarding urban fruit trees
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-gray-700 italic">
                      "The Ministry of Environment and Public Space insists that fruit trees should not be planted in
                      public spaces, as they are not part of the Buenos Aires City forestry program. The City has a tree
                      plan that does not include them; the existing fruit trees in the City have been planted by
                      residents."
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-gray-700 italic">
                      "The Secretariat of Citizen Attention and Communal Management does not recommend the consumption
                      of fruits that do not meet the analysis requirements established by current regulations and that
                      ensure the safety of food in general."
                    </p>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-semibold text-lg">Disclaimer</h3>
                    <p className="text-gray-600 mt-2">
                      FruitFinder is a community-driven platform that maps fruit trees in public and private spaces with
                      permission. We are not affiliated with any government entity and do not officially endorse the
                      consumption of urban fruit. Users harvest and consume fruit at their own risk. FruitFinder and its
                      creators are not responsible for any issues related to the consumption of fruit found through our
                      platform.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Community</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  There are many ways to get involved with FruitFinder
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col space-y-4 rounded-xl border border-pink-200 bg-card p-6 shadow">
                <h3 className="text-xl font-bold">Contribute to the Map</h3>
                <p className="text-gray-500">
                  Add fruit trees to our database, update information about existing trees, and help build a
                  comprehensive resource for your community.
                </p>
                <Link href="/contribute" className="mt-auto">
                  <Button className="w-full bg-pink-600 hover:bg-pink-700">
                    <MapPin className="mr-2 h-4 w-4" />
                    Add a Tree
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col space-y-4 rounded-xl border border-pink-200 bg-card p-6 shadow">
                <h3 className="text-xl font-bold">Volunteer or Donate</h3>
                <p className="text-gray-500">
                  Help us maintain and improve the platform, organize community harvests, or contribute to our operating
                  costs to keep FruitFinder free for everyone.
                </p>
                <Link href="/volunteer" className="mt-auto">
                  <Button variant="outline" className="w-full border-pink-200 hover:bg-pink-50">
                    <Users className="mr-2 h-4 w-4" />
                    Get Involved
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <div className="flex flex-col space-y-4 rounded-xl border border-pink-200 bg-card p-6 shadow">
                <div className="flex items-center gap-4">
                  <Github className="h-8 w-8" />
                  <div>
                    <h3 className="text-xl font-bold">Open Source</h3>
                    <p className="text-gray-500">
                      FruitFinder is an open-source project. Developers are welcome to contribute to our codebase.
                    </p>
                  </div>
                </div>
                <div className="rounded-lg bg-pink-50 p-4 border border-pink-200">
                  <code className="text-sm">github.com/fruitfinder/fruitfinder-app</code>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-pink-200 bg-gradient-to-b from-white to-pink-50">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <Apple className="h-5 w-5 text-pink-600" />
              <span className="text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                FruitFinder
              </span>
            </div>
            <p className="text-sm text-gray-500">
              A community-driven platform for mapping and sharing fruit trees in your neighborhood.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:gap-4">
            <h3 className="text-sm font-medium">Links</h3>
            <nav className="flex flex-col gap-2 text-sm text-gray-500">
              <Link className="hover:text-pink-600 transition-colors" href="/">
                Home
              </Link>
              <Link className="hover:text-pink-600 transition-colors" href="/map">
                Map
              </Link>
              <Link className="hover:text-pink-600 transition-colors" href="/about">
                About
              </Link>
              <Link className="hover:text-pink-600 transition-colors" href="/privacy">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
        <div className="border-t border-pink-200 py-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} FruitFinder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

