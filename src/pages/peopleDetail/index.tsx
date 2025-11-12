import React, { useState } from "react";
import Footer from "../../components/Footer";
import ContentTab from "./PeopleDetailComponents/ContentTab";
import PerformanceMetricsTab from "./PeopleDetailComponents/PerformanceMetricsTab";
import ROIAnalysisTab from "./PeopleDetailComponents/ROIAnalysisTab";
import SentimentAnalysisTab from "./PeopleDetailComponents/SentimentAnalysisTab";
import Description from "./PeopleDetailComponents/Description";
import DetailHeader from "./PeopleDetailComponents/DetailHeader";

const InfluencerDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("콘텐츠");

  const tabs = ["콘텐츠", "성과 지표", "ROI 분석", "감성 분석"];

  const recentContent = [
    {
      title: "친환경 제품 추천",
      views: "28,500",
      thumbnail: "/api/placeholder/200/120",
    },
    {
      title: "비건 레시피",
      views: "19,800",
      thumbnail: "/api/placeholder/200/120",
    },
    {
      title: "제로웨이스트 챌린지",
      views: "25,200",
      thumbnail: "/api/placeholder/200/120",
    },
  ];

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
        {/*채널 설명*/}
        <Description />
        {/* 탭 네비게이션 */}
        <div className="mb-8 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
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
          />
        )}

        {activeTab === "성과 지표" && <PerformanceMetricsTab />}
        {activeTab === "ROI 분석" && <ROIAnalysisTab />}
        {activeTab === "감성 분석" && <SentimentAnalysisTab />}
      </main>
      <Footer />
    </div>
  );
};

export default InfluencerDetailPage;
