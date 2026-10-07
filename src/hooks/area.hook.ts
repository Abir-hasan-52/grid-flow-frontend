import { getArea } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetArea() {
  return useQuery({
    queryKey: ["area"],
    queryFn: getArea,
  });
}
