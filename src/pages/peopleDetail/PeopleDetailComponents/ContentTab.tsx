import React from "react";

interface ContentTabProps {
  recentContent: Array<{
    title: string;
    views: string;
    thumbnail: string;
  }>;
  categoryData: Array<{
    name: string;
    percentage: number;
  }>;
}

const ContentTab: React.FC<ContentTabProps> = ({
  recentContent,
  categoryData,
}) => {
  return (
    <div className="space-y-8">
      {/* 최근 콘텐츠 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          최근 콘텐츠
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentContent.map((content, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="h-32 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <span className="text-gray-500">썸네일</span>
              </div>
              <div className="p-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  {content.title}
                </h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span>{content.views} 조회</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 콘텐츠 카테고리 분포 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          콘텐츠 카테고리 분포
        </h3>
        <div className="space-y-4">
          {categoryData.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">{category.name}</span>
                <span className="text-gray-600">
                  {category.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gray-800 h-2 rounded-full"
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentTab;

