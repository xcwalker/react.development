import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { firebaseDB } from "./setup";
import devConsole from "../../devConsole";
import { firestoreDatasets } from "../../../firestore";
import type { OrganizationType } from "../../../types";

export default async function FirebaseGetRealtimeOrganization(
  email: string,
  setData: React.Dispatch<React.SetStateAction<unknown>>,
) {
  const q = query(
    collection(firebaseDB, firestoreDatasets.organizations),
    where("emails", "array-contains", email),
    limit(1),
  );

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const output: { id: string; value: OrganizationType }[] = [];

      querySnapshot.forEach((doc) => {
        output.push({ id: doc.id, value: doc.data() as OrganizationType });
      });

      devConsole.log("Fetched data by date: ", output);
      setData(output[0]);
    },
    (error) => {
      devConsole.error("Error getting data by date: ", error);
    },
  );

  return unsubscribe; // Return the unsubscribe function to stop listening
}

export async function firebaseGetOrganization(email: string) {
  const q = query(
    collection(firebaseDB, firestoreDatasets.organizations),
    where("emails", "array-contains", email),
    limit(1), // Limit to one document
  );

  const querySnapshot = await getDocs(q);

  let output: OrganizationType | undefined = undefined;
  let id: string | undefined = undefined;
  querySnapshot.forEach((doc) => {
    output = doc.data() as OrganizationType;
    id = doc.id;
  });

  devConsole.log("Current data: ", output);

  return id ? { id, value: output } : undefined;
}
