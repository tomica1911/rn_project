import { GameSettings } from "./contexts/firebaseContext";
import { SCREENS } from "./constants";
import { AvailableCharacters, CharacterObject } from "./characters";

export interface GameData {
  datePlayed: Date;
  settings: GameSettings;
}

export interface UserFirestoreData {
  playedGames: GameData[];
}

export enum AchievementWorth {
  BRONZE = "bronze",
  SILVER = "silver",
  GOLD = "gold",
}

export enum GameDurations {
  D2 = 2,
  D4 = 4,
  D6 = 6,
  D8 = 8,
  D10 = 10,
  D12 = 12,
  D14 = 14,
  D16 = 16,
  D18 = 18,
  D20 = 20,
  D22 = 22,
  D24 = 24,
  D26 = 26,
  D28 = 28,
  D30 = 30,
}

export interface Achievement {
  id: number;
  worth: AchievementWorth;
  description: string;
  name: string;
  achieved: boolean;
}

export type RootStackParamList = {
  [SCREENS.MAIN]: undefined;
  [SCREENS.PLAY]: undefined;
  // [SCREENS.ACHIEVEMENTS]: undefined;
  // [SCREENS.DASHBOARD]: undefined;
  // [SCREENS.PROFILE]: undefined;
  [SCREENS.LOGOUT]: undefined;
  [SCREENS.SIGNUP]: undefined;
  [SCREENS.LOGIN]: undefined;
  // [SCREENS.PREMIUM]: undefined;
  // [SCREENS.SETTINGS]: undefined;
};

export interface GameSelectionState {
  characters: AvailableCharacters;
  duration: GameDurations;
  selectedCharacters: CharacterObject[];
  selectedGameMode: SCREENS.GAME_MODE_ONE | SCREENS.GAME_MODE_TWO;
}
