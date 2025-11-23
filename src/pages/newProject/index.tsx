import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "./newProjectComponents/HeroSection.tsx";
import ProductImagesUpload from "./newProjectComponents/ProductImagesUpload.tsx";
import EvaluationWeight from "./newProjectComponents/EvaluationWeight.tsx";
import FormFields from "./newProjectComponents/FormFields.tsx";
import { saveBrand, type BrandInfo } from "../../utils/brandStorage.ts";
import {
  createProject,
  type CreateProjectPayload,
} from "../../apis/newProject.ts";
import { addProjectToStorage } from "../../utils/projectStorage";

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

const NewProject = () => {
  const navigate = useNavigate();

  const handleCloseModal = () => {
    navigate(-1); // 뒤로가기
  };

  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    logo: null,
    category: [],
    brandKeywords: "",
    targetAge: [],
    targetGender: [],
    brandTone: [],
    campaignGoal: "",
    budgetRange: [1000000, 10000000],
    productDescription: "",
    productImages: [],
  });

  const handleInputChange = (
    field: keyof FormData,
    value: string | number | string[] | File | File[] | null | [number, number]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSelection = (
    field: "targetAge" | "targetGender" | "brandTone" | "category",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    console.log("Form submitted:", formData);

    try {
      let logoBase64 = "";
      if (formData.logo) {
        logoBase64 = await convertFileToBase64(formData.logo);
      }

      let productImageBase64 = "";
      if (formData.productImages.length > 0) {
        productImageBase64 = await convertFileToBase64(
          formData.productImages[0]
        );
      }

      const brandData: BrandInfo = {
        brand_name: formData.companyName,
        brand_description: formData.productDescription,
        brand_tone: formData.brandTone.join(", "),
        brand_category: formData.category.join(", "),
        brand_image_base64: logoBase64,
        brand_image_url: "",
        campaign_goal: formData.campaignGoal,
        product_description: formData.productDescription,
        product_image_base64: productImageBase64,
        product_image_url: "",
        weight_brand_image: 40,
        weight_sentiment: 30,
        weight_roi: 30,
      };

      // 로컬 브랜드 정보 저장 (기존 기능 유지)
      saveBrand(brandData);

      // 프로젝트 생성 API 호출
      const payload: CreateProjectPayload = {
        company_name: formData.companyName,
        brand_categories: formData.category.join(", "),
        brand_tone: formData.brandTone.join(", "),
        campaign_goal: formData.campaignGoal,
        brand_image: formData.logo,
      };

      const projectResponse = await createProject(payload);
      addProjectToStorage(projectResponse);

      console.log("✅ 프로젝트 생성 완료:", projectResponse);

      navigate("/project-list", { replace: true });
    } catch (error) {
      console.error("❌ 저장 실패:", error);
      alert(
        error instanceof Error
          ? error.message
          : "프로젝트 정보를 저장할 수 없습니다."
      );
    }
  };

  const formContent = (
    <div className="space-y-8">
      <HeroSection />

      <FormFields
        formData={formData}
        onInputChange={handleInputChange}
        onToggleSelection={toggleSelection}
        onLogoChange={(logo) => handleInputChange("logo", logo)}
      />

      <ProductImagesUpload
        productImages={formData.productImages}
        onProductImagesChange={(images) =>
          handleInputChange("productImages", images)
        }
      />

      <EvaluationWeight />

      {/* 버튼 그룹 */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={handleCloseModal}
          className="flex-1 px-4 py-2 text-sm font-medium transition-colors bg-white border rounded-lg border-black/10 text-neutral-950 hover:bg-gray-50"
        >
          취소
        </button>

        <button
          onClick={handleSubmit}
          className="flex-1 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          AI 분석 시작
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="max-w-[894px] w-full p-8 bg-white rounded-2xl border border-black/10">
        {formContent}
      </div>
    </div>
  );
};

export default NewProject;
