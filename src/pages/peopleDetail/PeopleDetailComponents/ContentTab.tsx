import React, { useMemo, useState } from "react";
import { useYoutuberStats } from "../../../hooks/useYoutuberStats";
import type { BasicStats, RoiMetrics } from "../../../apis/getYoutuberStats";

interface ContentItemProps {
  title: string;
  views: string;
  thumbnail: string;
}

const ContentItem: React.FC<ContentItemProps> = ({
  title,
  views,
  thumbnail,
}) => {
  const [imageError, setImageError] = useState(false);
  const hasThumbnail = thumbnail && !imageError;

  return (
    <div className="overflow-hidden border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
      {/* 썸네일 영역 - 높이 증가 */}
      <div className="relative flex items-center justify-center w-full h-48 bg-gradient-to-br from-green-100 to-blue-100">
        {hasThumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="object-cover w-full h-full"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-gray-500">썸네일</span>
        )}
      </div>
      {/* 텍스트 영역 - 패딩 감소 */}
      <div className="p-3">
        <h4 className="mb-2 font-medium text-gray-900 line-clamp-2 text-sm">
          {title}
        </h4>
        <div className="flex items-center space-x-2 text-xs text-gray-600">
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
          <span>{views}</span>
        </div>
      </div>
    </div>
  );
};

interface ContentTabProps {
  recentContent: Array<{
    title: string;
    views: string;
    thumbnail: string;
  }>;
  categoryData?: Array<{
    name: string;
    percentage: number;
  }>;
  isLoading?: boolean;
  channelId?: string;
}

const ContentTab: React.FC<ContentTabProps> = ({
  recentContent,
  categoryData = [],
  isLoading = false,
  channelId,
}) => {
  const statsEnabled = !!channelId;
  const {
    data: statsData,
    isLoading: isStatsLoading,
    error: statsError,
  } = useYoutuberStats(channelId || "", statsEnabled);

  const basicStats: BasicStats | undefined = statsData?.basic_stats;
  const roiMetrics: RoiMetrics | undefined = statsData?.roi_metrics;

  const categoryItems = useMemo(() => {
    if (statsData?.category_stats && statsData.category_stats.length > 0) {
      return statsData.category_stats;
    }
    if (statsData?.category) {
      return [
        {
          name: statsData.category,
          percentage: 100,
        },
      ];
    }
    return categoryData;
  }, [statsData, categoryData]);

  const metricCards = [
    {
      label: "구독자",
      value: basicStats?.subscriber_count?.toLocaleString() ?? "-",
    },
    {
      label: "총 조회수",
      value: basicStats?.view_count?.toLocaleString() ?? "-",
    },
    {
      label: "영상 수",
      value: basicStats?.video_count?.toLocaleString() ?? "-",
    },
    {
      label: "참여율",
      value:
        typeof basicStats?.engagement_rate === "number"
          ? `${basicStats.engagement_rate.toFixed(2)}%`
          : "-",
    },
  ];

  const roiCards = [
    {
      label: "바이럴 점수",
      value:
        typeof roiMetrics?.viral_score === "number"
          ? roiMetrics.viral_score.toFixed(1)
          : "-",
    },
    {
      label: "평균 조회수",
      value: roiMetrics?.avg_views?.toLocaleString() ?? "-",
    },
    {
      label: "예상 CPM",
      value:
        typeof roiMetrics?.estimated_cpm === "number"
          ? `₩${roiMetrics.estimated_cpm.toLocaleString()}`
          : "-",
    },
    {
      label: "브랜드 안전 점수",
      value:
        typeof roiMetrics?.brand_safety_score === "number"
          ? roiMetrics.brand_safety_score.toString()
          : "-",
    },
    {
      label: "콜라보 이력",
      value:
        typeof roiMetrics?.collab_history === "number"
          ? `${roiMetrics.collab_history}건`
          : "-",
    },
  ];

  return (
    <div className="space-y-8">
      {/* 최근 콘텐츠 */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          최근 콘텐츠
        </h3>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            <p className="ml-4 text-gray-600">콘텐츠를 불러오는 중...</p>
          </div>
        ) : recentContent.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">콘텐츠가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {recentContent.map((content, index) => (
              <ContentItem
                key={index}
                title={content.title}
                views={content.views}
                thumbnail={content.thumbnail}
              />
            ))}
          </div>
        )}
      </div>

      {/* 기본 통계 */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          채널 기본 통계
        </h3>
        {statsError && (
          <p className="mb-4 text-sm text-red-500">
            통계 정보를 불러오지 못했습니다.
          </p>
        )}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {metricCards.map((metric) => (
            <div
              key={metric.label}
              className="p-4 border border-gray-100 rounded-lg bg-gray-50"
            >
              <p className="text-xs text-gray-500">{metric.label}</p>
              <p className="mt-2 text-xl font-semibold text-gray-900">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ROI 메트릭 */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">ROI 메트릭</h3>
          {statsData?.estimated_price && (
            <span className="text-sm font-medium text-purple-600">
              예상 단가: {statsData.estimated_price}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {roiCards.map((metric) => (
            <div
              key={metric.label}
              className="p-4 border border-gray-100 rounded-lg bg-gray-50"
            >
              <p className="text-xs text-gray-500">{metric.label}</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 콘텐츠 카테고리 분포 */}
      <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-100 to-purple-100">
        <h3 className="mb-4 text-lg font-semibold text-gray-700">
          대표 카테고리
        </h3>
        <div>
          {isStatsLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-b-2 border-blue-500 rounded-full animate-spin"></div>
              <p className="ml-3 text-sm text-gray-600">
                통계를 불러오는 중...
              </p>
            </div>
          ) : statsError ? (
            <div className="py-8 text-center">
              <p className="text-sm text-red-500">
                통계 정보를 불러오지 못했습니다.
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {statsError instanceof Error
                  ? statsError.message
                  : "알 수 없는 오류"}
              </p>
            </div>
          ) : categoryItems.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-gray-500">
                표시할 카테고리 데이터가 없습니다.
              </p>
            </div>
          ) : (
            <p className="text-lg text-gray-700 justify-cetner">
              이 채널의 대표 카테고리는{" "}
              <span
                className={`font-semibold text-xl ${
                  categoryItems[0].name === "건강/의료"
                    ? "text-green-500"
                    : categoryItems[0].name === "테크/IT"
                    ? "text-blue-500"
                    : categoryItems[0].name === "라이프스타일"
                    ? "text-purple-500"
                    : categoryItems[0].name === "패션"
                    ? "text-pink-500"
                    : categoryItems[0].name === "뷰티"
                    ? "text-rose-500"
                    : categoryItems[0].name === "요리"
                    ? "text-orange-500"
                    : "text-gray-800"
                }`}
              >
                {categoryItems[0].name}
              </span>
              입니다
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentTab;