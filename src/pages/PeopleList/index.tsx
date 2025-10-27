import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import SearchBar from "../../components/searchBar";
import FilterTabs from "../../components/list/FilterTabs";
import InfluencerCard from "../../components/list/InfluencerCard";
import Footer from "../../components/Footer";
import GradientButton from "../../components/button/LoginButton";
import DropCategory from "../../components/button/DropCategory";
import SortDropdown from "../../components/button/SortDropdown";

const PeopleList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("전체");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  const influencers = [
    {
      id: 1,
      name: "자연을 향한숨: 1밀크",
      category: "건강라이프스타일",
      platforms: ["YouTube", "Instagram"],
      followers: "368,000",
      engagement: "6.2%",
      price: "₩2,000,000",
    },
    {
      id: 2,
      name: "행복인사이더 마나",
      category: "뷰티/패션",
      platforms: ["Instagram", "TikTok"],
      followers: "425,000",
      engagement: "7.2%",
      price: "₩3,500,000",
    },
    {
      id: 3,
      name: "성건강연구소",
      category: "건강정보",
      platforms: ["YouTube"],
      followers: "158,000",
      engagement: "8.1%",
      price: "₩1,500,000",
    },
    {
      id: 4,
      name: "김민지의 건강한마",
      category: "라이프스타일",
      platforms: ["Instagram"],
      followers: "186,000",
      engagement: "4.2%",
      price: "₩500,000",
    },
    {
      id: 5,
      name: "테크리뷰어 윤",
      category: "테크/가젯",
      platforms: ["YouTube", "Instagram"],
      followers: "582,000",
      engagement: "6.2%",
      price: "₩4,200,000",
    },
    {
      id: 6,
      name: "건강포켓",
      category: "건강정보",
      platforms: ["YouTube", "Instagram", "TikTok"],
      followers: "2,700,000",
      engagement: "5.9%",
      price: "₩15,000,000",
    },
  ];

  // 로딩 시뮬레이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesSearch =
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory || influencer.category.includes(selectedCategory);

    if (activeFilter === "전체") return matchesSearch && matchesCategory;
    if (activeFilter === "YouTube")
      return (
        matchesSearch &&
        matchesCategory &&
        influencer.platforms.includes("YouTube")
      );
    if (activeFilter === "Instagram")
      return (
        matchesSearch &&
        matchesCategory &&
        influencer.platforms.includes("Instagram")
      );

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center space-x-4">
              <GradientButton className="rounded-2xl">
                + 새 프로젝트
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
            <DropCategory
              options={[
                "운동",
                "일상",
                "음악",
                "패션",
                "뷰티",
                "푸드",
                "여행",
                "IT",
                "게임",
                "교육",
              ]}
              selectedValue={selectedCategory}
              onChange={setSelectedCategory}
            />
            <SortDropdown />
          </div>
        </div>

        {/* 인플루언서 그리드 */}
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <InfluencerCard
                  key={index}
                  name=""
                  category=""
                  platforms={[]}
                  followers=""
                  engagement=""
                  price=""
                  isLoading={true}
                />
              ))
            : // 로딩 완료 후 실제 데이터 표시
              filteredInfluencers.map((influencer) => (
                <InfluencerCard
                  key={influencer.id}
                  name={influencer.name}
                  category={influencer.category}
                  platforms={influencer.platforms}
                  followers={influencer.followers}
                  engagement={influencer.engagement}
                  price={influencer.price}
                  onClick={() => navigate(`/influencer/${influencer.id}`)}
                />
              ))}
        </div>
      </main>

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default PeopleList;
