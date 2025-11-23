export interface CreateProjectPayload {
  company_name: string;
  brand_categories: string;
  brand_tone: string;
  campaign_goal: string;
  brand_image?: File | null;
}

export interface CreateProjectResponse {
  project_id: string;
  company_name: string;
  brand_categories: string;
  brand_tone: string;
  campaign_goal: string;
  brand_image_path: string;
  created_at: string;
  total_youtubers: number;
}

export type ProjectListResponse = CreateProjectResponse[];

export const createProject = async (
  payload: CreateProjectPayload
): Promise<CreateProjectResponse> => {
  const formData = new FormData();
  formData.append("company_name", payload.company_name);
  formData.append("brand_categories", payload.brand_categories);
  formData.append("brand_tone", payload.brand_tone);
  formData.append("campaign_goal", payload.campaign_goal);

  if (payload.brand_image) {
    formData.append("brand_image", payload.brand_image);
  }

  const response = await fetch("/api/project/create", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `프로젝트 생성에 실패했습니다 (${response.status}): ${errorText}`
    );
  }

  return response.json();
};

export const getProjectList = async (): Promise<ProjectListResponse> => {
  const response = await fetch("/api/project/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `프로젝트 목록을 불러올 수 없습니다 (${response.status}): ${errorText}`
    );
  }

  return response.json();
};

export const deleteProject = async (projectId: string): Promise<void> => {
  const response = await fetch(`/api/project/${projectId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `프로젝트 삭제에 실패했습니다 (${response.status}): ${errorText}`
    );
  }
};
