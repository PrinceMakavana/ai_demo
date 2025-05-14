
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle, AlertCircle, ArrowUpRight, ArrowDownRight, Minus, ChevronDown, ChevronUp } from "lucide-react";

interface Competitor {
  name: string;
  readinessScore: number;
  averagePosition: number;
  strengths: string[];
  weaknesses: string[];
  metrics: {
    contentDepth: number;
    citationDensity: number;
    queryRelevance: number;
    linkEcosystem: number;
    authoritySignals: number;
  };
  engineData?: {
    name: string;
    type: 'citations' | 'mentions';
    count: number;
    trend: number;
  }[];
}

interface CompetitorAnalysisProps {
  domain: string;
  competitors: Competitor[];
}

const CompetitorAnalysis: React.FC<CompetitorAnalysisProps> = ({ domain, competitors }) => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);

  // Sample engine data for competitors
  const getEngineData = (competitor: Competitor) => {
    return [
      { 
        name: 'Perplexity', 
        type: 'citations' as const,
        count: Math.floor(Math.random() * 20) + 30,
        trend: Math.floor(Math.random() * 10) - 5
      },
      { 
        name: 'ChatGPT', 
        type: 'mentions' as const,
        count: Math.floor(Math.random() * 30) + 40,
        trend: Math.floor(Math.random() * 10) - 5
      },
      { 
        name: 'Gemini', 
        type: 'mentions' as const,
        count: Math.floor(Math.random() * 25) + 35,
        trend: Math.floor(Math.random() * 10) - 5
      },
      { 
        name: 'Claude', 
        type: 'mentions' as const,
        count: Math.floor(Math.random() * 35) + 45,
        trend: Math.floor(Math.random() * 10) - 5
      }
    ];
  };
  // Calculate your domain's metrics
  const yourDomain = {
    name: domain,
    readinessScore: 72,
    averagePosition: 3,
    metrics: {
      contentDepth: 65,
      citationDensity: 78,
      queryRelevance: 85,
      linkEcosystem: 60,
      authoritySignals: 72
    }
  };
  
  // Format data for the radar chart
  const getRadarData = () => {
    const metrics = [
      { subject: 'Content Depth', fullMark: 100 },
      { subject: 'Citation Density', fullMark: 100 },
      { subject: 'Query Relevance', fullMark: 100 },
      { subject: 'Link Ecosystem', fullMark: 100 },
      { subject: 'Authority Signals', fullMark: 100 },
    ];
    
    return metrics.map(metric => {
      const data: any = { subject: metric.subject, fullMark: metric.fullMark };
      data[domain] = yourDomain.metrics[metric.subject.replace(' ', '').charAt(0).toLowerCase() + metric.subject.replace(' ', '').slice(1)];
      
      competitors.forEach(competitor => {
        data[competitor.name] = competitor.metrics[metric.subject.replace(' ', '').charAt(0).toLowerCase() + metric.subject.replace(' ', '').slice(1)];
      });
      
      return data;
    });
  };
  
  // Format data for the score comparison chart
  const getScoreData = () => {
    const allDomains = [yourDomain, ...competitors];
    return allDomains.map(d => ({
      name: d.name,
      score: d.readinessScore
    }));
  };
  
  // Get status icon based on comparison
  const getComparisonIcon = (yours: number, theirs: number) => {
    if (yours > theirs) return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    if (yours < theirs) return <XCircle className="h-4 w-4 text-red-500" />;
    return <AlertCircle className="h-4 w-4 text-yellow-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Analyzed Competitors</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-2xl font-bold">{competitors.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Your Readiness Rank</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-2xl font-bold">
                  #{[yourDomain, ...competitors]
                    .sort((a, b) => b.readinessScore - a.readinessScore)
                    .findIndex(d => d.name === domain) + 1}
                </span>
                <Badge variant="outline" className="flex items-center gap-1">
                  of {competitors.length + 1}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Top Competitor</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-2xl font-bold">
                  {competitors.sort((a, b) => b.readinessScore - a.readinessScore)[0]?.name}
                </span>
                <Badge variant="outline" className="flex items-center gap-1">
                  {competitors.sort((a, b) => b.readinessScore - a.readinessScore)[0]?.readinessScore}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">AI Readiness Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getScoreData()}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar 
                    dataKey="score" 
                    fill="#8884d8" 
                    background={{ fill: '#eee' }}
                    label={{ position: 'right', formatter: (val: number) => `${val}%` }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Competitive Metrics Radar</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={getRadarData()}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar name={domain} dataKey={domain} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  {competitors.map((competitor, index) => (
                    <Radar 
                      key={index}
                      name={competitor.name} 
                      dataKey={competitor.name} 
                      stroke={`hsl(${150 + index * 40}, 70%, 50%)`} 
                      fill={`hsl(${150 + index * 40}, 70%, 50%)`} 
                      fillOpacity={0.6} 
                    />
                  ))}
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Detailed Comparison</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domain</TableHead>
                  <TableHead className="text-right">AI Readiness</TableHead>
                  <TableHead className="text-right">Avg. Position</TableHead>
                  <TableHead>Strengths</TableHead>
                  <TableHead>Weaknesses</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-muted/50">
                  <TableCell className="font-medium">{domain}</TableCell>
                  <TableCell className="text-right">{yourDomain.readinessScore}%</TableCell>
                  <TableCell className="text-right">#{yourDomain.averagePosition}</TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside text-sm">
                      <li>Query Relevance</li>
                      <li>Citation Density</li>
                    </ul>
                  </TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside text-sm">
                      <li>Content Depth</li>
                      <li>Link Ecosystem</li>
                    </ul>
                  </TableCell>
                </TableRow>
                {competitors.map((competitor, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell className="font-medium">
                        <button 
                          className="flex items-center gap-2 hover:text-blue-600 font-medium"
                          onClick={() => setSelectedCompetitor(
                            selectedCompetitor?.name === competitor.name ? null : 
                            { ...competitor, engineData: getEngineData(competitor) }
                          )}
                        >
                          {competitor.name}
                          {selectedCompetitor?.name === competitor.name ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      </TableCell>
                      <TableCell className="text-right flex items-center justify-end gap-1">
                        {competitor.readinessScore}%
                        {getComparisonIcon(yourDomain.readinessScore, competitor.readinessScore)}
                      </TableCell>
                      <TableCell className="text-right flex items-center justify-end gap-1">
                        #{competitor.averagePosition}
                        {getComparisonIcon(
                          // For position, lower is better
                          competitor.averagePosition, 
                          yourDomain.averagePosition
                        )}
                      </TableCell>
                      <TableCell>
                        <ul className="list-disc list-inside text-sm">
                          {competitor.strengths.slice(0, 2).map((strength, idx) => (
                            <li key={idx}>{strength}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        <ul className="list-disc list-inside text-sm">
                          {competitor.weaknesses.slice(0, 2).map((weakness, idx) => (
                            <li key={idx}>{weakness}</li>
                          ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                    {selectedCompetitor?.name === competitor.name && (
                      <TableRow>
                        <TableCell colSpan={5} className="bg-muted/30">
                          <div className="py-4 px-6 space-y-4">
                            <h4 className="font-medium mb-3">Engine Analysis</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {selectedCompetitor.engineData?.map((engine, idx) => (
                                <div key={idx} className="p-4 bg-white rounded-lg border">
                                  <div className="flex flex-col">
                                    <span className="font-medium">{engine.name}</span>
                                    <span className="text-sm text-gray-500">
                                      {engine.type === 'citations' ? 'Citations' : 'Mentions'}
                                    </span>
                                    <span className="text-2xl font-bold mt-2">{engine.count}</span>
                                    <div className="flex items-center gap-1 mt-1">
                                      {engine.trend > 0 ? (
                                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                                      ) : engine.trend < 0 ? (
                                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                                      ) : (
                                        <Minus className="h-4 w-4 text-gray-500" />
                                      )}
                                      <span className={`text-sm ${engine.trend > 0 ? 'text-green-500' : engine.trend < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                                        {Math.abs(engine.trend)}%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default CompetitorAnalysis;
