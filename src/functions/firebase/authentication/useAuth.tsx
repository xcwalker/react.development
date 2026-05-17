import { useEffect } from "react";
import { firebaseAuth } from "./setup";
import { onAuthStateChanged } from "firebase/auth";
import { useAtom } from "jotai";
import { authAtom } from "../../../atoms";

export function useAuth() {
  const [currentUser, setCurrentUser] = useAtom(authAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return currentUser;
}
