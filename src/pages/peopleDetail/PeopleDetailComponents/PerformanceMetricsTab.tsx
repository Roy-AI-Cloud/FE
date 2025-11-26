import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import MetricCard from "../../../components/list/MetricCard";
import { estimate, type EstimateResponse } from "../../../apis/Estimate";

// Tooltip props 타입 정의
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number | string;
    color?: string;
  }>;
  label?: string | number;
}

interface PerformanceMetricsTabProps {
  projectId: string;
  channelId: string;
}

const PerformanceMetricsTab: React.FC<PerformanceMetricsTabProps> = ({
  projectId,
  channelId,
}) => {
  // 상태 관리
  const [estimateData, setEstimateData] = useState<EstimateResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estimate 데이터 불러오기
  useEffect(() => {
    const fetchEstimateData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await estimate({
          project_id: projectId,
          channel_id: channelId,
        });
        setEstimateData(data);
        console.log("Estimate 데이터 로드 성공:", data);
      } catch (err) {
        console.error("Estimate 추정 실패:", err);
        setError(err instanceof Error ? err.message : "추정에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId && channelId) {
      fetchEstimateData();
    }
  }, [projectId, channelId]);

  const chartData = [
    { month: "1월", views: 45000, engagement: 6.2 },
    { month: "2월", views: 52000, engagement: 6.8 },
    { month: "3월", views: 48000, engagement: 7.1 },
    { month: "4월", views: 55000, engagement: 6.9 },
    { month: "5월", views: 60000, engagement: 7.3 },
    { month: "6월", views: 22000, engagement: 6.5 },
  ];

  // 커스텀 Tooltip
  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-md">
          <p className="mb-2 font-medium text-sm sm:text-base text-gray-900">
            {label}
          </p>
          {payload.map((entry, index) => {
            if (!entry || entry.value === undefined) return null;
            return (
              <p
                key={index}
                className="text-xs sm:text-sm"
                style={{ color: entry.color }}
              >
                {entry.name === "views" ? "조회수" : "참여율 (%)"} :{" "}
                {entry.name === "views"
                  ? typeof entry.value === "number"
                    ? entry.value.toLocaleString()
                    : entry.value
                  : entry.value}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 추정 결과 섹션 */}
      {isLoading && (
        <div className="p-4 sm:p-6 text-center bg-blue-50 border border-blue-200 rounded-lg">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
          <p className="text-sm sm:text-base text-blue-600 font-medium">
            추정 데이터를 불러오는 중...
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 sm:p-6 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="font-medium text-sm sm:text-base text-red-800">
                오류 발생
              </p>
              <p className="text-xs sm:text-sm text-red-600 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {estimateData && !isLoading && !error && (
        <div className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border border-purple-200 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              성과 추정 결과
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {/* 평가 점수 */}
            <div className="p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  평가 점수
                </p>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">
                {estimateData.score.toFixed(1)}
              </p>
            </div>

            {/* 예상 조회수 */}
            <div className="p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  예상 조회수
                </p>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500"
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
              </div>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">
                {estimateData.estimated_views.toLocaleString()}
              </p>
            </div>

            {/* 예상 참여율 */}
            <div className="p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  예상 참여율
                </p>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                {estimateData.estimated_engagement.toFixed(2)}%
              </p>
            </div>

            {/* 예상 비용 */}
            <div className="p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  예상 비용
                </p>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-orange-600 truncate">
                {estimateData.estimated_cost}
              </p>
            </div>

            {/* CPM */}
            <div className="p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  CPM
                </p>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-pink-600">
                ₩{estimateData.cpm.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 조회수 & 참여율 추이 차트 */}
      <div className="p-4 sm:p-6 lg:p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="mb-4 sm:mb-6 text-base sm:text-xl font-bold text-gray-900">
          조회수 & 참여율 추이
        </h3>
        <ResponsiveContainer width="100%" height={300} className="sm:h-96">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              opacity={0.5}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#6b7280", fontSize: 10 }}
              tickLine={{ stroke: "#d1d5db" }}
              axisLine={{ stroke: "#d1d5db" }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tick={{ fill: "#6b7280", fontSize: 10 }}
              tickLine={{ stroke: "#d1d5db" }}
              axisLine={{ stroke: "#d1d5db" }}
              tickFormatter={(value) => `${value / 1000}K`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: "#6b7280", fontSize: 10 }}
              tickLine={{ stroke: "#d1d5db" }}
              axisLine={{ stroke: "#d1d5db" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: 20, fontSize: 12 }}
              iconType="circle"
              formatter={(value) =>
                value === "views" ? "조회수" : "참여율 (%)"
              }
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="views"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 3 }}
              activeDot={{ r: 5 }}
              name="views"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="engagement"
              stroke="#fb923c"
              strokeWidth={2}
              dot={{ fill: "#fb923c", r: 3 }}
              activeDot={{ r: 5 }}
              name="engagement"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 성과 지표 카드들 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <MetricCard
          title="예상 조회수"
          value={
            estimateData
              ? estimateData.estimated_views.toLocaleString()
              : "데이터 없음"
          }
          change="+12% vs 평균"
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
        <MetricCard
          title="예상 참여율"
          value={
            estimateData
              ? `${estimateData.estimated_engagement.toFixed(2)}%`
              : "데이터 없음"
          }
          change="+8% vs 평균"
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
        <MetricCard
          title="평가 점수"
          value={estimateData ? estimateData.score.toFixed(1) : "데이터 없음"}
          change="+5% vs 평균"
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
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
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
