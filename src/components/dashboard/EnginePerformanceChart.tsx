
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface EngineData {
  name: string;
  value: number;
  color: string;
}

interface EnginePerformanceProps {
  engineData: EngineData[];
}

const EnginePerformanceChart: React.FC<EnginePerformanceProps> = ({
  engineData,
}) => {
  // Format data for the chart
  const data = engineData.map((engine) => ({
    name: engine.name,
    score: engine.value,
    fill: engine.color,
  }));

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fontSize: 12 }}
            width={100}
          />
          <Tooltip formatter={(value) => [`${value}%`, "Performance"]} />
          <Legend />
          <Bar
            dataKey="score"
            background={{ fill: "#eee" }}
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnginePerformanceChart;
