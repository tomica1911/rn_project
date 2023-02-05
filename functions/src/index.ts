/* eslint-disable */
import * as functions from "firebase-functions";
import { FirebaseApp } from "../FirebaseApp";
import {
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { GameData, UserFirestoreData } from "../types";
import { GameModes, Status } from "../constants";

const firestoreDatabase = getFirestore(FirebaseApp);

const getUserData = async (userUid: string): Promise<UserFirestoreData> => {
  try {
    const userDataDoc = await getDoc(
      doc(firestoreDatabase, "userData", userUid)
    );
    const userData = userDataDoc.data() as UserFirestoreData;
    return userData;
  } catch (error) {
    console.error(`Error fetching user data: ${error}`);
    throw error;
  }
};

const getMostPlayedDuration = (userData: UserFirestoreData): number => {
  const playedGamesDurations = userData.playedGames.map(
    (playedGame) => playedGame.settings.duration
  );
  const durationCounts: Record<string, number> = {};

  for (const element of playedGamesDurations) {
    durationCounts[element] = (durationCounts[element] || 0) + 1;
  }

  let mostPlayed = 0;
  let duration = 0;
  for (const [durationKey, timesPlayed] of Object.entries(durationCounts)) {
    if (timesPlayed > mostPlayed) {
      mostPlayed = timesPlayed;
      duration = parseInt(durationKey, 10);
    }
  }

  return duration;
};

const getAverageGameDuration = (userData: UserFirestoreData): number => {
  const playedGamesDurations = userData.playedGames.map(
    (playedGame) => playedGame.settings.duration
  );

  const averageGameDuration =
    playedGamesDurations.reduce((prev, curr) => prev + curr, 0) /
    playedGamesDurations.length;

  return averageGameDuration;
};

const getTotalPointsWon = (userData: UserFirestoreData): number => {
  const totalPoints = userData.playedGames.reduce(
      (prev, { settings: { points } }) => prev + points,
      0
  );

  return totalPoints;
};

const getIndividualPoints = (userData: UserFirestoreData): number[] =>
    userData.playedGames.map(({ settings: { points } }) => points);

const pieChartStatusColors: Record<Status, string> = {
  win: "#0F2F99",
  timeout: "#E6D600",
  incorrect: "#850F99",
};

const getPieChartStatusData = (userData: UserFirestoreData) => {
  const statusCount = Object.values(Status)
    .map((status: Status) => {
      return {
        [status]: userData.playedGames.filter(
          (gamePlayed: GameData) => gamePlayed.settings.status == status
        ).length,
      };
    })
    .reduce(
      (prevObject, currObject) => Object.assign(prevObject, currObject),
      {}
    );

  const pieChartData = [];
  for (const [status, count] of Object.entries(statusCount)) {
    pieChartData.push({
      name: status,
      color: pieChartStatusColors[status as Status],
      count,
      legendFontColor: pieChartStatusColors[status as Status],
      legendFontSize: 15,
    });
  }

  return pieChartData;
};

//played games by game mode
const getBarChartData = (userData: UserFirestoreData) => {
  return Object.values(GameModes).map((gameMode: string) => {
    return userData.playedGames.reduce(
      (prevValue: any, currValue: any) =>
        currValue.settings.gameMode == gameMode ? prevValue + 1 : prevValue,
      0
    );
  });
};

export const getStatisticalData = functions.https.onRequest(
  async (request, response) => {
    const id = request.query.id as string;
    const userData = await getUserData(id);

    if (userData) {
      const barChartData = getBarChartData(userData);
      const pieChartStatusData = getPieChartStatusData(userData);
      const pointsWon = getTotalPointsWon(userData);
      const averageGameDuration = getAverageGameDuration(userData);
      const mostPlayedDuration = getMostPlayedDuration(userData);
      const individualPoints = getIndividualPoints(userData);
      response.send({
        barChartData,
        pieChartStatusData,
        pointsWon,
        averageGameDuration,
        mostPlayedDuration,
        individualPoints,
      });
    }

    response.send(undefined);
  }
);
