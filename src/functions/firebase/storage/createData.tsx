import { addDoc, collection as fbc } from "firebase/firestore";
import { firebaseDB } from "./setup";
import { notify } from "../../notify";

export default async function firebaseCreateData(
  collection: string,
  data: unknown,
  options?: {
    toast?: {
      noToast?: boolean;
      loading?: string;
      success?: string;
      error?: string;
    };
  },
) {
  return await notify.promise(addDoc(fbc(firebaseDB, collection), data), {
    loading: options?.toast?.loading || "Saving Data",
    success: options?.toast?.success || "Data Saved Successfully",
    error: options?.toast?.error || "Error Saving Data",
  });
}
