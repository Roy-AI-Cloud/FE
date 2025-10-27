import React from 'react';
import { UploadIcon } from './Icons';

interface LogoUploadProps {
  logo: File | null;
  onLogoChange: (logo: File | null) => void;
}

const LogoUpload: React.FC<LogoUploadProps> = ({ logo, onLogoChange }) => {
  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onLogoChange(file);
    } else {
      alert('이미지 파일만 업로드 가능합니다.');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-neutral-950">
        브랜드 로고/이미지
      </label>
      <div 
        className="h-44 px-8 pt-8 pb-2 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
        onClick={() => document.getElementById('logo-upload')?.click()}
      >
        {logo ? (
          <div className="flex flex-col items-center">
            <img 
              src={URL.createObjectURL(logo)} 
              alt="업로드된 로고" 
              className="max-h-24 max-w-32 object-contain rounded"
            />
            <p className="mt-2 text-sm text-gray-600">{logo.name}</p>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onLogoChange(null);
              }}
              className="mt-1 text-xs text-red-500 hover:text-red-700"
            >
              제거
            </button>
          </div>
        ) : (
          <>
            <UploadIcon />
            <p className="mt-4 text-base text-gray-600">클릭하여 로고 업로드</p>
            <p className="mt-1 text-sm text-gray-400">PNG, JPG (최대 5MB)</p>
          </>
        )}
        <input
          id="logo-upload"
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default LogoUpload;
