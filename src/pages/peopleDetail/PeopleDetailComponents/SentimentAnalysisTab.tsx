import React from "react";

const SentimentAnalysisTab: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* 감성 분석 차트 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">
          감성 분석 결과
        </h3>
        <div className="flex justify-center">
          <div className="flex gap-24 items-center">
            <div className="text-center">
              <div className="w-48 h-48 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl font-bold text-green-600">
                  85%
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-3 text-xl">긍정적</h4>
              <p className="text-base text-gray-600">
                대부분의 댓글이 긍정적
              </p>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl font-bold text-red-600">3%</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-3 text-xl">부정적</h4>
              <p className="text-base text-gray-600">최소한의 부정적 반응</p>
            </div>
          </div>
        </div>
      </div>

      {/* 감성 분석 카드 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="grid grid-cols-2 gap-12">
          {/* 긍정적 카드 */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-900 text-xl">긍정</h4>
              <span className="text-green-600 font-bold text-2xl">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="bg-gray-900 h-4 rounded-full transition-all duration-500"
                style={{ width: "85%" }}
              />
            </div>
            <p className="text-base text-gray-600">매우 긍정적인 반응</p>
          </div>

          {/* 부정적 카드 */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-900 text-xl">부정</h4>
              <span className="text-red-600 font-bold text-2xl">3%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="bg-gray-900 h-4 rounded-full transition-all duration-500"
                style={{ width: "3%" }}
              />
            </div>
            <p className="text-base text-gray-600">매우 낮은 수준</p>
          </div>
        </div>
      </div>

      {/* 감성 분석 상세 - 주요 감성 키워드 */}
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
      </div>

      
    </div>
  );
};

export default SentimentAnalysisTab;

