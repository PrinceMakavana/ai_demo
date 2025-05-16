"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { PlusCircle, X } from "lucide-react"
import Footer from "@/components/Footer"
import { Card, CardContent } from "@/components/ui/card"
import {
  useGenerateQueriesMutation,
  useUpdateSearchQueriesMutation,
  useGenerateAnalysisMutation,
} from "@/store/services/project"
import type { RootState } from "@/store/services/domainData"
import { setDomainData } from "@/store/services/domainData"
import { toast } from "sonner"

interface Query {
  id: string
  text: string
  importance: number
}

const QuerySelection = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { domain, selectedEngines, selectedCompetitors } = location.state || {
    domain: "example.com",
    selectedEngines: ["perplexity"],
    selectedCompetitors: ["competitor1.com"],
  }

  const [useCustomQueries, setUseCustomQueries] = useState(true)
  const [newQuery, setNewQuery] = useState("")
  const [queries, setQueries] = useState<Query[]>([
    { id: "q1", text: "product features", importance: 4 },
    { id: "q2", text: "pricing comparison", importance: 5 },
    { id: "q3", text: "industry solutions", importance: 3 },
  ])

  // Get domain data from Redux store
  const domainData = useSelector((state: RootState) => {
    return (state.domainData?.data as any) || {}
  })

  // API hooks
  const [generateQueries, { isLoading: generatingQueries }] = useGenerateQueriesMutation()
  const [updateSearchQueries, { isLoading: updatingQueries }] = useUpdateSearchQueriesMutation()
  const [generateAnalysis, { isLoading: generatingAnalysis }] = useGenerateAnalysisMutation()

  useEffect(() => {
    // If we already have search queries in the Redux store, use them
    if (
      domainData?.search_queries &&
      Array.isArray(domainData.search_queries) &&
      domainData.search_queries.length > 0
    ) {
      console.log("Using search queries from Redux store:", domainData.search_queries)
      const formattedQueries = domainData.search_queries.map((q: any, index: number) => ({
        id: `q${index + 1}`,
        text: q.query,
        importance: q.importance || 3,
      }))
      setQueries(formattedQueries)
    } else if (!useCustomQueries && domainData?.project_id) {
      // If we're using auto-generated queries and don't have any yet, generate them
      handleGenerateQueries()
    }
  }, [domainData, useCustomQueries])

  const handleGenerateQueries = async () => {
    if (!domainData.project_id) {
      toast.error("Project ID not found")
      return
    }

    try {
      const response = await generateQueries({
        project_id: domainData.project_id,
      }).unwrap()

      console.log("Queries generated successfully:", response)

      if (response && response.search_queries && Array.isArray(response.search_queries)) {
        const formattedQueries = response.search_queries.map((q: any, index: number) => ({
          id: `q${index + 1}`,
          text: q.query,
          importance: q.importance || 3,
        }))
        setQueries(formattedQueries)
        toast.success("Queries generated successfully")
      }
    } catch (error) {
      console.error("Error generating queries:", error)
      toast.error("Failed to generate queries")
    }
  }

  const handleAddQuery = () => {
    if (newQuery && !queries.some((q) => q.text === newQuery)) {
      setQueries([...queries, { id: `q${queries.length + 1}`, text: newQuery, importance: 3 }])
      setNewQuery("")
    }
  }

  const handleImportanceChange = (id: string, value: number[]) => {
    setQueries((prev) => prev.map((query) => (query.id === id ? { ...query, importance: value[0] } : query)))
  }

  const handleRemoveQuery = (id: string) => {
    setQueries((prev) => prev.filter((query) => query.id !== id))
  }

  const handleContinue = async () => {
    if (!domainData.project_id) {
      toast.error("Project ID not found")
      return
    }

    // Format queries for the API
    const formattedQueries = queries.map((q) => ({
      query: q.text,
      importance: q.importance,
    }))

    try {
      // First, update the search queries
      const updateResponse = await updateSearchQueries({
        project_id: domainData.project_id,
        search_queries: formattedQueries,
      }).unwrap()

      console.log("Search queries updated successfully:", updateResponse)

      // Update the Redux store
      dispatch(
        setDomainData({
          ...domainData,
          search_queries: formattedQueries,
        }),
      )

      // Then, generate the analysis
      const analysisResponse = await generateAnalysis({
        project_id: domainData.project_id,
        num_runs_p: 1,
      }).unwrap()

      console.log("Analysis generation started:", analysisResponse)

      if (analysisResponse && analysisResponse.status === "started") {
        toast.success("Analysis generation started successfully")

        // Navigate to the dashboard
        navigate("/dashboard", {
          state: {
            domain,
            selectedEngines,
            selectedCompetitors,
            queries: formattedQueries,
          },
        })
      } else {
        toast.error("Failed to start analysis generation")
      }
    } catch (error) {
      console.error("Error in query submission process:", error)
      toast.error("Failed to process queries")
    }
  }

  return (
    <div className="flex flex-col min-h-full">
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          {/* Progress indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Step 3 of 4</div>
              <div className="text-sm text-gray-500">{domain}</div>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-queryosity-blue h-2 rounded-full w-3/4"></div>
            </div>
          </div>

          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-queryosity-blue mb-6">
                Do you have any queries in mind that you want to evaluate your domain's AI Readiness for?
              </h1>

              <div className="flex items-center justify-between py-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Switch id="query-toggle" checked={useCustomQueries} onCheckedChange={setUseCustomQueries} />
                  <Label htmlFor="query-toggle">Yes, I have specific queries</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-toggle"
                    checked={!useCustomQueries}
                    onCheckedChange={(checked) => {
                      setUseCustomQueries(!checked)
                      if (checked && domainData?.project_id) {
                        handleGenerateQueries()
                      }
                    }}
                  />
                  <Label htmlFor="auto-toggle">No, generate queries for me</Label>
                </div>
              </div>

              {useCustomQueries ? (
                <>
                  <div className="mb-6">
                    <div className="flex gap-2 mb-4">
                      <Input
                        placeholder="Add query or prompt (e.g., 'best project management software')"
                        value={newQuery}
                        onChange={(e) => setNewQuery(e.target.value)}
                        className="flex-grow"
                      />
                      <Button onClick={handleAddQuery} variant="outline" size="icon">
                        <PlusCircle className="h-5 w-5" />
                      </Button>
                    </div>

                    {queries.length > 0 ? (
                      <div className="space-y-4">
                        {queries.map((query) => (
                          <div key={query.id} className="border rounded-lg p-4 bg-white">
                            <div className="flex justify-between items-start mb-3">
                              <div className="font-medium">{query.text}</div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveQuery(query.id)}
                                className="h-6 w-6"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <div>
                              <div className="flex justify-between mb-2">
                                <div className="text-sm text-gray-500">Importance</div>
                                <div className="text-sm font-medium">{query.importance}/5</div>
                              </div>
                              <Slider
                                value={[query.importance]}
                                min={1}
                                max={5}
                                step={1}
                                onValueChange={(value) => handleImportanceChange(query.id, value)}
                                className="w-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 border rounded-lg">
                        <p className="text-gray-500">No queries added yet. Add some queries to continue.</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-medium text-queryosity-blue mb-2">
                    We'll generate relevant queries for you
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Our AI will analyze your domain content and create queries that are most relevant to your business
                    and industry. This helps ensure comprehensive coverage of how your domain performs in AI search
                    results.
                  </p>

                  {generatingQueries ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-queryosity-blue mx-auto mb-4"></div>
                      <p className="text-gray-600">Generating queries...</p>
                    </div>
                  ) : queries.length > 0 ? (
                    <div className="space-y-4">
                      {queries.map((query) => (
                        <div key={query.id} className="border rounded-lg p-4 bg-white">
                          <div className="flex justify-between items-start mb-3">
                            <div className="font-medium">{query.text}</div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-2">
                              <div className="text-sm text-gray-500">Importance</div>
                              <div className="text-sm font-medium">{query.importance}/5</div>
                            </div>
                            <Slider
                              value={[query.importance]}
                              min={1}
                              max={5}
                              step={1}
                              onValueChange={(value) => handleImportanceChange(query.id, value)}
                              className="w-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Button
                      onClick={handleGenerateQueries}
                      className="w-full bg-queryosity-blue hover:bg-queryosity-dark text-white"
                    >
                      Generate Queries
                    </Button>
                  )}
                </div>
              )}

              <div className="flex justify-between">
                <Button
                  onClick={() =>
                    navigate("/analyze/competitors", {
                      state: { domain, selectedEngines },
                    })
                  }
                  variant="outline"
                >
                  Back
                </Button>
                <Button
                  onClick={handleContinue}
                  className="bg-queryosity-blue hover:bg-queryosity-dark text-white px-8"
                  disabled={updatingQueries || generatingAnalysis || queries.length === 0}
                >
                  {updatingQueries || generatingAnalysis ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span>
                      {generatingAnalysis ? "Starting Analysis..." : "Updating Queries..."}
                    </>
                  ) : (
                    "Continue to Dashboard"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default QuerySelection
