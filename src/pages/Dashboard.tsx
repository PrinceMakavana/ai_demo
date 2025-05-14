
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowUpRight, LockIcon } from "lucide-react";
import ReadinessScoreChart from "@/components/dashboard/ReadinessScoreChart";
import EnginePerformanceChart from "@/components/dashboard/EnginePerformanceChart";
import ImprovementOpportunities from "@/components/dashboard/ImprovementOpportunities";
import MentionsAnalysis from "@/components/dashboard/MentionsAnalysis";
import CitationAnalysis from "@/components/dashboard/CitationAnalysis";
import CompetitorAnalysis from "@/components/dashboard/CompetitorAnalysis";

const Dashboard = () => {
  const location = useLocation();
  const { domain, selectedEngines, selectedCompetitors, queries } = location.state || {
    domain: "yourdomain.com",
    selectedEngines: ["perplexity"],
    selectedCompetitors: ["competitor1.com"],
    queries: []
  };

  // Sample data for the engine performance chart
  const enginePerformanceData = [
    { name: "Perplexity", value: 85, color: "#3b82f6" },
    { name: "ChatGPT", value: 72, color: "#10b981" },
    { name: "Gemini", value: 68, color: "#ef4444" },
    { name: "Claude", value: 78, color: "#8b5cf6" },
  ].filter(engine => 
    selectedEngines.includes(engine.name.toLowerCase())
  );

  // If no engines were selected or matched, provide default data
  const engineData = enginePerformanceData.length > 0 
    ? enginePerformanceData 
    : [{ name: "Perplexity", value: 85, color: "#3b82f6" }];

  // Sample data for the improvement opportunities
  const improvementOpportunities = [
    {
      name: "Content Depth",
      score: 34,
      description: "Your content lacks the depth necessary for AI search engines to fully understand and recommend your domain. Consider adding more comprehensive information."
    },
    {
      name: "Citation Density",
      score: 62,
      description: "The number of citations and references in your content is moderate. Increasing citations can improve AI's trust in your content."
    },
    {
      name: "Query Relevance",
      score: 87,
      description: "Your content is highly relevant to the queries users are searching for. Keep maintaining this high level of relevance."
    },
  ];

  // Sample data for mentions analysis - fixed the sentiment types to match the expected union type
  const mentionsData = [
    { source: "Perplexity", count: 42, sentiment: "positive" as "positive", percentChange: 12 },
    { source: "ChatGPT", count: 38, sentiment: "positive" as "positive", percentChange: 5 },
    { source: "Gemini", count: 27, sentiment: "neutral" as "neutral", percentChange: 0 },
    { source: "Claude", count: 31, sentiment: "positive" as "positive", percentChange: 8 },
  ];

  const queryResults = [
    {
      query: "product features comparison",
      position: 2,
      previousPosition: 4,
      importance: 5,
      engineResults: [
        { engine: "Perplexity", position: 1, url: "https://yourdomain.com/features" ,date: "2025-04-01" },
        { engine: "ChatGPT", position: 3, url: "https://yourdomain.com/features" ,date: "2025-04-01" },
        { engine: "Google AI", position: 2, url: "https://yourdomain.com/features" ,date: "2025-04-01"}
      ]
    },
    {
      query: "how to optimize website",
      position: 5,
      previousPosition: 8,
      importance: 4,
      engineResults: [
        { engine: "Perplexity", position: 4, url: "https://yourdomain.com/blog/optimization" , date: "2025-04-02" },
        { engine: "ChatGPT", position: 6, url: "https://yourdomain.com/blog/optimization", date: "2025-04-02" }
      ]
    },
    {
      query: "best practices for SEO",
      position: 3,
      previousPosition: 3,
      importance: 4,
      engineResults: [
        { engine: "Perplexity", position: 2, url: "https://yourdomain.com/blog/seo" ,date: "2025-04-03" },
        { engine: "Google AI", position: 4, url: "https://yourdomain.com/blog/seo" ,date: "2025-04-03" }
      ]
    }
  ];

  // Sample data for competitor analysis
  const competitorData = [
    {
      name: "competitor1.com",
      readinessScore: 81,
      averagePosition: 2,
      strengths: ["Content Depth", "Citation Density", "Authority Signals"],
      weaknesses: ["Query Relevance", "Technical SEO"],
      metrics: {
        contentDepth: 85,
        citationDensity: 90,
        queryRelevance: 70,
        linkEcosystem: 80,
        authoritySignals: 83
      }
    },
    {
      name: "competitor2.com",
      readinessScore: 68,
      averagePosition: 4,
      strengths: ["Query Relevance", "Link Ecosystem"],
      weaknesses: ["Content Depth", "Citation Density"],
      metrics: {
        contentDepth: 58,
        citationDensity: 62,
        queryRelevance: 88,
        linkEcosystem: 75,
        authoritySignals: 65
      }
    },
    {
      name: "competitor3.com",
      readinessScore: 75,
      averagePosition: 3,
      strengths: ["Authority Signals", "Technical SEO"],
      weaknesses: ["Link Ecosystem", "Content Recency"],
      metrics: {
        contentDepth: 72,
        citationDensity: 76,
        queryRelevance: 75,
        linkEcosystem: 68,
        authoritySignals: 85
      }
    }
  ];

  const historicalScores = [
    { date: '2025-04-01', score: 75 },
    { date: '2025-04-05', score: 82 },
    { date: '2025-04-11', score: 90 } // current score
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-8 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-queryosity-blue mb-2">
              Grade your AI Search Readiness
            </h1>
            <div className="flex items-center justify-between">
              <div className="text-lg text-gray-600">{domain}</div>
              <Button variant="outline" className="text-queryosity-blue">
                Export Report <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm text-gray-500 mb-1">Overall AI Search Readiness</h3>
                <div className="flex items-end justify-between">
                  <div className="text-4xl font-bold text-queryosity-blue">72%</div>
                  <div className="text-sm text-green-600 flex items-center">
                    +4% <span className="ml-1">↑</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm text-gray-500 mb-1">Average Domain Ranking</h3>
                <div className="flex items-end justify-between">
                  <div className="text-4xl font-bold text-queryosity-blue">#3</div>
                  <div className="text-sm text-green-600 flex items-center">
                    +1 <span className="ml-1">↑</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm text-gray-500 mb-1">AI Engines Analyzed</h3>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold text-queryosity-blue">{selectedEngines.length}</div>
                  <div className="flex items-center gap-1">
                    {selectedEngines.includes("perplexity") && (
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">P</div>
                    )}
                    {selectedEngines.includes("chatgpt") && (
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">C</div>
                    )}
                    {selectedEngines.includes("google") && (
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">G</div>
                    )}
                    {selectedEngines.includes("claude") && (
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">CL</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="mentions">Mentions Analysis</TabsTrigger>
              <TabsTrigger value="queries">Citation Analysis</TabsTrigger>
              <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">AI Search Readiness Score</h2>
                    <ReadinessScoreChart historicalScores={historicalScores} />
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">AI Engine Performance</h2>
                    <div className="h-64">
                      <EnginePerformanceChart engineData={engineData} />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Top Improvement Opportunities</h2>
                    <div className="h-64 p-4 overflow-y-auto">
                      <ImprovementOpportunities opportunities={improvementOpportunities} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="mentions" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Mentions Analysis</h2>
                  <MentionsAnalysis 
                  mentions={mentionsData}
                  totalQueries={5842}
                  queriesPercentChange={8}
                />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="queries" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Citation Analysis</h2>
                  <CitationAnalysis citations={queryResults} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="competitors" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Competitor Analysis</h2>
                  <CompetitorAnalysis 
                    domain={domain} 
                    competitors={competitorData.filter(c => 
                      selectedCompetitors.includes(c.name.toLowerCase())
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-queryosity-blue mb-3">
                    Recommend Improvements
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Unlock personalized recommendations based on root cause analysis.
                  </p>
                </div>
                <div className="blur-card h-48 bg-gray-100">
                  <img 
                    src="public/lovable-uploads/cd0c2ca6-0f33-49dd-b872-37b42c5829fa.png" 
                    alt="Recommendations" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="coming-soon-badge flex items-center">
                    <LockIcon className="h-4 w-4 mr-2" /> Premium Feature
                  </div>
                </div>
                <div className="p-6 bg-gray-50">
                {/* <Button className="w-full bg-queryosity-teal hover:bg-queryosity-blue"> */}
                {/* Upgrade to Premium */}
                  <Link to="/recommend-improvements">
                    <Button className="w-full bg-queryosity-teal hover:bg-queryosity-blue">
                      View Improvements
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-queryosity-blue mb-3">
                    Implement Recommendations
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Turn insights into action with our AI-powered implementation assistant.
                  </p>
                </div>
                <div className="blur-card h-48 bg-gray-100">
                  <img 
                    src="public/lovable-uploads/3b4266fe-664d-4888-9760-5f6fda3b9516.png" 
                    alt="Implementation" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="coming-soon-badge flex items-center">
                    <LockIcon className="h-4 w-4 mr-2" /> Coming Soon
                  </div>
                </div>
                <div className="p-6 bg-gray-50">
                  <Button className="w-full bg-queryosity-teal hover:bg-queryosity-blue">
                    Join Waitlist
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-queryosity-blue mb-3">
                    Measure Impact
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Track your progress and see real-time improvements in AI search metrics.
                  </p>
                </div>
                <div className="blur-card h-48 bg-gray-100">
                  <img 
                    src="public/lovable-uploads/82826895-55a7-4126-b7a5-80d28d1a0f98.png" 
                    alt="Impact Measurement" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="coming-soon-badge flex items-center">
                    <LockIcon className="h-4 w-4 mr-2" /> Coming Soon
                  </div>
                </div>
                <div className="p-6 bg-gray-50">
                  <Button className="w-full bg-queryosity-teal hover:bg-queryosity-blue">
                    Join Waitlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
