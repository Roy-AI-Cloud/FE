import type { CreateProjectResponse } from "../apis/newProject";

const STORAGE_KEY = "projects:list";

export const getStoredProjects = (): CreateProjectResponse[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (error) {
    console.error("프로젝트 목록 불러오기 실패:", error);
    return [];
  }
};

export const addProjectToStorage = (project: CreateProjectResponse): void => {
  try {
    const current = getStoredProjects();
    current.unshift(project); // 최신순으로 앞에 추가
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (error) {
    console.error("프로젝트 저장 실패:", error);
    throw new Error("프로젝트를 저장할 수 없습니다.");
  }
};
