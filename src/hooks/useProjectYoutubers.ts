import { useQuery } from "@tanstack/react-query";
import {
  getProjectYoutubers,
  type ProjectYoutuber,
} from "../apis/getProjectYoutubers";

export const useProjectYoutubers = (
  projectId?: string,
  enabled: boolean = true
) => {
  return useQuery<ProjectYoutuber[]>({
    queryKey: ["project-youtubers", projectId],
    queryFn: () => {
      if (!projectId) {
        throw new Error("프로젝트 ID가 필요합니다.");
      }
      return getProjectYoutubers(projectId);
    },
    enabled: enabled && !!projectId,
    staleTime: 1000 * 60 * 5,
  });
};

export default useProjectYoutubers;

