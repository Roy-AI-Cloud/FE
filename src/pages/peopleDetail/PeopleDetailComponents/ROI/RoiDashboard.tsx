import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

interface EstimateData {
  score: number;
  estimated_views: number;
  estimated_engagement: number;
}

interface RoiDashboardProps {
  estimateData: EstimateData;
}

const RoiDashboard = ({ estimateData }: RoiDashboardProps) => {
  const data = [
    { name: "평가 점수", value: estimateData.score },
    { name: "예상 조회수", value: Math.round(estimateData.estimated_views / 1000) },
    { name: "예상 참여율", value: estimateData.estimated_engagement },
  ];

  const barColors = ["#667eea", "#f093fb", "#4facfe"];

  return (
    <div className="bg-white rounded-lg border shadow p-8">
      <h3 className="text-xl font-bold mb-2">ROI 대시보드</h3>
      <p className="text-gray-600 mb-6">캠페인 예상 결과 분석</p>

      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => `${v}%`} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={200}>
            {data.map((_, idx) => (
              <Cell key={idx} fill={barColors[idx]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RoiDashboard;