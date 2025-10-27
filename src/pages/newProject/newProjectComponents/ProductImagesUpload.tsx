import React from 'react';
import { UploadIcon } from './Icons';

interface ProductImagesUploadProps {
  productImages: File[];
  onProductImagesChange: (images: File[]) => void;
}

const ProductImagesUpload: React.FC<ProductImagesUploadProps> = ({ 
  productImages, 
  onProductImagesChange 
}) => {
  const handleImageAdd = (files: File[]) => {
    onProductImagesChange([...productImages, ...files]);
  };

  const handleImageRemove = (index: number) => {
    onProductImagesChange(productImages.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    if (files.length > 0) {
      handleImageAdd(files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleImageAdd(files);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">
          제품 이미지
        </label>
        <span className="px-2 py-0.5 rounded-lg border border-black/10 text-xs font-medium text-neutral-950">
          선택
        </span>
      </div>
      
      {/* 업로드된 이미지 목록 */}
      {productImages.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">업로드된 이미지 ({productImages.length}개)</h4>
          {productImages.map((file, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <img 
                src={URL.createObjectURL(file)} 
                alt={`제품 이미지 ${index + 1}`} 
                className="w-12 h-12 object-cover rounded"
              />
              <span className="flex-1 text-sm text-gray-600">{file.name}</span>
              <button 
                onClick={() => handleImageRemove(index)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                제거
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 업로드 영역 */}
      <div 
        className="h-32 px-6 py-4 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
        onClick={() => document.getElementById('product-images-upload')?.click()}
      >
        <UploadIcon className="w-8 h-8 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">클릭하거나 이미지를 드래그하여 업로드</p>
        <p className="text-xs text-gray-400">PNG, JPG (최대 5MB)</p>
      </div>
      
      <input
        id="product-images-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
};

export default ProductImagesUpload;
