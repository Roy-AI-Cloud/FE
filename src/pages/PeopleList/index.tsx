import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/searchBar";
import FilterTabs from "../../components/list/FilterTabs";
import InfluencerCard from "../../components/list/InfluencerCard";
import SkeletonCard from "../../components/list/SkeletonCard";
import Footer from "../../components/Footer";
import DropCategory from "../../components/button/DropCategory";
import Pagination from "../../components/button/Pagination";
import { useHomeYoutubers } from "../../hooks/useYoutubersList";
import { getSortedYoutubers } from "../../apis/getYoutuberList";
import type { HomeYoutuber } from "../../apis/getYoutuberList";
import { search } from "../../apis/search";
import Header from "../../components/Header";
import { useProjectList } from "../../hooks/useProjectList";
import type { CreateProjectResponse } from "../../apis/newProject";
import { useRoiEstimate } from "../../hooks/useRoiEstimate";

const SELECTED_PROJECT_KEY = "selected-project-id";

const ITEMS_PER_PAGE = 50;

const PeopleList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("기본순");
  const [isSortLoading, setIsSortLoading] = useState(false);
  const [sortError, setSortError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<CreateProjectResponse | null>(null);
  const {
    data: projects = [],
    isLoading: isProjectLoading,
    error: projectError,
  } = useProjectList();
  const { data, isLoading, error } = useHomeYoutubers(50);
  const [baseInfluencers, setBaseInfluencers] = useState<HomeYoutuber[]>([]);
  const [displayInfluencers, setDisplayInfluencers] = useState<HomeYoutuber[]>(
    []
  );

  useEffect(() => {
    if (!projects.length) return;
    if (typeof window === "undefined") return;
    const storedId = localStorage.getItem(SELECTED_PROJECT_KEY);
    if (!storedId) return;
    const matched = projects.find((project) => project.project_id === storedId);
    if (matched) {
      setSelectedProject((prev) =>
        prev?.project_id === matched.project_id ? prev : matched
      );
    }
  }, [projects]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setBaseInfluencers(data);
      setDisplayInfluencers(data);
    }
  }, [data]);

  // 필터링된 인플루언서 목록
  const filteredInfluencers = useMemo(() => {
    // 검색 모드일 때는 클라이언트 사이드 검색 필터링 건너뛰기 (API에서 이미 필터링됨)
    if (isSearchMode) {
      // 플랫폼 필터만 적용
      if (activeFilter === "Instagram") {
        return []; // Instagram은 현재 지원하지 않음
      }
      return displayInfluencers; // 검색 결과 그대로 반환
    }

    // 기본 모드: 클라이언트 사이드 필터링
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
  }, [displayInfluencers, searchTerm, activeFilter, isSearchMode]);

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

  const handleSearch = async () => {
    const trimmedKeyword = searchTerm.trim();

    if (!trimmedKeyword) {
      // 검색어가 비어있으면 기본 목록으로 복원
      setDisplayInfluencers(baseInfluencers);
      setSearchError(null);
      setIsSearchMode(false); // 검색 모드 해제
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setCurrentPage(1);
    setIsSearchMode(true); // 검색 모드 활성화

    try {
      console.log("검색 시작:", trimmedKeyword);
      const searchResults = await search({
        keyword: trimmedKeyword,
        top_n: 200,
        region: "KR",
        lang: "ko",
      });

      console.log("API 검색 결과 (원본):", searchResults);

      // SearchResult를 HomeYoutuber 형식으로 변환
      const convertedResults: HomeYoutuber[] = searchResults.map((item) => ({
        channel_id: item.channel_id,
        channel_title: item.title,
        subscriber_count: item.subscriber_count,
        thumbnail_url: item.thumbnail_url,
        category: item.category,
        engagement_rate: item.engagement_rate,
        estimated_price: item.estimated_price || "가격 문의",
      }));

      console.log("검색 완료:", convertedResults.length, "개");
      console.log("변환된 결과:", convertedResults);
      setDisplayInfluencers(convertedResults);
    } catch (err) {
      console.error("검색 실패:", err);
      const message =
        err instanceof Error ? err.message : "검색 중 오류가 발생했습니다.";
      setSearchError(message);
      // 에러 발생 시 기본 목록으로 복원
      setDisplayInfluencers(baseInfluencers);
      setIsSearchMode(false); // 검색 모드 해제
    } finally {
      setIsSearching(false);
    }
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
      setIsSearchMode(false); // 검색 모드 해제
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

  const isListLoading = isLoading || isSortLoading || isSearching;

  const handleProjectSelect = (project: CreateProjectResponse) => {
    setSelectedProject(project);
    if (typeof window !== "undefined") {
      localStorage.setItem(SELECTED_PROJECT_KEY, project.project_id);
    }
    setIsProjectModalOpen(false);
  };

  const handleProjectReset = () => {
    setSelectedProject(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(SELECTED_PROJECT_KEY);
    }
    setIsProjectModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* 메인 콘텐츠 */}
      <main className="px-6 py-8 mx-auto max-w-7xl">
        {/* 페이지 제목 */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            인플루언서 대시보드
          </h1>
          <p className="text-gray-600">프로젝트 설정에 따라 정량적 데이터 기반으로 최적의 인플루언서를 추천받아 보세요.</p>
        </div>

        {/* 검색 및 필터 */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-sm space-y-4">
          {/* 첫 번째 줄: 검색바 + 검색 버튼 */}
          <div className="mb-4">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              onSearch={handleSearch}
              isSearching={isSearching}
            />
          </div>

          {/* 두 번째 줄: 왼쪽(DropCategory + 고급 필터) / 오른쪽(등급 적용) */}
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4 flex-wrap">
              <DropCategory
                value={sortOption}
                onChange={handleSortChange}
                disabled={isListLoading}
              />
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
              {sortError && <p className="text-sm text-red-500">{sortError}</p>}
              {searchError && (
                <p className="text-sm text-red-500">{searchError}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsProjectModalOpen(true)}
                  className="px-4 py-2 bg-purple-100 text-purple-700 border border-purple-700 rounded-lg hover:bg-purple-300 transition-colors"
                >
                  브랜드 적합도 적용
                </button>
              </div>
              {selectedProject && (
                <div className="flex justify-end">
                  <div className="flex items-center gap-2 text-sm text-purple-700 bg-purple-50 rounded-full px-4 py-1 mt-2">
                    <span className="font-medium">
                      {selectedProject.company_name}
                    </span>
                    <button
                      onClick={handleProjectReset}
                      className="text-xs text-purple-600 hover:text-purple-800 underline"
                    >
                      해제
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
          {isListLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : paginatedInfluencers.map((influencer) => (
                <InfluencerCardWithGrade
                  key={influencer.channel_id}
                  influencer={influencer}
                  selectedProject={selectedProject}
                  onClick={() => {
                    const basePath = `/influencer/${influencer.channel_id}`;
                    if (selectedProject?.project_id) {
                      const search = new URLSearchParams();
                      search.set("projectId", selectedProject.project_id);
                      navigate(`${basePath}?${search.toString()}`);
                    } else {
                      navigate(basePath);
                    }
                  }}
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

      {/* 프로젝트 선택 모달 */}
      {isProjectModalOpen && (
        <ProjectSelectModal
          onClose={() => setIsProjectModalOpen(false)}
          onSelect={handleProjectSelect}
          onReset={handleProjectReset}
          selectedProjectId={selectedProject?.project_id}
          projects={projects}
          isLoading={isProjectLoading}
          error={projectError}
        />
      )}
    </div>
  );
};

// 프로젝트 선택 모달 컴포넌트
interface ProjectSelectModalProps {
  onClose: () => void;
  onSelect: (project: CreateProjectResponse) => void;
  onReset: () => void;
  selectedProjectId?: string;
  projects: CreateProjectResponse[];
  isLoading: boolean;
  error: unknown;
}

const ProjectSelectModal: React.FC<ProjectSelectModalProps> = ({
  onClose,
  onSelect,
  onReset,
  selectedProjectId,
  projects,
  isLoading,
  error,
}) => {
  const handleProjectSelect = (project: CreateProjectResponse) => {
    onSelect(project);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 뒷배경 블러 */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">프로젝트 선택</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-light transition-colors"
          >
            &times;
          </button>
        </div>

        {/* 프로젝트 목록 */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-500 text-lg mt-4">
                프로젝트 목록을 불러오는 중...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">
                프로젝트 목록을 불러오는 중 오류가 발생했습니다.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {error instanceof Error ? error.message : "알 수 없는 오류"}
              </p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                저장된 프로젝트가 없습니다.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                새 프로젝트를 생성해주세요.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((project) => {
                const isSelected = selectedProjectId === project.project_id;
                return (
                  <div
                    key={project.project_id}
                    onClick={() => handleProjectSelect(project)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {project.company_name}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>
                            <span className="font-medium">카테고리:</span>{" "}
                            {project.brand_categories || "-"}
                          </p>
                          <p>
                            <span className="font-medium">브랜드 톤:</span>{" "}
                            {project.brand_tone || "-"}
                          </p>
                          <p>
                            <span className="font-medium">캠페인 목표:</span>{" "}
                            {project.campaign_goal || "-"}
                          </p>
                        </div>
                      </div>
                      <div className="ml-4 text-right text-sm text-gray-500">
                        <p>
                          {new Date(project.created_at).toLocaleDateString(
                            "ko-KR"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 푸터 */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onReset}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-red-400 hover:text-white transition-colors"
          >
            초기화
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

interface InfluencerCardWithGradeProps {
  influencer: HomeYoutuber;
  selectedProject: CreateProjectResponse | null;
  onClick: () => void;
}

const getGradeFromScore = (score: number): "A" | "B" | "C" | "D" => {
  if (score >= 80) return "A";
  if (score >= 60) return "B";
  if (score >= 40) return "C";
  return "D";
};

const InfluencerCardWithGrade: React.FC<InfluencerCardWithGradeProps> = ({
  influencer,
  selectedProject,
  onClick,
}) => {
  const projectId = selectedProject?.project_id;
  const {
    data: roiData,
    isLoading: isRoiLoading,
    error: roiError,
  } = useRoiEstimate(projectId, influencer.channel_id);

  const grade = roiData ? getGradeFromScore(roiData.score) : undefined;

  return (
    <InfluencerCard
      name={influencer.channel_title}
      category={influencer.category}
      platforms={["YouTube"]}
      image={influencer.thumbnail_url}
      followers={influencer.subscriber_count.toLocaleString()}
      engagement={`${influencer.engagement_rate.toFixed(1)}%`}
      price={influencer.estimated_price}
      grade={grade}
      gradeScore={roiData?.score}
      gradeLoading={!!projectId && isRoiLoading}
      gradeError={
        roiError
          ? roiError instanceof Error
            ? roiError.message
            : "분석 실패"
          : undefined
      }
      onClick={onClick}
    />
  );
};

export default PeopleList;
