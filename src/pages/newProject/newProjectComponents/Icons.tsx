import React from 'react';

export const ChartIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <path d="M4 8L4 14M8 4L8 14M12 6L12 14" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round"/>
  </svg>
);

export const UploadIcon = ({ className = "w-12 h-12 text-gray-400" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none">
    <path d="M24 6L24 30M24 6L14 16M24 6L34 16M6 30L6 42L42 42L42 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
