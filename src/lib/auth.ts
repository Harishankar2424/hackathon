
"use client";

import { app } from "./firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();

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
      // The email of the user's account used.
      const email = error.customData?.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error({ errorCode, errorMessage, email, credential });
    }
  };

  return { signInWithGoogle };
}
