
"use client";

import { app } from "./firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function useAuth() {
  const router = useRouter();
  const { toast } = useToast();

  const signInWithGoogle = async (role: 'vendor' | 'distributor') => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;

      console.log({ user, token });

      // Redirect based on role
      if (role === 'vendor') {
        router.push("/dashboard/vendor");
      } else {
        router.push("/dashboard/distributor");
      }
      
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      
      // Don't show an error toast if the user simply closes the popup.
      if (errorCode === 'auth/popup-closed-by-user') {
        console.log("Sign-in popup closed by user.");
        return;
      }

      console.error(`Authentication Error (${errorCode}): ${errorMessage}`);
      toast({
        title: "Authentication Failed",
        description: "Could not sign in with Google. Please try again.",
        variant: "destructive",
      })
    }
  };

  return { signInWithGoogle };
}
