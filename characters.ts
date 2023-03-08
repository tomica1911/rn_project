import { SCREENS } from "./constants";
import { GameDurations } from "./types";

export interface CharacterObject {
  id: string;
  letter: string;
  equivalents: string[];
  characterSet?: AvailableCharacters;
}

export interface GameSelectionState {
  characters: AvailableCharacters;
  duration: GameDurations;
  selectedCharacters: CharacterObject[] | null;
  selectedGameMode: SCREENS.GAME_MODE_ONE | SCREENS.GAME_MODE_TWO;
  mixCharacters: boolean;
}

// ToDo: rename so it follows some rules
// ToDo: better ids
// ToDo: add hebrew alef
// ToDo: add alif to arabic
// ToDo: add ghayn to arabic
// ToDo: add letter names
// ToDo: add letters which are not included, define property name do display warning or display a warning if the equivalents !(array.lenght > 0)
export enum AvailableCharacters {
  HIRAGANA = "Hiragana",
  CYRILLIC_RU = "Cyrillic(RU)",
  CYRILLIC_UA = "Cyrillic(UA)",
  GREEK = "Greek",
  KATAKANA = "Katakana",
  HANGUL = "Hangul",
  HEBREW = "Hebrew",
  ARABIC = "Arabic",
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
        id: `${AvailableCharacters.HIRAGANA}_1`,
        letter: "あ",
        equivalents: ["a"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_2`,
        letter: "い",
        equivalents: ["i"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_3`,
        letter: "う",
        equivalents: ["u"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_4`,
        letter: "え",
        equivalents: ["e"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_5`,
        letter: "お",
        equivalents: ["o"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_6`,
        letter: "か",
        equivalents: ["ka"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_7`,
        letter: "が",
        equivalents: ["ga"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_8`,
        letter: "き",
        equivalents: ["ki"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_9`,
        letter: "ぎ",
        equivalents: ["gi"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_10`,
        letter: "く",
        equivalents: ["ku"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_11`,
        letter: "ぐ",
        equivalents: ["gu"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_12`,
        letter: "け",
        equivalents: ["ke"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_13`,
        letter: "げ",
        equivalents: ["ge"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_14`,
        letter: "こ",
        equivalents: ["ko"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_15`,
        letter: "ご",
        equivalents: ["go"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_16`,
        letter: "さ",
        equivalents: ["sa"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_17`,
        letter: "ざ",
        equivalents: ["za"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_18`,
        letter: "し",
        equivalents: ["si"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_19`,
        letter: "じ",
        equivalents: ["zi"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_20`,
        letter: "す",
        equivalents: ["su"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_21`,
        letter: "ず",
        equivalents: ["zu"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_22`,
        letter: "せ",
        equivalents: ["se"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_23`,
        letter: "ぜ",
        equivalents: ["ze"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_24`,
        letter: "そ",
        equivalents: ["so"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_25`,
        letter: "ぞ",
        equivalents: ["zo"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_26`,
        letter: "た",
        equivalents: ["ta"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_27`,
        letter: "だ",
        equivalents: ["da"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_28`,
        letter: "ち",
        equivalents: ["ti"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_29`,
        letter: "ぢ",
        equivalents: ["di"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_30`,
        letter: "つ",
        equivalents: ["tu"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_31`,
        letter: "づ",
        equivalents: ["du"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_32`,
        letter: "て",
        equivalents: ["te"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_33`,
        letter: "で",
        equivalents: ["de"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_34`,
        letter: "と",
        equivalents: ["to"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_35`,
        letter: "ど",
        equivalents: ["do"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_36`,
        letter: "な",
        equivalents: ["na"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_37`,
        letter: "に",
        equivalents: ["ni"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_38`,
        letter: "ぬ",
        equivalents: ["nu"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_39`,
        letter: "ね",
        equivalents: ["ne"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_40`,
        letter: "の",
        equivalents: ["no"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_41`,
        letter: "は",
        equivalents: ["ha"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_42`,
        letter: "ば",
        equivalents: ["ba"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_43`,
        letter: "ぱ",
        equivalents: ["pa"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_44`,
        letter: "ひ",
        equivalents: ["hi"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_45`,
        letter: "び",
        equivalents: ["bi"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_46`,
        letter: "ぴ",
        equivalents: ["pi"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_47`,
        letter: "ふ",
        equivalents: ["hu"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_48`,
        letter: "ぶ",
        equivalents: ["bu"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_49`,
        letter: "ぷ",
        equivalents: ["pu"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_50`,
        letter: "へ",
        equivalents: ["he"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_51`,
        letter: "べ",
        equivalents: ["be"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_52`,
        letter: "ぺ",
        equivalents: ["pe"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_53`,
        letter: "ほ",
        equivalents: ["ho"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_54`,
        letter: "ぼ",
        equivalents: ["bo"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_55`,
        letter: "ぽ",
        equivalents: ["po"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_56`,
        letter: "ま",
        equivalents: ["ma"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_57`,
        letter: "み",
        equivalents: ["mi"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_58`,
        letter: "む",
        equivalents: ["mu"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_59`,
        letter: "め",
        equivalents: ["me"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_60`,
        letter: "も",
        equivalents: ["mo"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_61`,
        letter: "や",
        equivalents: ["ya"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_62`,
        letter: "ゆ",
        equivalents: ["yu"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_63`,
        letter: "よ",
        equivalents: ["yo"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_64`,
        letter: "ら",
        equivalents: ["ra"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_65`,
        letter: "り",
        equivalents: ["ri"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_66`,
        letter: "る",
        equivalents: ["ru"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_67`,
        letter: "れ",
        equivalents: ["re"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_68`,
        letter: "ろ",
        equivalents: ["ro"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_69`,
        letter: "わ",
        equivalents: ["wa"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_70`,
        letter: "ゐ",
        equivalents: ["wi"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_71`,
        letter: "ゑ",
        equivalents: ["we"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_72`,
        letter: "を",
        equivalents: ["wo"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_73`,
        letter: "ん",
        equivalents: ["n"],
      },
      {
        id: `${AvailableCharacters.HIRAGANA}_74`,
        letter: "ゔ",
        equivalents: ["vu"],
      },
    ],
  },
  {
    setName: AvailableCharacters.CYRILLIC_RU,
    letters: [
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_1`,
        letter: "А а",
        equivalents: ["a"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_2`,
        letter: "Б б",
        equivalents: ["b"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_3`,
        letter: "В в",
        equivalents: ["v"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_4`,
        letter: "Г г",
        equivalents: ["g"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_5`,
        letter: "Д д",
        equivalents: ["d"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_6`,
        letter: "Е е",
        equivalents: ["e"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_7`,
        letter: "Ё ё",
        equivalents: ["yo", "jo", "ё"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_8`,
        letter: "Ж ж",
        equivalents: ["zh", "ž"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_9`,
        letter: "З з",
        equivalents: ["z"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_10`,
        letter: "И и",
        equivalents: ["i"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_11`,
        letter: "Й й",
        equivalents: ["y", "i", "j"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_12`,
        letter: "К к",
        equivalents: ["k"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_13`,
        letter: "Л л",
        equivalents: ["l"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_14`,
        letter: "М м",
        equivalents: ["m"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_15`,
        letter: "Н н",
        equivalents: ["n"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_16`,
        letter: "О о",
        equivalents: ["o"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_17`,
        letter: "П п",
        equivalents: ["r"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_18`,
        letter: "Р р",
        equivalents: ["r"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_19`,
        letter: "Т т",
        equivalents: ["t"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_20`,
        letter: "У у",
        equivalents: ["u"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_21`,
        letter: "Ф ф",
        equivalents: ["u"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_22`,
        letter: "Х х",
        equivalents: ["kh", "h"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_23`,
        letter: "Ц ц",
        equivalents: ["ts"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_24`,
        letter: "Ч ч",
        equivalents: ["ch", "č"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_25`,
        letter: "Ш ш",
        equivalents: ["sh", "š"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_26`,
        letter: "Щ щ",
        equivalents: ["shch", "sch", "šč"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_27`,
        letter: "Ы ы",
        equivalents: ["y"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_28`,
        letter: "Э э",
        equivalents: ["e", "è"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_29`,
        letter: "Ю ю",
        equivalents: ["yu", "ju"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_RU}_30`,
        letter: "Я я",
        equivalents: ["ya", "ja"],
      },
    ],
  },
  {
    setName: AvailableCharacters.GREEK,
    letters: [
      {
        id: `${AvailableCharacters.GREEK}_1`,
        letter: "Α α",
        equivalents: ["a"],
      },
      {
        id: `${AvailableCharacters.GREEK}_2`,
        letter: "Β β",
        equivalents: ["v"],
      },
      {
        id: `${AvailableCharacters.GREEK}_3`,
        letter: "Γ γ",
        equivalents: ["g", "y", "ng"],
      },
      {
        id: `${AvailableCharacters.GREEK}_4`,
        letter: "Δ δ",
        equivalents: ["th"],
      },
      {
        id: `${AvailableCharacters.GREEK}_5`,
        letter: "Ε ε",
        equivalents: ["e"],
      },
      {
        id: `${AvailableCharacters.GREEK}_6`,
        letter: "Ζ ζ",
        equivalents: ["z"],
      },
      {
        id: `${AvailableCharacters.GREEK}_7`,
        letter: "Η η",
        equivalents: ["i"],
      },
      {
        id: `${AvailableCharacters.GREEK}_8`,
        letter: "Θ θ",
        equivalents: ["th"],
      },
      {
        id: `${AvailableCharacters.GREEK}_9`,
        letter: "Ι ι",
        equivalents: ["i"],
      },
      {
        id: `${AvailableCharacters.GREEK}_10`,
        letter: "Κ κ",
        equivalents: ["k"],
      },
      {
        id: `${AvailableCharacters.GREEK}_11`,
        letter: "Λ λ",
        equivalents: ["l"],
      },
      {
        id: `${AvailableCharacters.GREEK}_12`,
        letter: "Μ μ",
        equivalents: ["m"],
      },
      {
        id: `${AvailableCharacters.GREEK}_13`,
        letter: "Ν ν",
        equivalents: ["n"],
      },
      {
        id: `${AvailableCharacters.GREEK}_14`,
        letter: "Ξ ξ",
        equivalents: ["x"],
      },
      {
        id: `${AvailableCharacters.GREEK}_15`,
        letter: "Ο ο",
        equivalents: ["o"],
      },
      {
        id: `${AvailableCharacters.GREEK}_16`,
        letter: "Π π",
        equivalents: ["p"],
      },
      {
        id: `${AvailableCharacters.GREEK}_17`,
        letter: "Ρ ρ",
        equivalents: ["r"],
      },
      {
        id: `${AvailableCharacters.GREEK}_18`,
        letter: "Σ σ/ς, Ϲ ϲ",
        equivalents: ["s"],
      },
      {
        id: `${AvailableCharacters.GREEK}_19`,
        letter: "Τ τ",
        equivalents: ["t"],
      },
      {
        id: `${AvailableCharacters.GREEK}_20`,
        letter: "Υ υ",
        equivalents: ["i"],
      },
      {
        id: `${AvailableCharacters.GREEK}_21`,
        letter: "Φ φ",
        equivalents: ["f"],
      },
      {
        id: `${AvailableCharacters.GREEK}_22`,
        letter: "Χ χ",
        equivalents: ["ch"],
      },
      {
        id: `${AvailableCharacters.GREEK}_23`,
        letter: "Ψ ψ",
        equivalents: ["ps"],
      },
      {
        id: `${AvailableCharacters.GREEK}_24`,
        letter: "Ω ω",
        equivalents: ["o"],
      },
    ],
  },
  {
    setName: AvailableCharacters.KATAKANA,
    letters: [
      {
        id: `${AvailableCharacters.KATAKANA}_1`,
        letter: "ア",
        equivalents: ["a"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_2`,
        letter: "イ",
        equivalents: ["u"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_3`,
        letter: "ウ",
        equivalents: ["u"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_4`,
        letter: "エ",
        equivalents: ["e"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_5`,
        letter: "オ",
        equivalents: ["o"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_6`,
        letter: "カ",
        equivalents: ["ka"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_7`,
        letter: "キ",
        equivalents: ["ki"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_8`,
        letter: "ク",
        equivalents: ["ku"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_9`,
        letter: "ケ",
        equivalents: ["ke"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_10`,
        letter: "コ",
        equivalents: ["ko"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_11`,
        letter: "サ",
        equivalents: ["sa"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_12`,
        letter: "シ",
        equivalents: ["shi"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_13`,
        letter: "ス",
        equivalents: ["su"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_14`,
        letter: "セ",
        equivalents: ["se"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_15`,
        letter: "ソ",
        equivalents: ["so"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_16`,
        letter: "タ",
        equivalents: ["ta"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_17`,
        letter: "チ",
        equivalents: ["chi"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_18`,
        letter: "ツ",
        equivalents: ["tsu"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_19`,
        letter: "テ",
        equivalents: ["te"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_20`,
        letter: "ト",
        equivalents: ["to"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_21`,
        letter: "ナ",
        equivalents: ["na"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_22`,
        letter: "ニ",
        equivalents: ["ni"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_23`,
        letter: "ヌ",
        equivalents: ["nu"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_24`,
        letter: "ネ",
        equivalents: ["ne"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_25`,
        letter: "ノ",
        equivalents: ["no"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_26`,
        letter: "ハ",
        equivalents: ["ha"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_27`,
        letter: "ヒ",
        equivalents: ["hi"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_28`,
        letter: "フ",
        equivalents: ["fu"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_29`,
        letter: "ヘ",
        equivalents: ["he"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_30`,
        letter: "ホ",
        equivalents: ["ho"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_31`,
        letter: "マ",
        equivalents: ["ma"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_32`,
        letter: "ミ",
        equivalents: ["mi"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_33`,
        letter: "ム",
        equivalents: ["mu"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_34`,
        letter: "メ",
        equivalents: ["me"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_35`,
        letter: "モ",
        equivalents: ["mo"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_36`,
        letter: "ヤ",
        equivalents: ["ya"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_37`,
        letter: "ユ",
        equivalents: ["yu"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_38`,
        letter: "ヨ",
        equivalents: ["yo"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_39`,
        letter: "ラ",
        equivalents: ["ra"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_40`,
        letter: "リ",
        equivalents: ["ri"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_41`,
        letter: "ル",
        equivalents: ["ru"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_42`,
        letter: "レ",
        equivalents: ["re"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_43`,
        letter: "ロ",
        equivalents: ["ro"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_44`,
        letter: "ワ",
        equivalents: ["wa"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_45`,
        letter: "ヲ",
        equivalents: ["wo"],
      },
      {
        id: `${AvailableCharacters.KATAKANA}_46`,
        letter: "ン",
        equivalents: ["n"],
      },
    ],
  },
  {
    setName: AvailableCharacters.CYRILLIC_UA,
    letters: [
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_1`,
        letter: "А а",
        equivalents: ["a"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_2`,
        letter: "Б б",
        equivalents: ["b"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_3`,
        letter: "В в",
        equivalents: ["v"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_4`,
        letter: "Г г",
        equivalents: ["h"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_5`,
        letter: "Ґ ґ",
        equivalents: ["g"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_6`,
        letter: "Д д",
        equivalents: ["d"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_7`,
        letter: "Е е",
        equivalents: ["e"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_8`,
        letter: "Є є",
        equivalents: ["ye", "ie"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_9`,
        letter: "Ж ж",
        equivalents: ["zh"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_10`,
        letter: "З з",
        equivalents: ["z"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_11`,
        letter: "И и",
        equivalents: ["y"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_12`,
        letter: "І і",
        equivalents: ["i"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_13`,
        letter: "Ї ї",
        equivalents: ["yi", "i"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_14`,
        letter: "Й й",
        equivalents: ["y", "i"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_15`,
        letter: "К к",
        equivalents: ["k", "g"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_16`,
        letter: "Л л",
        equivalents: ["l"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_17`,
        letter: "М м",
        equivalents: ["m"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_18`,
        letter: "Н н",
        equivalents: ["n"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_19`,
        letter: "О о",
        equivalents: ["o"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_20`,
        letter: "П п",
        equivalents: ["p"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_21`,
        letter: "Р р",
        equivalents: ["r"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_22`,
        letter: "С с",
        equivalents: ["s"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_23`,
        letter: "Т т",
        equivalents: ["t"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_24`,
        letter: "У у",
        equivalents: ["u"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_25`,
        letter: "Ф ф",
        equivalents: ["f"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_26`,
        letter: "Х х",
        equivalents: ["kh"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_27`,
        letter: "Ц ц",
        equivalents: ["ts"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_28`,
        letter: "Ч ч",
        equivalents: ["ch"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_29`,
        letter: "Ш ш",
        equivalents: ["sh"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_30`,
        letter: "Щ щ",
        equivalents: ["shch"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_31`,
        letter: "Ю ю",
        equivalents: ["yu", "iu"],
      },
      {
        id: `${AvailableCharacters.CYRILLIC_UA}_32`,
        letter: "Я я",
        equivalents: ["ya", "ia"],
      },
    ],
  },
  {
    setName: AvailableCharacters.HANGUL,
    letters: [
      {
        id: `${AvailableCharacters.HANGUL}_1`,
        letter: "ㄱ",
        equivalents: ["g", "k"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_2`,
        letter: "ㄴ",
        equivalents: ["n"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_3`,
        letter: "ㄷ",
        equivalents: ["d", "t"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_4`,
        letter: "ㄹ",
        equivalents: ["r", "l"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_5`,
        letter: "ㅁ",
        equivalents: ["m"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_6`,
        letter: "ㅂ",
        equivalents: ["b", "p"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_7`,
        letter: "ㅅ",
        equivalents: ["s"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_8`,
        letter: "ㅇ",
        equivalents: ["no sound"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_9`,
        letter: "ㅈ",
        equivalents: ["j", "ch"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_10`,
        letter: "ㅊ",
        equivalents: ["ch"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_11`,
        letter: "ㅋ",
        equivalents: ["k"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_12`,
        letter: "ㅌ",
        equivalents: ["t"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_13`,
        letter: "ㅍ",
        equivalents: ["p"],
      },
        //here narakeet
      {
        id: `${AvailableCharacters.HANGUL}_14`,
        letter: "ㅎ",
        equivalents: ["h"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_15`,
        letter: "ㄲ",
        equivalents: ["kk"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_16`,
        letter: "ㄸ",
        equivalents: ["tt"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_17`,
        letter: "ㅃ",
        equivalents: ["pp"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_18`,
        letter: "ㅆ",
        equivalents: ["ss"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_19`,
        letter: "ㅉ",
        equivalents: ["jj"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_20`,
        letter: "ㅐ",
        equivalents: ["ae"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_21`,
        letter: "ㅒ",
        equivalents: ["yae"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_22`,
        letter: "ㅔ",
        equivalents: ["e"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_23`,
        letter: "ㅖ",
        equivalents: ["ye"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_24`,
        letter: "ㅚ",
        equivalents: ["oe"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_25`,
        letter: "ㅟ",
        equivalents: ["wi"],
      },
      {
        id: `${AvailableCharacters.HANGUL}_26`,
        letter: "ㅢ",
        equivalents: ["ui"],
      },
    ],
  },
  {
    setName: AvailableCharacters.HEBREW,
    letters: [
      {
        id: `${AvailableCharacters.HEBREW}_1`,
        letter: "בּ",
        equivalents: ["b"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_2`,
        letter: "ב",
        equivalents: ["v"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_3`,
        letter: "גּ",
        equivalents: ["g"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_4`,
        letter: "ג",
        equivalents: ["gh"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_5`,
        letter: "דּ",
        equivalents: ["d"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_6`,
        letter: "ד",
        equivalents: ["th"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_7`,
        letter: "ה",
        equivalents: ["h"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_8`,
        letter: "ו",
        equivalents: ["v"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_9`,
        letter: "ז",
        equivalents: ["z"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_10`,
        letter: "ח",
        equivalents: ["ch"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_11`,
        letter: "ט",
        equivalents: ["t"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_12`,
        letter: "י",
        equivalents: ["y"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_13`,
        letter: "כּ",
        equivalents: ["k"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_14`,
        letter: "כ",
        equivalents: ["ch"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_15`,
        letter: "ךּ",
        equivalents: ["k"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_16`,
        letter: "ך",
        equivalents: ["ch"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_17`,
        letter: "ל",
        equivalents: ["l"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_18`,
        letter: "מ",
        equivalents: ["m"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_19`,
        letter: "ם",
        equivalents: ["m"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_20`,
        letter: "נ",
        equivalents: ["n"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_21`,
        letter: "ן",
        equivalents: ["n"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_22`,
        letter: "ס",
        equivalents: ["s"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_23`,
        letter: "ע",
        //ToDo: check if correct
        equivalents: ["t", "p"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_24`,
        letter: "פּ",
        equivalents: ["p"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_25`,
        letter: "פ",
        equivalents: ["f"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_26`,
        letter: "ףּ",
        equivalents: ["p"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_27`,
        letter: "ף",
        equivalents: ["f"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_28`,
        letter: "צ",
        equivalents: ["ts"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_29`,
        letter: "ץ",
        equivalents: ["ts"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_30`,
        letter: "ק",
        equivalents: ["k"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_31`,
        letter: "ר",
        equivalents: ["r"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_32`,
        letter: "שׁ",
        equivalents: ["sh"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_33`,
        letter: "שׂ",
        equivalents: ["s"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_34`,
        letter: "תּ",
        equivalents: ["t"],
      },
      {
        id: `${AvailableCharacters.HEBREW}_35`,
        letter: "ת",
        equivalents: ["th"],
      },
    ],
  },
  {
    setName: AvailableCharacters.ARABIC,
    letters: [
      {
        id: `${AvailableCharacters.ARABIC}_1`,
        letter: "ب",
        equivalents: ["b"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_2`,
        letter: "ت",
        equivalents: ["t"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_3`,
        letter: "ث",
        equivalents: ["th"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_4`,
        letter: "ج",
        equivalents: ["j"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_5`,
        letter: "حּ",
        equivalents: ["h"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_6`,
        letter: "خ",
        equivalents: ["kh"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_7`,
        letter: "د",
        equivalents: ["d"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_8`,
        letter: "ذ",
        equivalents: ["dh"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_9`,
        letter: "ر",
        equivalents: ["r"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_10`,
        letter: "ز",
        equivalents: ["z"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_11`,
        letter: "س",
        equivalents: ["s"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_12`,
        letter: "ش",
        equivalents: ["sh"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_13`,
        letter: "ص",
        equivalents: ["s"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_14`,
        letter: "ض",
        equivalents: ["d"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_15`,
        letter: "ط",
        equivalents: ["t"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_16`,
        letter: "ظ",
        equivalents: ["z"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_17`,
        letter: "غ",
        equivalents: ["gh"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_18`,
        letter: "ف",
        equivalents: ["f"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_19`,
        letter: "ق",
        equivalents: ["q"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_20`,
        letter: "ك",
        equivalents: ["k"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_21`,
        letter: "ل",
        equivalents: ["l"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_22`,
        letter: "م",
        equivalents: ["m"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_23`,
        letter: "ن",
        equivalents: ["n"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_24`,
        letter: "ه",
        equivalents: ["h"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_25`,
        letter: "و",
        equivalents: ["w"],
      },
      {
        id: `${AvailableCharacters.ARABIC}_26`,
        letter: "ي",
        equivalents: ["y"],
      },
    ],
  },
];
