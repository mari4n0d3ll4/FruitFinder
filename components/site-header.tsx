"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Apple, MapPin, Github, Flower, MouseIcon as Mushroom } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"

interface SiteHeaderProps {
  currentPath?: string
}

export function SiteHeader({ currentPath = "/" }: SiteHeaderProps) {
  const { t } = useLanguage()

  return (
    <header className="border-b border-pink-200">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Apple className="h-6 w-6 text-pink-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            FruitFinder
          </span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            className={`text-sm font-medium transition-colors ${currentPath === "/" ? "text-pink-600" : "hover:text-pink-600"}`}
            href="/"
          >
            {t("nav.home", "Home")}
          </Link>
          <Link
            className={`text-sm font-medium transition-colors ${currentPath === "/map" ? "text-pink-600" : "hover:text-pink-600"}`}
            href="/map"
          >
            {t("nav.map", "Map")}
          </Link>
          <Link
            className={`text-sm font-medium transition-colors ${currentPath === "/ecotours" ? "text-pink-600" : "hover:text-pink-600"}`}
            href="/ecotours"
          >
            {t("nav.ecotours", "EcoTours")}
          </Link>
          <Link
            className={`text-sm font-medium transition-colors ${currentPath === "/about" ? "text-pink-600" : "hover:text-pink-600"}`}
            href="/about"
          >
            {t("nav.about", "About")}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 border-r pr-2 mr-2 border-gray-200">
            <Link
              href="https://mushroom-finder.vercel.app"
              target="_blank"
              className="text-sm font-medium flex items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors"
            >
              <Mushroom className="h-4 w-4" />
              <span className="hidden lg:inline">MushroomFinder</span>
            </Link>
            <Link
              href="https://medicinal-plants.vercel.app"
              target="_blank"
              className="text-sm font-medium flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors"
            >
              <Flower className="h-4 w-4" />
              <span className="hidden lg:inline">MedicinalPlants</span>
            </Link>
          </div>
          <Link
            href="https://github.com/mari4n0d3ll4/FruitFinder"
            target="_blank"
            className="text-gray-500 hover:text-pink-600 transition-colors"
          >
            <Github className="h-5 w-5" />
          </Link>
          <LanguageSwitcher />
          <Link href="/map">
            <Button className="bg-pink-600 hover:bg-pink-700">
              <MapPin className="mr-2 h-4 w-4" />
              {t("button.openMap", "Open Map")}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

