export interface TotalScoreResponse {
  total_score: number;
  grade: string;
  recommendation: string;
  weights_used: {
    brand_image_weight: number;
    sentiment_weight: number;
    roi_weight: number;
  };
}

export const getTotalScore = async (
  projectId: string,
  channelId: string
): Promise<TotalScoreResponse> => {
  if (!projectId || !channelId) {
    throw new Error("프로젝트 ID와 채널 ID가 필요합니다.");
  }

  const apiUrl = `/api/analysis/total-score/${projectId}/${channelId}`;

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
        `종합 점수를 불러올 수 없습니다 (${response.status}): ${errorText}`
      );
    }

    const data: TotalScoreResponse = await response.json();
    return data;
  } catch (error) {
    console.error("총점 API 호출 실패:", error);
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
    throw new Error("종합 점수를 불러오는 중 오류가 발생했습니다");
  }
};

export default getTotalScore;

