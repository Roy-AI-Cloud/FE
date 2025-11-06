import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../components/Logo";
import SearchBar from "../../components/searchBar";
import FilterTabs from "../../components/list/FilterTabs";
import InfluencerCard from "../../components/list/InfluencerCard";
import SkeletonCard from "../../components/list/SkeletonCard";
import Footer from "../../components/Footer";
import GradientButton from "../../components/button/LoginButton";
import SortDropdown from "../../components/button/SortDropdown";
import DropCategory from "../../components/button/DropCategory";
import { useHomeYoutubers } from "../../hooks/useYoutubersList";

const PeopleList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("전체");

  const { data: influencers = [], isLoading } = useHomeYoutubers();

  const isEditMode =
    new URLSearchParams(location.search).get("mode") === "edit";

  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesSearch =
      influencer.channel_title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      influencer.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeFilter === "전체") return matchesSearch;
    if (activeFilter === "YouTube") return matchesSearch;
    if (activeFilter === "Instagram") return false;

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center space-x-4">
              <GradientButton
                className="rounded-2xl"
                onClick={() => navigate("/new-project")}
              >
                {isEditMode ? "프로젝트 수정" : "+ 새 프로젝트"}
              </GradientButton>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1 0-15 0v5h5l-5 5-5-5h5v-5a7.5 7.5 0 1 0 15 0v5z"
                  />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-400">
                  <span className="text-sm font-medium text-white">U</span>
                </div>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="px-6 py-8 mx-auto max-w-7xl">
        {/* 페이지 제목 */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            인플루언서 대시보드
          </h1>
          <p className="text-gray-600">등록된 모든 인플루언서를 확인하세요</p>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          {/* 검색바 + 필터 탭 */}
          <div className="flex flex-col gap-4 mb-6 lg:flex-row">
            <div className="flex-1">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={(filter) => {
                if (filter === "고급 필터") {
                  navigate("/advanced-filter");
                } else {
                  setActiveFilter(filter);
                }
              }}
            />
          </div>

          {/* 드롭다운 필터 */}
          <div className="flex items-center gap-4">
            <DropCategory />
            <SortDropdown isActive={isEditMode} />
          </div>
        </div>

        {/* 인플루언서 그리드 */}
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : filteredInfluencers.map((influencer) => (
                <InfluencerCard
                  key={influencer.channel_id}
                  name={influencer.channel_title}
                  category={influencer.category}
                  platforms={["YouTube"]}
                  image={influencer.thumbnail_url}
                  followers={influencer.subscriber_count.toLocaleString()}
                  engagement={`${influencer.engagement_rate.toFixed(1)}%`}
                  price={influencer.estimated_price}
                  onClick={() =>
                    navigate(`/influencer/${influencer.channel_id}`)
                  }
                />
              ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PeopleList;
