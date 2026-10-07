/** biome-ignore-all lint/style/useImportType: <explanation> */
import apiClient from "@/lib/apiClient";
import {
  ForgotPasswordPayload,
  GoogleOAuthLoginPayload,
  LoginPayload,
  RegisterUserPayload,
  ResetPasswordPayload,
  VerifyAccountPayload,
} from "@/types";

export function userLogin(payload: LoginPayload) {
  return apiClient("/auth/login", { method: "POST", body: payload });
}
export function userLogout() {
  return apiClient("/auth/logout", { method: "POST" });
}
export function getMe() {
  return apiClient("/auth/me");
}

export function verifyAccount(payload: VerifyAccountPayload) {
  return apiClient("/auth/verify-email", { method: "POST", body: payload });
}

export function googleOAuthLogin(payload: GoogleOAuthLoginPayload) {
  return apiClient("/auth/google", { method: "POST", body: payload });
}
export function registerUser(payload: RegisterUserPayload) {
  return apiClient("/auth/register", { method: "POST", body: payload });
}

export function forgotPassword(payload: ForgotPasswordPayload) {
  return apiClient("/auth/forgot-password", {
    method: "POST",
    body: payload,
  });
}

export function resetPassword(payload: ResetPasswordPayload) {
  return apiClient("/auth/reset-password", {
    method: "POST",
    body: payload,
  });
}
