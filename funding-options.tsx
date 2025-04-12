"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, Users, Briefcase, Award, Leaf } from "lucide-react"

export default function FundingOptions() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">FruitFinder Funding Options</h1>
        <p className="text-muted-foreground">Strategies for financing the development and growth</p>
      </div>

      <Tabs defaultValue="bootstrap" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bootstrap">Bootstrapping</TabsTrigger>
          <TabsTrigger value="grants">Grants & Partnerships</TabsTrigger>
          <TabsTrigger value="venture">Venture Capital</TabsTrigger>
        </TabsList>

        <TabsContent value="bootstrap" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  Self-Funding Strategy
                </CardTitle>
                <CardDescription>Approach for bootstrapping the development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <h3 className="font-medium">Phased Development</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Break development into smaller, self-contained phases that can be funded incrementally
                    </p>
                    <ul className="mt-2 text-sm space-y-1">
                      <li>• Start with web MVP to validate concept</li>
                      <li>• Use revenue from early adopters to fund next phases</li>
                      <li>• Prioritize features with highest ROI first</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-medium">Early Monetization</h3>
                    <p className="text-sm text-muted-foreground mt-1">Implement revenue streams from day one</p>
                    <ul className="mt-2 text-sm space-y-1">
                      <li>• Premium subscription tier from initial launch</li>
                      <li>• Pre-sales for annual subscriptions</li>
                      <li>• Sponsored tree listings for businesses</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4 py-2">
                    <h3 className="font-medium">Community Contributions</h3>
                    <p className="text-sm text-muted-foreground mt-1">Leverage community resources to reduce costs</p>
                    <ul className="mt-2 text-sm space-y-1">
                      <li>• Open source components with community contributors</li>
                      <li>• Volunteer beta testers and data contributors</li>
                      <li>• Community-led translation and localization</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Financial Projections
                </CardTitle>
                <CardDescription>Estimated revenue and expenses for bootstrapped approach</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Year 1 Projections</h3>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-1.5">Initial Investment</td>
                          <td className="py-1.5 text-right">$50,000</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-1.5">Monthly Burn Rate</td>
                          <td className="py-1.5 text-right">$8,000</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-1.5">Users (EOY)</td>
                          <td className="py-1.5 text-right">10,000</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-1.5">Paying Users (5%)</td>
                          <td className="py-1.5 text-right">500</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-1.5">Annual Revenue</td>
                          <td className="py-1.5 text-right">$30,000</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-1.5">Net Cash Flow</td>
                          <td className="py-1.5 text-right text-red-500">-$66,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Year 2 Projections</h3>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-1.5">Monthly Burn Rate</td>
                          <td className="py-1.5 text-right">$12,000</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-1.5">Users (EOY)</td>
                          <td className="py-1.5 text-right">50,000</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-1.5">Paying Users (8%)</td>
                          <td className="py-1.5 text-right">4,000</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-1.5">Annual Revenue</td>
                          <td className="py-1.5 text-right">$240,000</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-1.5">Net Cash Flow</td>
                          <td className="py-1.5 text-right text-green-500">$96,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="grants" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  Grant Opportunities
                </CardTitle>
                <CardDescription>Potential grants and funding programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Sustainable Food Innovation Grant</h3>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">$50,000</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Supports innovative solutions that promote sustainable food systems and reduce food waste.
                    </p>
                    <div className="flex justify-between text-xs">
                      <span>Application Deadline: Quarterly</span>
                      <span className="text-amber-600">Match Required: No</span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Environmental Technology Fund</h3>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">$100,000</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Funds technology projects that have a positive environmental impact and promote sustainability.
                    </p>
                    <div className="flex justify-between text-xs">
                      <span>Application Deadline: Annual</span>
                      <span className="text-amber-600">Match Required: 20%</span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Community Food Security Grant</h3>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">$75,000</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Supports projects that improve access to fresh, healthy food in underserved communities.
                    </p>
                    <div className="flex justify-between text-xs">
                      <span>Application Deadline: Biannual</span>
                      <span className="text-amber-600">Match Required: 10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-500" />
                  Strategic Partnerships
                </CardTitle>
                <CardDescription>Potential partners for co-funding and collaboration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Environmental NGOs</h3>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Partnership</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Organizations focused on sustainability and food security that could provide funding, resources,
                      and promotion.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• World Wildlife Fund (WWF)</li>
                      <li>• The Nature Conservancy</li>
                      <li>• Slow Food International</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Academic Institutions</h3>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Research</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Universities with sustainability programs that could provide research funding and technical
                      expertise.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• University of Buenos Aires - Ecology Department</li>
                      <li>• Stanford University - Food Systems Research</li>
                      <li>• MIT Urban Planning Department</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">Corporate Sponsors</h3>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Sponsorship</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Companies with sustainability initiatives that could provide funding in exchange for branding and
                      CSR benefits.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Organic Food Producers</li>
                      <li>• Sustainable Agriculture Companies</li>
                      <li>• Eco-friendly Consumer Brands</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="venture" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-purple-500" />
                  Venture Capital Strategy
                </CardTitle>
                <CardDescription>Approach for securing venture funding</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4 py-2">
                    <h3 className="font-medium">Target Investors</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Focus on investors with alignment to mission and values
                    </p>
                    <ul className="mt-2 text-sm space-y-1">
                      <li>• Impact investors focused on sustainability</li>
                      <li>• VCs with food tech and climate tech portfolios</li>
                      <li>• Angel investors with interest in community platforms</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-medium">Funding Rounds</h3>
                    <p className="text-sm text-muted-foreground mt-1">Staged approach to fundraising</p>
                    <ul className="mt-2 text-sm space-y-1">
                      <li>• Pre-seed: $250K for MVP development</li>
                      <li>• Seed: $1M for mobile apps and growth</li>
                      <li>• Series A: $3-5M for scaling and expansion</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <h3 className="font-medium">Key Metrics for Investors</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Metrics to demonstrate traction and growth potential
                    </p>
                    <ul className="mt-2 text-sm space-y-1">
                      <li>• User growth rate (target: 15% MoM)</li>
                      <li>• Conversion to premium (target: 8-10%)</li>
                      <li>• Engagement metrics (sessions per user, contributions)</li>
                      <li>• Retention rates (30/60/90 day)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-500" />
                  Impact Investment Angle
                </CardTitle>
                <CardDescription>Positioning for impact investors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Environmental Impact</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Quantifiable environmental benefits to highlight to investors
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Reduction in food waste (tons per year)</li>
                      <li>• Carbon footprint reduction from local sourcing</li>
                      <li>• Preservation of urban biodiversity</li>
                      <li>• Reduction in commercial fruit transportation</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Social Impact</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Social benefits that align with impact investment criteria
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Improved access to fresh food in food deserts</li>
                      <li>• Community building and social connections</li>
                      <li>• Educational opportunities about sustainable food</li>
                      <li>• Support for low-income communities</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Sustainable Development Goals</h3>
                    <p className="text-sm text-muted-foreground mb-2">UN SDGs that FruitFinder contributes to</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge className="bg-green-100 text-green-800">SDG 2: Zero Hunger</Badge>
                      <Badge className="bg-green-100 text-green-800">SDG 11: Sustainable Cities</Badge>
                      <Badge className="bg-green-100 text-green-800">SDG 12: Responsible Consumption</Badge>
                      <Badge className="bg-green-100 text-green-800">SDG 13: Climate Action</Badge>
                      <Badge className="bg-green-100 text-green-800">SDG 15: Life on Land</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

