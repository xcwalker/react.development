import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firebaseDB } from "./setup";
import devConsole from "../../devConsole";

export default async function FirebaseGetRealtimeDataSet(
  firebaseCollection: string,
  setData: React.Dispatch<React.SetStateAction<unknown>>,
  options?: {
    idReplace?: (id: string) => string;
    organizationID?: string;
  }
) {
  const q = query(
    collection(firebaseDB, firebaseCollection),
    ...(options?.organizationID ? [where("metaData.organizationID", "==", options.organizationID)] : [])
  );

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const output: { id: string; value: unknown }[] = [];

      querySnapshot.forEach((doc) => {
        const id = options?.idReplace ? options.idReplace(doc.id) : doc.id;
        output.push({ id, value: doc.data() });
      });

      devConsole.log(`Fetched "${firebaseCollection}" data by date: `, output);
      setData(output);
    },
    (error) => {
      devConsole.error(`Error getting "${firebaseCollection}" data by date: `, error);
    },
  );

  return unsubscribe; // Return the unsubscribe function to stop listening
}
