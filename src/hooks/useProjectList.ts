import { useQuery } from "@tanstack/react-query";
import { getProjectList, type ProjectListResponse } from "../apis/newProject";

export const useProjectList = () => {
  return useQuery<ProjectListResponse>({
    queryKey: ["projects", "list"],
    queryFn: getProjectList,
  });
};

