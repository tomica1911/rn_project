import {GameSettings} from "./contexts/firebaseContext";

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
    GOLD = "gold"
}

export interface Achievement {
    id: number,
    worth: AchievementWorth,
    description: string,
    name: string,
    achieved: boolean
}
