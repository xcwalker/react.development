import { signOut } from "firebase/auth";
import { firebaseAuth } from "./setup";
import { notify } from "../../notify";

export function firebaseLogout() {
  return notify.promise(
    signOut(firebaseAuth),
    {
      loading: "Signing Out",
      success: "Signed Out",
      error: "Unable To Sign Out",
    }
  );
}
