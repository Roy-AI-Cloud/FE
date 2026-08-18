import { useQuery } from "@tanstack/react-query";
import {
  getYoutuberStats,
  type YoutuberStatsResponse,
} from "../apis/getYoutuberStats";

export const useYoutuberStats = (channelId: string, enabled: boolean = true) => {
  return useQuery<YoutuberStatsResponse>({
    queryKey: ["youtuber", "stats", channelId],
    queryFn: () => getYoutuberStats(channelId),
    enabled: enabled && !!channelId,
    staleTime: 1000 * 60 * 5,
  });
};

export default useYoutuberStats;

