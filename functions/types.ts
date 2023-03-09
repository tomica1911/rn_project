/* eslint-disable */
import { AvailableCharacters, GameModes, Status } from "./constants";

export interface CharacterObject {
  id: number;
  letter: string;
  equivalents: string[];
}

export interface GameSettings {
  characterSet: AvailableCharacters;
  gameMode: GameModes;
  status: Status;
  points: number;
  duration: number;
}

export interface GameData {
  datePlayed: Date;
  settings: GameSettings;
}

export interface UserFirestoreData {
  playedGames: GameData[];
}

export interface GameData {
  datePlayed: Date;
  settings: GameSettings;
}

export interface UserFirestoreData {
  playedGames: GameData[];
}
