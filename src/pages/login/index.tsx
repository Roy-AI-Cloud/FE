import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import InputField from "../../components/list/InputField";
import GradientButton from "../../components/button/LoginButton";
import SocialLoginButton from "../../components/SocialLoginButton";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password, keepLoggedIn });
    // 로그인 성공 시 대시보드로 이동
    navigate("/youtube/home-list");
  };

  const handleSocialLogin = (provider: "google" | "github") => {
    console.log(`${provider} login`);
  };

  const handleSignUp = () => {
    // 회원가입 페이지로 이동
    console.log("Navigate to sign up");
  };

  const handleForgotPassword = () => {
    // 비밀번호 찾기 페이지로 이동
    console.log("Navigate to forgot password");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo and Tagline */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <p className="text-gray-600 text-sm">
            ROI 기반 인플루언서 매칭 플랫폼
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            로그인
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <InputField
              label="이메일"
              type="email"
              placeholder="example@company.com"
              icon={
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Input */}
            <InputField
              label="비밀번호"
              type="password"
              placeholder="*********"
              icon={
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Options */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  로그인 상태 유지
                </span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                비밀번호 찾기
              </button>
            </div>

            {/* Login Button */}
            <GradientButton
              type="submit"
              className="w-full flex items-center justify-center space-x-2"
            >
              <span>로그인</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </GradientButton>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">또는</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <SocialLoginButton
              provider="google"
              onClick={() => handleSocialLogin("google")}
            />
            <SocialLoginButton
              provider="github"
              onClick={() => handleSocialLogin("github")}
            />
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">계정이 없으신가요? </span>
            <button
              onClick={handleSignUp}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              회원가입
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            © 2025 InfluROI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
