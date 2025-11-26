import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RangeSlider from "../../components/RangeSlider";
import CheckboxGroup from "../../components/CheckboxGroup";
import GradientButton from "../../components/button/LoginButton";

const AdvancedFilterPage: React.FC = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>(["YouTube"]);
  const [followerRange, setFollowerRange] = useState<[number, number]>([
    0, 500,
  ]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [viewRange, setViewRange] = useState<[number, number]>([0, 1000]);
  const [engagementRange, setEngagementRange] = useState<[number, number]>([
    0, 10,
  ]);
  const [brandSuitability, setBrandSuitability] = useState<number>(0);

  const categoryOptions = [
    "건강/의료",
    "패션/의류",
    "테크/IT",
    "뷰티/화장품",
    "라이프스타일",
    "식품/음료",
  ];

  const platformOptions = ["YouTube", "Instagram", "Naver"];

  const handleReset = () => {
    setCategories([]);
    setPlatforms(["YouTube"]);
    setFollowerRange([0, 500]);
    setPriceRange([0, 2000]);
    setViewRange([0, 1000]);
    setEngagementRange([0, 10]);
    setBrandSuitability(0);
  };

  const handleApplyFilter = () => {
    // 필터 적용
    console.log("Applied filters:", {
      categories,
      platforms,
      followerRange,
      priceRange,
      viewRange,
      engagementRange,
      brandSuitability,
    });
    navigate("/youtube/home-list");
  };

  const formatFollower = (value: number) => `${value}만 명`;
  const formatPrice = (value: number) => `₩${value} 만`;
  const formatView = (value: number) => `${value} 만`;
  const formatEngagement = (value: number) => `${value}%`;
  const formatBrandSuitability = (value: number) => `${value}점 이상`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl px-6 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/youtube/home-list")}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>검색 결과로 돌아가기</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                초기화
              </button>
              <GradientButton onClick={handleApplyFilter}>
                ✓ 필터 적용
              </GradientButton>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-4xl px-6 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">고급 필터링</h1>
          <p className="text-gray-600">
            상세 조건으로 인플루언서를 필터링하세요
          </p>
        </div>

        <div className="p-8 space-y-10 bg-white border border-gray-300 rounded-lg shadow-md">
          <CheckboxGroup
            title="카테고리"
            options={categoryOptions}
            selectedValues={categories}
            onChange={setCategories}
            columns={2}
          />

          {/* 플랫폼 */}
          <div className="space-y-3">
            <CheckboxGroup
              title="플랫폼"
              options={platformOptions}
              selectedValues={platforms}
              onChange={setPlatforms}
              columns={1}
            />
            <p className="text-xs text-gray-500">
              * 현재 YouTube 플랫폼만 지원합니다
            </p>
          </div>

          {/* 팔로워/구독자 수 */}
          <RangeSlider
            label="팔로워/구독자 수"
            description="10만당 약 100만원"
            min={0}
            max={500}
            step={10}
            value={followerRange}
            onChange={setFollowerRange}
            formatValue={formatFollower}
          />

          {/* 가격 범위 */}
          <RangeSlider
            label="가격 범위"
            min={0}
            max={2000}
            step={50}
            value={priceRange}
            onChange={setPriceRange}
            formatValue={formatPrice}
          />

          {/* 평균 조회수 */}
          <RangeSlider
            label="평균 조회수"
            min={0}
            max={1000}
            step={10}
            value={viewRange}
            onChange={setViewRange}
            formatValue={formatView}
          />

          {/* 참여율 */}
          <RangeSlider
            label="참여율"
            min={0}
            max={10}
            step={0.1}
            value={engagementRange}
            onChange={setEngagementRange}
            formatValue={formatEngagement}
          />

          {/* 브랜드 적합도 */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">
              브랜드 적합도 (최소)
            </h3>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={brandSuitability}
                onChange={(e) => setBrandSuitability(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-gray-600 min-w-[80px]">
                {formatBrandSuitability(brandSuitability)}
              </span>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => navigate("/youtube/home-list")}
            className="px-6 py-3 text-gray-600 hover:text-gray-800"
          >
            취소
          </button>
          <GradientButton onClick={handleApplyFilter} className="px-8 py-3">
            ✓ 필터 적용하고 결과 보기
          </GradientButton>
        </div>
      </main>
    </div>
  );
};

export default AdvancedFilterPage;
