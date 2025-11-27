import React from "react";

interface WeightsUsed {
  [key: string]: number;
}

interface TotalScoreData {
  total_score: number;
  recommendation: string;
  weights_used: WeightsUsed;
}

interface TotalScoreSectionProps {
  totalScoreData: TotalScoreData | null;
}

const TotalScoreSection = ({ totalScoreData }: TotalScoreSectionProps) => {
  if (!totalScoreData)
    return <div className="text-sm text-gray-500"> 데이터를 불러올 수 없습니다.</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-2">종합 점수</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg border">
          <p className="text-sm text-gray-600 mb-1">총 점수</p>
          <p className="text-3xl font-bold">{totalScoreData.total_score.toFixed(2)}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border">
          <p className="text-sm text-gray-600 mb-1">추천 의견</p>
          <p>{totalScoreData.recommendation}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(totalScoreData.weights_used).map(([label, value]) => (
          <div key={label} className="p-4 bg-gray-50 rounded-lg border">
            <p className="text-sm text-gray-600">{label}</p>
            <p className="text-xl font-semibold">{(value * 100).toFixed(0)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalScoreSection;