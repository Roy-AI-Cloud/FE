import React from "react";

interface SortDropdownProps {
  isActive?: boolean;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ isActive = false }) => {
  return (
    <div className="relative">
      <select 
        className={`px-4 py-2 pr-8 text-sm border rounded-lg appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
          isActive 
            ? 'bg-white border-gray-300 text-gray-900 cursor-pointer' 
            : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!isActive}
      >
        <option>AI 정렬 (프로젝트 필요)</option>
        <option disabled={!isActive}>ROI 점수 높은순</option>
        <option disabled={!isActive}>브랜드 적합도순</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className={`w-4 h-4 ${isActive ? 'text-gray-400' : 'text-gray-300'}`}
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
  );
};

export default SortDropdown;
