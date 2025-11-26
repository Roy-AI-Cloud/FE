export interface SentimentAnalyzeResponse {
  score: number;
  positive_ratio: number;
  negative_ratio: number;
  neutral_ratio: number;
  total_comments: number;
}

export const getSentimentAnalyze = async (
  projectId: string,
  channelId: string
): Promise<SentimentAnalyzeResponse> => {
  const apiUrl = `/api/analysis/sentiment/${projectId}/${channelId}`;

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
        `감정 분석 데이터를 불러올 수 없습니다 (${response.status}): ${errorText}`
      );
    }

    const data: SentimentAnalyzeResponse = await response.json();
    return data;
  } catch (error) {
    console.error("감정 분석 API 호출 실패:", error);
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
    throw new Error("감정 분석 데이터를 불러오는 중 오류가 발생했습니다");
  }
};
