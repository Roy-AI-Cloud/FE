import React from 'react';
import { ChartIcon } from './Icons';
import LogoUpload from './LogoUpload';

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
                className="w-full px-3 py-2 text-sm rounded-lg bg-zinc-100 placeholder:text-gray-500"
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
                        className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-50"
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
                                className="ml-1 text-xs text-red-500 hover:text-red-700"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
                <div className="flex gap-2">
                    <select
                        className="flex-1 px-3 py-2 text-sm text-gray-500 rounded-lg bg-zinc-100"
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
                    className="w-full h-16 px-3 py-2 text-sm rounded-lg resize-none bg-zinc-100 placeholder:text-gray-500"
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
            <div className="pt-6 space-y-2 border-t border-gray-200">
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">
                        마케팅할 제품 소개
                    </label>
                </div>
                <textarea
                    placeholder="제품의 특징, 장점, 타겟층 등을 상세히 설명해주세요"
                    value={formData.productDescription}
                    onChange={(e) => onInputChange('productDescription', e.target.value)}
                    className="w-full h-16 px-3 py-2 text-sm rounded-lg resize-none bg-zinc-100 placeholder:text-gray-500"
                />
            </div>
        </>
    );
};

export default FormFields;
