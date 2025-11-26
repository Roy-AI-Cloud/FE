import React from "react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
  isSearching?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "인플루언서 이름 또는 카테고리 검색...",
  value,
  onChange,
  onSearch,
  isSearching = false,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-400 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      <button
        onClick={onSearch}
        disabled={isSearching}
        className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-500 hover:text-white transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {isSearching ? "검색 중..." : "검색"}
      </button>
    </div>
  );
};

export default SearchBar;