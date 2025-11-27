interface EstimateData {
  score: number;
  estimated_views: number;
  estimated_engagement: number;
}

interface RoiDashboardProps {
  estimateData: EstimateData;
}

const RoiDashboard = ({ estimateData }: RoiDashboardProps) => {
  const metrics = [
    {
      title: "평가 점수",
      value: estimateData.score,
      display: `${estimateData.score}점`,
      max: 100,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600"
    },
    {
      title: "예상 조회수",
      value: estimateData.estimated_views,
      display: estimateData.estimated_views >= 1000 
        ? `${(estimateData.estimated_views / 1000).toFixed(1)}K`
        : estimateData.estimated_views.toString(),
      max: 3000000,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600"
    },
    {
      title: "예상 참여율",
      value: estimateData.estimated_engagement,
      display: `${estimateData.estimated_engagement.toFixed(1)}%`,
      max: Math.max(estimateData.estimated_engagement * 1.5, 10),
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    }
  ];

  return (
    <div className="bg-white rounded-lg border shadow p-8">
      <h3 className="text-xl font-bold mb-2">ROI 대시보드</h3>
      <p className="text-gray-600 mb-8">캠페인 예상 결과 분석</p>

      <div className="space-y-8">
        {metrics.map((metric, index) => (
          <div key={index} className={`p-6 rounded-xl ${metric.bgColor}`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-base font-semibold text-gray-700">
                {metric.title}
              </h4>
              <span className={`text-3xl font-bold ${metric.textColor}`}>
                {metric.display}
              </span>
            </div>
            
            <div className="relative w-full h-6 bg-white rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-1000 ease-out`}
                style={{
                  width: `${Math.min((metric.value / metric.max) * 100, 100)}%`
                }}
              >
                <div className="h-full w-full bg-white/20 animate-pulse" />
              </div>
            </div>
            
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>0</span>
              <span>
                {metric.title === "평가 점수" 
                  ? "100점" 
                  : metric.title === "예상 조회수"
                  ? "5M"
                  : `${metric.max.toFixed(0)}%`
                }
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoiDashboard;