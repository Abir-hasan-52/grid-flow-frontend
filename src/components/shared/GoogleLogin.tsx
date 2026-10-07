"use client";

import { GoogleLogin as GoogleLoginProvider } from "@react-oauth/google";
import { useRouter } from "next/navigation";

import { useGoogleOAuthLogin } from "@/hooks";
import { toast } from "../ui/toast";
import { FieldSeparator } from "../ui/field";

export default function GoogleLoginButton() {
  const router = useRouter();

  const { mutate: googleLogin } = useGoogleOAuthLogin();

  // Google Login Success
  const handleGoogleLoginSuccess = (credentialResponse: {
    credential?: string;
  }) => {
    const tokenId = credentialResponse.credential;

    if (!tokenId) {
      toast.add({
        title: "Google Login Failed",
        description: "No credential received from Google.",
        type: "error",
      });

      return;
    }

    googleLogin(
      {
        googleId: tokenId,
      },
      {
        onSuccess: (data) => {
          console.log("Google Login successful:", data);

          toast.add({
            title: "Google Login Successful",
            description:
              "You have successfully logged in with Google.",
            type: "success",
          });

          router.push("/");
        },

        onError: (error) => {
          console.error("Google Login failed:", error);

          toast.add({
            title: "Google Login Failed",
            description:
              "An error occurred while trying to log in with Google.",
            type: "error",
          });
        },
      },
    );
  };

  // Google Login Error
  const handleGoogleLoginError = () => {
    toast.add({
      title: "Google Login Failed",
      description:
        "An error occurred while trying to log in with Google.",
      type: "error",
    });
  };

  return (
    <div className="mt-6 space-y-4">
      <FieldSeparator>OR</FieldSeparator>

      <div className="mt-4 flex justify-center">
        <GoogleLoginProvider
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
          theme="outline"
          size="large"
          text="continue_with"
          shape="rectangular"
        />
      </div>
    </div>
  );
}