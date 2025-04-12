"use client"

import { Apple, Cherry, CitrusIcon as Lemon, TreesIcon as Tree } from "lucide-react"

interface TreeMarkerProps {
  tree: any
  onClick?: () => void
}

// This component is now used for rendering tree details in the sidebar
// The actual map markers are handled in map-component.tsx
export function TreeMarker({ tree, onClick }: TreeMarkerProps) {
  const getTreeIcon = () => {
    switch (tree.type.toLowerCase()) {
      case "apple":
        return <Apple className="h-5 w-5" />
      case "cherry":
        return <Cherry className="h-5 w-5" />
      case "lemon":
        return <Lemon className="h-5 w-5" />
      default:
        return <Tree className="h-5 w-5" />
    }
  }

  return (
    <div className="flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-50" onClick={onClick}>
      <div
        className={`p-2 rounded-full ${tree.inSeason ? "bg-green-100" : "bg-gray-100"} border-2 border-white shadow-md`}
      >
        {getTreeIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{tree.type} Tree</h3>
          {tree.inSeason && (
            <div className="bg-green-50 text-green-700 border border-green-200 text-xs px-2 py-0.5 rounded-full">
              In Season
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">{tree.species}</p>
        <p className="text-xs text-gray-400 mt-1">Updated {tree.lastUpdated}</p>
      </div>
    </div>
  )
}

