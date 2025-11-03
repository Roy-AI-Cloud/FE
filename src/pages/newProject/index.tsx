import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from './newProjectComponents/HeroSection.tsx';
import ProductImagesUpload from './newProjectComponents/ProductImagesUpload.tsx';
import EvaluationWeight from './newProjectComponents/EvaluationWeight.tsx';
import FormFields from './newProjectComponents/FormFields.tsx';

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

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // AI 분석 로직 실행
    navigate('/List?mode=edit');
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