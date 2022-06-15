import React, {useState} from "react";
import {AvailableCharacters, CharacterObject} from "../../../characters";
import {GameSelectionForm} from "../GameSelectionForm/GameSelectionForm";
import {GameMode1 } from "../GameModes/GameMode1";
import {GameMode2 } from "../GameModes/GameMode2";
import {shuffle} from "lodash";

export interface GameSelectionState {
    characters: AvailableCharacters,
    duration: number,
    selectedCharacters: CharacterObject[],
    selectedGameMode: string,
}

export const GameSelection = (): JSX.Element => {
    const [startGame, setStartGame] = useState<boolean>(false);
    const [formValues, setValues] = useState<GameSelectionState>({
        characters: AvailableCharacters.HIRAGANA,
        duration: 2,
        selectedCharacters: [],
        selectedGameMode: "1"
    });

    // ToDo: define proper type for any
    const components: any = {
        //ToDo: add GameMode3, GameMode4, GameMode5, GameMode6
        1: GameMode1,
        2: GameMode2
    }

    const Component = components[formValues.selectedGameMode];

    return (
        <>
            {startGame ? <Component formValues={{...formValues, setStartGame, selectedCharacters: shuffle(formValues.selectedCharacters)}}  /> :
                <GameSelectionForm setStartGame={setStartGame} values={formValues} setValues={setValues}/>
            }
        </>
    );
};
