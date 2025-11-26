export interface BasicStats {
  subscriber_count?: number;
  view_count?: number;
  video_count?: number;
  engagement_rate?: number;
}

export interface RoiMetrics {
  viral_score?: number;
  avg_views?: number;
  estimated_cpm?: number;
  brand_safety_score?: number;
  collab_history?: number;
}

export interface YoutuberStatsResponse {
  basic_stats?: BasicStats;
  roi_metrics?: RoiMetrics;
  estimated_price?: string | number;
  category?: string;
  category_stats?: Array<{ name: string; percentage: number }>;
}

const normalizeStats = (data: unknown): YoutuberStatsResponse => {
  if (!data || typeof data !== "object") {
    return {};
  }

  const safe = data as Record<string, unknown>;

  const basic = safe.basic_stats && typeof safe.basic_stats === "object"
    ? (safe.basic_stats as BasicStats)
    : undefined;

  const roi = safe.roi_metrics && typeof safe.roi_metrics === "object"
    ? (safe.roi_metrics as RoiMetrics)
    : undefined;

  return {
    basic_stats: basic,
    roi_metrics: roi,
    estimated_price: safe.estimated_price,
    category: typeof safe.category === "string" ? safe.category : undefined,
    category_stats:
      Array.isArray(safe.category_stats) &&
      safe.category_stats.every(
        (item) =>
          item &&
          typeof item === "object" &&
          "name" in item &&
          "percentage" in item
      )
        ? (safe.category_stats as Array<{ name: string; percentage: number }>)
        : undefined,
  };
};

export const getYoutuberStats = async (
  channelId: string
): Promise<YoutuberStatsResponse> => {
  if (!channelId) {
    throw new Error("채널 ID가 필요합니다.");
  }

  const apiUrl = `/api/youtuber/${channelId}/stats`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `유튜버 통계 정보를 불러올 수 없습니다 (${response.status}): ${errorText}`
      );
    }

    const rawData = await response.json();
    return normalizeStats(rawData);
  } catch (error) {
    console.error("유튜버 통계 API 호출 실패:", error);
    if (error instanceof Error) {
      if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("ERR_CONNECTION")
      ) {
        throw new Error(
          "백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하세요. (http://localhost:8000)"
        );
      }
      throw error;
    }
    throw new Error("유튜버 통계 정보를 불러오는 중 오류가 발생했습니다");
  }
};

export default getYoutuberStats;

