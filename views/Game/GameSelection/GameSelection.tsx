import {View, Text} from 'react-native';
import {useState} from "react";
import {AvailableCharacters, CharacterObject} from "../../../characters";
import shuffle from "lodash/shuffle";

export interface GameSelectionState {
    characters: AvailableCharacters,
    duration: number,
    selectedCharacters: CharacterObject[],
    selectedGameMode: string,
}

export const Signup = (): JSX.Element => {
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
                    characters={values.characters}
                    selectedGameMode={values.selectedGameMode}
                    setStartGame={setStartGame}
                    duration={values.duration}
                    selectedCharacters={shuffle(values.selectedCharacters)}
                    characters={values.characters}/> :
                <GameSelectionForm setStartGame values={values} setValues={setValues}/>
            }
        </>
    );
};
