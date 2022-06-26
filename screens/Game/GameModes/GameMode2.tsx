import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { GameSelectionState } from "../GameSelection/GameSelection";
import { characters as charDB } from "../../../characters";
import { getPoints, getRandomNumberInRange } from "../../../utils/utils";
import { ButtonGroup } from "@rneui/themed";
import { useCountdown } from "usehooks-ts";
//@ts-expect-error
import ProgressPie from "react-native-progress/Pie";
import { CustomizableButton } from "../../../components/CustomizableButton/CustomizableButton";
import { Modal } from "../../../components/Modal/Modal";
import {
  COLOR_COMBINATION_1,
  STANDARDISED_STYLES,
} from "../../../styles/styles";

type GameModeTwoProps = {
  formValues: Omit<GameSelectionState, "selectedGameMode" | "setStartGame"> & {
    setStartGame: (arg: boolean) => void;
  };
};

export const GameMode2 = ({ formValues }: GameModeTwoProps): JSX.Element => {
  const [buttonGroupValues, setButtonGroupValues] = useState<string[]>([]);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [throwOutIncorrect, setThrowOutIncorrect] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [counter, { start: startCountdown, reset: resetCountdown }] =
    useCountdown({
      seconds: formValues.duration,
      interval: 1000,
      isIncrement: false,
    });

  useEffect(() => {
    startCountdown();
  }, []);

  console.log(counter);
  console.log(formValues.selectedCharacters[currentCharIndex].equivalents);

  // ToDo: add some proper typings and refactor this function and the function above
  const updateButtons = (buttonIndex: number) => {
    if (
      formValues.selectedCharacters[currentCharIndex].equivalents.includes(
        buttonGroupValues[buttonIndex]
      )
    ) {
      if (currentCharIndex + 1 <= formValues.selectedCharacters.length) {
        // ToDo: think about what should happen at the end
        if (currentCharIndex + 1 == formValues.selectedCharacters.length) {
          setGameCompleted(true);
        } else {
          setCurrentCharIndex((prevCurrentIndex) => prevCurrentIndex + 1);
          setProgress(
            ((currentCharIndex + 1) / formValues.selectedCharacters.length) *
              100
          );
          resetCountdown();
          startCountdown();
        }
      }
    } else {
      setThrowOutIncorrect(true);
      setProgress(0);
      setCurrentCharIndex(0);
      resetCountdown();
      startCountdown();
    }
  };

  useEffect(() => {
    setValuesForButtonGroup();
  }, [currentCharIndex]);

  const setValuesForButtonGroup = (): void => {
    const values = [];
    let randomCharIndex = getRandomNumberInRange(
      0,
      charDB[formValues.characters].length - 1
    );
    let randomEquivalentIndex = getRandomNumberInRange(
      0,
      charDB[formValues.characters][randomCharIndex].equivalents.length - 1
    );
    values.push(
      charDB[formValues.characters][randomCharIndex].equivalents[
        randomEquivalentIndex
      ]
    );
    randomCharIndex = getRandomNumberInRange(
      0,
      charDB[formValues.characters].length - 1
    );
    randomEquivalentIndex = getRandomNumberInRange(
      0,
      charDB[formValues.characters][randomCharIndex].equivalents.length - 1
    );
    values.push(
      charDB[formValues.characters][randomCharIndex].equivalents[
        randomEquivalentIndex
      ]
    );
    randomCharIndex = getRandomNumberInRange(
      0,
      charDB[formValues.characters].length - 1
    );
    randomEquivalentIndex = getRandomNumberInRange(
      0,
      charDB[formValues.characters][randomCharIndex].equivalents.length - 1
    );
    values.push(
      charDB[formValues.characters][randomCharIndex].equivalents[
        randomEquivalentIndex
      ]
    );
    let notFound: boolean = true;
    for (
      let i = 0;
      i < formValues.selectedCharacters[currentCharIndex].equivalents.length;
      i++
    ) {
      if (
        values.includes(
          formValues.selectedCharacters[currentCharIndex].equivalents[i]
        )
      ) {
        notFound = false;
      }
    }
    if (notFound) {
      values[getRandomNumberInRange(0, values.length - 1)] =
        formValues.selectedCharacters[currentCharIndex].equivalents[
          randomEquivalentIndex
        ];
    }
    setButtonGroupValues(values);
  };

  const startAgainWithCurrentSettings = () => {
    resetCountdown();
    startCountdown();
    setCurrentCharIndex(0);
    setProgress(0);
    setThrowOutIncorrect(false);
    setGameCompleted(false);
  };

  const getModalHeaderTitle = () => {
    if (gameCompleted) {
      return "Congratulations!";
    } else {
      return "Oh no!";
    }
  };

  const getModalHeaderText = () => {
    if (gameCompleted)
      return `Congratulations, you've won ${Math.floor(
        getPoints(
          formValues.duration,
          formValues.selectedCharacters.length - 1,
          1
        )
      )} points`;
    if (counter === 0) return "You have run out of time";
    if (throwOutIncorrect) return "You have entered an incorrect value";
  };
  return (
    <View>
      <Modal
        isModalVisible={gameCompleted || counter === 0 || throwOutIncorrect}
        footerComponent={
          <View>
            <CustomizableButton
              onPress={() => formValues.setStartGame(false)}
              stylesButton={{
                marginTop: 10,
                height: 50,
                ...STANDARDISED_STYLES.CENTER_CONTENT,
                ...STANDARDISED_STYLES.BUTTON,
                marginBottom: 10,
                marginLeft: 5,
                marginRight: 5,
              }}
              title="Back to selection"
            />
            <CustomizableButton
              onPress={() => startAgainWithCurrentSettings()}
              stylesButton={{
                marginTop: 10,
                height: 50,
                ...STANDARDISED_STYLES.CENTER_CONTENT,
                ...STANDARDISED_STYLES.BUTTON,
                marginBottom: 10,
                marginLeft: 5,
                marginRight: 5,
              }}
              title="Try again"
            />
          </View>
        }
        headerTitle={getModalHeaderTitle()}
        headerText={getModalHeaderText() ?? ""}
      />
      {!(counter === 0) && !gameCompleted && !throwOutIncorrect && (
        <>
          <View
            style={{
              width: 200,
              height: 200,
              backgroundColor: "#DFDFD9",
              borderStyle: "solid",
              borderWidth: 5,
              borderColor: "#F7B42F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 150 }}>
              {formValues.selectedCharacters[currentCharIndex].letter}
            </Text>
          </View>
          <View style={{ margin: 5 }}>
            <Text
              style={{
                alignSelf: "center",
                color: "#F7B42F",
              }}
            >
              {counter}
            </Text>
          </View>
          {/*//@ts-expect-error ToDo: remove this line and the error associated with it */}
          <View style={STANDARDISED_STYLES.CENTER_CONTENT}>
            <ProgressPie
              color={COLOR_COMBINATION_1.ORANGE}
              progress={progress * 0.01}
              size={50}
            />
          </View>
          <View>
            <Text
              style={{ color: COLOR_COMBINATION_1.ORANGE, textAlign: "center" }}
            >
              Choose a correct answer
            </Text>
            <ButtonGroup
              buttons={buttonGroupValues}
              onPress={(buttonIndex: number) => updateButtons(buttonIndex)}
            />
          </View>
        </>
      )}
    </View>
  );
};
