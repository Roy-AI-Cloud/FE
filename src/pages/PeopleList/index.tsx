import React, { useState, useEffect, useMemo } from "react";
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
import Pagination from "../../components/button/Pagination";
import { useHomeYoutubers } from "../../hooks/useYoutubersList";
import { getSortedYoutubers } from "../../apis/getYoutuberList";
import type { HomeYoutuber } from "../../apis/getYoutuberList";

const ITEMS_PER_PAGE = 50;

const PeopleList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("기본순");
  const [isSortLoading, setIsSortLoading] = useState(false);
  const [sortError, setSortError] = useState<string | null>(null);
  const { data, isLoading, error } = useHomeYoutubers(50);
  const [baseInfluencers, setBaseInfluencers] = useState<HomeYoutuber[]>([]);
  const [displayInfluencers, setDisplayInfluencers] = useState<HomeYoutuber[]>(
    []
  );
  const isEditMode =
    new URLSearchParams(location.search).get("mode") === "edit";

  useEffect(() => {
    if (Array.isArray(data)) {
      setBaseInfluencers(data);
      setDisplayInfluencers(data);
    }
  }, [data]);

  // 필터링된 인플루언서 목록
  const filteredInfluencers = useMemo(() => {
    return displayInfluencers.filter((influencer: HomeYoutuber) => {
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
  }, [displayInfluencers, searchTerm, activeFilter]);

  const totalPages = Math.ceil(filteredInfluencers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedInfluencers = filteredInfluencers.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = async (value: string) => {
    setSortOption(value);
    setSortError(null);
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로 리셋

    // 정렬 옵션과 API 파라미터 매핑
    const sortMap: Record<string, "followers" | "engagement" | "price"> = {
      "팔로워 많은순": "followers",
      "참여율 높은순": "engagement",
      "가격 낮은순": "price",
    };

    if (value === "기본순") {
      // 기본순으로 돌아가기
      setDisplayInfluencers(baseInfluencers);
      return;
    }

    const sortBy = sortMap[value];
    if (!sortBy) {
      setSortError("지원하지 않는 정렬 옵션입니다.");
      return;
    }

    setIsSortLoading(true);
    try {
      console.log(
        `정렬된 유튜버 목록 로딩 시작... (${value}, sort_by=${sortBy})`
      );
      const sorted = await getSortedYoutubers(sortBy, 1000); // 페이지네이션을 위해 충분한 데이터 가져오기
      console.log("정렬된 유튜버 목록 로딩 완료:", sorted.length, "개");
      setDisplayInfluencers(sorted);
    } catch (sortErr) {
      console.error("정렬된 유튜버 목록 로딩 실패:", sortErr);
      const message =
        sortErr instanceof Error
          ? sortErr.message
          : "정렬된 목록을 불러오지 못했습니다.";
      setSortError(message);
      // 에러 발생 시 기본 목록으로 복원
      setDisplayInfluencers(baseInfluencers);
    } finally {
      setIsSortLoading(false);
    }
  };

  const isListLoading = isLoading || isSortLoading;

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
        <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
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
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <DropCategory
                value={sortOption}
                onChange={handleSortChange}
                disabled={isListLoading}
              />
              <SortDropdown isActive={isEditMode} />
            </div>
            {sortError && <p className="text-sm text-red-500">{sortError}</p>}
          </div>
        </div>

        {/* 인플루언서 그리드 */}
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
          {isListLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : paginatedInfluencers.map((influencer) => (
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

        {/* 페이지네이션 */}
        {!isListLoading && filteredInfluencers.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* 에러 메시지 */}
        {error && (
          <div className="text-center py-12 mb-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-600 font-medium text-lg">
                데이터를 불러오는 중 오류가 발생했습니다
              </p>
              <p className="text-red-500 text-sm mt-2">
                {error instanceof Error ? error.message : "알 수 없는 오류"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                새로고침
              </button>
            </div>
          </div>
        )}

        {/* 결과 없음 메시지 */}
        {!isListLoading && !error && filteredInfluencers.length === 0 && (
          <div className="text-center py-12 mb-12">
            <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
            <p className="text-gray-400 text-sm mt-2">
              다른 검색어나 필터를 시도해보세요.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PeopleList;
