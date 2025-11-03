import React from 'react';
import { ChartIcon } from './Icons';
import LogoUpload from './LogoUpload';
// import RangeSlider from '../../../components/RangeSlider';

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

interface FormFieldsProps {
    formData: FormData;
    onInputChange: (field: keyof FormData, value: string | number | string[] | File | File[] | null | [number, number]) => void;
    onToggleSelection: (field: 'targetAge' | 'targetGender' | 'brandTone' | 'category', value: string) => void;
    onLogoChange: (logo: File | null) => void;
}

const FormFields: React.FC<FormFieldsProps> = ({
    formData,
    onInputChange,
    onToggleSelection,
    onLogoChange
}) => {
    // const ageGroups = ['10대', '20대', '30대', '40대', '50대 이상'];
    // const genders = ['남성', '여성', '무관'];
    const tones = ['친환경', '프리미엄', '캐주얼', '럭셔리', '실용적', '혁신적', '트렌디', '미니멀', '비건', '합리적', '고품질', '젊은', '세련된', '전문적'];
    const categoryOptions = [
        "건강/의료",
        "테크/IT",
        "라이프스타일",
        "패션/의류",
        "뷰티/화장품",
        "식품/음료",
      ];

    return (
        <>
        {/* 회사명 입력 */}
        <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-950">
                <ChartIcon />
                회사명 *
            </label>
            <input
                type="text"
                placeholder="회사명을 입력하세요"
                value={formData.companyName}
                onChange={(e) => onInputChange('companyName', e.target.value)}
                className="w-full px-3 py-2 bg-zinc-100 rounded-lg text-sm placeholder:text-gray-500"
            />
        </div>

        {/* 브랜드 로고/이미지 업로드 */}
        <LogoUpload 
            logo={formData.logo}
            onLogoChange={onLogoChange}
        />

        {/* 카테고리 선택 */}
        <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-950">
                브랜드 카테고리 (중복선택 가능) *
            </label>
            <div className="grid grid-cols-2 gap-2">
                {categoryOptions.map((category) => (
                    <label
                        key={category}
                        className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50 rounded"
                    >
                        <input
                            type="checkbox"
                            checked={formData.category.includes(category)}
                            onChange={() => onToggleSelection('category', category)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-neutral-950">{category}</span>
                    </label>
                ))}
            </div>
        </div>

            {/* 브랜드 키워드
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-950">
                    브랜드 키워드 *
                </label>
                <textarea
                    placeholder="회사의 이미지, 핵심 가치, 키워드 등을 자유롭게 입력해주세요. 예: 친환경 라이프스타일, 젊고 트렌디한 감성, 프리미엄 품질"
                    value={formData.brandKeywords}
                    onChange={(e) => onInputChange('brandKeywords', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-100 rounded-lg text-sm placeholder:text-gray-500 resize-none h-16"
                />
            </div> */}

            {/* 타겟 연령
            <div className="space-y-3">
                <label className="text-sm font-medium text-neutral-950">
                    타겟 연령 *
                </label>
                <div className="flex gap-3 flex-wrap">
                    {ageGroups.map((age) => (
                        <button
                            key={age}
                            onClick={() => onToggleSelection('targetAge', age)}
                            className={`px-4 py-2 rounded-lg border-2 text-base transition-colors ${formData.targetAge.includes(age)
                                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                                    : 'border-gray-300 text-neutral-950 hover:border-gray-400'
                                }`}
                        >
                            {age}
                        </button>
                    ))}
                </div>
            </div> */}

            {/* 타겟 성별
            <div className="space-y-3">
                <label className="text-sm font-medium text-neutral-950">
                    타겟 성별 *
                </label>
                <div className="flex gap-3">
                    {genders.map((gender) => (
                        <button
                            key={gender}
                            onClick={() => onToggleSelection('targetGender', gender)}
                            className={`px-4 py-2 rounded-lg border-2 text-base transition-colors ${formData.targetGender.includes(gender)
                                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                                    : 'border-gray-300 text-neutral-950 hover:border-gray-400'
                                }`}
                        >
                            {gender}
                        </button>
                    ))}
                </div>
            </div> */}

            {/* 브랜드 성격/톤 */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-950">
                    브랜드 성격/톤 *
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                    {formData.brandTone.map((tone) => (
                        <span
                            key={tone}
                            className="px-2 py-0.5 bg-white rounded-lg border border-black/10 text-xs font-medium flex items-center gap-1"
                        >
                            {tone}
                            <button
                                onClick={() => {
                                    const updatedTones = formData.brandTone.filter(t => t !== tone);
                                    onInputChange('brandTone', updatedTones);
                                }}
                                className="ml-1 text-red-500 hover:text-red-700 text-xs"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
                <div className="flex gap-2">
                    <select
                        className="flex-1 px-3 py-2 bg-zinc-100 rounded-lg text-sm text-gray-500"
                        onChange={(e) => {
                            if (e.target.value && !formData.brandTone.includes(e.target.value)) {
                                onInputChange('brandTone', [...formData.brandTone, e.target.value]);
                                e.target.value = '';
                            }
                        }}
                    >
                        <option value="">브랜드 톤을 선택하세요 (다중 선택 가능)</option>
                        {tones.map((tone) => (
                            <option key={tone} value={tone}>
                                {tone}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* 캠페인 목표 */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-950">
                    캠페인의 구체적인 목표를 입력하세요 (예: 브랜드 인지도 향상, 제품 판매 증가, 새로운 타겟 고객 확보 등) *
                </label>
                <textarea
                    placeholder="캠페인의 구체적인 목표를 입력하세요"
                    value={formData.campaignGoal}
                    onChange={(e) => onInputChange('campaignGoal', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-100 rounded-lg text-sm placeholder:text-gray-500 resize-none h-16"
                />
            </div>

            {/* 예산 범위
            <RangeSlider
                min={1000000}
                max={100000000}
                value={formData.budgetRange}
                onChange={(value: [number, number]) => onInputChange('budgetRange', value)}
                step={1000000}
                label="예산 범위 (원)"
                formatValue={(value: number) => `₩${value.toLocaleString()}`}
            /> */}

            {/* 마케팅할 제품 소개 */}
            <div className="pt-6 border-t border-gray-200 space-y-2">
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">
                        마케팅할 제품 소개
                    </label>
                </div>
                <textarea
                    placeholder="제품의 특징, 장점, 타겟층 등을 상세히 설명해주세요"
                    value={formData.productDescription}
                    onChange={(e) => onInputChange('productDescription', e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-100 rounded-lg text-sm placeholder:text-gray-500 resize-none h-16"
                />
            </div>
        </>
    );
};

export default FormFields;
