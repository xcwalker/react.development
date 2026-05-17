import { updatePassword, type User } from "firebase/auth";
import { notify } from "../../notify";
import type { ErrorType } from "../../../types";

export function firebaseUpdatePassword(user: User, newPassword: string) {
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
        "412: Please re-authenticate before updating your password.";

      notify.error(errorMessage);

      return Promise.reject(new Error(errorMessage));
    }

    return notify.promise(
      updatePassword(user, newPassword),
      {
        loading: "Updating password...",
        success: "Password updated successfully.",
        error: (err) => `Error updating password: ${(err as ErrorType).message} ${(err as ErrorType).code}`,
      }
    );
  } else {
    const errorMessage = "No user is currently signed in.";
    notify.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
}
