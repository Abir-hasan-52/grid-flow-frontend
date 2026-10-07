import apiClient from "@/lib/apiClient";
import { AreaInterface } from "@/types/area.types";

export function getArea(params?: AreaInterface) {
  return apiClient("/area/all-areas", {
    params,
  });
}
