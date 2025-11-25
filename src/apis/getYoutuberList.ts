// 프록시 설정 사용: vite.config.ts에서 /api 요청을 http://localhost:8000으로 프록시

export interface SearchYoutuberRequest {
  keyword: string;
  top_n?: number;
  region?: string;
  lang?: string;
}

export interface YoutuberData {
  channel_id: string;
  title: string;
  description: string;
  custom_url: string;
  published_at: string;
  country: string;
  subscribers_count: number;
  video_count: number;
  view_count: number;
  topic_ids: string[];
  thumbnail_url: string;
  source: string;
  engagement_rate: number;
  roi: number;
}

export interface HomeYoutuber {
  channel_id: string;
  channel_title: string;
  subscriber_count: number;
  thumbnail_url: string;
  category: string;
  engagement_rate: number;
  estimated_price: string;
}
interface ApiYoutuberResponse {
  channel_id: string;
  title: string;
  subscriber_count: number;
  thumbnail_url: string;
  category: string;
  engagement_rate: number;
  estimated_price: string;
}

export const getHomeYoutuberList = async (
  limit: number = 50
): Promise<HomeYoutuber[]> => {
  const params = new URLSearchParams();
  params.append("limit", limit.toString());
  const apiUrl = `/api/home/youtubers?${params.toString()}`;

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
        `리스트를 불러올 수 없습니다 (${response.status}): ${errorText}`
      );
    }

    const data: ApiYoutuberResponse[] = await response.json();

    return data.map((item) => ({
      channel_id: item.channel_id,
      channel_title: item.title,
      subscriber_count: item.subscriber_count,
      thumbnail_url: item.thumbnail_url,
      category: item.category,
      engagement_rate: item.engagement_rate,
      estimated_price: item.estimated_price,
    }));
  } catch (error) {
    console.error("API 호출 실패:", error);
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
    throw new Error("리스트를 불러오는 중 오류가 발생했습니다");
  }
};

export type SortBy = "followers" | "engagement" | "price";

export const getSortedYoutubers = async (
  sortBy: SortBy = "followers",
  limit: number = 50
): Promise<HomeYoutuber[]> => {
  const params = new URLSearchParams();
  params.append("sort_by", sortBy);
  params.append("limit", limit.toString());

  const apiUrl = `/api/home/youtubers/sorted?${params.toString()}`;

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
        `정렬된 유튜버 목록을 불러올 수 없습니다 (${response.status}): ${errorText}`
      );
    }

    const data: ApiYoutuberResponse[] = await response.json();

    // API 응답을 HomeYoutuber 형식으로 매핑
    return data.map((item) => ({
      channel_id: item.channel_id,
      channel_title: item.title, // API의 'title'을 'channel_title'로 매핑
      subscriber_count: item.subscriber_count,
      thumbnail_url: item.thumbnail_url,
      category: item.category,
      engagement_rate: item.engagement_rate,
      estimated_price: item.estimated_price || "가격 문의",
    }));
  } catch (error) {
    console.error("정렬된 유튜버 API 호출 실패:", error);
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
    throw new Error("정렬된 유튜버 목록을 불러오는 중 오류가 발생했습니다");
  }
};
