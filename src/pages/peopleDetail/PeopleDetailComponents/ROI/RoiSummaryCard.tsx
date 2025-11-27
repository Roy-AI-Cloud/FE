interface EstimateData {
  score: number;
  estimated_views: number;
  estimated_engagement: number;
  estimated_cost: string | number;
}

interface RoiSummaryCardProps {
  estimateData: EstimateData;
}

const RoiSummaryCard = ({ estimateData }: RoiSummaryCardProps) => {
  const score = estimateData.score;

  const grade = score >= 80 ? "A" : score >= 60 ? "B" : score >= 40 ? "C" : "D";

  // 등급별 색상 설정
  const gradeColors = {
    A: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-300",
      summaryBg: "bg-green-50",
      summaryBorder: "border-green-200"
    },
    B: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-300",
      summaryBg: "bg-blue-50",
      summaryBorder: "border-blue-200"
    },
    C: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      border: "border-yellow-300",
      summaryBg: "bg-yellow-50",
      summaryBorder: "border-yellow-200"
    },
    D: {
      bg: "bg-red-100",
      text: "text-red-700",
      border: "border-red-300",
      summaryBg: "bg-red-50",
      summaryBorder: "border-red-200"
    }
  };

  const currentGradeColor = gradeColors[grade as keyof typeof gradeColors];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-2xl font-bold mb-4">ROI 종합 평가</h3>

      <div className="flex items-center gap-4 mb-2">
        <div 
          className={`w-20 h-20 rounded-lg border-2 flex items-center justify-center text-3xl font-bold 
          ${currentGradeColor.bg} ${currentGradeColor.text} ${currentGradeColor.border}`}
        >
          {grade}
        </div>
        <span className="text-4xl font-extrabold">{Math.round(score)}</span>
        <span className="text-gray-500">/ 100</span>
      </div>

      <p className="text-sm text-gray-700 mb-6">
        {score >= 70 ? "우수한 ROI 예상" : score >= 50 ? "검토 필요" : "ROI 개선 필요"}
      </p>

      <div
        className={`p-4 rounded-lg border ${currentGradeColor.summaryBg} ${currentGradeColor.summaryBorder}`}
      >
        <div className="flex flex-wrap gap-4">
          <div>
            <span className="text-sm text-gray-600">예상 조회수</span>{" "}
            <span className="font-semibold">{estimateData.estimated_views.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-sm text-gray-600">예상 참여</span>{" "}
            <span className="font-semibold">{estimateData.estimated_engagement}</span>
          </div>
          <div>
            <span className="text-sm text-gray-600">예상 비용</span>{" "}
            <span className="font-semibold">{estimateData.estimated_cost}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoiSummaryCard;