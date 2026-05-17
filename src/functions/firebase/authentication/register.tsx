import { type UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "./setup";
import { notify } from "../../notify";

export default async function firebaseRegister(email: string, password: string) {
  return notify.promise(
    createUserWithEmailAndPassword(firebaseAuth, email, password),
    {
      loading: "Registering",
      success: (data) =>
        `Welcome ${(data as UserCredential).user.displayName}`,
      error: "Unable To Register",
    }
  );
}
