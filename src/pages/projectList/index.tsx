import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Item from "./projectListComponents/item";
import HeaderLeftBack from "../../components/button/HeaderLeftBack";
import type { CreateProjectResponse } from "../../apis/newProject";
import { useProjectList } from "../../hooks/useProjectList";
import { deleteProject } from "../../apis/newProject";

const ProjectList = () => {
  const queryClient = useQueryClient();
  const { data: projects = [], isLoading, error } = useProjectList();
  const [selectedProject, setSelectedProject] =
    useState<CreateProjectResponse | null>(null);

  const handleDelete = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      // 삭제 성공 후 목록 갱신
      await queryClient.invalidateQueries({ queryKey: ["projects", "list"] });
      alert("프로젝트가 삭제되었습니다.");
    } catch (err) {
      console.error("프로젝트 삭제 실패:", err);
      alert(
        err instanceof Error ? err.message : "프로젝트 삭제에 실패했습니다."
      );
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
        <div className="bg-gray-150 shadow-md rounded-xl p-6 w-full max-w-2xl">
          <HeaderLeftBack />
          <div className="px-6 py-8 mx-auto max-w-7xl">
            <div className="mb-8 text-center">
              <div className="mb-2 text-3xl font-bold text-gray-900">
                프로젝트 목록
              </div>
              <p className="text-gray-600 p-4">
                등록된 모든 프로젝트를 확인하세요
              </p>
              <hr className="my-4 border-t border-gray-300" />

              {isLoading && (
                <div className="py-8 text-gray-500">
                  프로젝트 목록을 불러오는 중...
                </div>
              )}
              {error && (
                <div className="py-8 text-red-500">
                  프로젝트 목록을 불러오는 중 오류가 발생했습니다.
                </div>
              )}
              {!isLoading && !error && (
                <div className="space-y-4">
                  {projects.length === 0 && (
                    <p className="text-gray-500">
                      아직 등록된 프로젝트가 없습니다.
                    </p>
                  )}
                  {projects.map((project) => (
                    <Item
                      key={project.project_id}
                      project={project}
                      onViewDetail={setSelectedProject}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={() => setSelectedProject(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {selectedProject.company_name}
            </h2>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <p className="font-semibold text-gray-900">카테고리</p>
                <p>{selectedProject.brand_categories || "-"}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">브랜드 톤</p>
                <p>{selectedProject.brand_tone || "-"}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">캠페인 목표</p>
                <p>{selectedProject.campaign_goal || "-"}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-gray-900">생성 일시</p>
                  <p>
                    {new Date(selectedProject.created_at).toLocaleString(
                      "ko-KR"
                    )}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">추천 유튜버 수</p>
                  <p>{selectedProject.total_youtubers}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectList;
