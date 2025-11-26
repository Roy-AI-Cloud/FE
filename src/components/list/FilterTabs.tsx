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
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onFilterChange("고급 필터")}
        className={`px-5 py-3 text-sm font-medium border border-gray-300 rounded-lg transition-all ${
          activeFilter === "고급 필터"
            ? "bg-purple-500 text-white border-purple-500"
            : "bg-gray-100 text-gray-700 hover:bg-purple-500 hover:text-white hover:border-purple-500"
        }`}
      >
        <FaSlidersH className="inline mr-2" />
        고급 필터
      </button>
    </div>
  );
};

export default FilterTabs;
