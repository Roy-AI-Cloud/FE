import Logo from "./Logo";
import GradientButton from "./button/LoginButton";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <>
        <header className="bg-white border-b border-gray-200">
            <div className="px-6 py-4 mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
                <Logo />
                <div className="flex items-center space-x-4">
                <GradientButton
                    className="rounded-2xl"
                    onClick={() => navigate("/project-list")}
                >
                    {"프로젝트 목록"}
                </GradientButton>
                <GradientButton
                    className="rounded-2xl"
                    onClick={() => navigate("/new-project")}
                >
                    {"+ 새 프로젝트"}
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
        </>
    );
};

export default Header;
