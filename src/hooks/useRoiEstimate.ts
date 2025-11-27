import { useQuery } from "@tanstack/react-query";
import { estimate, type EstimateResponse } from "../apis/Estimate";

export const useRoiEstimate = (projectId?: string, channelId?: string) => {
  const enabled = Boolean(projectId && channelId);

  return useQuery<EstimateResponse>({
    queryKey: enabled
      ? ["roi-estimate", projectId, channelId]
      : ["roi-estimate", "disabled"],

    queryFn: () => {
      if (!projectId || !channelId) {
        throw new Error("projectId and channelId are required");
      }
      return estimate({
        project_id: projectId,
        channel_id: channelId,
      });
    },

    enabled,
    staleTime: 0, // 항상 stale로 간주하여 캐시 사용 안 함
    gcTime: 0, // 가비지 컬렉션 시간 0 (즉시 제거)
    refetchOnMount: "always", // 마운트 시 항상 새로 가져오기
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 방지

    retry: false,
  });
};

export default useRoiEstimate;
