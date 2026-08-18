import { useQuery } from '@tanstack/react-query';
import { getHomeYoutuberList, type HomeYoutuber } from '../apis/getYoutuberList';

export const useHomeYoutubers = (limit?: number, offset?: number) => {
  return useQuery<HomeYoutuber[]>({
    queryKey: ['youtubers', 'home', limit, offset],
    queryFn: () => getHomeYoutuberList(limit, offset),
  });
};