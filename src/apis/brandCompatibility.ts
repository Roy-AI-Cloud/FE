const API_BASE_URL = import.meta.env.VITE_API_URL;

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
    data: BrandCompatibilityRequest // 요청 데이터 받음
): Promise<BrandCompatibilityResponse> => { // 나중에 응답 돌려줌 비동기 함수
    const apiUrl = `${API_BASE_URL}/simulator/compare-weights`; // API 엔드포인트

    try {
        const response = await fetch(apiUrl, { // 결고 response에 저장
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.detail || '브랜드 적합도 분석 실패(${response.status})'
            );
        }

        return response.json(); // 응답 데이터 반환
    } catch (error) {
        console.error('브랜드 호환성 분석 실패:', error);
        throw error;
    }
}
