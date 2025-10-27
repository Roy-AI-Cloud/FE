import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GradientButton from "../../components/button/LoginButton";
import Footer from "../../components/Footer";
import ContentTab from "./PeopleDetailComponents/ContentTab";
import PerformanceMetricsTab from "./PeopleDetailComponents/PerformanceMetricsTab";
import ROIAnalysisTab from "./PeopleDetailComponents/ROIAnalysisTab";
import SentimentAnalysisTab from "./PeopleDetailComponents/SentimentAnalysisTab";
import YouTubeIcon from "../../assets/youtubeIcon.svg";
import InstagramIcon from "../../assets/instaIcon.svg";

const InfluencerDetailPage: React.FC = () => {
  const navigate = useNavigate();
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
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/List")}
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
            <div className="flex items-center space-x-4">
              <GradientButton>비교 목록에 추가</GradientButton>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* 인플루언서 정보 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-start space-x-6">
            {/* 프로필 이미지 */}
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">자</span>
            </div>

            {/* 인플루언서 정보 */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                자연을 향한길: 1헬링크
              </h1>
              <p className="text-gray-600 mb-4">건강/라이프스타일</p>

              {/* 플랫폼 아이콘 */}
              <div className="flex space-x-3 mb-4">
                <div className="w-7 h-10 rounded flex items-center justify-center">
                  <img 
                    src={YouTubeIcon} 
                    alt="YouTube" 
                    className="w-full h-full"
                  />
                </div>
                <div className="w-7 h-10 rounded flex items-center justify-center">
                  <img 
                    src={InstagramIcon} 
                    alt="Instagram" 
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* 설명 */}
              <p className="text-gray-700 mb-6">
                친환경과 지속가능한 라이프스타일을 실천하며, 자연주의 제품과
                비건 라이프를 소개합니다.
              </p>

              {/* 주요 지표 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-600">팔로워/구독자</p>
                  <p className="text-xl font-semibold text-gray-900">368,000</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">평균 조회수</p>
                  <p className="text-xl font-semibold text-gray-900">22,019</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">참여율</p>
                  <p className="text-xl font-semibold text-gray-900">6.8%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">가격</p>
                  <p className="text-xl font-semibold text-purple-600">
                    ₩2,000,000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
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
