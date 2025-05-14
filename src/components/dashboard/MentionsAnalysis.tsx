
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Minus, LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Mention {
  source: string;
  count: number;
  sentiment: "positive" | "negative" | "neutral";
  percentChange: number;
}

interface MentionsAnalysisProps {
  mentions: Mention[];
  totalQueries: number;
  queriesPercentChange: number;
}

const MentionsAnalysis: React.FC<MentionsAnalysisProps> = ({ mentions, totalQueries, queriesPercentChange }) => {
  const [filteredMentions, setFilteredMentions] = useState(mentions);
  const [showPremiumOverlay, setShowPremiumOverlay] = useState(true);
  const getChangeIcon = (percentChange: number) => {
    if (percentChange > 0) return <ArrowUpRight className="h-4 w-4 text-green-500" />;
    if (percentChange < 0) return <ArrowDownRight className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === "positive") return "#4ade80";
    if (sentiment === "negative") return "#f87171";
    return "#94a3b8";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Total Queries</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-2xl font-bold">{totalQueries.toLocaleString()}</span>
                <Badge variant="outline" className="flex items-center gap-1">
                  {getChangeIcon(queriesPercentChange)}
                  <span>{Math.abs(queriesPercentChange)}%</span>
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Total Mentions</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-2xl font-bold">{mentions.reduce((acc, m) => acc + m.count, 0).toLocaleString()}</span>
                <Badge variant="outline" className="flex items-center gap-1">
                  {getChangeIcon(10)}
                  <span>10%</span>
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Mention Rate</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-2xl font-bold">
                  {((mentions.reduce((acc, m) => acc + m.count, 0) / totalQueries) * 100).toFixed(1)}%
                </span>
                <Badge variant="outline" className="flex items-center gap-1">
                  {getChangeIcon(15)}
                  <span>15%</span>
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Mentions by Source</h3>
            <Select
              onValueChange={(value) => {
                if (value === "all") {
                  setFilteredMentions(mentions);
                } else {
                  setFilteredMentions(mentions.filter(m => m.source === value));
                }
              }}
              defaultValue="all"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Engine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Engines</SelectItem>
                {Array.from(new Set(mentions.map(m => m.source))).map(source => (
                  <SelectItem key={source} value={source}>{source}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredMentions}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="Mentions">
                  {filteredMentions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getSentimentColor(entry.sentiment)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden">
        {showPremiumOverlay && (
          <div 
            className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 py-10 flex flex-col items-center justify-center cursor-pointer transition-opacity hover:bg-white/70"
            onClick={() => setShowPremiumOverlay(false)}
          >
            <LockIcon className="h-8 w-8 text-gray-400 mb-2" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Premium Feature</h3>
            <p className="text-gray-500 text-center mb-4 max-w-md">
              Unlock detailed query-level mentions and mention rates to understand your content's performance across different search queries.
            </p>
            <Button 
              className="bg-queryosity-teal hover:bg-queryosity-blue text-white"
              onClick={(e) => {
                e.stopPropagation();
                // Handle premium upgrade here
              }}
            >
              Upgrade to Premium
            </Button>
          </div>
        )}
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Query-Level Mentions</h3>
            {!showPremiumOverlay && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setShowPremiumOverlay(true)}
              >
                <LockIcon className="h-4 w-4" />
                Hide Premium Content
              </Button>
            )}
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">"machine learning applications"</span>
                  <Badge variant="outline" className="bg-green-50">
                    High Impact
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold">24</div>
                    <div className="text-sm text-gray-500">Mentions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">82%</div>
                    <div className="text-sm text-gray-500">Mention Rate</div>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">"AI development tools"</span>
                  <Badge variant="outline" className="bg-yellow-50">
                    Medium Impact
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold">18</div>
                    <div className="text-sm text-gray-500">Mentions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">65%</div>
                    <div className="text-sm text-gray-500">Mention Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Mention Sources</h3>
            <div className="space-y-4">
              {filteredMentions
                .sort((a, b) => b.count - a.count)
                .slice(0, 5)
                .map((mention, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full bg-${mention.sentiment === "positive" ? "green" : mention.sentiment === "negative" ? "red" : "gray"}-500`}></div>
                      <span>{mention.source}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{mention.count}</span>
                      <div className="flex items-center">
                        {getChangeIcon(mention.percentChange)}
                        <span className={`text-xs ${mention.percentChange > 0 ? 'text-green-500' : mention.percentChange < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                          {Math.abs(mention.percentChange)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentionsAnalysis;
