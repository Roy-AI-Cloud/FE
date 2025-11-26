import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../../components/Footer";
import ContentTab from "./PeopleDetailComponents/ContentTab";
import PerformanceMetricsTab from "./PeopleDetailComponents/PerformanceMetricsTab";
import ROIAnalysisTab from "./PeopleDetailComponents/ROIAnalysisTab";
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
  const {
    data: profile,
    isLoading,
    error,
  } = useYoutuberProfile(channelId || "");
  const { data: projects = [] } = useProjectList();
  const { data: videos = [], isLoading: isLoadingVideos } = useYoutuberVideos(
    channelId || "",
    10
  );

  const [appliedProjectId, setAppliedProjectId] = useState<string>("");

  useEffect(() => {
    let nextId = searchParams.get("projectId") || "";
    if (!nextId && typeof window !== "undefined") {
      nextId = localStorage.getItem(SELECTED_PROJECT_KEY) || "";
    }

    if (
      nextId &&
      projects.length > 0 &&
      !projects.some((project) => project.project_id === nextId)
    ) {
      nextId = "";
    }

    if (nextId && typeof window !== "undefined") {
      localStorage.setItem(SELECTED_PROJECT_KEY, nextId);
    }

    setAppliedProjectId(nextId);
  }, [searchParams, projects]);

  const fallbackProjectId = appliedProjectId || projects[0]?.project_id || "";

  // URL에서 탭 정보 읽기
  const tabFromUrl = searchParams.get("tab") || "콘텐츠";
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  // 탭 변경 시 URL 업데이트
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const tabMap: Record<string, string> = {
      콘텐츠: "content",
      "성과 지표": "performance",
      "ROI 분석": "roi-analysis",
      "감성 분석": "sentiment",
    };
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("tab", tabMap[tab] || "content");
    if (appliedProjectId) {
      nextParams.set("projectId", appliedProjectId);
    }
    setSearchParams(nextParams);
  };

  // URL 변경 시 탭 업데이트
  useEffect(() => {
    const tabMap: Record<string, string> = {
      content: "콘텐츠",
      performance: "성과 지표",
      "roi-analysis": "ROI 분석",
      sentiment: "감성 분석",
    };
    const tab = searchParams.get("tab");
    if (tab && tabMap[tab]) {
      setActiveTab(tabMap[tab]);
    }
  }, [searchParams]);

  const tabs = ["콘텐츠", "성과 지표", "ROI 분석", "감성 분석"];

  // API에서 받은 영상 데이터를 ContentTab에 맞는 형식으로 변환
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
      {/* 메인 콘텐츠 */}
      <main className="px-6 py-8 mx-auto max-w-7xl">
        {/* 에러 메시지 */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-600 font-medium">
              프로필 정보를 불러오는 중 오류가 발생했습니다
            </p>
            <p className="text-red-500 text-sm mt-2">
              {error instanceof Error ? error.message : "알 수 없는 오류"}
            </p>
          </div>
        )}

        {/*채널 설명*/}
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

        {activeTab === "성과 지표" && (
          <PerformanceMetricsTab
            projectId={fallbackProjectId}
            channelId={channelId || ""}
          />
        )}
        {activeTab === "ROI 분석" &&
          (appliedProjectId ? (
            <ROIAnalysisTab
              projectId={appliedProjectId}
              channelId={channelId || ""}
            />
          ) : (
            <div className="bg-white border border-dashed border-purple-300 rounded-lg p-8 text-center text-purple-700">
              <p className="text-lg font-semibold mb-2">
                프로젝트를 적용해주세요!
              </p>
              <p className="text-sm text-purple-500">
                프로젝트를 적용하면 ROI 분석 결과를 확인할 수 있습니다.
              </p>
            </div>
          ))}
        {activeTab === "감성 분석" && (
          <SentimentAnalysisTab
            projectId={fallbackProjectId}
            channelId={channelId || ""}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default InfluencerDetailPage;
