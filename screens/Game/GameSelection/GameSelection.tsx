import React, { useState } from "react";
import { AvailableCharacters, CharacterObject } from "../../../characters";
import { GameSelectionForm } from "../GameSelectionForm/GameSelectionForm";
import { GameMode1 } from "../GameModes/GameMode1";
import { GameMode2 } from "../GameModes/GameMode2";
import { shuffle } from "lodash";
import { AppLayout } from "../../../components/AppLayout/AppLayout";
import { GameModes } from "../../../constants";

export interface GameSelectionState {
  characters: AvailableCharacters;
  duration: number;
  selectedCharacters: CharacterObject[];
  selectedGameMode: GameModes;
}

export const GameSelection = (): JSX.Element => {
  const [startGame, setStartGame] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<GameSelectionState>({
    characters: AvailableCharacters.HIRAGANA,
    duration: 2,
    selectedCharacters: [],
    selectedGameMode: GameModes.ONE,
  });

  // ToDo: define proper type for any
  const components: any = {
    //ToDo: add GameMode3, GameMode4, GameMode5, GameMode6
    1: GameMode1,
    2: GameMode2,
  };

  const Component = components[formValues.selectedGameMode];

  return (
    <>
      <AppLayout>
        {startGame ? (
          <Component
            formValues={{
              ...formValues,
              setStartGame,
              selectedCharacters: shuffle(formValues.selectedCharacters),
            }}
          />
        ) : (
          <GameSelectionForm
            formValues={{ ...formValues, setStartGame, setFormValues }}
          />
        )}
      </AppLayout>
    </>
  );
};
