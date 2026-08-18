import { useQuery } from "@tanstack/react-query";
import {
  getTotalScore,
  type TotalScoreResponse,
} from "../apis/getTotalScore";

export const useTotalScore = (
  projectId: string,
  channelId: string,
  enabled: boolean = true
) => {
  return useQuery<TotalScoreResponse>({
    queryKey: ["total-score", projectId, channelId],
    queryFn: () => getTotalScore(projectId, channelId),
    enabled: enabled && !!projectId && !!channelId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export default useTotalScore;

