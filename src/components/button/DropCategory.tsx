import React from "react";

const DropdownCategory: React.FC = () => {
  return (
    <div className="relative">
      <select className="px-4 py-2 pr-8 text-sm bg-gray-100 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
        <option>기본순</option>
        <option>팔로워 많은순</option>
        <option>참여율 높은순</option>
        <option>가격 낮은순</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
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
  );
};

export default DropdownCategory;
