import {useState} from "react";
import {AvailableCharacters, CharacterObject} from "../../../characters";
import shuffle from "lodash/shuffle";
import {Game} from "../Game/Game";
import {GameSelectionForm} from "../GameSelectionForm/GameSelectionForm";

export interface GameSelectionState {
    characters: AvailableCharacters,
    duration: number,
    selectedCharacters: CharacterObject[],
    selectedGameMode: string,
}

export const GameSelection = (): JSX.Element => {
    const [startGame, setStartGame] = useState<boolean>(false);
    const [values, setValues] = useState<GameSelectionState>({
        characters: AvailableCharacters.HIRAGANA,
        duration: 2,
        selectedCharacters: [],
        selectedGameMode: "1"
    });

    console.log(values.characters)

    return (
        <>
            {startGame ? <Game
                    selectedGameMode={values.selectedGameMode}
                    setStartGame={setStartGame}
                    duration={20000}
                    selectedCharacters={shuffle(values.selectedCharacters)}
                    characters={values.characters}/> :
                <GameSelectionForm setStartGame={setStartGame} values={values} setValues={setValues}/>
            }
        </>
    );
};
