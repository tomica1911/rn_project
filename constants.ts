export enum SCREENS {
  PLAY = "Play",
  PROFILE = "Profile",
  DASHBOARD = "Dashboard",
  ACHIEVEMENTS = "Achievements",
  PREMIUM = "Premium",
  LOGIN = "Login",
  LOGOUT = "Logout",
  SIGNUP = "Signup",
  SETTINGS = "Settings",
}

export enum GameModes {
  ONE = "1",
  TWO = "2",
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

export enum Status {
  WIN = "win",
  INCORRECT = "incorrect",
  TIMEOUT = "timeout",
}

// this array should not be smaller as it already is because it would cause application to crash
export const TipsOfTheDay = [
  "Learning is a treasure that will follow its owner everywhere.",
  "Fortune favors the disciplined.",
  "Reward yourself.",
  "Discipline is the bridge between goals and accomplishment.",
  "Setting goals is the first step in turning the invisible into the visible.",
  "Without hard work, nothing grows but weeds.",
  "The limits of my language mean the limits of my world.",
  "Change your language and you change your thoughts.",
  "Stay focused.",
  "Tell me and I forget, teach me and I may remember, involve me and I learn.",
];

export const AchievementsData = [
  { level: 1, description: "Complete 100 competitive games" },
  {
    level: 1,
    description: "Gain 1000 points",
  },
  { level: 2, description: "Complete 500 competitive games" },
  { level: 2, description: "Gain 25000 points" },
  { level: 3, description: "Complete 1000 competitive games" },
  { level: 2, description: "Gain 75000 points" },
];

export const PointsGoalMilestones = [
  100, 300, 500, 1000, 2000, 3000, 5000, 7000, 10000,
];

export const GamesPlayedGoalMilestones = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50,
];
