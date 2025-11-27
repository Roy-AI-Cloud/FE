import React from "react";
import { useBrandMatch } from "../../../hooks/useBrandMatch";
import { useRoiEstimate } from "../../../hooks/useRoiEstimate";
import BrandMatchSection from "./ROI/BrandMatchSection";
import RoiPredictCards from "./ROI/RoiPredictCards";

interface BrandImageCompatibilityTabProps {
  projectId: string;
  channelId: string;
}

const BrandImageCompatibilityTab: React.FC<BrandImageCompatibilityTabProps> = ({
  projectId,
  channelId,
}) => {
  const {
    data: brandMatchData,
    isLoading: isBrandMatchLoading,
    error: brandMatchError,
  } = useBrandMatch(projectId, channelId, !!projectId && !!channelId);

  const {
    data: estimateData,
    isLoading: isEstimateLoading,
    error: estimateError,
  } = useRoiEstimate(projectId, channelId);

  const overallLoading = isBrandMatchLoading || isEstimateLoading;

  // 로딩 중일 때
  if (overallLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600">브랜드 적합도 분석 중...</p>
      </div>
    );
  }

  const combinedError =
    (brandMatchError instanceof Error
      ? brandMatchError.message
      : brandMatchError
      ? "브랜드 적합도 분석에 실패했습니다."
      : null) ||
    (estimateError instanceof Error
      ? estimateError.message
      : estimateError
      ? "ROI 데이터를 불러오지 못했습니다."
      : null);

  if (combinedError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-medium">분석 실패</p>
        <p className="text-red-500 mt-2">{combinedError}</p>
      </div>
    );
  }

  if (!brandMatchData || !estimateData) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-600">브랜드 적합도 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 브랜드 적합도 분석 */}
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

      {/* ROI 예측 카드들 */}
      <RoiPredictCards
        estimateData={{
          score: estimateData.score,
          estimated_views: estimateData.estimated_views,
          estimated_engagement: estimateData.estimated_engagement,
        }}
      />
    </div>
  );
};

export default BrandImageCompatibilityTab;
