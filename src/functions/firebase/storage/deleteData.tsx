import { doc, deleteDoc } from "firebase/firestore";
import { firebaseDB } from "./setup";
import { notify } from "../../notify";

export default async function firebaseDeleteData(
  pathID: string,
  docID: string,
) {
  return await notify.promise(deleteDoc(doc(firebaseDB, pathID, docID)),
{
  loading: "Deleting...",
  success: "Deleted successfully",
  error: "Error deleting",
});
}
