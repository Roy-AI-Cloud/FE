import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from './newProjectComponents/HeroSection.tsx';
import ProductImagesUpload from './newProjectComponents/ProductImagesUpload.tsx';
import EvaluationWeight from './newProjectComponents/EvaluationWeight.tsx';
import FormFields from './newProjectComponents/FormFields.tsx';
import { saveBrand, type BrandInfo } from '../../utils/brandStorage.ts';

interface FormData {
  companyName: string;
  logo: File | null;
  category: string[];
  brandKeywords: string;
  targetAge: string[];
  targetGender: string[];
  brandTone: string[];
  campaignGoal: string;
  budgetRange: [number, number];
  productDescription: string;
  productImages: File[];
}

const BrandCampaignForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    logo: null,
    category: [],
    brandKeywords: '',
    targetAge: [],
    targetGender: [],
    brandTone: [],
    campaignGoal: '',
    budgetRange: [1000000, 10000000],
    productDescription: '',
    productImages: []
  });

  const handleInputChange = (field: keyof FormData, value: string | number | string[] | File | File[] | null | [number, number]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSelection = (field: 'targetAge' | 'targetGender' | 'brandTone' | 'category', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item: string) => item !== value)
        : [...prev[field], value]
    }));
  };

  // File을 Base64로 변환하는 함수
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async () => {
    console.log('Form submitted:', formData);
    try {
      // 1. 로고를 Base64로 변환
      let logoBase64 = '';
      if (formData.logo) {
        logoBase64 = await convertFileToBase64(formData.logo);
      }

      // 2. 제품 이미지들도 Base64로 변환 (첫 번째 이미지만)
      let productImageBase64 = '';
      if (formData.productImages.length > 0) {
        productImageBase64 = await convertFileToBase64(formData.productImages[0]);
      }

      // 3. API 형식에 맞게 변환
      const brandData: BrandInfo = {
        brand_name: formData.companyName,
        brand_description: formData.productDescription,
        brand_tone: formData.brandTone.join(', '),        // 배열 → 문자열
        brand_category: formData.category.join(', '),     // 배열 → 문자열
        brand_image_base64: logoBase64,
        brand_image_url: '',
        campaign_goal: formData.campaignGoal,
        product_description: formData.productDescription,
        product_image_base64: productImageBase64,
        product_image_url: '',
        // 가중치 (나중에 EvaluationWeight 컴포넌트에서 받아올 예정)
        weight_brand_image: 40,
        weight_sentiment: 30,
        weight_roi: 30,
      };

      // 4. 로컬스토리지에 저장
      saveBrand(brandData);
      
      console.log('✅ 브랜드 정보 저장 완료:', brandData);
      
      // 5. 피플리스트로 이동
      navigate('/youtube/home-list?mode=edit');
      
    } catch (error) {
      console.error('❌ 저장 실패:', error);
      alert('브랜드 정보 저장에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-[894px] w-full p-8 bg-white rounded-2xl border border-black/10">
        <div className="space-y-8">
          <HeroSection />

          <FormFields 
            formData={formData}
            onInputChange={handleInputChange}
            onToggleSelection={toggleSelection}
            onLogoChange={(logo) => handleInputChange('logo', logo)}
          />

          <ProductImagesUpload
            productImages={formData.productImages}
            onProductImagesChange={(images) => handleInputChange('productImages', images)}
          />

          <EvaluationWeight />

          {/* 버튼 그룹 */}
          <div className="pt-4 flex gap-4">
            <button 
              onClick={() => navigate('/List')}
              className="flex-1 px-4 py-2 bg-white rounded-lg border border-black/10 text-sm font-medium text-neutral-950 hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              AI 분석 시작
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCampaignForm;