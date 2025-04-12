"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

// Dynamically import the MapComponent with no SSR
const DynamicMap = dynamic(() => import("./map-component").then((mod) => mod.MapComponent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <Skeleton className="h-full w-full" />
    </div>
  ),
})

export { DynamicMap }

