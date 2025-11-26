import React from "react";

interface InfluencerCardProps {
  name: string;
  category: string;
  platforms: string[];
  followers: string;
  engagement: string;
  price: string;
  image?: string;
  isLoading?: boolean;
  onClick?: () => void;
  grade?: "A" | "B" | "C" | "D";
  gradeScore?: number;
  gradeLoading?: boolean;
  gradeError?: string;
  selectable?: boolean;
  isSelected?: boolean;
  onSelectToggle?: () => void;
}

const InfluencerCard: React.FC<InfluencerCardProps> = ({
  name,
  category,
  platforms,
  followers,
  engagement,
  price,
  image,
  isLoading = false,
  onClick,
  grade,
  gradeLoading = false,
  gradeError,
  selectable = false,
  isSelected = false,
  onSelectToggle,
}) => {
  if (isLoading) {
    return (
      <div className="bg-gray-100 rounded-xl p-6 animate-pulse">
        <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="flex space-x-2 mb-4">
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "youtube":
        return (
          <svg
            className="w-6 h-6 text-red-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      case "instagram":
        return (
          <svg
            className="w-6 h-6 text-pink-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case "tiktok":
        return (
          <svg
            className="w-6 h-6 text-black"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const gradeStyles: Record<
    "A" | "B" | "C" | "D",
    { container: string; text: string; border: string }
  > = {
    A: {
      container: "bg-green-100",
      text: "text-green-700",
      border: "border-green-200",
    },
    B: {
      container: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-200",
    },
    C: {
      container: "bg-yellow-100",
      text: "text-yellow-700",
      border: "border-yellow-200",
    },
    D: {
      container: "bg-red-100",
      text: "text-red-700",
      border: "border-red-200",
    },
  };

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm border ${
        isSelected ? "border-purple-400 ring-2 ring-purple-200" : "border-gray-100"
      } hover:shadow-md transition-shadow cursor-pointer`}
      onClick={onClick}
    >
      {/* 프로필 이미지 */}
      <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">
              {name.charAt(0)}
            </span>
          </div>
        )}
        {selectable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectToggle?.();
            }}
            className={`absolute top-3 left-3 w-7 h-7 rounded-full border flex items-center justify-center text-xs font-semibold ${
              isSelected
                ? "bg-purple-600 border-purple-600 text-white"
                : "bg-white border-gray-300 text-gray-500"
            }`}
          >
            {isSelected ? "✓" : ""}
          </button>
        )}
      </div>

      {/* 인플루언서 정보 */}
      <div className="flex items-start justify-between mb-4 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">{category}</p>
        </div>

        <div className="flex-shrink-0 min-w-[88px] text-right">
          {gradeLoading ? (
            <div className="w-10 h-10 border-2 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
          ) : grade ? (
            <div
              className={`inline-flex flex-col items-center justify-center px-4 py-2 rounded-xl text-base font-semibold border leading-tight ${gradeStyles[grade].container} ${gradeStyles[grade].text} ${gradeStyles[grade].border}`}
            >
              <span className="text-lg font-bold">{grade}</span>
            </div>
          ) : gradeError ? (
            <div className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
              분석 실패
            </div>
          ) : null}
        </div>
      </div>

      {/* 플랫폼 아이콘 */}
      <div className="flex space-x-2 mb-4">
        {platforms.map((platform, index) => (
          <div key={index}>{getPlatformIcon(platform)}</div>
        ))}
      </div>

      {/* 통계 정보 */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">팔로워</span>
          <span className="text-sm font-medium">{followers}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">참여율</span>
          <span className="text-sm font-medium">{engagement}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">가격</span>
          <span className="text-sm font-medium text-purple-600">{price}</span>
        </div>
      </div>

      {/* 상세보기 버튼 */}
      <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all">
        상세보기
      </button>
    </div>
  );
};

export default InfluencerCard;
