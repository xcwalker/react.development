import { deleteUser, type User } from "firebase/auth";
import { notify } from "../../notify";

export default async function firebaseDeleteAccount(user: User) {
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

    notify
      .promise(deleteUser(user), {
        loading: "Deleting account...",
        success: "Account deleted successfully.",
        error: (err: unknown) => {
          const errorObj = err as { message: string; code: string };
          return `Error deleting account: ${errorObj.message} ${errorObj.code}`;
        },
      })
      .finally(() => {
        return Promise.resolve();
      });
  } else {
    const errorMessage = "No user is currently signed in.";
    notify.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
}
