import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  type User,
} from "firebase/auth";
import { notify } from "../../notify";

export default function firebaseReauthenticate(user: User, password: string) {
  const credential = EmailAuthProvider.credential(user.email!, password);
  return notify.promise(
    reauthenticateWithCredential(user, credential),
    {
      loading: "Reauthenticating...",
      success: "Reauthenticated successfully",
      error: "Failed to reauthenticate",
    }
  );
}
