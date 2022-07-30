import React, { useContext, useMemo, useState } from "react";
import {
  getFirestore,
  arrayUnion,
  getDoc,
  doc,
  updateDoc,
  DocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { FirebaseApp } from "../firebaseConfig";
import { AvailableCharacters } from "../characters";
import { GameModes, Status } from "../constants";
import { UserFirestoreData } from "../types";

interface FirestoreContextProps {
  userFirestoreData: DocumentData | undefined;
  getUserData: Function;
  updateUserData: Function;
}

const FirestoreContext = React.createContext<FirestoreContextProps>({
  userFirestoreData: undefined,
  getUserData: () => {},
  updateUserData: () => {},
});

export function useFirestore() {
  return useContext(FirestoreContext);
}

interface FirestoreProviderProps {
  children: JSX.Element | JSX.Element[];
}

export interface GameSettings {
  characters: AvailableCharacters;
  gameMode: GameModes;
  status: Status;
  points: number;
  duration: number;
}

interface FirebaseContextValues {
  userFirestoreData: DocumentData | undefined;
  getUserData: (userId: string) => void;
  updateUserData: ({
    userUid,
    characters,
    gameMode,
    status,
    points,
    duration,
  }: GameSettings & { userUid: string }) => void;
}

//ToDo: define correct types
export function FirestoreProvider({ children }: FirestoreProviderProps) {
  const firestoreDatabase = getFirestore(FirebaseApp);
  const [userFirestoreData, setUserFirestoreData] = useState<
    UserFirestoreData | undefined
  >(undefined);
  // const [characters, setCharacters] = useState(false);

  const getUserData = (userUid: string): void => {
    getDoc(doc(firestoreDatabase, "userData", userUid))
      .then((doc: DocumentSnapshot) => {
        return setUserFirestoreData(
          // ToDo: see if you can remove Object.assign
          Object.assign({}, doc.data()) as UserFirestoreData
        );
      })
      .catch((error: Error) =>
        console.log(`Cannot get user data, error message: ${error.message}`)
      );
  };

  const updateUserData = ({
    userUid,
    characters,
    gameMode,
    status,
    points,
    duration,
  }: GameSettings & { userUid: string }): void => {
    const data: { datePlayed: number; settings: GameSettings } = {
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

  const firebaseContextValues = useMemo(
    (): FirebaseContextValues => ({
      // characters,
      userFirestoreData,
      getUserData,
      updateUserData,
    }),
    [userFirestoreData]
  );

  return (
    <FirestoreContext.Provider value={firebaseContextValues}>
      {children}
    </FirestoreContext.Provider>
  );
}
