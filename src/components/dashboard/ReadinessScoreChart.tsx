
import React from "react";
import {
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface HistoricalScore {
  date: string;
  score: number;
}

interface ReadinessScoreProps {
  historicalScores: HistoricalScore[];
}

const ReadinessScoreChart: React.FC<ReadinessScoreProps> = ({ historicalScores }) => {
  const currentScore = historicalScores[historicalScores.length - 1].score;
  const previousScore = historicalScores.length > 1 ? historicalScores[historicalScores.length - 2].score : null;

  // Calculate fill color based on score
  const getFillColor = (value: number) => {
    if (value < 40) return "#ef4444"; // red for low scores
    if (value < 70) return "#f59e0b"; // amber for medium scores
    return "#10b981"; // green for high scores
  };

  return (
    <div className="w-full h-full grid grid-cols-1 gap-4">
      {/* Metric Card */}
      <div className="bg-white rounded-lg p-4 shadow">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Readiness Score</h3>
            <div className="mt-1 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{currentScore}%</p>
              {previousScore !== null && (
                <p className={`ml-2 text-sm ${currentScore >= previousScore ? 'text-green-600' : 'text-red-600'}`}>
                  {currentScore >= previousScore ? '↑' : '↓'}
                  {Math.abs(currentScore - previousScore)}%
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trend Line Chart */}
      <div className="bg-white rounded-lg p-4 shadow">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={historicalScores} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <YAxis domain={[0, 100]} />
            <Tooltip
              formatter={(value: number) => [`${value}%`, "Score"]}
              labelFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReadinessScoreChart;
