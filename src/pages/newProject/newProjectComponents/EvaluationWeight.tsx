import { useState } from 'react';

type Weights = {
  brandImageFit: number;
  commentAnalysis: number;
  roiEfficiency: number;
};
type WeightKey = keyof Weights;

export default function EvaluationWeight() {
  const [weights, setWeights] = useState<Weights>({
    brandImageFit: 40,
    commentAnalysis: 30,
    roiEfficiency: 30,
  });

  const handleSliderChange = (key: WeightKey, value: string) => {
    const newValue = parseInt(value, 10);
    // 합계를 100으로 고정하지 않음: 해당 값만 변경
    setWeights(prev => ({ ...prev, [key]: newValue }));
  };

  const sliders: Array<{ key: WeightKey; label: string; color: 'blue' | 'green' | 'purple' }> = [
    { key: 'brandImageFit', label: '브랜드 이미지 적합도 (기본 40%)', color: 'blue' },
    { key: 'commentAnalysis', label: '댓글 감성 분석 (기본 30%)', color: 'green' },
    { key: 'roiEfficiency', label: 'ROI 효율성 (기본 30%)', color: 'purple' },
  ];

  const total = (Object.values(weights) as number[]).reduce((sum, v) => sum + v, 0);
  const isTotal100 = total === 100;

  return (
    <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6"> 평가 가중치 설정</h2>
      
      <div className="space-y-8">
        {sliders.map(({ key, label, color }) => (
          <div key={key}>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-700">{label}</label>
              <span className={`text-lg font-semibold text-${color}-600`}>
                {weights[key]}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={weights[key]}
              onChange={(e) => handleSliderChange(key, e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(59, 130, 246) ${weights[key]}%, rgb(229, 231, 235) ${weights[key]}%, rgb(229, 231, 235) 100%)`
              }}
            />
          </div>
        ))}
      </div>

      <div className={`mt-6 p-4 rounded-lg ${isTotal100 ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'}`}>
        <span className="font-medium">
          {isTotal100 
            ? `현재 가중치 합계: ${total}%`
            : `가중치 합계: ${total}% (100%로 맞춰주세요)`}
        </span>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgb(59, 130, 246);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgb(59, 130, 246);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}