import React from "react";

interface SortDropdownProps {
  isActive?: boolean;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ isActive = false }) => {
  return (
    <div className="relative">
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
