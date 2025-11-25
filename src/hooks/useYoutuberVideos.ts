import { useQuery } from "@tanstack/react-query";
import {
  getYoutuberVideos,
  type YoutuberVideo,
} from "../apis/getYoutuberVideos";

export const useYoutuberVideos = (
  channelId: string,
  limit: number = 10
) => {
  return useQuery<YoutuberVideo[]>({
    queryKey: ["youtuber", "videos", channelId, limit],
    queryFn: () => getYoutuberVideos(channelId, limit),
    enabled: !!channelId,
  });
};

