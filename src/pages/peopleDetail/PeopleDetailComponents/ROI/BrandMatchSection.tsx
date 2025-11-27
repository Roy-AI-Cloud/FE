interface BrandMatchDetails {
    brand_category?: string;
    analysis_method: string;
    image_similarity: number;
    text_compatibility: number;
  }
  
  interface BrandMatchData {
    score: number;
    details: BrandMatchDetails;
  }
  
  interface BrandMatchSectionProps {
    brandMatchData: BrandMatchData | null;
  }
  
  const BrandMatchSection = ({ brandMatchData }: BrandMatchSectionProps) => {
    if (!brandMatchData) return null;
  
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">브랜드 적합도 분석</h3>
          <div className="p-4 border rounded-lg shadow">
            <p className="text-sm text-gray-600">점수</p>
            <p className="text-3xl font-bold">
              {brandMatchData.score.toFixed(1)}
            </p>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg border">
            <p className="text-sm text-gray-600 mb-1">브랜드 카테고리</p>
            <p className="text-lg font-semibold">
              {brandMatchData.details.brand_category || "-"}
            </p>
          </div>
  
          <div className="p-4 bg-gray-50 rounded-lg border">
            <p className="text-sm text-gray-600 mb-1">분석 방식</p>
            <p className="text-lg font-semibold">
              {brandMatchData.details.analysis_method}
            </p>
          </div>
        </div>
  
        {[
          {
            label: "이미지 유사도",
            value: brandMatchData.details.image_similarity,
          },
          {
            label: "텍스트 호환성",
            value: brandMatchData.details.text_compatibility,
          },
        ].map((m) => (
          <div key={m.label}>
            <div className="flex justify-between text-sm mb-1">
              <span>{m.label}</span>
              <span>{m.value.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${Math.min(m.value, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default BrandMatchSection;