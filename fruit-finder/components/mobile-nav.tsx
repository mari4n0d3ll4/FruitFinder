"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, MapPin, TreesIcon as Tree, Info, Home, X } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="font-semibold text-lg">FruitFinder</div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex flex-col gap-4 py-6">
            <Link
              href="/"
              className="flex items-center gap-2 px-2 py-3 rounded-md hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              href="/map"
              className="flex items-center gap-2 px-2 py-3 rounded-md hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <MapPin className="h-5 w-5" />
              <span>Map</span>
            </Link>
            <Link
              href="/contribute"
              className="flex items-center gap-2 px-2 py-3 rounded-md hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <Tree className="h-5 w-5" />
              <span>Add a Tree</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 px-2 py-3 rounded-md hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <Info className="h-5 w-5" />
              <span>About</span>
            </Link>
          </nav>
          <div className="mt-auto border-t pt-4">
            <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
              <Link href="/map" onClick={() => setOpen(false)}>
                <MapPin className="mr-2 h-4 w-4" />
                Find Fruit Near Me
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

