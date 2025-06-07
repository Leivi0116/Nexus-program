"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Loader2, User, Gamepad2, Trophy, Zap, Shield, Swords, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface UserData {
  uid: string
  data: Record<string, string>
  rowIndex: number
}

interface SearchResult {
  found: boolean
  userData?: UserData
  headers: string[]
  message?: string
}

export default function WildRiftPlayerLookup() {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [uid, setUid] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchAnimation, setSearchAnimation] = useState(false)

  // Trigger search animation
  useEffect(() => {
    if (loading) {
      setSearchAnimation(true)
    }
  }, [loading])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!uid.trim()) {
      setError("Please enter a Summoner ID to search")
      return
    }

    try {
      setLoading(true)
      setError(null)
      setSearchResult(null)

      const response = await fetch(`/api/search-uid?uid=${encodeURIComponent(uid.trim())}`)

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`)
      }

      const result = await response.json()
      setSearchResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during search")
    } finally {
      setLoading(false)
      setTimeout(() => setSearchAnimation(false), 500)
    }
  }

  const clearSearch = () => {
    setUid("")
    setSearchResult(null)
    setError(null)
  }

  // Filter out the name field from display
  const getDisplayData = (data: Record<string, string>) => {
    const filteredData: Record<string, string> = {}
    Object.entries(data).forEach(([key, value]) => {
      if (key.toLowerCase() !== "name") {
        filteredData[key] = value
      }
    })
    return filteredData
  }

  // Get icon for different stat types
  const getStatIcon = (fieldName: string) => {
    const field = fieldName.toLowerCase()
    if (field.includes("rank") || field.includes("tier")) return <Trophy className="h-4 w-4" />
    if (field.includes("win") || field.includes("victory")) return <Star className="h-4 w-4" />
    if (field.includes("k/d") || field.includes("kill")) return <Swords className="h-4 w-4" />
    if (field.includes("level") || field.includes("experience")) return <Shield className="h-4 w-4" />
    if (field.includes("match") || field.includes("game")) return <Gamepad2 className="h-4 w-4" />
    return <Zap className="h-4 w-4" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1419] via-[#1e2328] to-[#0f1419] text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#c89b3c] opacity-5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-[#0596aa] opacity-5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-[#c89b3c] opacity-5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-[#c89b3c] to-[#f0e6d2] blur-lg opacity-30 rounded-full"></div>
              <div className="relative bg-gradient-to-r from-[#1e2328] to-[#3c3c41] p-6 rounded-full border-2 border-[#c89b3c]">
                <Gamepad2 className="h-12 w-12 text-[#c89b3c]" />
              </div>
            </div>
            <h1 className="text-6xl font-bold text-center mb-2">
              <span className="bg-gradient-to-r from-[#f0e6d2] via-[#c89b3c] to-[#f0e6d2] bg-clip-text text-transparent">
                WILD RIFT
              </span>
            </h1>
            <h2 className="text-2xl font-semibold text-[#0596aa] mb-4">SUMMONER LOOKUP</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#c89b3c] to-transparent rounded-full"></div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Search Form */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#c89b3c] to-[#0596aa] rounded-2xl blur opacity-20"></div>
            <Card className="relative bg-gradient-to-br from-[#1e2328] to-[#3c3c41] border-2 border-[#463714] rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#463714] to-[#1e2328] px-6 py-4 border-b border-[#463714]">
                <div className="flex items-center">
                  <Search className="h-5 w-5 text-[#c89b3c] mr-3" />
                  <h2 className="text-xl font-bold text-[#f0e6d2]">FIND SUMMONER</h2>
                </div>
                <p className="text-sm text-[#a09b8c] mt-1">Enter Summoner ID to view profile and statistics</p>
              </div>
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#c89b3c] h-5 w-5" />
                      <Input
                        placeholder="Enter Summoner ID..."
                        value={uid}
                        onChange={(e) => setUid(e.target.value)}
                        className="pl-12 h-12 bg-[#0f1419] border-2 border-[#463714] text-[#f0e6d2] placeholder-[#5bc0de] focus:border-[#c89b3c] focus:ring-[#c89b3c] rounded-xl text-lg"
                        disabled={loading}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading || !uid.trim()}
                      className={`h-12 px-8 bg-gradient-to-r from-[#c89b3c] to-[#f0e6d2] hover:from-[#f0e6d2] hover:to-[#c89b3c] text-[#1e2328] font-bold rounded-xl transition-all duration-300 ${searchAnimation ? "animate-pulse" : ""}`}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          SEARCHING...
                        </>
                      ) : (
                        <>
                          <Search className="h-5 w-5 mr-2" />
                          SEARCH
                        </>
                      )}
                    </Button>
                    {(uid || searchResult) && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={clearSearch}
                        className="h-12 px-6 border-2 border-[#463714] text-[#a09b8c] hover:bg-[#463714] hover:text-[#f0e6d2] rounded-xl"
                      >
                        CLEAR
                      </Button>
                    )}
                  </div>
                </form>

                {error && (
                  <Alert className="mt-4 bg-gradient-to-r from-[#c8aa6e] to-[#f0e6d2] border-[#c8aa6e] text-[#1e2328] rounded-xl">
                    <AlertDescription className="flex items-center font-semibold">
                      <span className="h-2 w-2 rounded-full bg-[#1e2328] mr-3 animate-pulse"></span>
                      {error}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Search Results */}
          {searchResult && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0596aa] to-[#c89b3c] rounded-2xl blur opacity-20"></div>
              <Card className="relative bg-gradient-to-br from-[#1e2328] to-[#3c3c41] border-2 border-[#0596aa] rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#0596aa] to-[#1e2328] px-6 py-4 border-b border-[#0596aa]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Trophy className="h-6 w-6 text-[#c89b3c] mr-3" />
                      <h2 className="text-2xl font-bold text-[#f0e6d2]">SUMMONER PROFILE</h2>
                    </div>
                    {searchResult.found && (
                      <Badge className="bg-gradient-to-r from-[#c89b3c] to-[#f0e6d2] text-[#1e2328] px-4 py-1 text-sm font-bold">
                        ACTIVE
                      </Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-6">
                  {searchResult.found && searchResult.userData ? (
                    <div className="space-y-6">
                      {/* Summoner Header */}
                      <div className="flex items-center justify-center mb-8">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-[#c89b3c] to-[#0596aa] rounded-full blur-md opacity-50"></div>
                          <div className="relative bg-gradient-to-br from-[#3c3c41] to-[#1e2328] p-4 rounded-full border-2 border-[#c89b3c]">
                            <User className="h-16 w-16 text-[#f0e6d2]" />
                          </div>
                        </div>
                        <div className="ml-6">
                          <h3 className="text-3xl font-bold text-[#f0e6d2] mb-2">{searchResult.userData.uid}</h3>
                          <div className="flex items-center gap-3">
                            <Badge className="bg-[#463714] text-[#c89b3c] px-3 py-1">
                              ID: {searchResult.userData.uid}
                            </Badge>
                            <Badge className="bg-[#0f1419] border border-[#0596aa] text-[#0596aa] px-3 py-1">
                              PROFILE #{searchResult.userData.rowIndex}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(getDisplayData(searchResult.userData.data)).map(([field, value], index) => (
                          <div
                            key={field}
                            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#3c3c41] to-[#1e2328] border border-[#463714] hover:border-[#c89b3c] transition-all duration-300"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#c89b3c] to-[#0596aa] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                            <div className="relative p-4">
                              <div className="flex items-center mb-2">
                                <div className="text-[#c89b3c] mr-2">{getStatIcon(field)}</div>
                                <h4 className="text-sm font-semibold text-[#a09b8c] uppercase tracking-wide">
                                  {field}
                                </h4>
                              </div>
                              <div className="text-xl font-bold text-[#f0e6d2]">
                                {value || (
                                  <span className="text-[#5bc0de] italic text-base font-normal">Not Available</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-[#5bc0de] rounded-full blur-lg opacity-20"></div>
                        <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#3c3c41] to-[#1e2328] border-2 border-[#5bc0de] flex items-center justify-center">
                          <User className="h-12 w-12 text-[#5bc0de]" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-[#f0e6d2] mb-3">SUMMONER NOT FOUND</h3>
                      <p className="text-[#a09b8c] mb-6 max-w-md mx-auto">
                        The Summoner ID "{uid}" doesn't exist in our database.
                      </p>
                      <div className="bg-gradient-to-r from-[#1e2328] to-[#3c3c41] rounded-xl p-6 max-w-md mx-auto border border-[#463714]">
                        <h4 className="text-[#c89b3c] font-semibold mb-3">TROUBLESHOOTING TIPS:</h4>
                        <ul className="text-sm text-[#a09b8c] space-y-2 text-left">
                          <li className="flex items-start">
                            <span className="text-[#c89b3c] mr-2">•</span>
                            Check if the Summoner ID is spelled correctly
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#c89b3c] mr-2">•</span>
                            Verify the Summoner exists in the database
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#c89b3c] mr-2">•</span>
                            Remove any extra spaces or special characters
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Instructions */}
          {!searchResult && !loading && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#463714] to-[#0596aa] rounded-2xl blur opacity-10"></div>
              <Card className="relative bg-gradient-to-br from-[#1e2328] to-[#3c3c41] border border-[#463714] rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#463714] to-[#1e2328] px-6 py-4 border-b border-[#463714]">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-[#c89b3c] mr-3" />
                    <h2 className="text-xl font-bold text-[#f0e6d2]">HOW TO USE</h2>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#c89b3c] to-[#f0e6d2] rounded-full flex items-center justify-center text-[#1e2328] font-bold text-sm mr-4">
                          1
                        </div>
                        <div>
                          <h3 className="text-[#f0e6d2] font-semibold mb-1">Enter Summoner ID</h3>
                          <p className="text-[#a09b8c] text-sm">
                            Type the unique Summoner identifier in the search field
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#c89b3c] to-[#f0e6d2] rounded-full flex items-center justify-center text-[#1e2328] font-bold text-sm mr-4">
                          2
                        </div>
                        <div>
                          <h3 className="text-[#f0e6d2] font-semibold mb-1">Search Profile</h3>
                          <p className="text-[#a09b8c] text-sm">
                            Click "SEARCH" to find the summoner's profile and stats
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#0596aa] to-[#5bc0de] rounded-full flex items-center justify-center text-[#1e2328] font-bold text-sm mr-4">
                          3
                        </div>
                        <div>
                          <h3 className="text-[#f0e6d2] font-semibold mb-1">View Statistics</h3>
                          <p className="text-[#a09b8c] text-sm">
                            Browse detailed stats and achievements in card format
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#0596aa] to-[#5bc0de] rounded-full flex items-center justify-center text-[#1e2328] font-bold text-sm mr-4">
                          4
                        </div>
                        <div>
                          <h3 className="text-[#f0e6d2] font-semibold mb-1">Analyze Performance</h3>
                          <p className="text-[#a09b8c] text-sm">
                            Review rank, win rate, and other key performance metrics
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-[#0f1419] to-[#1e2328] rounded-xl border border-[#463714]">
                    <p className="text-sm text-[#5bc0de] text-center">
                      <strong>Note:</strong> The system searches for Summoner IDs in our Wild Rift database and returns
                      all associated statistics and achievements.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 py-8 border-t border-[#463714]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Gamepad2 className="h-5 w-5 text-[#c89b3c] mr-2" />
              <span className="text-[#a09b8c] font-semibold">WILD RIFT SUMMONER DATABASE</span>
            </div>
            <div className="text-[#5bc0de] text-sm">© 2025 Riot Games, Inc. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
