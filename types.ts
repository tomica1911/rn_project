import { GameSettings } from "./contexts/firebaseContext";

export interface GameData {
  datePlayed: Date;
  settings: GameSettings;
}

export interface UserFirestoreData {
  playedGames: GameData[];
}