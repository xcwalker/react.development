import { applyActionCode } from "firebase/auth";
import { firebaseAuth } from "./setup";
import { notify } from "../../notify";

export default function FirebaseApplyActionCode(actionCode: string) {
  return notify.promise(
    applyActionCode(firebaseAuth, actionCode),
    {
      loading: "Applying action code...",
      success: "Action code applied successfully!",
      error: "Error applying action code",
    }
  );
}
