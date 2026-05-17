import {
  confirmPasswordReset,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
} from "firebase/auth";
import { firebaseAuth } from "./setup";
import { notify } from "../../notify";

export default function firebaseResetPassword(email: string) {
  return notify.promise(
    sendPasswordResetEmail(firebaseAuth, email).catch((error) =>
      console.error(error)
    ),
    {
      loading: "Sending Reset Email",
      success: "Reset Email Sent To: " + email,
      error: "Failed To Send Email",
    }
  );
}

export function firebaseResetPasswordFromEmail(
  actionCode: string,
  newPassword: string
) {
  return notify.promise(
    verifyPasswordResetCode(firebaseAuth, actionCode)
      .catch((error) => console.error(error))
      .then((email) => {
        return notify.promise(
          confirmPasswordReset(firebaseAuth, actionCode, newPassword).catch(
            (error) => console.error(error)
          ),
          {
            loading: "Resetting Password...",
            success: "Password Reset Successfully for: " + email,
            error: "Failed to Reset Password for: " + email,
          }
        );
      }),
    {
      loading: "Verifying Reset Code...",
      success: "Password Reset Successfully!",
      error: "Failed to Reset Password",
    }
  );
}
