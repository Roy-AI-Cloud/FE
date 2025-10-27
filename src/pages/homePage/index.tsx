import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import GradientButton from "../../components/button/LoginButton";
import AITag from "../../components/AITag";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4">
        <Logo />
        <GradientButton onClick={handleLoginClick}>로그인</GradientButton>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 py-12 max-w-4xl mx-auto">
        {/* AI Tag */}
        <div className="self-start mb-6">
          <AITag />
        </div>

        {/* Main Headline */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            마케팅 ROI를
          </h1>
          <h1 className="text-6xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              3배 높이세요
            </span>
          </h1>
        </div>

        {/* Supporting Text */}
        <p className="text-lg text-gray-700 text-center mb-12 max-w-2xl leading-relaxed">
          AI가 10,000명 이상의 인플루언서 데이터를 분석해
          <br />
          당신의 브랜드에 완벽한 파트너를 찾아드립니다
        </p>

        {/* CTA Button */}
        <GradientButton className="text-lg px-8 py-4">
          무료로 시작하기 →
        </GradientButton>
      </main>

      {/* Bottom Card Placeholder */}
      <div className="px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 h-64 flex items-center justify-center">
            <div className="text-gray-400 text-lg">추가 콘텐츠 영역</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
