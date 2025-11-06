// hooks/useBrandAnalysis.ts

import { useQuery } from '@tanstack/react-query';
import {
    analyzeBrandCompatibility, // 브랜드 호환성 분석 API 함수
    type BrandCompatibilityRequest, // 브랜드 호환성 분석 요청 데이터 인터페이스
    type WeightConfig, // 가중치 설정 인터페이스
} from '../apis/brandCompatibility';
import { getBrand } from '../utils/brandStorage'; // 브랜드 정보 가져오기

/**
 * 브랜드 호환성 분석 훅 -> 이 훅이 뭐하는지 설명
 * @param channelId - 분석할 채널 ID
 * @param enabled - 쿼리 실행 여부 (기본값: true)
 */
export const useBrandCompatibility = (channelId: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['brand-compatibility', channelId], // 쿼리 키 설정 -> 캐시 관리를 위해 사용 -> 채널마다 다른 캐시 관리 가능
        queryFn: async () => {
            // 1. 로컬스토리지에서 브랜드 정보 가져오기
            const brandInfo = getBrand();

            if (!brandInfo) {
                throw new Error('브랜드 정보가 없습니다. 먼저 브랜드를 등록해주세요.');
            }

            // 가중치 설정(로컬 스토리지에서 가져온 값 사용)
            const weightConfigs: WeightConfig[] = [
                {
                    brand_image_weight: (brandInfo.weight_brand_image || 40) / 100,
                    sentiment_weight: (brandInfo.weight_sentiment || 30) / 100,
                    roi_weight: (brandInfo.weight_roi || 30) / 100,
                }
            ];

            // 2. API 요청 데이터 구성
            const requestData: BrandCompatibilityRequest = {
                channel_id: channelId,
                brand_name: brandInfo.brand_name,
                brand_description: brandInfo.brand_description,
                brand_tone: brandInfo.brand_tone,
                brand_category: brandInfo.brand_category,
                weight_configs: weightConfigs,
                brand_image_url: brandInfo.brand_image_url || '',
            };

            // 3. API 호출
            return analyzeBrandCompatibility(requestData);
        },
        // channelId가 있고, enabled가 true일 때만 실행
        enabled: !!channelId && enabled,
        // 5분간 캐시 유지
        staleTime: 1000 * 60 * 5,
        // 에러 발생 시 재시도 안함
        retry: false,
    });
};