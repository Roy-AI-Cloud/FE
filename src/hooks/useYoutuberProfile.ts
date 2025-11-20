import { useQuery } from "@tanstack/react-query";
import {
  getYoutuberProfile,
  type YoutuberProfile,
} from "../apis/getYoutberDetail";

export const useYoutuberProfile = (channelId: string) => {
  return useQuery<YoutuberProfile>({
    queryKey: ["youtuber", "profile", channelId],
    queryFn: () => getYoutuberProfile(channelId),
    enabled: !!channelId,
  });
};
