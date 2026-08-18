import React from "react";
import { useRoiEstimate } from "../../../hooks/useRoiEstimate";
import RoiSummaryCard from "./ROI/RoiSummaryCard";
import RoiDashboard from "./ROI/RoiDashboard";

interface ROIAnalysisTabNewProps {
  projectId: string;
  channelId: string;
}

const ROIAnalysisTabNew: React.FC<ROIAnalysisTabNewProps> = ({
  projectId,
  channelId,
}) => {
  const {
    data: estimateData,
    isLoading: isEstimateLoading,
    error: estimateError,
  } = useRoiEstimate(projectId, channelId);

  // 로딩 중일 때
  if (isEstimateLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600">ROI 분석 결과를 불러오는 중...</p>
      </div>
    );
  }

  if (estimateError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-medium">분석 실패</p>
        <p className="text-red-500 mt-2">
          {estimateError instanceof Error
            ? estimateError.message
            : "ROI 데이터를 불러오지 못했습니다."}
        </p>
      </div>
    );
  }

  if (!estimateData) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-600">ROI 추정 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ROI 종합 평가 카드 */}
      <RoiSummaryCard
        estimateData={{
          score: estimateData.score,
          estimated_views: estimateData.estimated_views,
          estimated_engagement: estimateData.estimated_engagement,
          estimated_cost: estimateData.estimated_cost,
        }}
      />

      {/* ROI 예측 대시보드 */}
      <RoiDashboard
        estimateData={{
          score: estimateData.score,
          estimated_views: estimateData.estimated_views,
          estimated_engagement: estimateData.estimated_engagement,
        }}
      />
    </div>
  );
};

export default ROIAnalysisTabNew;
