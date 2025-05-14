
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DashboardPreview = () => {
  return (
    <div className="w-full py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-queryosity-blue mb-6">
          Comprehensive AI Search Analytics
        </h2>
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-16">
          Monitor your brand's performance across all major AI search engines with our intuitive dashboards
        </p>

        <Card className="border border-gray-200 shadow-xl overflow-hidden">
          <Tabs defaultValue="overview">
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <TabsList className="bg-gray-200">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="mentions">Mentions</TabsTrigger>
                  <TabsTrigger value="queries">Queries</TabsTrigger>
                  <TabsTrigger value="competitors">Competitors</TabsTrigger>
                </TabsList>
                <div className="w-20"></div> {/* Spacer for balance */}
              </div>
            </div>

            <TabsContent value="overview" className="m-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <img 
                      src="public/lovable-uploads/fcac40e8-f773-407c-8640-d3940d742106.png" 
                      alt="Example domain" 
                      className="h-8 w-8 rounded-full" 
                    />
                    <h3 className="text-xl font-semibold">yourdomain.com</h3>
                  </div>
                  <div className="text-sm text-gray-500">
                    April 1 - April 5, 2025
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  <Card className="bg-white border border-gray-100">
                    <CardContent className="p-4">
                      <h3 className="text-sm text-gray-500 mb-1">Overall AI Search Readiness</h3>
                      <div className="flex items-end justify-between">
                        <div className="text-3xl font-bold text-queryosity-blue">72%</div>
                        <div className="text-sm text-green-600 flex items-center">
                          +4% <span className="ml-1">↑</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white border border-gray-100">
                    <CardContent className="p-4">
                      <h3 className="text-sm text-gray-500 mb-1">Average Domain Ranking</h3>
                      <div className="flex items-end justify-between">
                        <div className="text-3xl font-bold text-queryosity-blue">#3</div>
                        <div className="text-sm text-green-600 flex items-center">
                          +1 <span className="ml-1">↑</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white border border-gray-100">
                    <CardContent className="p-4">
                      <h3 className="text-sm text-gray-500 mb-1">Queries Analyzed</h3>
                      <div className="flex items-end justify-between">
                        <div className="text-3xl font-bold text-queryosity-blue">17</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          All AI Engines
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="blur-card rounded-lg overflow-hidden">
                  <img 
                    src="public/lovable-uploads/9693075f-c6cd-43cb-b77b-71a05c829b68.png" 
                    alt="AI Readiness Dashboard" 
                    className="w-full" 
                  />
                  <div className="coming-soon-badge">Coming Soon</div>
                </div>
              </CardContent>
            </TabsContent>

            <TabsContent value="mentions" className="m-0">
              <CardContent className="p-6 blur-card">
                <img 
                  src="public/lovable-uploads/9693075f-c6cd-43cb-b77b-71a05c829b68.png" 
                  alt="Mentions Analysis" 
                  className="w-full" 
                />
                <div className="coming-soon-badge">Coming Soon</div>
              </CardContent>
            </TabsContent>

            <TabsContent value="queries" className="m-0">
              <CardContent className="p-6 blur-card">
                <img 
                  src="public/lovable-uploads/25a1682f-c45d-4b93-a9ea-1547830aa71e.png" 
                  alt="Query Analysis" 
                  className="w-full" 
                />
                <div className="coming-soon-badge">Coming Soon</div>
              </CardContent>
            </TabsContent>

            <TabsContent value="competitors" className="m-0">
              <CardContent className="p-6 blur-card">
                <img 
                  src="public/lovable-uploads/fd7cc0ab-d9f7-43ce-a70f-c5fa70646e37.png" 
                  alt="Competitor Analysis" 
                  className="w-full" 
                />
                <div className="coming-soon-badge">Coming Soon</div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPreview;
