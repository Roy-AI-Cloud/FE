import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/30 backdrop-blur-sm"
      onClick={onClose} // 배경 클릭 시 닫힘
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl border border-black/10 shadow-xl"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않게
      >
        <button
          onClick={onClose}
          className="absolute text-xl text-gray-400 top-3 right-3 hover:text-gray-600"
        >
          ×
        </button>
        <div className="max-h-[85vh] overflow-y-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;