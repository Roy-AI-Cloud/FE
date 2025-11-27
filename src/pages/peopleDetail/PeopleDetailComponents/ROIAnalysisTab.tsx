import React from "react";
import TotalScoreSection from "./ROI/TotalScoreSection";
import { useTotalScore } from "../../../hooks/useTotalScore";

interface ROIAnalysisTabProps {
  projectId: string;
  channelId: string;
}

const ROIAnalysisTab: React.FC<ROIAnalysisTabProps> = ({
  projectId,
  channelId,
}) => {
  const {
    data: totalScoreData,
    isLoading: isTotalScoreLoading,
    error: totalScoreError,
  } = useTotalScore(projectId, channelId, !!projectId && !!channelId);

  // 로딩 중일 때
  if (isTotalScoreLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600">종합 점수를 불러오는 중...</p>
      </div>
    );
  }

  if (totalScoreError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-medium">분석 실패</p>
        <p className="text-red-500 mt-2">
          {totalScoreError instanceof Error
            ? totalScoreError.message
            : "종합 점수를 불러오지 못했습니다."}
        </p>
      </div>
    );
  }

  if (!totalScoreData) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-600">종합 점수 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 종합 점수 */}
      <TotalScoreSection
        totalScoreData={{
          total_score: totalScoreData.total_score,
          recommendation: totalScoreData.recommendation,
          weights_used: {
            "브랜드 이미지 가중치":
              totalScoreData.weights_used.brand_image_weight,
            "감성 분석 가중치": totalScoreData.weights_used.sentiment_weight,
            "ROI 가중치": totalScoreData.weights_used.roi_weight,
          },
        }}
      />
    </div>
  );
};

export default ROIAnalysisTab;
