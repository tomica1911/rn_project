export enum SCREENS {
  PLAY = "Play",
  PROFILE = "Profile",
  DASHBOARD = "Dashboard",
  ACHIEVEMENTS = "Achievements",
  PREMIUM = "Premium",
  LOGIN = "Login",
  SIGNUP = "Signup",
  SETTINGS = "Settings",
  LOGOUT = "Logout",
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

export enum AchievementWorth {
  WOOD = "WOOD",
  SILVER = "SILVER",
  GOLD = "GOLD",
}

export const AchievementsData = [
  {
    id: 1,
    name: "",
    worth: AchievementWorth.WOOD,
    description: "Gain 1000 points.",
  },
  {
    id: 2,
    name: "",
    level: AchievementWorth.WOOD,
    description: "Complete 50 competitive games.",
  },
  {
    id: 3,
    name: "A star in making",
    level: AchievementWorth.SILVER,
    description: "Complete 500 competitive games.",
  },
  {
    id: 4,
    name: "Shine bright, like proxima.",
    level: AchievementWorth.WOOD,
    description: "Achieve your daily goal 5 times in a row.",
  },
  {
    id: 5,
    name: "One hundred thousand worlds away...",
    level: AchievementWorth.SILVER,
    description: "Gain 100 000 points.",
  },
  {
    id: 6,
    name: "My discipline, the paragon.",
    level: AchievementWorth.SILVER,
    description: "Achieve your daily goal 15 times in a row.",
  },
  {
    id: 7,
    name: "Remarkable, on 3 different levels!",
    level: AchievementWorth.SILVER,
    description: "Gain 50 000 points in 3 different character sets.",
  },
  {
    id: 8,
    name: "Diversity is the key",
    level: AchievementWorth.GOLD,
    description: "Gain 100 000 points in 3 different character sets.",
  },
  {
    id: 9,
    name: "My enemies are many, my equals are none...",
    level: AchievementWorth.GOLD,
    description: "Complete 1 000 competitive games.",
  },
  {
    id: 10,
    name: "Infinity, here I come!",
    level: AchievementWorth.GOLD,
    description: "Gain 1 000 000 points.",
  },
  {
    id: 11,
    name: "Discipline, I am your new master!",
    level: AchievementWorth.GOLD,
    description: "Achieve your daily goal 30 times in a row.",
  },
];

export const PointsGoalMilestones = [
  100, 300, 500, 1000, 2000, 3000, 5000, 7000, 10000,
];

export const GamesPlayedGoalMilestones = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50,
];
