import { CiYoutube } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import type { YoutuberProfile } from "../../../apis/getYoutberDetail";

interface DescriptionProps {
  profile: YoutuberProfile | undefined;
  isLoading: boolean;
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const getStringProperty = (
  obj: Record<string, unknown>,
  ...keys: string[]
): string => {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "string") {
      return value;
    }
  }
  return "";
};

// 안전하게 숫자 프로퍼티 추출하는 헬퍼 함수
const getNumberProperty = (
  obj: Record<string, unknown>,
  ...keys: string[]
): number => {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "number") {
      return value;
    }
  }
  return 0;
};

// 안전하게 프로퍼티 추출하는 헬퍼 함수 (string | number)
const getProperty = (
  obj: Record<string, unknown>,
  ...keys: string[]
): string | number | undefined => {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "string" || typeof value === "number") {
      return value;
    }
  }
  return undefined;
};

const Description: React.FC<DescriptionProps> = ({ profile, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-8 mb-8 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-gray-600">프로필 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // profile이 객체인지 확인하고 데이터 추출
  const profileData = isRecord(profile) ? profile : null;

  if (!profileData) {
    return (
      <div className="p-8 mb-8 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="text-center py-12">
          <p className="text-gray-500">프로필 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  // API 응답에서 데이터 추출 (타입 안전하게)
  const channelTitle = getStringProperty(
    profileData,
    "title",
    "channel_title",
    "name"
  );
  const category = getStringProperty(profileData, "category", "categories");
  const description = getStringProperty(
    profileData,
    "description",
    "bio",
    "about"
  );
  const subscriberCount = getNumberProperty(
    profileData,
    "subscriber_count",
    "subscribers_count"
  );
  const viewCount = getNumberProperty(
    profileData,
    "view_count",
    "average_views"
  );
  const engagementRate = getNumberProperty(profileData, "engagement_rate");
  const estimatedPriceValue = getProperty(
    profileData,
    "estimated_price",
    "price"
  );
  const estimatedPrice: string | number =
    estimatedPriceValue !== undefined ? estimatedPriceValue : "가격 문의";
  const thumbnailUrl = getStringProperty(
    profileData,
    "thumbnail_url",
    "profile_image"
  );

  const firstChar = channelTitle ? channelTitle.charAt(0) : "?";

  return (
    <>
      <div className="p-8 mb-8 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-start space-x-6">
          {/* 프로필 이미지 */}
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={channelTitle}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-blue-400">
              <span className="text-2xl font-bold text-white">{firstChar}</span>
            </div>
          )}

          {/* 인플루언서 정보 */}
          <div className="flex-1">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              {channelTitle || "이름 없음"}
            </h1>
            <p className="mb-4 text-gray-600">{category || "카테고리 없음"}</p>

            {/* 플랫폼 아이콘 */}
            <div className="flex mb-4 space-x-3">
              <div className="flex items-center justify-center h-10 rounded w-7">
                <CiYoutube className="text-4xl text-red-500" />
              </div>
              <div className="flex items-center justify-center h-10 rounded w-7">
                <FaInstagram className="text-2xl text-pink-500" />
              </div>
            </div>

            {/* 설명 */}
            {description && <p className="mb-6 text-gray-700">{description}</p>}

            {/* 주요 지표 */}
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div>
                <p className="text-sm text-gray-600">팔로워/구독자</p>
                <p className="text-xl font-semibold text-gray-900">
                  {subscriberCount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">평균 조회수</p>
                <p className="text-xl font-semibold text-gray-900">
                  {viewCount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">참여율</p>
                <p className="text-xl font-semibold text-gray-900">
                  {typeof engagementRate === "number"
                    ? `${engagementRate.toFixed(1)}%`
                    : engagementRate || "0%"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">가격</p>
                <p className="text-xl font-semibold text-purple-600">
                  {typeof estimatedPrice === "string" &&
                  estimatedPrice.includes("₩")
                    ? estimatedPrice
                    : typeof estimatedPrice === "number"
                    ? `₩${estimatedPrice.toLocaleString()}`
                    : estimatedPrice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
