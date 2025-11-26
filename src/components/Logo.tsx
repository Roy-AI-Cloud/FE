import React from "react";
import { useNavigate } from "react-router-dom";

const Logo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div 
    className="flex items-center space-x-2"
    onClick={() => navigate("/youtube/home-list")}
    >
      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="text-white"
        >
          <path
            d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <span className="text-2xl font-bold text-gray-800">InfloI</span>
    </div>
  );
};

export default Logo;
