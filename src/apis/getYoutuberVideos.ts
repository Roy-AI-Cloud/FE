export interface YoutuberVideo {
  channel_id: string;
  title: string;
  video_id: string;
  video_title: string;
  video_published_at: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  duration_seconds: number;
}

export const getYoutuberVideos = async (
  channelId: string,
  limit: number = 10
): Promise<YoutuberVideo[]> => {
  const params = new URLSearchParams();
  if (limit) {
    params.append("limit", limit.toString());
  }

  const apiUrl = `/api/youtuber/${channelId}/videos?${params.toString()}`;

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
        `유튜버 영상 목록을 불러올 수 없습니다 (${response.status}): ${errorText}`
      );
    }

    const data: YoutuberVideo[] = await response.json();
    return data;
  } catch (error) {
    console.error("유튜버 영상 목록 API 호출 실패:", error);
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
    throw new Error("유튜버 영상 목록을 불러오는 중 오류가 발생했습니다");
  }
};

