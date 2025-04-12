"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Code,
  Database,
  Smartphone,
  Globe,
  Users,
  DollarSign,
  Rocket,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react"

export default function RoadmapDashboard() {
  const [activePhase, setActivePhase] = useState("phase1")

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">FruitFinder Development Roadmap</h1>
        <p className="text-muted-foreground">
          A comprehensive plan to transform FruitFinder into a real product with mobile apps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Estimated Timeline"
          value="12 months"
          description="From web MVP to full mobile launch"
          icon={<Calendar className="h-5 w-5 text-blue-500" />}
        />
        <MetricCard
          title="Development Phases"
          value="4 phases"
          description="Structured approach to product development"
          icon={<Code className="h-5 w-5 text-purple-500" />}
        />
        <MetricCard
          title="Platform Targets"
          value="3 platforms"
          description="Web, iOS, and Android applications"
          icon={<Smartphone className="h-5 w-5 text-green-500" />}
        />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Development Timeline</h2>
        <div className="relative">
          <div className="absolute left-0 top-5 w-full h-1 bg-gray-200"></div>
          <div className="flex justify-between relative">
            <TimelinePoint
              label="Phase 1: Web MVP"
              isActive={activePhase === "phase1"}
              onClick={() => setActivePhase("phase1")}
            />
            <TimelinePoint
              label="Phase 2: Backend & API"
              isActive={activePhase === "phase2"}
              onClick={() => setActivePhase("phase2")}
            />
            <TimelinePoint
              label="Phase 3: Mobile Apps"
              isActive={activePhase === "phase3"}
              onClick={() => setActivePhase("phase3")}
            />
            <TimelinePoint
              label="Phase 4: Scale & Monetize"
              isActive={activePhase === "phase4"}
              onClick={() => setActivePhase("phase4")}
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        {activePhase === "phase1" && (
          <PhaseCard
            title="Phase 1: Web MVP (Months 1-3)"
            description="Develop the core web application with essential features"
            tasks={[
              { name: "Complete core UI components", status: "completed" },
              { name: "Implement real map integration", status: "completed" },
              { name: "Set up authentication system", status: "in-progress" },
              { name: "Create tree submission workflow", status: "in-progress" },
              { name: "Implement search and filtering", status: "planned" },
              { name: "Deploy web MVP to production", status: "planned" },
            ]}
          />
        )}

        {activePhase === "phase2" && (
          <PhaseCard
            title="Phase 2: Backend & API (Months 3-6)"
            description="Build robust backend infrastructure and APIs"
            tasks={[
              { name: "Set up database schema", status: "planned" },
              { name: "Implement RESTful API endpoints", status: "planned" },
              { name: "Create user management system", status: "planned" },
              { name: "Develop contribution verification system", status: "planned" },
              { name: "Implement notification system", status: "planned" },
              { name: "Set up analytics and monitoring", status: "planned" },
            ]}
          />
        )}

        {activePhase === "phase3" && (
          <PhaseCard
            title="Phase 3: Mobile Apps (Months 6-9)"
            description="Develop native mobile applications for iOS and Android"
            tasks={[
              { name: "Set up React Native project", status: "planned" },
              { name: "Implement shared component library", status: "planned" },
              { name: "Develop offline functionality", status: "planned" },
              { name: "Integrate native device features", status: "planned" },
              { name: "Conduct beta testing", status: "planned" },
              { name: "Prepare app store submissions", status: "planned" },
            ]}
          />
        )}

        {activePhase === "phase4" && (
          <PhaseCard
            title="Phase 4: Scale & Monetize (Months 9-12)"
            description="Scale the platform and implement monetization strategies"
            tasks={[
              { name: "Implement premium subscription tier", status: "planned" },
              { name: "Develop Web3 token system", status: "planned" },
              { name: "Create community features", status: "planned" },
              { name: "Optimize for performance at scale", status: "planned" },
              { name: "Implement analytics dashboard", status: "planned" },
              { name: "Launch marketing campaigns", status: "planned" },
            ]}
          />
        )}
      </div>

      <Tabs defaultValue="technical" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="technical">Technical Architecture</TabsTrigger>
          <TabsTrigger value="business">Business Strategy</TabsTrigger>
          <TabsTrigger value="resources">Resource Requirements</TabsTrigger>
        </TabsList>

        <TabsContent value="technical" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backend Infrastructure
                </CardTitle>
                <CardDescription>Core services and data storage</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      Database
                    </Badge>
                    <span>PostgreSQL with PostGIS for geospatial queries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      API
                    </Badge>
                    <span>Next.js API routes with serverless functions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      Auth
                    </Badge>
                    <span>Supabase Auth with social login options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      Storage
                    </Badge>
                    <span>Vercel Blob for image storage and optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      Caching
                    </Badge>
                    <span>Redis for performance optimization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Mobile Architecture
                </CardTitle>
                <CardDescription>Native app development approach</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      Framework
                    </Badge>
                    <span>React Native with TypeScript</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      State
                    </Badge>
                    <span>React Query for data fetching and caching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      Navigation
                    </Badge>
                    <span>React Navigation with tab and stack navigators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      Maps
                    </Badge>
                    <span>React Native Maps with offline tile caching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      Native
                    </Badge>
                    <span>Camera, Geolocation, and Push Notifications</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Deployment Architecture
                </CardTitle>
                <CardDescription>Infrastructure and deployment strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Web Application</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Next.js on Vercel</li>
                      <li>• Edge functions for global performance</li>
                      <li>• CDN for static assets</li>
                      <li>• CI/CD pipeline with GitHub Actions</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Mobile Applications</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• iOS App Store distribution</li>
                      <li>• Google Play Store distribution</li>
                      <li>• TestFlight for beta testing</li>
                      <li>• Firebase App Distribution</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Backend Services</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Supabase for database and auth</li>
                      <li>• Vercel Blob for storage</li>
                      <li>• Upstash Redis for caching</li>
                      <li>• Monitoring with Sentry</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="business" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Monetization Strategy
                </CardTitle>
                <CardDescription>Revenue streams and business model</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <h3 className="font-medium">Freemium Model</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Basic features free, premium features behind subscription
                    </p>
                    <ul className="mt-2 text-sm space-y-1">
                      <li>• Premium: $4.99/month or $49.99/year</li>
                      <li>• Features: Offline maps, notifications, EcoTours</li>
                      <li>• Estimated conversion: 5-10% of active users</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-medium">Web3 Integration</h3>
                    <p className="text-sm text-muted-foreground mt-1">Token economy for contributions and governance</p>
                    <ul className="mt-2 text-sm space-y-1">
                      <li>• FruitTokens for verified contributions</li>
                      <li>• NFT badges for active contributors</li>
                      <li>• DAO governance for community decisions</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4 py-2">
                    <h3 className="font-medium">Partnerships</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Strategic partnerships with aligned organizations
                    </p>
                    <ul className="mt-2 text-sm space-y-1">
                      <li>• Foraging tour companies</li>
                      <li>• Sustainable food organizations</li>
                      <li>• Environmental education programs</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Building
                </CardTitle>
                <CardDescription>Strategies for user engagement and growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-amber-500 pl-4 py-2">
                    <h3 className="font-medium">Gamification</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Engagement mechanics to encourage participation
                    </p>
                    <ul className="mt-2 text-sm space-y-1">
                      <li>• Achievement badges for contributions</li>
                      <li>• Leaderboards for active foragers</li>
                      <li>• Seasonal challenges and events</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-pink-500 pl-4 py-2">
                    <h3 className="font-medium">Content Strategy</h3>
                    <p className="text-sm text-muted-foreground mt-1">Educational content to drive engagement</p>
                    <ul className="mt-2 text-sm space-y-1">
                      <li>• Foraging guides and tutorials</li>
                      <li>• Seasonal harvesting calendars</li>
                      <li>• Recipes and preservation methods</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-4 py-2">
                    <h3 className="font-medium">Community Events</h3>
                    <p className="text-sm text-muted-foreground mt-1">Online and offline events to build community</p>
                    <ul className="mt-2 text-sm space-y-1">
                      <li>• Group foraging expeditions</li>
                      <li>• Virtual workshops and webinars</li>
                      <li>• Annual foraging festivals</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  Go-to-Market Strategy
                </CardTitle>
                <CardDescription>Launch plan and marketing approach</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Pre-launch (Months 1-3)</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Landing page with email signup</li>
                      <li>• Social media presence establishment</li>
                      <li>• Content marketing initiation</li>
                      <li>• Beta tester recruitment</li>
                      <li>• Partnership outreach</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Launch (Months 3-6)</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Web MVP public release</li>
                      <li>• PR campaign targeting sustainability media</li>
                      <li>• Influencer partnerships</li>
                      <li>• Community seeding in key locations</li>
                      <li>• Initial data population campaigns</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Growth (Months 6-12)</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Mobile app launches</li>
                      <li>• Regional expansion strategy</li>
                      <li>• Premium tier introduction</li>
                      <li>• Community ambassador program</li>
                      <li>• Educational content scaling</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Development Team</CardTitle>
                <CardDescription>Required roles and expertise</CardDescription>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Role</th>
                      <th className="text-left py-2">Expertise</th>
                      <th className="text-left py-2">Allocation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Full-stack Developer</td>
                      <td className="py-2">Next.js, React, TypeScript</td>
                      <td className="py-2">Full-time</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Mobile Developer</td>
                      <td className="py-2">React Native, iOS/Android</td>
                      <td className="py-2">Full-time</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Backend Developer</td>
                      <td className="py-2">Node.js, PostgreSQL, APIs</td>
                      <td className="py-2">Part-time</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">UI/UX Designer</td>
                      <td className="py-2">Mobile & Web Design</td>
                      <td className="py-2">Part-time</td>
                    </tr>
                    <tr>
                      <td className="py-2">DevOps Engineer</td>
                      <td className="py-2">CI/CD, Cloud Infrastructure</td>
                      <td className="py-2">Part-time</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget Estimation</CardTitle>
                <CardDescription>Estimated costs for development and launch</CardDescription>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Category</th>
                      <th className="text-left py-2">Description</th>
                      <th className="text-right py-2">Estimated Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Development</td>
                      <td className="py-2">Team salaries and contractors</td>
                      <td className="py-2 text-right">$180,000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Infrastructure</td>
                      <td className="py-2">Hosting, databases, services</td>
                      <td className="py-2 text-right">$15,000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Marketing</td>
                      <td className="py-2">Launch campaigns and content</td>
                      <td className="py-2 text-right">$30,000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Legal</td>
                      <td className="py-2">Terms, privacy, compliance</td>
                      <td className="py-2 text-right">$10,000</td>
                    </tr>
                    <tr>
                      <td className="py-2">Contingency</td>
                      <td className="py-2">Buffer for unexpected costs</td>
                      <td className="py-2 text-right">$25,000</td>
                    </tr>
                    <tr className="border-t font-medium">
                      <td className="py-2">Total</td>
                      <td className="py-2"></td>
                      <td className="py-2 text-right">$260,000</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Technology Stack</CardTitle>
                <CardDescription>Required technologies and services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Frontend</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Next.js 14+</li>
                      <li>• React 18+</li>
                      <li>• TypeScript</li>
                      <li>• Tailwind CSS</li>
                      <li>• shadcn/ui components</li>
                      <li>• Leaflet/Mapbox for maps</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Backend</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Node.js</li>
                      <li>• PostgreSQL with PostGIS</li>
                      <li>• Supabase</li>
                      <li>• Redis</li>
                      <li>• Vercel Blob</li>
                      <li>• Serverless functions</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Mobile</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• React Native</li>
                      <li>• Expo</li>
                      <li>• React Navigation</li>
                      <li>• React Native Maps</li>
                      <li>• AsyncStorage</li>
                      <li>• Native device APIs</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">DevOps & Tools</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• GitHub</li>
                      <li>• GitHub Actions</li>
                      <li>• Vercel</li>
                      <li>• Sentry</li>
                      <li>• Plausible Analytics</li>
                      <li>• Figma</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Development Flow Diagrams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Web to Mobile Development Flow</CardTitle>
              <CardDescription>Process for extending web app to mobile platforms</CardDescription>
            </CardHeader>
            <CardContent className="overflow-auto">
              <div className="min-w-[500px]">
                <img
                  src="/placeholder.svg?height=300&width=600&text=Web+to+Mobile+Flow+Diagram"
                  alt="Web to Mobile Development Flow"
                  className="w-full h-auto"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Flow Architecture</CardTitle>
              <CardDescription>How data flows between components and services</CardDescription>
            </CardHeader>
            <CardContent className="overflow-auto">
              <div className="min-w-[500px]">
                <img
                  src="/placeholder.svg?height=300&width=600&text=Data+Flow+Architecture+Diagram"
                  alt="Data Flow Architecture"
                  className="w-full h-auto"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ title, value, description, icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function TimelinePoint({ label, isActive, onClick }) {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors ${
          isActive ? "bg-primary text-primary-foreground" : "bg-gray-100 hover:bg-gray-200 text-gray-600"
        }`}
      >
        {isActive ? "✓" : "○"}
      </button>
      <span className={`text-xs mt-2 text-center max-w-[80px] ${isActive ? "font-medium" : ""}`}>{label}</span>
    </div>
  )
}

function PhaseCard({ title, description, tasks }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li key={index} className="flex items-start gap-3">
              {task.status === "completed" && <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />}
              {task.status === "in-progress" && <Clock className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />}
              {task.status === "planned" && <AlertCircle className="h-5 w-5 text-gray-300 mt-0.5 flex-shrink-0" />}
              <div>
                <p className={task.status === "completed" ? "line-through text-muted-foreground" : ""}>{task.name}</p>
                {task.status === "in-progress" && (
                  <Badge variant="outline" className="mt-1 bg-amber-50 text-amber-700 border-amber-200">
                    In Progress
                  </Badge>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

