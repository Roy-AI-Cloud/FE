import React from "react";
import { useBrandMatch } from "../../../hooks/useBrandMatch";
import { useTotalScore } from "../../../hooks/useTotalScore";
import RoiSummaryCard from "./ROI/RoiSummaryCard";
import TotalScoreSection from "./ROI/TotalScoreSection";
import RoiPredictCards from "./ROI/RoiPredictCards";
import RoiDashboard from "./ROI/RoiDashboard";
import BrandMatchSection from "./ROI/BrandMatchSection";
import { useRoiEstimate } from "../../../hooks/useRoiEstimate";

interface ROIAnalysisTabProps {
  projectId: string;
  channelId: string;
}

const ROIAnalysisTab: React.FC<ROIAnalysisTabProps> = ({
  projectId,
  channelId,
}) => {
  const {
    data: estimateData,
    isLoading: isEstimateLoading,
    error: estimateError,
  } = useRoiEstimate(projectId, channelId);
  const {
    data: brandMatchData,
    isLoading: isBrandMatchLoading,
    error: brandMatchError,
  } = useBrandMatch(projectId, channelId, !!projectId && !!channelId);
  const {
    data: totalScoreData,
    isLoading: isTotalScoreLoading,
    error: totalScoreError,
  } = useTotalScore(projectId, channelId, !!projectId && !!channelId);

  const overallLoading =
    isEstimateLoading || isBrandMatchLoading || isTotalScoreLoading;

  // 로딩 중일 때
  if (overallLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600">분석 결과를 불러오는 중...</p>
      </div>
    );
  }

  const combinedError =
    (estimateError instanceof Error
      ? estimateError.message
      : estimateError
      ? "ROI 데이터를 불러오지 못했습니다."
      : null) ||
    (brandMatchError instanceof Error
      ? brandMatchError.message
      : brandMatchError
      ? "브랜드 적합도 분석에 실패했습니다."
      : null) ||
    (totalScoreError instanceof Error
      ? totalScoreError.message
      : totalScoreError
      ? "종합 점수를 불러오지 못했습니다."
      : null);

  if (combinedError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-medium">분석 실패</p>
        <p className="text-red-500 mt-2">{combinedError}</p>
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

      {/* 종합 점수 */}
      {totalScoreData && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                종합 점수 (가중치 적용)
              </h3>
              <p className="text-sm text-gray-500">
                브랜드 이미지 / 감성 / ROI 가중치 기반 계산
              </p>
            </div>
            <div className="text-right"></div>
          </div>
          <TotalScoreSection
            totalScoreData={{
              total_score: totalScoreData.total_score,
              recommendation: totalScoreData.recommendation,
              weights_used: {
                "브랜드 이미지 가중치":
                  totalScoreData.weights_used.brand_image_weight,
                "감성 분석 가중치":
                  totalScoreData.weights_used.sentiment_weight,
                "ROI 가중치": totalScoreData.weights_used.roi_weight,
              },
            }}
          />
        </div>
      )}

      {/* ROI 예측 카드들 */}
      <RoiPredictCards
        estimateData={{
          score: estimateData.score,
          estimated_views: estimateData.estimated_views,
          estimated_engagement: estimateData.estimated_engagement,
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

      {/* 브랜드 적합도 분석 */}
      {brandMatchData && (
        <BrandMatchSection
          brandMatchData={{
            score: brandMatchData.score,
            details: {
              brand_category: brandMatchData.details.brand_category,
              analysis_method: brandMatchData.details.analysis_method,
              image_similarity: brandMatchData.details.image_similarity,
              text_compatibility: brandMatchData.details.text_compatibility,
            },
          }}
        />
      )}
    </div>
  );
};

export default ROIAnalysisTab;
