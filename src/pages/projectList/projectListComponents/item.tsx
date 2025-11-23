import React from "react";
import type { CreateProjectResponse } from "../../../apis/newProject";

interface ItemProps {
  project: CreateProjectResponse;
  onViewDetail: (project: CreateProjectResponse) => void;
  onDelete: (projectId: string) => void;
}

const Item: React.FC<ItemProps> = ({ project, onViewDetail, onDelete }) => {
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      window.confirm(`"${project.company_name}" 프로젝트를 삭제하시겠습니까?`)
    ) {
      onDelete(project.project_id);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-lg">
      <div>
        <p className="text-lg font-semibold text-gray-900">
          {project.company_name}
        </p>
        <p className="text-sm text-gray-500">
          {project.brand_categories || "카테고리 없음"}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewDetail(project)}
          className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
        >
          상세 보기
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-sm font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Item;
