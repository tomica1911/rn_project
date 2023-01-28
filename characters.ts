export interface CharacterObject {
  id: number;
  letter: string;
  equivalents: string[];
}

export enum AvailableCharacters {
  HIRAGANA = "Hiragana",
  CYRILLIC_RU = "Cyrillic(RU)",
}

export const characters: {
  setName: AvailableCharacters;
  letters: CharacterObject[];
}[] = [
  //ToDo: all names should be lower-case
  {
    setName: AvailableCharacters.HIRAGANA,
    letters: [
      {
        id: 1,
        letter: "あ",
        equivalents: ["a"],
      },
      {
        id: 2,
        letter: "い",
        equivalents: ["i"],
      },
      {
        id: 3,
        letter: "う",
        equivalents: ["u"],
      },
      {
        id: 4,
        letter: "え",
        equivalents: ["e"],
      },
      {
        id: 5,
        letter: "お",
        equivalents: ["o"],
      },
      {
        id: 6,
        letter: "か",
        equivalents: ["ka"],
      },
      {
        id: 7,
        letter: "が",
        equivalents: ["ga"],
      },
      {
        id: 8,
        letter: "き",
        equivalents: ["ki"],
      },
      {
        id: 9,
        letter: "ぎ",
        equivalents: ["gi"],
      },
      {
        id: 10,
        letter: "く",
        equivalents: ["ku"],
      },
      {
        id: 11,
        letter: "ぐ",
        equivalents: ["gu"],
      },
      {
        id: 12,
        letter: "け",
        equivalents: ["ke"],
      },
      {
        id: 13,
        letter: "げ",
        equivalents: ["ge"],
      },
      {
        id: 14,
        letter: "こ",
        equivalents: ["ko"],
      },
      {
        id: 15,
        letter: "ご",
        equivalents: ["go"],
      },
      {
        id: 16,
        letter: "さ",
        equivalents: ["sa"],
      },
      {
        id: 17,
        letter: "ざ",
        equivalents: ["za"],
      },
      {
        id: 18,
        letter: "し",
        equivalents: ["si"],
      },
      {
        id: 19,
        letter: "じ",
        equivalents: ["zi"],
      },
      {
        id: 20,
        letter: "す",
        equivalents: ["su"],
      },
      {
        id: 21,
        letter: "ず",
        equivalents: ["zu"],
      },
      {
        id: 22,
        letter: "せ",
        equivalents: ["se"],
      },
      {
        id: 23,
        letter: "ぜ",
        equivalents: ["ze"],
      },
      {
        id: 24,
        letter: "そ",
        equivalents: ["so"],
      },
      {
        id: 25,
        letter: "ぞ",
        equivalents: ["zo"],
      },
      {
        id: 26,
        letter: "た",
        equivalents: ["ta"],
      },
      {
        id: 27,
        letter: "だ",
        equivalents: ["da"],
      },
      {
        id: 28,
        letter: "ち",
        equivalents: ["ti"],
      },
      {
        id: 29,
        letter: "ぢ",
        equivalents: ["di"],
      },
      {
        id: 30,
        letter: "つ",
        equivalents: ["tu"],
      },
      {
        id: 31,
        letter: "づ",
        equivalents: ["du"],
      },
      {
        id: 32,
        letter: "て",
        equivalents: ["te"],
      },
      {
        id: 33,
        letter: "で",
        equivalents: ["de"],
      },
      {
        id: 34,
        letter: "と",
        equivalents: ["to"],
      },
      {
        id: 35,
        letter: "ど",
        equivalents: ["do"],
      },
      {
        id: 36,
        letter: "な",
        equivalents: ["na"],
      },
      {
        id: 37,
        letter: "に",
        equivalents: ["ni"],
      },
      {
        id: 38,
        letter: "ぬ",
        equivalents: ["nu"],
      },
      {
        id: 39,
        letter: "ね",
        equivalents: ["ne"],
      },
      {
        id: 40,
        letter: "の",
        equivalents: ["no"],
      },
      {
        id: 41,
        letter: "は",
        equivalents: ["ha"],
      },
      {
        id: 42,
        letter: "ば",
        equivalents: ["ba"],
      },
      {
        id: 43,
        letter: "ぱ",
        equivalents: ["pa"],
      },
      {
        id: 44,
        letter: "ひ",
        equivalents: ["hi"],
      },
      {
        id: 45,
        letter: "び",
        equivalents: ["bi"],
      },
      {
        id: 46,
        letter: "ぴ",
        equivalents: ["pi"],
      },
      {
        id: 47,
        letter: "ふ",
        equivalents: ["hu"],
      },
      {
        id: 48,
        letter: "ぶ",
        equivalents: ["bu"],
      },
      {
        id: 49,
        letter: "ぷ",
        equivalents: ["pu"],
      },
      {
        id: 50,
        letter: "へ",
        equivalents: ["he"],
      },
      {
        id: 51,
        letter: "べ",
        equivalents: ["be"],
      },
      {
        id: 52,
        letter: "ぺ",
        equivalents: ["pe"],
      },
      {
        id: 53,
        letter: "ほ",
        equivalents: ["ho"],
      },
      {
        id: 54,
        letter: "ぼ",
        equivalents: ["bo"],
      },
      {
        id: 54,
        letter: "ぽ",
        equivalents: ["po"],
      },
      {
        id: 55,
        letter: "ま",
        equivalents: ["ma"],
      },
      {
        id: 56,
        letter: "み",
        equivalents: ["mi"],
      },
      {
        id: 57,
        letter: "む",
        equivalents: ["mu"],
      },
      {
        id: 58,
        letter: "め",
        equivalents: ["me"],
      },
      {
        id: 59,
        letter: "も",
        equivalents: ["mo"],
      },
      {
        id: 60,
        letter: "や",
        equivalents: ["ya"],
      },
      {
        id: 61,
        letter: "ゆ",
        equivalents: ["yu"],
      },
      {
        id: 62,
        letter: "よ",
        equivalents: ["yo"],
      },
      {
        id: 63,
        letter: "ら",
        equivalents: ["ra"],
      },
      {
        id: 64,
        letter: "り",
        equivalents: ["ri"],
      },
      {
        id: 65,
        letter: "る",
        equivalents: ["ru"],
      },
      {
        id: 66,
        letter: "れ",
        equivalents: ["re"],
      },
      {
        id: 67,
        letter: "ろ",
        equivalents: ["ro"],
      },
      {
        id: 68,
        letter: "わ",
        equivalents: ["wa"],
      },
      {
        id: 69,
        letter: "ゐ",
        equivalents: ["wi"],
      },
      {
        id: 70,
        letter: "ゑ",
        equivalents: ["we"],
      },
      {
        id: 72,
        letter: "を",
        equivalents: ["wo"],
      },
      {
        id: 73,
        letter: "ん",
        equivalents: ["n"],
      },
      {
        id: 74,
        letter: "ゔ",
        equivalents: ["vu"],
      },
    ],
  },
  {
    setName: AvailableCharacters.CYRILLIC_RU,
    letters: [
      {
        id: 75,
        letter: "А а",
        equivalents: ["a"],
      },
      {
        id: 76,
        letter: "Б б",
        equivalents: ["b"],
      },
      {
        id: 77,
        letter: "В в",
        equivalents: ["v"],
      },
      {
        id: 78,
        letter: "Г г",
        equivalents: ["g"],
      },
      {
        id: 79,
        letter: "Д д",
        equivalents: ["d"],
      },
      {
        id: 80,
        letter: "Е е",
        equivalents: ["e"],
      },
      {
        id: 81,
        letter: "Ё ё",
        equivalents: ["yo", "jo", "ё"],
      },
      {
        id: 82,
        letter: "Ж ж",
        equivalents: ["zh", "ž"],
      },
      {
        id: 83,
        letter: "З з",
        equivalents: ["z"],
      },
      {
        id: 84,
        letter: "И и",
        equivalents: ["i"],
      },
      {
        id: 85,
        letter: "Й й",
        equivalents: ["y", "i", "j"],
      },
      {
        id: 86,
        letter: "К к",
        equivalents: ["k"],
      },
      {
        id: 87,
        letter: "Л л",
        equivalents: ["l"],
      },
      {
        id: 88,
        letter: "М м",
        equivalents: ["m"],
      },
      {
        id: 89,
        letter: "Н н",
        equivalents: ["n"],
      },
      {
        id: 90,
        letter: "О о",
        equivalents: ["o"],
      },
      {
        id: 91,
        letter: "П",
        equivalents: ["p"],
      },
      {
        id: 92,
        letter: "П п",
        equivalents: ["r"],
      },
      {
        id: 93,
        letter: "Р р",
        equivalents: ["s"],
      },
      {
        id: 93,
        letter: "Т т",
        equivalents: ["t"],
      },
      {
        id: 94,
        letter: "У у",
        equivalents: ["u"],
      },
      {
        id: 95,
        letter: "Ф ф",
        equivalents: ["u"],
      },
      {
        id: 96,
        letter: "Х х",
        equivalents: ["kh", "h"],
      },
      {
        id: 97,
        letter: "Ц ц",
        equivalents: ["ts"],
      },
      {
        id: 98,
        letter: "Ч ч",
        equivalents: ["ch", "č"],
      },
      {
        id: 99,
        letter: "Ш ш",
        equivalents: ["sh", "š"],
      },
      {
        id: 100,
        letter: "Щ щ",
        equivalents: ["shch", "sch", "šč"],
      },
      {
        id: 101,
        letter: "Ы ы",
        equivalents: ["y"],
      },
      {
        id: 102,
        letter: "Э э",
        equivalents: ["e", "è"],
      },
      {
        id: 103,
        letter: "Ю ю",
        equivalents: ["yu", "ju"],
      },
      {
        id: 104,
        letter: "Я я",
        equivalents: ["ya", "ja"],
      },
    ],
  },
];
