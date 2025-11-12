const API_BASE_URL = import.meta.env.VITE_API_URL;

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

export const getHomeYoutuberList = async (): Promise<HomeYoutuber[]> => {
  const apiUrl = `${API_BASE_URL}/youtube/home-list`;

  const response = await fetch(apiUrl, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("리스트를 불러올 수 없습니다");
  }

  return response.json();
};
