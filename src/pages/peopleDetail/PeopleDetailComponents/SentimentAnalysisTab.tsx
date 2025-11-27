import React from "react";
import { useSentimentAnalysis } from "../../../hooks/useSentimentAnalysis";

interface SentimentAnalysisTabProps {
  projectId: string;
  channelId: string;
}

const SentimentAnalysisTab: React.FC<SentimentAnalysisTabProps> = ({
  projectId,
  channelId,
}) => {
  const {
    data: sentimentData,
    isLoading,
    error,
  } = useSentimentAnalysis(projectId, channelId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600">감정 분석 데이터를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-600 font-medium">
          감정 분석 데이터를 불러오는 중 오류가 발생했습니다
        </p>
        <p className="text-red-500 text-sm mt-2">
          {error instanceof Error ? error.message : "알 수 없는 오류"}
        </p>
      </div>
    );
  }

  if (!sentimentData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">감정 분석 데이터가 없습니다.</p>
      </div>
    );
  }

  const positivePercentage = Math.round(sentimentData.positive_ratio * 100);
  const neutralPercentage = Math.round(sentimentData.neutral_ratio * 100);
  const negativePercentage = Math.round(sentimentData.negative_ratio * 100);

  const getSentimentDescription = (percentage: number, type: string) => {
    if (type === "positive") {
      if (percentage >= 70) return "매우 긍정적인 반응";
      if (percentage >= 50) return "긍정적인 반응";
      return "보통 수준";
    }
    if (type === "negative") {
      if (percentage >= 30) return "높은 부정적 반응";
      if (percentage >= 10) return "보통 수준";
      return "매우 낮은 수준";
    }
    return "중립적인 반응";
  };

  return (
    <div className="space-y-8">
      {/* 감성 분석 차트 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">
          댓글 감성 분석 결과
        </h3>
        <p className="text-gray-600 mt-2 mb-8 text-sm">
          총 {sentimentData.total_comments.toLocaleString()}개 댓글 분석
        </p>
        <div className="flex justify-center">
          <div className="flex gap-24 items-center">
            <div className="text-center">
              <div className="w-48 h-48 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl font-bold text-green-600">
                  {positivePercentage}%
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-3 text-xl">
                긍정적 댓글
              </h4>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl font-bold text-gray-600">
                  {neutralPercentage}%
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-3 text-xl">
                중립적 댓글
              </h4>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl font-bold text-red-600">
                  {negativePercentage}%
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-3 text-xl">
                부정적 댓글
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* 감성 분석 카드 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="space-y-6">
          {/* 긍정적 카드 */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-900 text-xl">긍정</h4>
              <span className="text-green-600 font-bold text-2xl">
                {positivePercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="bg-green-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${positivePercentage}%` }}
              />
            </div>
            <p className="text-base text-gray-600">
              {getSentimentDescription(positivePercentage, "positive")}
            </p>
          </div>

          {/* 중립적 카드 */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-900 text-xl">중립</h4>
              <span className="text-gray-600 font-bold text-2xl">
                {neutralPercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="bg-gray-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${neutralPercentage}%` }}
              />
            </div>
            <p className="text-base text-gray-600">
              {getSentimentDescription(neutralPercentage, "neutral")}
            </p>
          </div>

          {/* 부정적 카드 */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-900 text-xl">부정</h4>
              <span className="text-red-600 font-bold text-2xl">
                {negativePercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="bg-red-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${negativePercentage}%` }}
              />
            </div>
            <p className="text-base text-gray-600">
              {getSentimentDescription(negativePercentage, "negative")}
            </p>
          </div>
        </div>
      </div>

      {/* 감성 분석 상세 - 주요 감성 키워드
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          주요 감성 키워드
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              긍정적 키워드
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "좋아요",
                "훌륭해요",
                "도움이 됐어요",
                "추천해요",
                "만족해요",
                "감사해요",
              ].map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              부정적 키워드
            </h4>
            <div className="flex flex-wrap gap-2">
              {["아쉬워요", "개선이 필요해요", "실망해요"].map(
                (keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full"
                  >
                    {keyword}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SentimentAnalysisTab;
