import React from "react";
import { FaSlidersH } from "react-icons/fa";

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const mainFilters = ["전체", "YouTube", "Instagram"];

  return (
    <div className="flex items-center gap-3">
      <div className="inline-flex bg-gray-100 rounded-2xl p-1">
        {mainFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeFilter === filter
                ? "bg-white text-gray-900 shadow-sm rounded-xl"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <button
        onClick={() => onFilterChange("고급 필터")}
        className={`px-5 py-3 text-sm font-medium bg-gray-100 border border-gray-300 rounded-lg transition-all ${
          activeFilter === "고급 필터"
            ? "bg-purple-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-purple-500 hover:text-white"
        }`}
      >
        <FaSlidersH className="inline mr-2" />
        고급 필터
      </button>
    </div>
  );
};

export default FilterTabs;
