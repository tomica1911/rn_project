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
        selectedGameMode: "GameModeOne"
    });

    return (
        <>
            {startGame ? <Game
                    selectedGameMode={values.selectedGameMode}
                    setStartGame={setStartGame}
                    duration={values.duration}
                    selectedCharacters={shuffle(values.selectedCharacters)}
                    characters={values.characters}/> :
                <GameSelectionForm setStartGame={setStartGame} values={values} setValues={setValues}/>
            }
        </>
    );
};
