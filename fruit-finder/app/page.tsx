import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, TreesIcon as Tree, Apple, Bell, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-pink-200">
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
            <Link className="text-sm font-medium hover:text-pink-600 transition-colors" href="/about">
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-pink-50 to-purple-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-medium mb-2">
                  <Sparkles className="h-4 w-4 mr-1" />
                  <span>Anime Style Map</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                  Discover Free Fruit in Buenos Aires
                </h1>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  FruitFinder helps you locate fruit trees in Buenos Aires that are free to harvest. Join our community
                  of foragers and contribute to the map.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/map">
                    <Button className="bg-pink-600 hover:bg-pink-700 shadow-lg shadow-pink-200">
                      <MapPin className="mr-2 h-4 w-4" />
                      Find Fruit Near Me
                    </Button>
                  </Link>
                  <Link href="/contribute">
                    <Button variant="outline" className="border-pink-200 hover:bg-pink-50">
                      <Tree className="mr-2 h-4 w-4" />
                      Add a Tree
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto flex justify-center">
                <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden shadow-xl border-4 border-white">
                  <img
                    alt="Map showing fruit trees"
                    className="object-cover"
                    src="/placeholder.svg?height=600&width=600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/60 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <p className="text-sm font-medium">Currently Available</p>
                      <h3 className="text-xl font-bold flex items-center">
                        Lemon Trees in Season
                        <Sparkles className="h-4 w-4 ml-2 text-yellow-300" />
                      </h3>
                      <p className="text-sm">3 locations in Palermo</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 animate-bounce">
                    <div className="bg-white rounded-full p-2 shadow-lg">
                      <Sparkles className="h-5 w-5 text-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  FruitFinder is a community-driven platform that helps you discover and share fruit trees in your area.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 shadow-md shadow-pink-200">
                  <MapPin className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold">Discover Trees</h3>
                <p className="text-gray-500">
                  Open the map to find fruit trees near you. Filter by fruit type and harvest season.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 shadow-md shadow-purple-200">
                  <Tree className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">Contribute</h3>
                <p className="text-gray-500">
                  Add new trees to the map, including species information, photos, and harvest times.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 shadow-md shadow-indigo-200">
                  <Bell className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold">Get Notified</h3>
                <p className="text-gray-500">
                  Receive alerts when fruit is ready to harvest in your area or when new trees are added.
                </p>
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

