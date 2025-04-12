"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Info,
  ExternalLink,
  MapPin,
  Sparkles,
  MessageCircle,
  ThumbsUp,
  AlertTriangle,
  Clock,
  LassoIcon as Ladder,
  PenToolIcon as Tool,
  Send,
  CheckCircle,
  XCircle,
  Scale,
} from "lucide-react"
import { AnimeCard } from "@/components/anime-card"
import { HarvestForm } from "@/components/harvest-form"

interface TreeDetailCardProps {
  tree: any
  onClose: () => void
}

export function TreeDetailCard({ tree, onClose }: TreeDetailCardProps) {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(tree.comments || [])
  const [statusVotes, setStatusVotes] = useState({
    stillThere: tree.statusVotes?.stillThere || 0,
    notThere: tree.statusVotes?.notThere || 0,
  })
  const [showHarvestForm, setShowHarvestForm] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Prevent re-renders when tree changes by using a stable reference
  const treeRef = useRef(tree)

  // Only update the reference if the tree ID changes
  useEffect(() => {
    if (treeRef.current.id !== tree.id) {
      treeRef.current = tree
      setComments(tree.comments || [])
      setStatusVotes({
        stillThere: tree.statusVotes?.stillThere || 0,
        notThere: tree.statusVotes?.notThere || 0,
      })
    }
  }, [tree])

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment = {
      id: Date.now(),
      text: newComment,
      author: "You",
      timestamp: new Date().toISOString(),
      likes: 0,
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const handleVote = (type: "stillThere" | "notThere") => {
    setStatusVotes({
      ...statusVotes,
      [type]: statusVotes[type] + 1,
    })
  }

  const getTreeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "lemon":
        return <div className="h-5 w-5 text-yellow-500" />
      case "fig":
        return <div className="h-5 w-5 text-purple-500" />
      case "loquat":
        return <div className="h-5 w-5 text-amber-500" />
      case "mulberry":
        return <div className="h-5 w-5 text-purple-700" />
      case "olive":
        return <div className="h-5 w-5 text-green-600" />
      case "avocado":
        return <div className="h-5 w-5 text-green-700" />
      case "orange":
        return <div className="h-5 w-5 text-orange-500" />
      default:
        return <div className="h-5 w-5 text-green-500" />
    }
  }

  // Check if tree has no more fruits this season
  const hasNoMoreFruit = statusVotes.notThere > statusVotes.stillThere * 2

  return (
    <div
      ref={cardRef}
      className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-50"
      style={{
        transform: "translateZ(0)", // Force GPU acceleration
        willChange: "transform", // Optimize for animations
      }}
    >
      <AnimeCard className="w-full">
        <Tabs defaultValue="details">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="access">Access</TabsTrigger>
            <TabsTrigger value="comments">
              Comments
              {comments.length > 0 && (
                <Badge variant="outline" className="ml-1 bg-pink-50 text-pink-700 border-pink-200">
                  {comments.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="harvest">Harvest</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  {getTreeIcon(tree.type)}
                  <span className="ml-2 font-bold text-lg">{tree.type} Tree</span>
                </div>
                <p className="text-sm text-gray-600 italic">{tree.species}</p>
              </div>
              {tree.inSeason && !hasNoMoreFruit && (
                <div className="bg-pink-50 text-pink-700 border border-pink-200 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  In Season
                </div>
              )}
              {hasNoMoreFruit && (
                <div className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  No Fruit Left
                </div>
              )}
            </div>

            <div className="mt-4 bg-pink-50 p-3 rounded-md border border-pink-100 flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-pink-600 mr-2" />
                <span className="text-sm">Last verified: {tree.lastUpdated}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-green-600 hover:text-green-700 hover:bg-green-50 p-1"
                  onClick={() => handleVote("stillThere")}
                >
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-xs">{statusVotes.stillThere}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                  onClick={() => handleVote("notThere")}
                >
                  <XCircle className="h-4 w-4" />
                  <span className="text-xs">{statusVotes.notThere}</span>
                </Button>
              </div>
            </div>

            {hasNoMoreFruit && (
              <div className="mt-4 bg-amber-50 p-3 rounded-md border border-amber-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">No More Fruit This Season</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Multiple users have reported that this tree has been harvested. Check back next season!
                    </p>
                    <p className="text-xs text-amber-700 mt-1 italic">Expected next harvest: {tree.harvestSeason}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="relative rounded-md overflow-hidden border-2 border-pink-200">
                <img
                  src={tree.photos[0] || "/placeholder.svg?height=300&width=300"}
                  alt={`${tree.type} tree`}
                  className="w-full h-32 object-cover"
                />
                {tree.inSeason && !hasNoMoreFruit && (
                  <div className="absolute top-2 right-2">
                    <Sparkles className="h-5 w-5 text-yellow-400 filter drop-shadow-md animate-pulse" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-pink-700">Harvest Season</p>
                  <p className="text-sm">{tree.harvestSeason}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-pink-700">Added by</p>
                  <p className="text-sm">{tree.contributor}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-pink-700">Last Updated</p>
                  <p className="text-sm">{tree.lastUpdated}</p>
                </div>
              </div>
            </div>
            <p className="text-sm bg-pink-50 p-3 rounded-md border border-pink-100">{tree.description}</p>
          </TabsContent>

          <TabsContent value="access" className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-semibold flex items-center gap-2 text-pink-700">
                  <Ladder className="h-4 w-4" />
                  Access Requirements
                </h3>
                <div className="mt-2 bg-pink-50 p-3 rounded-md border border-pink-100">
                  <p className="text-sm">
                    {tree.accessInfo?.requirements || "No special equipment needed to access this tree."}
                  </p>
                  {tree.accessInfo?.needsLadder && (
                    <div className="flex items-center gap-2 mt-2 text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
                      <AlertTriangle className="h-4 w-4" />
                      <p className="text-sm font-medium">Ladder needed to reach most fruits</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-md font-semibold flex items-center gap-2 text-pink-700">
                  <Tool className="h-4 w-4" />
                  Harvesting Tips
                </h3>
                <div className="mt-2 bg-pink-50 p-3 rounded-md border border-pink-100">
                  <p className="text-sm">
                    {tree.accessInfo?.harvestingTips ||
                      "Gently twist and pull to remove fruit. Avoid damaging branches."}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-md font-semibold flex items-center gap-2 text-pink-700">
                  <AlertTriangle className="h-4 w-4" />
                  Safety Notes
                </h3>
                <div className="mt-2 bg-pink-50 p-3 rounded-md border border-pink-100">
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span>Always thoroughly wash fruit before consuming</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span>Be respectful of the tree and surrounding property</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 mt-1">•</span>
                      <span>Take only what you need and leave some for others</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="p-4">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Add a comment or update about this tree..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="border-pink-200 focus:border-pink-400 focus:ring-pink-400 text-sm resize-none"
                />
                <Button size="icon" className="bg-pink-600 hover:bg-pink-700 self-end" onClick={handleAddComment}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {comments.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No comments yet. Be the first to share an update!</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="bg-pink-50 p-3 rounded-md border border-pink-100">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm">{comment.author}</p>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{comment.text}</p>
                      <div className="flex justify-end mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs flex items-center gap-1 text-gray-500 hover:text-pink-600"
                        >
                          <ThumbsUp className="h-3 w-3" />
                          <span>{comment.likes}</span>
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="harvest" className="p-4">
            {showHarvestForm ? (
              <HarvestForm treeId={tree.id} treeName={tree.type} onSuccess={() => setShowHarvestForm(false)} />
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-md border border-green-200">
                  <h3 className="text-lg font-medium text-green-800 flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    Report Your Harvest
                  </h3>
                  <p className="text-sm text-green-700 mt-2">
                    Did you harvest fruit from this tree? Help our community by reporting how much you collected!
                  </p>
                  <div className="mt-4">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => setShowHarvestForm(true)}
                      disabled={hasNoMoreFruit}
                    >
                      {hasNoMoreFruit ? "No Fruit Available" : "Record Harvest"}
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                  <h3 className="text-md font-medium text-blue-800">Recent Harvests</h3>

                  {/* This would be populated from an API in a real app */}
                  <div className="mt-3 space-y-3">
                    <div className="bg-white p-3 rounded border border-blue-100 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">2.5 kg collected</p>
                        <p className="text-xs text-gray-500">by Maria • 3 days ago</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">$7.50</p>
                        <p className="text-xs text-gray-500">value</p>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded border border-blue-100 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">1.8 kg collected</p>
                        <p className="text-xs text-gray-500">by Carlos • 1 week ago</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">$5.40</p>
                        <p className="text-xs text-gray-500">value</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 border-t border-pink-100">
          <Button variant="outline" size="sm" asChild className="border-pink-200 hover:bg-pink-50">
            <Link href={tree.wikiLink} target="_blank">
              <Info className="h-4 w-4 mr-1" />
              Wiki
              <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
          </Button>
          <Button size="sm" className="bg-pink-600 hover:bg-pink-700" onClick={onClose}>
            <MapPin className="h-4 w-4 mr-1" />
            Directions
          </Button>
        </div>
      </AnimeCard>
    </div>
  )
}

