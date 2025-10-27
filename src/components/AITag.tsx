import React from "react";

const AITag: React.FC = () => {
  return (
    <div className="inline-flex items-center space-x-2 bg-purple-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        className="text-purple-500"
      >
        <path
          d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
          fill="currentColor"
        />
      </svg>
      <span>AI로 찾는 완벽한 인플루언서</span>
    </div>
  );
};

export default AITag;
