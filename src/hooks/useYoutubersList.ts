import { useQuery } from '@tanstack/react-query';
import { getHomeYoutuberList } from '../apis/getYoutuberList';

export const useHomeYoutubers = () => {
  return useQuery({
    queryKey: ['youtubers', 'home'],
    queryFn: getHomeYoutuberList,
  });
};