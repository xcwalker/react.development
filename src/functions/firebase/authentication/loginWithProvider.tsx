import {
  GithubAuthProvider,
  GoogleAuthProvider,
  type UserCredential,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth } from "./setup";
import { titleCase } from "title-case";
import { notify } from "../../notify";

export default function firebaseProviderLogin(provider: string) {
  if (provider === "google") {
    return notify.promise(
      signInWithPopup(firebaseAuth, new GoogleAuthProvider()),
      {
        loading: "Signing In With " + titleCase(provider),
        success: (data) =>
          `Welcome Back ${(data as UserCredential).user.displayName}`,
        error: "Unable To Sign In",
      }
    );
  } else if (provider === "github")
    return notify.promise(
      signInWithPopup(firebaseAuth, new GithubAuthProvider()),
      {
        loading: "Signing In With " + titleCase(provider),
        success: (data) =>
          `Welcome Back ${(data as UserCredential).user.displayName}`,
        error: "Unable To Sign In",
      }
    );
}
