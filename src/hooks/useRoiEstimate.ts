import { useQuery } from "@tanstack/react-query";
import { estimate, type EstimateResponse } from "../apis/Estimate";

export const useRoiEstimate = (
  projectId?: string,
  channelId?: string
) => {
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
    staleTime: 0, 
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,

    retry: false,
  });
};

export default useRoiEstimate;