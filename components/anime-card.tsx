import type { ReactNode } from "react"

interface AnimeCardProps {
  children: ReactNode
  className?: string
}

export function AnimeCard({ children, className = "" }: AnimeCardProps) {
  return (
    <div className={`bg-white rounded-xl border-2 border-pink-200 shadow-lg overflow-hidden ${className}`}>
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300"></div>
      <div className="pt-2">{children}</div>
    </div>
  )
}

