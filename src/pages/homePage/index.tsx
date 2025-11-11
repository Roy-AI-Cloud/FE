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
      <header className="flex items-center justify-between px-6 py-4">
        <Logo />
        <GradientButton onClick={handleLoginClick}>로그인</GradientButton>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center max-w-4xl px-6 py-12 mx-auto">
        {/* AI Tag */}
        <div className="self-start mb-6">
          <AITag />
        </div>

        {/* Main Headline */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-800 md:text-6xl">
            마케팅 ROI를
          </h1>
          <h1 className="mb-8 text-6xl font-bold md:text-7xl">
            <span className="text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
              3배 높이세요
            </span>
          </h1>
        </div>

        {/* Supporting Text */}
        <p className="max-w-2xl mb-12 text-lg leading-relaxed text-center text-gray-700">
          10,000명 이상의 인플루언서 데이터를 분석해
          <br />
          당신의 브랜드에 완벽한 파트너를 찾아드립니다
        </p>

        {/* CTA Button */}
        <GradientButton className="px-8 py-4 text-lg">
          무료로 시작하기 →
        </GradientButton>
      </main>

      {/* Bottom Card Placeholder */}
      <div className="px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64 p-8 bg-white shadow-lg rounded-2xl">
            <div className="text-lg text-gray-400">추가 콘텐츠 영역</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
