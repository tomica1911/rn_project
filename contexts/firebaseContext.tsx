import React, {useContext, useMemo, useState} from "react";
import {
  getFirestore,
  arrayUnion,
  getDoc,
  doc,
  updateDoc,
  DocumentData,
} from "firebase/firestore";
import { FirebaseApp } from "../firebaseConfig";

const FirestoreContext = React.createContext({});

export function useFirestore() {
  return useContext(FirestoreContext);
}

interface FirestoreProviderProps {
  children: JSX.Element | JSX.Element[];
}

//ToDo: define correct types
export function FirestoreProvider({ children }: FirestoreProviderProps) {
  const firestoreDatabase = getFirestore(FirebaseApp);
  const [userFirestoreData, setUserFirestoreData] = useState<DocumentData | undefined>(undefined);
  // const [characters, setCharacters] = useState(false);

  // ToDo: add types
  const getUserData = (userUid: string) => {
    //ToDo. add types, see if theres more specific query
    getDoc(doc(firestoreDatabase, "userData", userUid))
      .then((doc) => {
        console.log("docData");
        console.log(doc.data());
        return setUserFirestoreData(Object.assign({}, doc.data()));
      })
      .catch((error: any) => console.log(error.message));
  };

  // ToDo: add types
  const updateUserData = ({
    userUid,
    characters,
    gameMode,
    status,
    points,
    duration,
  }: any) => {
    const data = {
      datePlayed: Date.now(),
      settings: {
        characters,
        gameMode,
        status,
        points,
        duration,
      },
    };

    updateDoc(doc(firestoreDatabase, "userData", userUid), {
      playedGames: arrayUnion(data),
    });
  };

  const values = useMemo(
    () => ({
      // characters,
      userFirestoreData,
      getUserData,
      updateUserData,
    }),
    [userFirestoreData]
  );

  return (
    <FirestoreContext.Provider value={values}>
      {children}
    </FirestoreContext.Provider>
  );
}
