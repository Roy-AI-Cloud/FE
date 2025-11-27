import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import Footer from "../../components/Footer";
import ContentTab from "./PeopleDetailComponents/ContentTab";
import ROIAnalysisTab from "./PeopleDetailComponents/ROIAnalysisTab";
import ROIAnalysisTabNew from "./PeopleDetailComponents/ROIAnalysisTabNew";
import BrandImageCompatibilityTab from "./PeopleDetailComponents/BrandImageCompatibilityTab";
import SentimentAnalysisTab from "./PeopleDetailComponents/SentimentAnalysisTab";
import Description from "./PeopleDetailComponents/Description";
import DetailHeader from "./PeopleDetailComponents/DetailHeader";
import { useYoutuberProfile } from "../../hooks/useYoutuberProfile";
import { useProjectList } from "../../hooks/useProjectList";
import { useYoutuberVideos } from "../../hooks/useYoutuberVideos";


const SELECTED_PROJECT_KEY = "selected-project-id";

const InfluencerDetailPage: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: profile, isLoading, error } = useYoutuberProfile(channelId || "");
  const { data: projects = [] } = useProjectList();
  const { data: videos = [], isLoading: isLoadingVideos } = useYoutuberVideos(
    channelId || "",
    10
  );

  const [appliedProjectId, setAppliedProjectId] = useState<string>("");

  /* -----------------------------------
      프로젝트 ID 불러오기 (URL → localStorage)
  ----------------------------------- */
  useEffect(() => {
    let nextId = searchParams.get("projectId") || "";

    if (!nextId && typeof window !== "undefined") {
      nextId = localStorage.getItem(SELECTED_PROJECT_KEY) || "";
    }

    // 유효한 프로젝트만 허용
    if (nextId && !projects.some((p) => p.project_id === nextId)) {
      nextId = "";
    }

    if (nextId && typeof window !== "undefined") {
      localStorage.setItem(SELECTED_PROJECT_KEY, nextId);
    }

    setAppliedProjectId(nextId);
  }, [searchParams, projects]);

  const fallbackProjectId = appliedProjectId || projects[0]?.project_id || "";

  /* -----------------------------------
      탭 설정 (URL ↔ 화면 상태 연결)
  ----------------------------------- */

  const TAB_URL_MAP: Record<string, string> = {
    콘텐츠: "content",
    "감정 분석": "sentiment",
    "브랜드 이미지 적합도": "brand-compatibility",
    "ROI 분석": "roi-analysis",
    "종합 점수": "total-score",
  };

  const URL_TAB_MAP: Record<string, string> = {
    content: "콘텐츠",
    sentiment: "감정 분석",
    "brand-compatibility": "브랜드 이미지 적합도",
    "roi-analysis": "ROI 분석",
    "total-score": "종합 점수",
  };

  const initialTab = URL_TAB_MAP[searchParams.get("tab") || "content"] || "콘텐츠";
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    const nextParams = new URLSearchParams(searchParams);

    nextParams.set("tab", TAB_URL_MAP[tab] || "content");

    if (appliedProjectId) {
      nextParams.set("projectId", appliedProjectId);
    }

    setSearchParams(nextParams);
  };

  useEffect(() => {
    const tabKey = searchParams.get("tab");
    if (tabKey && URL_TAB_MAP[tabKey]) {
      setActiveTab(URL_TAB_MAP[tabKey]);
    }
  }, [searchParams]);

  const tabs = [
    "콘텐츠",
    "감정 분석",
    "브랜드 이미지 적합도",
    "ROI 분석",
    "종합 점수",
  ];

  /* -----------------------------------
      영상 데이터 변환
  ----------------------------------- */
  const recentContent = videos.map((video) => ({
    title: video.video_title || video.title,
    views: video.view_count.toLocaleString(),
    thumbnail: video.video_id
      ? `https://img.youtube.com/vi/${video.video_id}/mqdefault.jpg`
      : "",
  }));

  const categoryData = [
    { name: "건강 & 웰빙", percentage: 45 },
    { name: "라이프스타일", percentage: 30 },
    { name: "제품 리뷰", percentage: 15 },
    { name: "일상 브이로그", percentage: 10 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DetailHeader />

      <main className="px-6 py-8 mx-auto max-w-7xl">
        {error && (
          <div className="p-6 mb-8 border border-red-200 rounded-lg bg-red-50">
            <p className="font-medium text-red-600">프로필 정보를 불러오는 중 오류가 발생했습니다</p>
            <p className="mt-2 text-sm text-red-500">
              {error instanceof Error ? error.message : "알 수 없는 오류"}
            </p>
          </div>
        )}

        {/* 채널 설명 */}
        <Description profile={profile} isLoading={isLoading} />

        {/* 탭 네비게이션 */}
        <div className="mb-8 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 탭 콘텐츠 */}
        {activeTab === "콘텐츠" && (
          <ContentTab
            recentContent={recentContent}
            categoryData={categoryData}
            isLoading={isLoadingVideos}
            channelId={channelId || ""}
          />
        )}

        {activeTab === "감정 분석" && (
          <SentimentAnalysisTab projectId={fallbackProjectId} channelId={channelId || ""} />
        )}

        {activeTab === "브랜드 이미지 적합도" &&
          (appliedProjectId ? (
            <BrandImageCompatibilityTab projectId={appliedProjectId} channelId={channelId || ""} />
          ) : (
            <div className="p-8 text-center text-purple-700 bg-white border border-purple-300 border-dashed rounded-lg">
              <p className="mb-2 text-lg font-semibold">프로젝트를 적용해주세요!</p>
              <p className="text-sm text-purple-500">
                프로젝트를 적용하면 브랜드 이미지 적합도 분석 결과를 확인할 수 있습니다.
              </p>
              <Link
                to="/project-list"
                className="inline-block mt-2 text-sm text-purple-500 border border-purple-500 px-3 py-1 rounded-md hover:text-white hover:bg-purple-500"
              >
                프로젝트 선택하기
              </Link>
            </div>
          ))}

        {activeTab === "ROI 분석" &&
          (appliedProjectId ? (
            <ROIAnalysisTabNew projectId={appliedProjectId} channelId={channelId || ""} />
          ) : (
            <div className="p-8 text-center text-purple-700 bg-white border border-purple-300 border-dashed rounded-lg">
              <p className="mb-2 text-lg font-semibold">프로젝트를 적용해주세요!</p>
              <p className="text-sm text-purple-500">
                프로젝트를 적용하면 ROI 분석 결과를 확인할 수 있습니다.
              </p>
              <Link
                to="/project-list"
                className="inline-block mt-2 text-sm text-purple-500 border border-purple-500 px-3 py-1 rounded-md hover:text-white hover:bg-purple-500"
              >
                프로젝트 선택하기
              </Link>
            </div>
          ))}

        {activeTab === "종합 점수" &&
          (appliedProjectId ? (
            <ROIAnalysisTab projectId={appliedProjectId} channelId={channelId || ""} />
          ) : (
            <div className="p-8 text-center text-purple-700 bg-white border border-purple-300 border-dashed rounded-lg">
              <p className="mb-2 text-lg font-semibold">프로젝트를 적용해주세요!</p>
              <p className="text-sm text-purple-500">
                프로젝트를 적용하면 종합 점수를 확인할 수 있습니다.
              </p>
              <Link
                to="/project-list"
                className="inline-block mt-2 text-sm text-purple-500 border border-purple-500 px-3 py-1 rounded-md hover:text-white hover:bg-purple-500"
              >
                프로젝트 선택하기
              </Link>
            </div>
          ))}
      </main>

      <Footer />
    </div>
  );
};

export default InfluencerDetailPage;