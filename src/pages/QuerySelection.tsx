import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PlusCircle, X } from "lucide-react";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const QuerySelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { domain, selectedEngines, selectedCompetitors } = location.state || { 
    domain: "example.com", 
    selectedEngines: ["perplexity"],
    selectedCompetitors: ["competitor1.com"]
  };
  
  const [useCustomQueries, setUseCustomQueries] = useState(true);
  const [newQuery, setNewQuery] = useState("");
  const [queries, setQueries] = useState([
    { id: "q1", text: "product features", importance: 4 },
    { id: "q2", text: "pricing comparison", importance: 5 },
    { id: "q3", text: "industry solutions", importance: 3 },
  ]);

  const handleAddQuery = () => {
    if (newQuery && !queries.some(q => q.text === newQuery)) {
      setQueries([
        ...queries,
        { id: `q${queries.length + 1}`, text: newQuery, importance: 3 }
      ]);
      setNewQuery("");
    }
  };

  const handleImportanceChange = (id: string, value: number[]) => {
    setQueries(prev => 
      prev.map(query => 
        query.id === id ? { ...query, importance: value[0] } : query
      )
    );
  };

  const handleRemoveQuery = (id: string) => {
    setQueries(prev => prev.filter(query => query.id !== id));
  };

  const handleContinue = () => {
    navigate("/dashboard", { 
      state: { 
        domain, 
        selectedEngines, 
        selectedCompetitors,
        queries: useCustomQueries ? queries : [] 
      } 
    });
  };

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
                  <Switch 
                    id="query-toggle" 
                    checked={useCustomQueries}
                    onCheckedChange={setUseCustomQueries}
                  />
                  <Label htmlFor="query-toggle">Yes, I have specific queries</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="auto-toggle" 
                    checked={!useCustomQueries}
                    onCheckedChange={(checked) => setUseCustomQueries(!checked)}
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
                      <Button 
                        onClick={handleAddQuery}
                        variant="outline"
                        size="icon"
                      >
                        <PlusCircle className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {queries.map((query) => (
                        <div 
                          key={query.id}
                          className="border rounded-lg p-4 bg-white"
                        >
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
                  </div>
                </>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-medium text-queryosity-blue mb-2">We'll generate relevant queries for you</h3>
                  <p className="text-gray-600">
                    Our AI will analyze your domain content and create queries that are most relevant to your business and industry. This helps ensure comprehensive coverage of how your domain performs in AI search results.
                  </p>
                </div>
              )}

              <div className="flex justify-between">
                <Button 
                  onClick={() => navigate("/analyze/competitors", { 
                    state: { domain, selectedEngines } 
                  })}
                  variant="outline"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleContinue}
                  className="bg-queryosity-blue hover:bg-queryosity-dark text-white px-8"
                >
                  Continue to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuerySelection;
