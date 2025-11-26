import { useQuery } from "@tanstack/react-query";
import {
  getSentimentAnalyze,
  type SentimentAnalyzeResponse,
} from "../apis/getSentimentAnalyze";

export const useSentimentAnalysis = (
  projectId: string,
  channelId: string
) => {
  return useQuery<SentimentAnalyzeResponse>({
    queryKey: ["sentiment", "analysis", projectId, channelId],
    queryFn: () => getSentimentAnalyze(projectId, channelId),
    enabled: !!projectId && !!channelId,
  });
};

