import { getArea } from "@/api";
import { AreaInterface } from "@/types/area.types";
import { useQuery } from "@tanstack/react-query";

export function useGetArea(params?:  AreaInterface) {
  return useQuery({
    queryKey: ["areas", params],
    queryFn: () => getArea(params),
  });
}
