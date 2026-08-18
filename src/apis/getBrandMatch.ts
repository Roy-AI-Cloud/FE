export interface BrandMatchDetails {
  image_similarity: number;
  text_compatibility: number;
  brand_category: string;
  analysis_method: string;
  channel_data_points: {
    thumbnails_analyzed: number;
    titles_analyzed: number;
    has_brand_image: boolean;
  };
}

export interface BrandMatchResponse {
  score: number;
  details: BrandMatchDetails;
}

export const getBrandMatch = async (
  projectId: string,
  channelId: string
): Promise<BrandMatchResponse> => {
  if (!projectId || !channelId) {
    throw new Error("프로젝트 ID와 채널 ID가 필요합니다.");
  }

  const apiUrl = `/api/analysis/brand-match/${projectId}/${channelId}`;

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
        `브랜드 적합도 분석을 불러올 수 없습니다 (${response.status}): ${errorText}`
      );
    }

    const data: BrandMatchResponse = await response.json();
    return data;
  } catch (error) {
    console.error("브랜드 적합도 분석 API 오류:", error);
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
    throw new Error("브랜드 적합도 분석 중 오류가 발생했습니다");
  }
};

export default getBrandMatch;
