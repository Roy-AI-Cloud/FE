export type ProjectGrade = "S" | "A" | "B" | "C" | "D";

export interface ProjectYoutuber {
  channel_id: string;
  title: string;
  subscriber_count: number;
  thumbnail_url: string;
  category: string;
  engagement_rate: number;
  estimated_price: string;
  total_score: number;
  grade: ProjectGrade;
}

export const getProjectYoutubers = async (
  projectId: string
): Promise<ProjectYoutuber[]> => {
  if (!projectId) {
    throw new Error("프로젝트 ID가 필요합니다.");
  }

  const apiUrl = `/api/project/youtubers/${projectId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `프로젝트 유튜버 목록을 불러올 수 없습니다 (${response.status}): ${errorText}`
      );
    }

    const data: ProjectYoutuber[] = await response.json();
    return data;
  } catch (error) {
    console.error("프로젝트 유튜버 API 호출 실패:", error);
    if (error instanceof Error) {
      if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("ERR_CONNECTION")
      ) {
        throw new Error(
          "백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하세요. (http://localhost:8000)"
        );
      }
      throw error;
    }
    throw new Error("프로젝트 유튜버 목록을 불러오는 중 오류가 발생했습니다");
  }
};

export default getProjectYoutubers;

