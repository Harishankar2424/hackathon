
"use client";

import { app } from "./firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { addDistributor, type DistributorData, addVendor, type VendorData, getUserRole } from "./firebase/firestore";

export function useAuth() {
  const router = useRouter();
  const { toast } = useToast();

  const signUpWithEmail = async (data: DistributorData & {password: string}) => {
    const auth = getAuth(app);
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
        
        await addDistributor(user.uid, data);

        toast({
            title: "Account Created!",
            description: "You have successfully signed up."
        });

        router.push("/dashboard/distributor");

    } catch(error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(`Authentication Error (${errorCode}): ${errorMessage}`);
        toast({
            title: "Sign Up Failed",
            description: "Could not create your account. Please try again.",
            variant: "destructive",
        })
    }
  }

  const vendorSignUp = async (data: VendorData & {password: string}) => {
    const auth = getAuth(app);
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
        
        await addVendor(user.uid, data);

        toast({
            title: "Account Created!",
            description: "You have successfully signed up as a vendor."
        });

        router.push("/dashboard/vendor");

    } catch(error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(`Authentication Error (${errorCode}): ${errorMessage}`);
        toast({
            title: "Sign Up Failed",
            description: "Could not create your account. Please try again.",
            variant: "destructive",
        })
    }
  }

  const signInWithEmail = async ({email, password}: {email: string, password: string}) => {
    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const role = await getUserRole(user.uid);

      if (role === 'distributor') {
        router.push('/dashboard/distributor');
      } else if (role === 'vendor') {
        router.push('/dashboard/vendor');
      } else {
        // Fallback for users with no assigned role
        router.push('/dashboard');
      }
       toast({
        title: "Login Successful!",
        description: "Welcome back.",
      });
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(`Authentication Error (${errorCode}): ${errorMessage}`);
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  }

  const signInWithGoogle = async (role: 'vendor' | 'distributor') => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;

      // In a real app, you would check if the user exists and what their role is.
      // For this simplified case, we trust the button they clicked.
      // If user exists, check role. If not, create user with role.
      const existingRole = await getUserRole(user.uid);

      if (!existingRole) {
        if (role === 'distributor') {
          const [firstName, ...lastNameParts] = user.displayName?.split(' ') || ["", ""];
          await addDistributor(user.uid, {
            firstName,
            lastName: lastNameParts.join(' '),
            email: user.email!,
            phone: user.phoneNumber || "",
            region: "" // Region would need to be collected post-signup
          });
        } else {
           await addVendor(user.uid, {
            companyName: user.displayName || "Unknown Company",
            email: user.email!,
           });
        }
      }
      
      // Redirect based on role
      const finalRole = existingRole || role;
      if (finalRole === 'vendor') {
        router.push("/dashboard/vendor");
      } else {
        router.push("/dashboard/distributor");
      }
      
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      
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

  return { signInWithGoogle, signUpWithEmail, vendorSignUp, signInWithEmail };
}
