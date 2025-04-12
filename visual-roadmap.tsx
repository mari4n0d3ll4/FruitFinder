"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function VisualRoadmap() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">FruitFinder Visual Roadmap</h1>
        <p className="text-muted-foreground">Visual representation of the development journey</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Development Roadmap</CardTitle>
            <CardDescription>Complete development timeline with milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mermaid-container">
              <pre className="text-xs text-muted-foreground bg-muted p-4 rounded-md overflow-auto">
                {`
gantt
    title FruitFinder Development Roadmap
    dateFormat  YYYY-MM-DD
    axisFormat  %b %Y
    todayMarker off
    
    section 1. Web MVP
    Project Setup                   :a1, 2024-01-01, 10d
    Core UI Components              :a2, after a1, 20d
    Map Integration                 :a3, after a2, 15d
    Authentication System           :a4, after a3, 15d
    Tree Submission Flow            :a5, after a4, 15d
    Search & Filtering              :a6, after a5, 15d
    Web MVP Launch                  :milestone, after a6, 0d
    
    section 2. Backend & API
    Database Schema Design          :b1, 2024-03-01, 15d
    API Development                 :b2, after b1, 20d
    User Management System          :b3, after b2, 15d
    Contribution Verification       :b4, after b3, 15d
    Notification System             :b5, after b4, 15d
    Analytics & Monitoring          :b6, after b5, 10d
    Backend Launch                  :milestone, after b6, 0d
    
    section 3. Mobile Apps
    React Native Setup              :c1, 2024-06-01, 15d
    Shared Component Library        :c2, after c1, 20d
    Offline Functionality           :c3, after c2, 15d
    Native Device Features          :c4, after c3, 20d
    Beta Testing                    :c5, after c4, 20d
    App Store Submission            :c6, after c5, 10d
    Mobile App Launch               :milestone, after c6, 0d
    
    section 4. Scale & Monetize
    Premium Subscription Tier       :d1, 2024-09-01, 15d
    Web3 Token System               :d2, after d1, 20d
    Community Features              :d3, after d2, 15d
    Performance Optimization        :d4, after d3, 15d
    Analytics Dashboard             :d5, after d4, 10d
    Marketing Campaign              :d6, after d5, 15d
    Full Platform Launch            :milestone, after d6, 0d
                `}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Architecture</CardTitle>
            <CardDescription>High-level architecture diagram</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mermaid-container">
              <pre className="text-xs text-muted-foreground bg-muted p-4 rounded-md overflow-auto">
                {`
flowchart TD
    subgraph "Client Layer"
        WebApp["Web Application\\n(Next.js)"]
        MobileApp["Mobile Apps\\n(React Native)"]
        PWA["Progressive Web App"]
    end
    
    subgraph "API Layer"
        API["API Gateway\\n(Next.js API Routes)"]
        Auth["Authentication\\n(Supabase Auth)"]
    end
    
    subgraph "Data Layer"
        DB[(PostgreSQL + PostGIS)]
        Cache[(Redis Cache)]
        Storage["File Storage\\n(Vercel Blob)"]
    end
    
    subgraph "External Services"
        Maps["Map Services\\n(Leaflet/Mapbox)"]
        Push["Push Notifications"]
        Analytics["Analytics"]
    end
    
    WebApp <--> API
    MobileApp <--> API
    PWA <--> API
    
    API <--> Auth
    API <--> DB
    API <--> Cache
    API <--> Storage
    
    WebApp <--> Maps
    MobileApp <--> Maps
    PWA <--> Maps
    
    MobileApp <--> Push
    PWA <--> Push
    
    WebApp --> Analytics
    MobileApp --> Analytics
    PWA --> Analytics
                `}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Journey</CardTitle>
            <CardDescription>End-to-end user experience flow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mermaid-container">
              <pre className="text-xs text-muted-foreground bg-muted p-4 rounded-md overflow-auto">
                {`
flowchart LR
    Start(["User Starts"]) --> Discover["Discover App"]
    Discover --> Install["Install App"]
    Install --> Onboard["Onboarding"]
    Onboard --> Map["Browse Map"]
    
    Map --> FindTree["Find Nearby Tree"]
    Map --> AddTree["Add New Tree"]
    
    FindTree --> ViewDetails["View Tree Details"]
    ViewDetails --> Navigate["Get Directions"]
    Navigate --> Harvest["Harvest Fruit"]
    Harvest --> Report["Report Harvest"]
    
    AddTree --> LocateTree["Select Location"]
    LocateTree --> EnterInfo["Enter Tree Info"]
    EnterInfo --> UploadPhotos["Upload Photos"]
    UploadPhotos --> Submit["Submit Tree"]
    Submit --> Verify["Community Verification"]
    
    Report --> Reward["Earn Tokens"]
    Verify --> Reward
    
    Reward --> Premium["Unlock Premium"]
    Premium --> Community["Join Community"]
    Community --> Contribute["Ongoing Contributions"]
    
    classDef primary fill:#f9a8d4,stroke:#be185d,color:#be185d
    classDef secondary fill:#dbeafe,stroke:#3b82f6,color:#1e40af
    classDef success fill:#dcfce7,stroke:#16a34a,color:#166534
    
    class Start,Discover,Install,Onboard primary
    class Map,FindTree,ViewDetails,Navigate,Harvest,Report secondary
    class AddTree,LocateTree,EnterInfo,UploadPhotos,Submit,Verify secondary
    class Reward,Premium,Community,Contribute success
                `}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

