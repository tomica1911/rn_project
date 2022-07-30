import { GameSettings } from "./contexts/firebaseContext";
import { SCREENS } from "./constants";

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
  [SCREENS.ACHIEVEMENTS]: undefined;
  [SCREENS.DASHBOARD]: undefined;
  [SCREENS.PROFILE]: undefined;
  [SCREENS.LOGOUT]: undefined;
  [SCREENS.SIGNUP]: undefined;
  [SCREENS.LOGIN]: undefined;
  [SCREENS.PREMIUM]: undefined;
  [SCREENS.SETTINGS]: undefined;
};
