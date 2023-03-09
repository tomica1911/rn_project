import React, { useContext, useMemo, useState } from "react";
import {
  initializeFirestore,
  arrayUnion,
  setDoc,
  getDoc,
  doc,
  updateDoc,
  DocumentSnapshot,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
import { FirebaseApp } from "../firebaseConfig";
import { AvailableCharacters } from "../characters";
import { GameModes, Status } from "../constants";
import { UserFirestoreData } from "../types";

interface FirestoreContextProps {
  userFirestoreData: DocumentData | undefined;
  sendContactMessageSubmissionError: null | BackendError;
  setSendContactMessageSubmissionError: Function;
  getUserData: Function;
  updateUserData: Function;
  sendContactMessage: Function;
  contactFormSubmissionCompleted: boolean;
  setContactFormSubmissionCompleted: Function;
}

const FirestoreContext = React.createContext<FirestoreContextProps>({
  userFirestoreData: undefined,
  getUserData: () => {},
  updateUserData: () => {},
  sendContactMessage: () => {},
  setSendContactMessageSubmissionError: () => {},
  sendContactMessageSubmissionError: null,
  contactFormSubmissionCompleted: false,
  setContactFormSubmissionCompleted: () => {},
});

export function useFirestore() {
  return useContext(FirestoreContext);
}

interface FirestoreProviderProps {
  children: JSX.Element | JSX.Element[];
}

export interface GameSettings {
  characterSet: AvailableCharacters;
  gameMode: GameModes;
  status: Status;
  points: number;
  duration: number;
  trainingMode: boolean;
}

interface BackendError {
  [x: string]: { message: string };
}

interface SendContactMessageProps {
  message: string;
  email: string;
}

interface FirebaseContextValues {
  userFirestoreData: DocumentData | undefined;
  getUserData: (userId: string) => void;
  sendContactMessage: ({
    message,
    email,
  }: {
    message: string;
    email: string;
  }) => void;
  updateUserData: ({
    userUid,
    characterSet,
    trainingMode,
    gameMode,
    status,
    points,
    duration,
  }: GameSettings & { userUid: string }) => void;
  sendContactMessageSubmissionError: null | BackendError;
  setSendContactMessageSubmissionError: Function;
  contactFormSubmissionCompleted: boolean;
  setContactFormSubmissionCompleted: Function;
}

//ToDo: define correct types
export function FirestoreProvider({ children }: FirestoreProviderProps) {
  const firestoreDatabase = initializeFirestore(FirebaseApp, {
    experimentalForceLongPolling: true,
  });
  const [userFirestoreData, setUserFirestoreData] = useState<
    UserFirestoreData | undefined
  >(undefined);
  const [
    sendContactMessageSubmissionError,
    setSendContactMessageSubmissionError,
  ] = useState<null | BackendError>(
    null
  );
  const [contactFormSubmissionCompleted, setContactFormSubmissionCompleted] =
    useState<boolean>(false);

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
    characterSet,
    gameMode,
    status,
    trainingMode,
    points,
    duration,
  }: GameSettings & { userUid: string }) => {
    const data: { datePlayed: number; settings: GameSettings } = {
      datePlayed: Date.now(),
      settings: {
        characterSet,
        gameMode,
        status,
        points,
        trainingMode,
        duration,
      },
    };

    const document = doc(firestoreDatabase, "userData", userUid);

    updateDoc(document, {
      playedGames: arrayUnion(data),
    });
  };

  const sendContactMessage = async (data: SendContactMessageProps) => {
    const dateSent = Timestamp.now().toDate().toISOString();
    const document = doc(firestoreDatabase, "contactMessages", dateSent);

    try {
      await setDoc(document, data);
      setContactFormSubmissionCompleted(true);
    } catch (error: any) {
      setSendContactMessageSubmissionError({
        contactFormSubmissionError: {
          message: error.message,
        },
      });
    }
  };

  const firebaseContextValues = useMemo(
    (): FirebaseContextValues => ({
      contactFormSubmissionCompleted,
      setContactFormSubmissionCompleted,
      userFirestoreData,
      getUserData,
      updateUserData,
      sendContactMessage,
      sendContactMessageSubmissionError,
      setSendContactMessageSubmissionError,
    }),
    [
      userFirestoreData,
      sendContactMessageSubmissionError,
      contactFormSubmissionCompleted,
    ]
  );

  return (
    <FirestoreContext.Provider value={firebaseContextValues}>
      {children}
    </FirestoreContext.Provider>
  );
}
