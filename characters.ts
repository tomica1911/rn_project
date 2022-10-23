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
        equivalents: ["A"],
      },
      {
        letter: "い",
        equivalents: ["I"],
      },
      {
        letter: "う",
        equivalents: ["U"],
      },
      {
        letter: "え",
        equivalents: ["E"],
      },
      {
        letter: "お",
        equivalents: ["O"],
      },
      {
        letter: "か",
        equivalents: ["KA"],
      },
      {
        letter: "が",
        equivalents: ["GA"],
      },
      {
        letter: "き",
        equivalents: ["KI"],
      },
      {
        letter: "ぎ",
        equivalents: ["GI"],
      },
      {
        letter: "く",
        equivalents: ["KU"],
      },
      {
        letter: "ぐ",
        equivalents: ["GU"],
      },
      {
        letter: "け",
        equivalents: ["KE"],
      },
      {
        letter: "げ",
        equivalents: ["GE"],
      },
      {
        letter: "こ",
        equivalents: ["KO"],
      },
      {
        letter: "ご",
        equivalents: ["GO"],
      },
      {
        letter: "さ",
        equivalents: ["SA"],
      },
      {
        letter: "ざ",
        equivalents: ["ZA"],
      },
      {
        letter: "し",
        equivalents: ["SI"],
      },
      {
        letter: "じ",
        equivalents: ["ZI"],
      },
      {
        letter: "す",
        equivalents: ["SU"],
      },
      {
        letter: "ず",
        equivalents: ["ZU"],
      },
      {
        letter: "せ",
        equivalents: ["SE"],
      },
      {
        letter: "ぜ",
        equivalents: ["ZE"],
      },
      {
        letter: "そ",
        equivalents: ["SO"],
      },
      {
        letter: "ぞ",
        equivalents: ["ZO"],
      },
      {
        letter: "た",
        equivalents: ["TA"],
      },
      {
        letter: "だ",
        equivalents: ["DA"],
      },
      {
        letter: "ち",
        equivalents: ["TI"],
      },
      {
        letter: "ぢ",
        equivalents: ["DI"],
      },
      {
        letter: "つ",
        equivalents: ["TU"],
      },
      {
        letter: "づ",
        equivalents: ["DU"],
      },
      {
        letter: "て",
        equivalents: ["TE"],
      },
      {
        letter: "で",
        equivalents: ["DE"],
      },
      {
        letter: "と",
        equivalents: ["TO"],
      },
      {
        letter: "ど",
        equivalents: ["DO"],
      },
      {
        letter: "な",
        equivalents: ["NA"],
      },
      {
        letter: "に",
        equivalents: ["NI"],
      },
      {
        letter: "ぬ",
        equivalents: ["NU"],
      },
      {
        letter: "ね",
        equivalents: ["NE"],
      },
      {
        letter: "の",
        equivalents: ["NO"],
      },
      {
        letter: "は",
        equivalents: ["HA"],
      },
      {
        letter: "ば",
        equivalents: ["BA"],
      },
      {
        letter: "ぱ",
        equivalents: ["PA"],
      },
      {
        letter: "ひ",
        equivalents: ["HI"],
      },
      {
        letter: "び",
        equivalents: ["BI"],
      },
      {
        letter: "ぴ",
        equivalents: ["PI"],
      },
      {
        letter: "ふ",
        equivalents: ["HU"],
      },
      {
        letter: "ぶ",
        equivalents: ["BU"],
      },
      {
        letter: "ぷ",
        equivalents: ["PU"],
      },
      {
        letter: "へ",
        equivalents: ["HE"],
      },
      {
        letter: "べ",
        equivalents: ["BE"],
      },
      {
        letter: "ぺ",
        equivalents: ["PE"],
      },
      {
        letter: "ほ",
        equivalents: ["HO"],
      },
      {
        letter: "ぼ",
        equivalents: ["BO"],
      },
      {
        letter: "ぽ",
        equivalents: ["PO"],
      },
      {
        letter: "ま",
        equivalents: ["MA"],
      },
      {
        letter: "み",
        equivalents: ["MI"],
      },
      {
        letter: "む",
        equivalents: ["MU"],
      },
      {
        letter: "め",
        equivalents: ["ME"],
      },
      {
        letter: "も",
        equivalents: ["MO"],
      },
      {
        letter: "や",
        equivalents: ["YA"],
      },
      {
        letter: "ゆ",
        equivalents: ["YU"],
      },
      {
        letter: "よ",
        equivalents: ["YO"],
      },
      {
        letter: "ら",
        equivalents: ["RA"],
      },
      {
        letter: "り",
        equivalents: ["RI"],
      },
      {
        letter: "る",
        equivalents: ["RU"],
      },
      {
        letter: "れ",
        equivalents: ["RE"],
      },
      {
        letter: "ろ",
        equivalents: ["RO"],
      },
      {
        letter: "わ",
        equivalents: ["WA"],
      },
      {
        letter: "ゐ",
        equivalents: ["WI"],
      },
      {
        letter: "ゑ",
        equivalents: ["WE"],
      },
      {
        letter: "を",
        equivalents: ["WO"],
      },
      {
        letter: "ん",
        equivalents: ["N"],
      },
      {
        letter: "ゔ",
        equivalents: ["VU"],
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
