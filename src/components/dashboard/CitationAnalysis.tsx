
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Citation {
  query: string;
  position: number;
  previousPosition: number;
  importance: number;
  engineResults: {
    engine: string;
    position: number;
    url: string;
    date: string;
  }[];
}

interface CitationAnalysisProps {
  citations: Citation[];
}

const CitationAnalysis: React.FC<CitationAnalysisProps> = ({ citations }) => {
  const [selectedEngine, setSelectedEngine] = useState('all');

  const generateTrendData = () => {
    const engineMeta = [
      { name: 'Perplexity', color: '#3b82f6', type: 'citations', count: 6 },
      { name: 'ChatGPT', color: '#10b981', type: 'mentions', count: 30 },
      { name: 'Gemini', color: '#8b5cf6', type: 'mentions', count: 20 },
      { name: 'Claude', color: '#f59e0b', type: 'mentions', count: 27 }
    ];

    const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

    const combinedData = engineMeta.map(engine => ({
      ...engine,
      trends: weeks.map(week => ({
        week,
        value: Math.floor(Math.random() * 10) + 1
      }))
    }));

    return combinedData;
  };

  const engineData = generateTrendData();

  // Generate positional change for display
  const getPositionChange = (current: number, previous?: number) => {
    if (!previous) return 0;
    return previous - current; // Positive is good (moved up in rankings)
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Average Position</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-2xl font-bold">3.2</span>
                <Badge variant="outline" className="flex items-center gap-1 text-green-500">
                  ↑ 0.5
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Top Positioned Queries</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-2xl font-bold">42%</span>
                <Badge variant="outline" className="flex items-center gap-1 text-green-500">
                  ↑ 5%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Queries Analyzed</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-2xl font-bold">{citations.length}</span>
                <Badge variant="outline" className="flex items-center gap-1 text-blue-500">
                  New
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Position Trends by Engine</h3>
            <Select
              onValueChange={(value) => setSelectedEngine(value)}
              defaultValue="all"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by engine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Engines</SelectItem>
                {engineData.map(engine => (
                  <SelectItem key={engine.name} value={engine.name}>{engine.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={selectedEngine === 'all' ?
                  engineData.flatMap(engine =>
                    engine.trends.map(trend => ({
                      week: trend.week,
                      [engine.name]: trend.value,
                      color: engine.color
                    }))
                  ).reduce((acc, curr) => {
                    const existing = acc.find(item => item.week === curr.week);
                    if (existing) {
                      return acc.map(item =>
                        item.week === curr.week ? { ...item, ...curr } : item
                      );
                    }
                    return [...acc, curr];
                  }, []) :
                  engineData
                    .find(e => e.name === selectedEngine)?.trends
                    .map(trend => ({
                      week: trend.week,
                      [selectedEngine]: trend.value
                    })) || []
                }
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                {selectedEngine === 'all' ?
                  engineData.map(engine => (
                    <Bar key={engine.name} dataKey={engine.name} fill={engine.color} />
                  )) :
                  <Bar dataKey={selectedEngine} fill={engineData.find(e => e.name === selectedEngine)?.color || '#3b82f6'} />
                }
              </BarChart>

            </ResponsiveContainer>
          </div>
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-3">Engine Performance</h4>
            <div className="space-y-4">
              {(selectedEngine === 'all' ? engineData : engineData.filter(e => e.name === selectedEngine))
                .map((engine, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: engine.color }}></div>
                      <div className="flex flex-col">
                        <span>{engine.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`font-medium text-gray-500`}>
                        {engine.type === 'citations' ? `${engine.count} citations` : `${engine.count} mentions`}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Query Performance</h3>
              <TabsList>
                <TabsTrigger value="all">All Engines</TabsTrigger>
                <TabsTrigger value="perplexity">Perplexity</TabsTrigger>
                <TabsTrigger value="chatgpt">ChatGPT</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {citations.sort((a, b) => a.importance - b.importance).map((result, index) => (
                  <div key={index} className="p-3 border rounded-md hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{result.query}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          Importance: {Array(result.importance).fill('★').join('')}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Pos: {result.position}</span>
                          {result.previousPosition && (
                            <Badge variant={getPositionChange(result.position, result.previousPosition) > 0 ? "default" : "destructive"} className="text-xs">
                              {getPositionChange(result.position, result.previousPosition) > 0 ? '↑' : '↓'}
                              {Math.abs(getPositionChange(result.position, result.previousPosition))}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {result.engineResults.map((engine, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {engine.engine}: #{engine.position}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="perplexity" className="mt-0">
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {citations
                  .filter(r => r.engineResults.some(e => e.engine.toLowerCase() === "perplexity"))
                  .map((result, index) => (
                    <div key={index} className="p-3 border rounded-md hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="font-medium">{result.query}</div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">
                            Pos: {result.engineResults.find(e => e.engine.toLowerCase() === "perplexity")?.position || '-'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </TabsContent>

            <TabsContent value="chatgpt" className="mt-0">
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {citations
                  .filter(r => r.engineResults.some(e => e.engine.toLowerCase() === "chatgpt"))
                  .map((result, index) => (
                    <div key={index} className="p-3 border rounded-md hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="font-medium">{result.query}</div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">
                            Pos: {result.engineResults.find(e => e.engine.toLowerCase() === "chatgpt")?.position || '-'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CitationAnalysis;
