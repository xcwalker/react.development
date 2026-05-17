import { type User, verifyBeforeUpdateEmail } from "firebase/auth";
import { notify } from "../../notify";
import type { ErrorType } from "../../../types";

export default function firebaseVerifyEmail(user: User, newEmail: string) {
  if (user) {
    // check when the user last signed in
    if (
      Date.now() -
        (user.metadata.lastSignInTime
          ? new Date(user.metadata.lastSignInTime).getTime()
          : 0) >
      5 * 60 * 1000
    ) {
      const errorMessage =
        "412: Please re-authenticate before updating your email.";

      notify.error(errorMessage);

      return Promise.reject(new Error(errorMessage));
    }

    return notify.promise(
      verifyBeforeUpdateEmail(user, newEmail),
      {
        loading: "Sending verification email...",
        success: "Verification email sent successfully.",
        error: (err) => `Error sending verification email: ${(err as ErrorType).message} ${(err as ErrorType).code}`,
      }
    );
  } else {
    const errorMessage = "No user is currently signed in.";
    notify.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
}
