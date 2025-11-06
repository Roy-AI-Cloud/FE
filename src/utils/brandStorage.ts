// 새프로젝트 db가 없어서 로컬로 만들어 놓음 나중에 삭제

export interface BrandInfo {
    brand_name: string;
    brand_description: string;
    brand_tone: string;
    brand_category: string;
    brand_image_url?: string;
    brand_image_base64?: string;
    campaign_goal?: string;
    product_description?: string;
    product_image_url?: string;
    product_image_base64?: string;
    // 가중치 (나중에 추가)
    weight_brand_image?: number;
    weight_sentiment?: number;
    weight_roi?: number;
}

const STORAGE_KEY = 'myBrandInfo';

/**
 * 브랜드 정보를 로컬스토리지에 저장
 */
export const saveBrand = (brandData: BrandInfo): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(brandData));
        console.log('✅ 브랜드 정보 저장 완료');
    } catch (error) {
        console.error('❌ 브랜드 정보 저장 실패:', error);
        throw new Error('브랜드 정보를 저장할 수 없습니다.');
    }
};

/**
 * 로컬스토리지에서 브랜드 정보 가져오기
 */
export const getBrand = (): BrandInfo | null => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);

        if (!data) {
            console.log('ℹ️ 저장된 브랜드 정보가 없습니다.');
            return null;
        }

        const brandData = JSON.parse(data);
        console.log('✅ 브랜드 정보 불러오기 완료:', brandData.brand_name);
        return brandData;
    } catch (error) {
        console.error('❌ 브랜드 정보 불러오기 실패:', error);
        return null;
    }
};

/**
 * 브랜드 정보 삭제
 */
export const clearBrand = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        console.log('✅ 브랜드 정보 삭제 완료');
    } catch (error) {
        console.error('❌ 브랜드 정보 삭제 실패:', error);
    }
};

/**
 * 브랜드 정보가 저장되어 있는지 확인
 */
export const hasBrand = (): boolean => {
    return localStorage.getItem(STORAGE_KEY) !== null;
};