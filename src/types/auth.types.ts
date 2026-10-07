export interface VerifyAccountPayload {
  email: string;
  otp: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  areaId: string;
}
export interface GoogleOAuthLoginPayload {
  googleId: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
 
