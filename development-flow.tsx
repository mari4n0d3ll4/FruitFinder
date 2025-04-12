"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DevelopmentFlow() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">FruitFinder Development Flow</h1>
        <p className="text-muted-foreground">Detailed diagrams of the development process</p>
      </div>

      <Tabs defaultValue="architecture" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="architecture">System Architecture</TabsTrigger>
          <TabsTrigger value="workflow">Development Workflow</TabsTrigger>
          <TabsTrigger value="timeline">Timeline Visualization</TabsTrigger>
        </TabsList>

        <TabsContent value="architecture" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>FruitFinder System Architecture</CardTitle>
              <CardDescription>Complete system architecture diagram</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mermaid-container">
                {/* This would be rendered as a Mermaid diagram in the actual app */}
                <pre className="text-xs text-muted-foreground bg-muted p-4 rounded-md overflow-auto">
                  {`
graph TD;
    User["User/Client"]
    WebApp["Web Application<br/>(Next.js)"]
    MobileApp["Mobile Apps<br/>(React Native)"]
    API["API Layer<br/>(Next.js API Routes)"]
    Auth["Authentication<br/>(Supabase Auth)"]
    DB["Database<br/>(PostgreSQL + PostGIS)"]
    Storage["File Storage<br/>(Vercel Blob)"]
    Cache["Cache Layer<br/>(Redis)"]
    Notifications["Notification Service<br/>(Push + Email)"]
    Analytics["Analytics<br/>(Plausible)"]
    
    User -->|"Interacts with"| WebApp
    User -->|"Interacts with"| MobileApp
    WebApp -->|"Requests data"| API
    MobileApp -->|"Requests data"| API
    API -->|"Authenticates"| Auth
    API -->|"Queries/Updates"| DB
    API -->|"Stores/Retrieves"| Storage
    API -->|"Caches data"| Cache
    API -->|"Sends"| Notifications
    WebApp -->|"Tracks events"| Analytics
    MobileApp -->|"Tracks events"| Analytics
                  `}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Development Workflow</CardTitle>
              <CardDescription>Process flow from development to deployment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mermaid-container">
                <pre className="text-xs text-muted-foreground bg-muted p-4 rounded-md overflow-auto">
                  {`
graph LR;
    Dev["Development<br/>(Local)"]
    PR["Pull Request"]
    CI["CI/CD Pipeline<br/>(GitHub Actions)"]
    Test["Automated Tests"]
    Review["Code Review"]
    Stage["Staging Environment"]
    Prod["Production<br/>(Vercel)"]
    
    Dev -->|"Create"| PR
    PR -->|"Triggers"| CI
    CI -->|"Runs"| Test
    Test -->|"Passes"| Review
    Review -->|"Approves"| Stage
    Stage -->|"Verified"| Prod
                  `}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Development Timeline</CardTitle>
              <CardDescription>Gantt chart of the development phases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mermaid-container">
                <pre className="text-xs text-muted-foreground bg-muted p-4 rounded-md overflow-auto">
                  {`
gantt
    title FruitFinder Development Timeline
    dateFormat  YYYY-MM-DD
    section Web App
    Core UI Components      :a1, 2024-01-01, 30d
    Map Integration         :a2, after a1, 20d
    Authentication          :a3, after a2, 15d
    Tree Submission Flow    :a4, after a3, 20d
    Search & Filtering      :a5, after a4, 15d
    Web MVP Launch          :milestone, after a5, 0d
    
    section Backend
    Database Schema         :b1, 2024-03-01, 20d
    API Development         :b2, after b1, 30d
    User Management         :b3, after b2, 15d
    Verification System     :b4, after b3, 20d
    Notification System     :b5, after b4, 15d
    
    section Mobile Apps
    React Native Setup      :c1, 2024-06-01, 15d
    Shared Component Library:c2, after c1, 25d
    Offline Functionality   :c3, after c2, 20d
    Native Features         :c4, after c3, 25d
    Beta Testing            :c5, after c4, 30d
    App Store Submission    :milestone, after c5, 0d
    
    section Monetization
    Premium Subscription    :d1, 2024-09-01, 20d
    Web3 Token System       :d2, after d1, 30d
    Community Features      :d3, after d2, 25d
    Analytics Dashboard     :d4, after d3, 15d
    Marketing Launch        :milestone, after d4, 0d
                  `}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

