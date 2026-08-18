import GradientButton from "../../../components/button/LoginButton";
import { useNavigate } from "react-router-dom";

const DetailHeader = () => {
const navigate = useNavigate();
    return (
        <>
        {/* 헤더 */}
        <header className="bg-white border-b border-gray-200">
            <div className="px-6 py-4 mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
                <button
                onClick={() => navigate("/youtube/home-list")}
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
                <span>목록으로 돌아가기</span>
                </button>
                <div className="flex items-center space-x-4">
                <GradientButton>비교 목록에 추가</GradientButton>
                </div>
            </div>
            </div>
        </header>
        </>
    );
};

export default DetailHeader;