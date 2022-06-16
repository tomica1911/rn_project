import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { GameSelectionState } from "../GameSelection/GameSelection";
import * as Progress from "react-native-progress";
import { characters as charDB } from "../../../characters";
import { getRandomNumberInRange } from "../../../utils/utils";
import { ButtonGroup } from "@rneui/themed";
import { useCountdown } from "usehooks-ts";
import { CustomizableButton } from "../../../components/CustomizableButton/CustomizableButton";

type GameModeTwoProps = {
  formValues: Omit<GameSelectionState, "selectedGameMode" | "setStartGame"> & {
    setStartGame: (arg: boolean) => void;
  };
};

export const GameMode2 = ({ formValues }: GameModeTwoProps): JSX.Element => {
  const [buttonGroupValues, setButtonGroupValues] = useState<string[]>([]);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [timeoutGame, setTimeoutGame] = useState<boolean>(false);
  const [throwOutIncorrect, setThrowOutIncorrect] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [counter, { start: startCountdown, stop: stopCountdown, reset: resetCountdown }] =
    useCountdown({
      seconds: formValues.duration,
      interval: 100,
      isIncrement: false,
    });

  useEffect(() => {
      startCountdown();
  }, []);

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
    setTimeoutGame(false);
    setThrowOutIncorrect(false);
    setGameCompleted(false);
  };

  // refactor this
  const buttonColor = "#F7B42F";

  return (
    <View>
      {gameCompleted && (
        <Text style={{ color: buttonColor, margin: 10 }}>
          // ToDo: add number of points Congratulations, you've won some points!
        </Text>
      )}
      {!timeoutGame && !gameCompleted && !throwOutIncorrect && (
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
          <View
            style={{
              margin: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Progress.Pie
              color={buttonColor}
              progress={progress * 0.01}
              size={50}
            />
          </View>
          <View>
            <Text style={{ color: buttonColor, textAlign: "center" }}>
              Choose a correct answer
            </Text>
            <ButtonGroup
              buttons={buttonGroupValues}
              onPress={(buttonIndex: number) => updateButtons(buttonIndex)}
            />
          </View>
        </>
      )}
      {(timeoutGame || throwOutIncorrect) && (
        <CustomizableButton
          title="Try Again"
          onPress={() => startAgainWithCurrentSettings()}
          stylesButton={{
            color: "white",
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 1,
            marginTop: 1,
            height: 50,
            backgroundColor: "#3E5494",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}
      <CustomizableButton
        onPress={() => formValues.setStartGame(false)}
        title="Back to selection"
        stylesButton={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 1,
          marginTop: 150,
          height: 50,
          backgroundColor: "#F7B42F",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </View>
  );
};
