export interface CharacterObject {
  letter: string;
  equivalents: string[];
}

export enum AvailableCharacters {
  HIRAGANA = "Hiragana",
  CYRILLIC_RU = "Cyrillic(RU)",
}

export const characters: { setName: AvailableCharacters; letters: CharacterObject[] }[] = [
  //ToDo: all names should be lower-case
  {
    setName: AvailableCharacters.HIRAGANA,
    letters: [
      {
        letter: "あ",
        equivalents: ["a"],
      },
      {
        letter: "い",
        equivalents: ["i"],
      },
      {
        letter: "う",
        equivalents: ["u"],
      },
      {
        letter: "え",
        equivalents: ["e"],
      },
      {
        letter: "お",
        equivalents: ["o"],
      },
      {
        letter: "か",
        equivalents: ["ka"],
      },
      {
        letter: "が",
        equivalents: ["ga"],
      },
      {
        letter: "き",
        equivalents: ["ki"],
      },
      {
        letter: "ぎ",
        equivalents: ["gi"],
      },
      {
        letter: "く",
        equivalents: ["ku"],
      },
      {
        letter: "ぐ",
        equivalents: ["gu"],
      },
      {
        letter: "け",
        equivalents: ["ke"],
      },
      {
        letter: "げ",
        equivalents: ["ge"],
      },
      {
        letter: "こ",
        equivalents: ["ko"],
      },
      {
        letter: "ご",
        equivalents: ["go"],
      },
      {
        letter: "さ",
        equivalents: ["sa"],
      },
      {
        letter: "ざ",
        equivalents: ["za"],
      },
      {
        letter: "し",
        equivalents: ["si"],
      },
      {
        letter: "じ",
        equivalents: ["zi"],
      },
      {
        letter: "す",
        equivalents: ["su"],
      },
      {
        letter: "ず",
        equivalents: ["zu"],
      },
      {
        letter: "せ",
        equivalents: ["se"],
      },
      {
        letter: "ぜ",
        equivalents: ["ze"],
      },
      {
        letter: "そ",
        equivalents: ["so"],
      },
      {
        letter: "ぞ",
        equivalents: ["zo"],
      },
      {
        letter: "た",
        equivalents: ["ta"],
      },
      {
        letter: "だ",
        equivalents: ["da"],
      },
      {
        letter: "ち",
        equivalents: ["ti"],
      },
      {
        letter: "ぢ",
        equivalents: ["di"],
      },
      {
        letter: "つ",
        equivalents: ["tu"],
      },
      {
        letter: "づ",
        equivalents: ["du"],
      },
      {
        letter: "て",
        equivalents: ["te"],
      },
      {
        letter: "で",
        equivalents: ["de"],
      },
      {
        letter: "と",
        equivalents: ["to"],
      },
      {
        letter: "ど",
        equivalents: ["do"],
      },
      {
        letter: "な",
        equivalents: ["na"],
      },
      {
        letter: "に",
        equivalents: ["ni"],
      },
      {
        letter: "ぬ",
        equivalents: ["nu"],
      },
      {
        letter: "ね",
        equivalents: ["ne"],
      },
      {
        letter: "の",
        equivalents: ["no"],
      },
      {
        letter: "は",
        equivalents: ["ha"],
      },
      {
        letter: "ば",
        equivalents: ["ba"],
      },
      {
        letter: "ぱ",
        equivalents: ["pa"],
      },
      {
        letter: "ひ",
        equivalents: ["hi"],
      },
      {
        letter: "び",
        equivalents: ["bi"],
      },
      {
        letter: "ぴ",
        equivalents: ["pi"],
      },
      {
        letter: "ふ",
        equivalents: ["hu"],
      },
      {
        letter: "ぶ",
        equivalents: ["bu"],
      },
      {
        letter: "ぷ",
        equivalents: ["pu"],
      },
      {
        letter: "へ",
        equivalents: ["he"],
      },
      {
        letter: "べ",
        equivalents: ["be"],
      },
      {
        letter: "ぺ",
        equivalents: ["pe"],
      },
      {
        letter: "ほ",
        equivalents: ["ho"],
      },
      {
        letter: "ぼ",
        equivalents: ["bo"],
      },
      {
        letter: "ぽ",
        equivalents: ["po"],
      },
      {
        letter: "ま",
        equivalents: ["ma"],
      },
      {
        letter: "み",
        equivalents: ["mi"],
      },
      {
        letter: "む",
        equivalents: ["mu"],
      },
      {
        letter: "め",
        equivalents: ["me"],
      },
      {
        letter: "も",
        equivalents: ["mo"],
      },
      {
        letter: "や",
        equivalents: ["ya"],
      },
      {
        letter: "ゆ",
        equivalents: ["yu"],
      },
      {
        letter: "よ",
        equivalents: ["yo"],
      },
      {
        letter: "ら",
        equivalents: ["ra"],
      },
      {
        letter: "り",
        equivalents: ["ri"],
      },
      {
        letter: "る",
        equivalents: ["ru"],
      },
      {
        letter: "れ",
        equivalents: ["re"],
      },
      {
        letter: "ろ",
        equivalents: ["ro"],
      },
      {
        letter: "わ",
        equivalents: ["wa"],
      },
      {
        letter: "ゐ",
        equivalents: ["wi"],
      },
      {
        letter: "ゑ",
        equivalents: ["we"],
      },
      {
        letter: "を",
        equivalents: ["wo"],
      },
      {
        letter: "ん",
        equivalents: ["n"],
      },
      {
        letter: "ゔ",
        equivalents: ["vu"],
      },
    ],
  },
  {
    setName: AvailableCharacters.CYRILLIC_RU,
    letters: [
      {
        letter: "А а",
        equivalents: ["a"],
      },
      {
        letter: "Б б",
        equivalents: ["b"],
      },
      {
        letter: "В в",
        equivalents: ["v"],
      },
      {
        letter: "Г г",
        equivalents: ["g"],
      },
      {
        letter: "Д д",
        equivalents: ["d"],
      },
      {
        letter: "Е е",
        equivalents: ["e"],
      },
      {
        letter: "Ё ё",
        equivalents: ["yo", "jo", "ё"],
      },
      {
        letter: "Ж ж",
        equivalents: ["zh", "ž"],
      },
      {
        letter: "З з",
        equivalents: ["z"],
      },
      {
        letter: "И и",
        equivalents: ["i"],
      },
      {
        letter: "Й й",
        equivalents: ["y", "i", "j"],
      },
      {
        letter: "К к",
        equivalents: ["k"],
      },
      {
        letter: "Л л",
        equivalents: ["l"],
      },
      {
        letter: "М м",
        equivalents: ["m"],
      },
      {
        letter: "Н н",
        equivalents: ["n"],
      },
      {
        letter: "О о",
        equivalents: ["o"],
      },
      {
        letter: "П",
        equivalents: ["p"],
      },
      {
        letter: "П п",
        equivalents: ["r"],
      },
      {
        letter: "Р р",
        equivalents: ["s"],
      },
      {
        letter: "Т т",
        equivalents: ["t"],
      },
      {
        letter: "У у",
        equivalents: ["u"],
      },
      {
        letter: "Ф ф",
        equivalents: ["u"],
      },
      {
        letter: "Х х",
        equivalents: ["kh", "h"],
      },
      {
        letter: "Ц ц",
        equivalents: ["ts"],
      },
      {
        letter: "Ч ч",
        equivalents: ["ch", "č"],
      },
      {
        letter: "Ш ш",
        equivalents: ["sh", "š"],
      },
      {
        letter: "Щ щ",
        equivalents: ["shch", "sch", "šč"],
      },
      {
        letter: "Ы ы",
        equivalents: ["y"],
      },
      {
        letter: "Э э",
        equivalents: ["e", "è"],
      },
      {
        letter: "Ю ю",
        equivalents: ["yu", "ju"],
      },
      {
        letter: "Я я",
        equivalents: ["ya", "ja"],
      },
    ],
  },
];
