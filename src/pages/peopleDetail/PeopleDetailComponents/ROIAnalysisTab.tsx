import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const ROIAnalysisTab: React.FC = () => {
  const data = [
    { name: "브랜드 적합도", value: 38.9 },
    { name: "감성 분석", value: 75.0 },
    { name: "ROI 효율", value: 98.9 },
  ];

  // 단색 색상
  const barColors = ["#667eea", "#f093fb", "#4facfe"];

  // ROI 요약 메트릭
  const roiSummary = {
    views: 324000,
    engagements: 18176,
    cost: 2000000,
    engagementRate: 5.61,
  };

  // ROI 종합 평가 (API 연동 예정)
  const overallEvaluation = {
    grade: 'B' as 'A' | 'B' | 'C' | 'D',
    score: 72,
    message: '⚠️ 보통 수준. 신중한 검토가 필요합니다.',
  };

  const gradeColorClasses: Record<'A' | 'B' | 'C' | 'D', string> = {
    A: 'bg-green-100 text-green-700 border-green-200',
    B: 'bg-blue-100 text-blue-700 border-blue-200',
    C: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    D: 'bg-red-100 text-red-700 border-red-200',
  };

  const summaryAccentClasses: Record<'A' | 'B' | 'C' | 'D', { container: string; chip: string; } > = {
    A: { container: 'from-green-50 border-green-200', chip: 'bg-green-100 text-green-700' },
    B: { container: 'from-blue-50 border-blue-200', chip: 'bg-blue-100 text-blue-700' },
    C: { container: 'from-yellow-50 border-yellow-200', chip: 'bg-yellow-100 text-yellow-700' },
    D: { container: 'from-red-50 border-red-200', chip: 'bg-red-100 text-red-700' },
  };

  // 커스텀 Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-gray-600 mb-1">{payload[0].name}</p>
          <p className="text-2xl font-bold text-gray-900">
            {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="space-y-8">
      {/* ROI 종합 평가 카드 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900">ROI 종합 평가</h3>
        </div>
        <div className="flex items-center gap-4 mb-2">
          <div className={`w-20 h-20 rounded-lg border flex items-center justify-center text-3xl font-bold ${gradeColorClasses[overallEvaluation.grade]}`}>
            {overallEvaluation.grade}
          </div>
          <span className="text-4xl font-extrabold text-gray-900 ml-2">{overallEvaluation.score}</span>
          <span className="text-gray-500">/ 100</span>
        </div>
        <p className="text-sm text-gray-700 mb-10">{overallEvaluation.message}</p>

        {/* ROI 요약 메트릭 */}
        <div className={`rounded-lg border p-4 bg-gradient-to-r ${summaryAccentClasses[overallEvaluation.grade].container} to-transparent`}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${summaryAccentClasses[overallEvaluation.grade].chip}`}>
              요약
            </div>

            <div className="flex items-center gap-2 text-gray-900">
              <span className="text-sm text-gray-600">예상 조회수</span>
              <span className="font-semibold">{roiSummary.views.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-900">
              <span className="text-sm text-gray-600">예상 참여</span>
              <span className="font-semibold">{roiSummary.engagements.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-900">
              <span className="text-sm text-gray-600">예상 비용</span>
              <span className="font-semibold text-blue-600">{`₩${roiSummary.cost.toLocaleString()}`}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-900">
              <span className="text-sm text-gray-600">참여율</span>
              <span className="font-semibold">{`${roiSummary.engagementRate.toFixed(2)}%`}</span>
            </div>
          </div>
        </div>
      </div>
      {/* ROI 예측 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700">
              브랜드 적합도
            </h3>
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
          </div>
          <p className="text-xs text-gray-500 mb-2">CLIP + Sentence-BERT</p>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            38.9 / 100
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: "30%" }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700">
              감성 분석
            </h3>
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
          </div>
          <p className="text-xs text-gray-500 mb-2">KoBERT 기반</p>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            75.0 / 100
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: "22%" }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700">
              ROI 효율
            </h3>
            <svg
              className="w-5 h-5 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4"
              />
            </svg>
          </div>
          <p className="text-xs text-gray-500 mb-2">참여율 기반</p>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            98.9 / 100
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: "6%" }}
            />
          </div>
        </div>
      </div>

      {/* ROI 예측 대시보드 */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          ROI 대시보드
        </h3>
        <p className="text-gray-600 mb-6">
          캠페인 예상 결과 분석
        </p>
        <ResponsiveContainer width="100%" height={450}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            barCategoryGap="25%"
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e5e7eb"
              opacity={0.5}
            />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: '#d1d5db' }}
              axisLine={{ stroke: '#d1d5db' }}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: '#d1d5db' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              radius={[8, 8, 0, 0]}
              barSize={200}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 브랜드 적합도 분석 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          브랜드 적합도 분석
        </h3>
        <div className="space-y-4">
          {[
            { name: "이미지 유사도", percentage: 50.0 },
            { name: "텍스트 유사도", percentage: 46.5 },
            { name: "톤 매칭", percentage: 0.0 },
            { name: "카테고리 매칭", percentage: 50.0 },
          ].map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">{item.name}</span>
                <span className="text-gray-600">{item.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default ROIAnalysisTab;

