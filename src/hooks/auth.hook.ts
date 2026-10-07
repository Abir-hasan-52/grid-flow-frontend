/** biome-ignore-all assist/source/organizeImports: <explanation> */
import { forgotPassword, getMe, googleOAuthLogin, registerUser, resetPassword, userLogin, userLogout, verifyAccount } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useLogin(){
    return  useMutation({
        mutationFn:userLogin,
    })
}
export function useLogout(){
    return  useMutation({
        mutationFn: userLogout,
    })
}
export function  useGetMe(){
    return   useQuery({
         queryKey:["user"],
         queryFn:getMe,
         retry: false,
    })
}
export function useGoogleOAuthLogin() {
  return useMutation({
    mutationFn: googleOAuthLogin,
  });
}


export function useRegisterUser() {
  return useMutation({
    mutationFn: registerUser,
  });
}
export function useVerifyAccount() {
  return useMutation({
    mutationFn: verifyAccount,
  });
}

export function  useForgotPassword(){
    return  useMutation({
        mutationFn:forgotPassword,
    })
}
export function  useResetPassword(){
    return  useMutation({
        mutationFn:resetPassword,
    })
}