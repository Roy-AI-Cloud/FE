import { useQuery } from "@tanstack/react-query";
import { getBrandMatch, type BrandMatchResponse } from "../apis/getBrandMatch";

export const useBrandMatch = (
  projectId: string,
  channelId: string,
  enabled: boolean = true
) => {
  return useQuery<BrandMatchResponse>({
    queryKey: ["brand-match", projectId, channelId],
    queryFn: () => getBrandMatch(projectId, channelId),
    enabled: enabled && !!projectId && !!channelId,
    staleTime: 1000 * 60 * 5,
  });
};

export default useBrandMatch;
