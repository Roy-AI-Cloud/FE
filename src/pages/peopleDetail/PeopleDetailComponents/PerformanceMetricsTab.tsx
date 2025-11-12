import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import MetricCard from "../../../components/list/MetricCard";

const PerformanceMetricsTab: React.FC = () => {
  const chartData = [
    { month: "1월", views: 45000, engagement: 6.2 },
    { month: "2월", views: 52000, engagement: 6.8 },
    { month: "3월", views: 48000, engagement: 7.1 },
    { month: "4월", views: 55000, engagement: 6.9 },
    { month: "5월", views: 60000, engagement: 7.3 },
    { month: "6월", views: 22000, engagement: 6.5 },
  ];

  // 커스텀 Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-md">
          <p className="mb-2 font-medium text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              className="text-sm"
              style={{ color: entry.color }}
            >
              {entry.name === 'views' ? '조회수' : '참여율 (%)'} : {entry.name === 'views' ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* 조회수 & 참여율 추이 차트 */}
      <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="mb-6 text-xl font-bold text-gray-900">
          조회수 & 참여율 추이
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              opacity={0.5}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: '#d1d5db' }}
              axisLine={{ stroke: '#d1d5db' }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              label={{ value: '조회수', angle: -90, position: 'insideLeft' }}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: '#d1d5db' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickFormatter={(value) => `${value / 1000}K`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: '참여율 (%)', angle: 90, position: 'insideRight' }}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: '#d1d5db' }}
              axisLine={{ stroke: '#d1d5db' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: 20 }}
              iconType="circle"
              formatter={(value) => (value === 'views' ? '조회수' : '참여율 (%)')}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="views"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
              name="views"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="engagement"
              stroke="#fb923c"
              strokeWidth={3}
              dot={{ fill: '#fb923c', r: 4 }}
              activeDot={{ r: 6 }}
              name="engagement"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 성과 지표 카드들 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/*평균 조회수*/}
        <MetricCard
          title="평균 조회수"
          value="22,019"
          change="+12% vs 지난달"
          icon={
            <svg
              className="w-5 h-5 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          }
          isPositive={true}
        />
        {/*평균 좋아요*/}
        <MetricCard
          title="평균 좋아요"
          value="1,761.52"
          change="+8% vs 지난달"
          icon={
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"
              />
            </svg>
          }
          isPositive={true}
        />
        {/*평균 댓글*/}
        <MetricCard
          title="평균 댓글"
          value="660.57"
          change="+5% vs 지난달"
          icon={
            <svg
              className="w-5 h-5 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          }
          isPositive={true}
        />
      </div>
    </div>
  );
};

export default PerformanceMetricsTab;

