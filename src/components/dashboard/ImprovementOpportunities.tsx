
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Opportunity {
  name: string;
  score: number;
  description: string;
}

interface ImprovementOpportunitiesProps {
  opportunities: Opportunity[];
}

const ImprovementOpportunities: React.FC<ImprovementOpportunitiesProps> = ({
  opportunities,
}) => {
  // Function to determine color based on score
  const getColorClass = (score: number) => {
    if (score < 40) return "bg-red-500";
    if (score < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-4">
      {opportunities.map((opportunity, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <span className="font-medium">{opportunity.name}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-2 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{opportunity.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className={`${opportunity.score < 40 ? 'text-red-500' : opportunity.score < 70 ? 'text-yellow-500' : 'text-green-500'}`}>
              {opportunity.score}%
            </span>
          </div>
          <Progress 
            value={opportunity.score} 
            className="h-2 bg-gray-200"
            indicatorClassName={getColorClass(opportunity.score)}
          />
        </div>
      ))}
    </div>
  );
};

export default ImprovementOpportunities;
