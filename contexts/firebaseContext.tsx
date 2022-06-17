import React, {useContext, useState, useEffect} from "react"
import {dbFirestoreFirebase, increment, addToArray} from "../firebase"

const FirestoreContext = React.createContext({})

export function useFirestore() {
    return useContext(FirestoreContext)
}

interface FirestoreProviderProps {
    children: JSX.Element | JSX.Element[]
}

//ToDo: define correct types
export function FirestoreProvider({children}: FirestoreProviderProps) {
    const [characters, setCharacters] = useState(false);
    const [userData, setUserData] = useState();
    const userDataCollection = dbFirestoreFirebase.collection("userData");

    useEffect(() => {
        let isMounted = true;
        dbFirestoreFirebase.collection("charData")
            .get()
            .then((querySnapshot: any) => {
                const data = querySnapshot.docs.map((doc: any) => doc.data());
                if (isMounted) {
                    // @ts-ignore
                    setCharacters(data[0]);
                }
            });

        return () => {
            isMounted = false
        }
    }, []);

    const createDbEntryForUser = (displayName: string) => {
        userDataCollection.doc(displayName).set({
            dateCreated: new Date(),
            displayName: displayName,
            gameModesPlayed: {
                gameModeOne: 0,
                gameModeTwo: 0,
            },
            wonGames: 0,
            lostGames: 0,
            playedGames: 0,
            mostWonPoints: 0,
            wonPoints: 0,
            gameDurations: []
        })
    }

    const fetchUserData = async (displayName: string) => {
        const dataUser = await userDataCollection.doc(displayName).get();
        if(dataUser){
            // @ts-ignore
            setUserData(dataUser.data());
        }
    }

    const getUserData = async () => {
        if(userData) return userData;
    }

    const updateUserDisplayNameGames = async (displayName: string) => {
        userDataCollection.doc(displayName).update({
            displayName: displayName
        })
    }

    const updateUserGameModesPlayed = (displayName: string, gameModeOneNumber: number, gameModeTwoNumber: number) => {
        userDataCollection.doc(displayName).update({
            gameModesPlayed: {
                gameModeOne: gameModeOneNumber,
                gameModeTwo: gameModeTwoNumber
            }
        })
    }

    const updateUserWonGames = (displayName: string) => {
        userDataCollection.doc(displayName).update({
            wonGames: increment
        })
    }

    const updateGameDurations = (displayName: string, gameDuration: number) => {
        userDataCollection.doc(displayName).update({
            gameDurations: addToArray(gameDuration)
        })
    }

    const updateUserLostGames = (displayName: string) => {
        userDataCollection.doc(displayName).update({
            lostGames: increment
        })
    }

    const updateUserPlayedGames = (displayName: string) => {
        userDataCollection.doc(displayName).update({
            playedGames: increment
        })
    }

    const updateUserWonPoints = (displayName: string) => {
        userDataCollection.doc(displayName).update({
            playedGames: increment
        })
    }

    const value = {
        characters,
        createDbEntryForUser,
        updateUserWonGames,
        updateUserDisplayNameGames,
        updateUserWonPoints,
        updateUserLostGames,
        updateUserPlayedGames,
        updateUserGameModesPlayed,
        updateGameDurations,
        fetchUserData,
        getUserData,
        userData
    }

    return (
        <FirestoreContext.Provider value={value}>
            {children}
        </FirestoreContext.Provider>
    )
}