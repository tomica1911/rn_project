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

export interface GameSelectionState {
  characterSet: AvailableCharacters;
  duration: GameDurations;
  selectedCharacters: CharacterObject[] | null;
  selectedGameMode: SCREENS.GAME_MODE_ONE | SCREENS.GAME_MODE_TWO;
  mixCharacters: boolean;
}

export interface StatisticalData {
  barChartData: number[];
  pieChartStatusData: {
    name: string;
    color: string;
    count: number;
    legendFontColor: string;
    legendFontSize: number;
  }[];
  pointsWon: number;
  averageGameDuration: string;
  mostPlayedDuration: number;
  individualPoints: number[];
}
