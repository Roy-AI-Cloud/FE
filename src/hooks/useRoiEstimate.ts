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
      return estimate({
        project_id: projectId!,
        channel_id: channelId!,
      });
    },

    enabled,
    staleTime: 0,
    gcTime: 0,

    retry: false,
  });
};

export default useRoiEstimate;