import { type UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "./setup";
import { notify } from "../../notify";

export default async function firebaseLogin(email: string, password: string) {
  return notify.promise(
    signInWithEmailAndPassword(firebaseAuth, email, password),
    {
      loading: "Signing In",
      success: (data) => `Welcome Back ${(data as UserCredential).user.displayName}`,
      error: "Unable To Sign In",
    }
  );
}
