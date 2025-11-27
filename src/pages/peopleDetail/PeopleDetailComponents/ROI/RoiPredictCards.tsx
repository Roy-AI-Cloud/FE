interface EstimateData {
    score: number;
    estimated_views: number;
    estimated_engagement: number;
  }
  
  interface RoiPredictCardsProps {
    estimateData: EstimateData;
  }
  
  const RoiPredictCards = ({ estimateData }: RoiPredictCardsProps) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "브랜드 적합도",
            value: `${estimateData.score.toFixed(1)} / 100`,
            bar: estimateData.score,
            color: "bg-blue-500",
          },
          {
            title: "예상 조회수",
            value: estimateData.estimated_views.toLocaleString(),
            bar: Math.min((estimateData.estimated_views / 100000) * 100, 100),
            color: "bg-green-500",
          },
          {
            title: "예상 참여율",
            value: `${estimateData.estimated_engagement.toFixed(2)}%`,
            bar: Math.min(estimateData.estimated_engagement * 10, 100),
            color: "bg-orange-500",
          },
        ].map((item) => (
          <div className="bg-white border rounded-lg p-6" key={item.title}>
            <h3 className="text-sm font-medium text-gray-700 mb-2">{item.title}</h3>
            <div className="text-2xl font-bold mb-2">{item.value}</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.bar}%` }} />
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default RoiPredictCards;