import apiClient from "@/lib/apiClient";

export function userLogin(payload: { email: string; password: string }) {
  return apiClient("/auth/login", { method: "POST", body: payload });
}
export function userLogout() {
  return apiClient("/auth/logout", { method: "POST" });
}
export function getMe() {
  return apiClient("/auth/me");
}

export function googleOAuthLogin(payload: { googleId: string }) {
  return apiClient("/auth/google", {method: "POST", body: payload });
}
export function registerUser(payload: {name: string; email: string; password: string,areaId: string }) {
    return apiClient("/auth/register", {method: "POST", body: payload});
}

 