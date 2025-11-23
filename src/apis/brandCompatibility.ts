// 가중치 설정 인터페이스
export interface WeightConfig {
  brand_image_weight: number;
  sentiment_weight: number;
  roi_weight: number;
}

export interface BrandCompatibilityRequest {
  channel_id: string;
  brand_name: string;
  brand_description: string;
  brand_tone: string;
  brand_category: string;
  brand_image_url: string;
  weight_configs: WeightConfig[];
}

// 브랜드 적합도 분석 응답 인터페이스
export interface BrandCompatibilityResponse {
  channel_id: string;
  channel_title: string;
  base_scores: {
    brand_image: number;
    sentiment: number;
    roi: number;
  };
  comparisons: Array<{
    weights: WeightConfig;
    total_score: number;
    grade: string;
    recommendation: string;
  }>;
}

// 브랜드 적합도 API 호출 (가중치 비교 포함)
export const analyzeBrandCompatibility = async (
  data: BrandCompatibilityRequest
): Promise<BrandCompatibilityResponse> => {
  // 프록시 사용: vite.config.ts에서 /api 요청을 http://localhost:8000으로 프록시
  // TODO: 백엔드에 실제 브랜드 호환성 분석 엔드포인트 확인 필요
  // 현재는 /api/simulator/compare-weights를 사용하지만 404 오류 발생
  const apiUrl = `/api/simulator/compare-weights`;

  try {
    console.log("브랜드 호환성 분석 요청:", apiUrl, data);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("응답 상태:", response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `브랜드 적합도 분석 실패 (${response.status})`;

      if (response.status === 404) {
        errorMessage = `API 엔드포인트를 찾을 수 없습니다: ${apiUrl}\n백엔드 서버(http://localhost:8000)에 해당 엔드포인트가 존재하는지 확인하세요.`;
        console.error("404 오류 - 엔드포인트 확인 필요:", apiUrl);
      } else {
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.detail || errorText;
        } catch {
          errorMessage = errorText;
        }
      }

      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log("브랜드 호환성 분석 성공:", result);
    return result;
  } catch (error) {
    console.error("브랜드 호환성 분석 실패:", error);
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
    throw new Error("브랜드 호환성 분석 중 오류가 발생했습니다");
  }
};
