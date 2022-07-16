import { Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { GameSelectionState } from "../GameSelection/GameSelection";
import { CustomizableButton } from "../../../components/CustomizableButton/CustomizableButton";
import { useCountdown } from "usehooks-ts";
import { Modal } from "../../../components/Modal/Modal";
import { getPoints } from "../../../utils/utils";
// import ProgressPie from "react-native-progress/Pie";
import {
  COLOR_COMBINATION_1,
  STANDARDISED_STYLES,
} from "../../../styles/styles";
import { useFirestore } from "../../../contexts/firebaseContext";
import { useAuth } from "../../../contexts/authContext";
import { GameModes, Status } from "../../../constants";

type GameModeOneProps = {
  //ToDo: take setStartGame (that after &) from one place
  formValues: Omit<GameSelectionState, "selectedGameMode"> & {
    setStartGame: (arg: boolean) => void;
  };
};

export const GameMode1 = ({ formValues }: GameModeOneProps): JSX.Element => {
  //@ts-expect-error
  const { updateUserData } = useFirestore();
  //@ts-expect-error
  const { currentUser } = useAuth();
  const [reqSent, setReqSent] = useState<boolean>(false);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [throwOutIncorrect, setThrowOutIncorrect] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [textInputValue, setTextInputValue] = useState<string>("");
  const [
    counter,
    { start: startCountdown, reset: resetCountdown, stop: stopCountdown },
  ] = useCountdown({
    seconds: formValues.duration,
    interval: 1000,
    isIncrement: false,
  });

  useEffect(() => {
    startCountdown();
  }, []);

  console.log(formValues.selectedCharacters[currentCharIndex].equivalents);

  //ToDo: try to trigger this function less often in TextInput component to optimize performance
  function handleTextInputChange(enteredValue: string) {
    setTextInputValue(enteredValue);
    if (
      formValues.selectedCharacters[currentCharIndex].equivalents.includes(
        enteredValue
      )
    ) {
      if (currentCharIndex + 1 <= formValues.selectedCharacters.length) {
        // ToDo: think about what should happen at the end
        if (currentCharIndex + 1 == formValues.selectedCharacters.length) {
          setGameCompleted(true);
        } else {
          setCurrentCharIndex((prevCurrentIndex) => prevCurrentIndex + 1);
          setTextInputValue("");
          setProgress(
            ((currentCharIndex + 1) / formValues.selectedCharacters.length) *
              100
          );
          resetCountdown();
          startCountdown();
        }
      }
    }
  }

  const startAgainWithCurrentSettings = () => {
    resetCountdown();
    startCountdown();
    setCurrentCharIndex(0);
    setProgress(0);
    setReqSent(false);
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

  const updateUserStats = (status: Status, points: number = 0) => {
    if (currentUser && !reqSent) {
      setReqSent((prevValue: boolean) => !prevValue);
        return updateUserData({
          userUid: currentUser.uid,
          characters: formValues.characters,
          gameMode: GameModes.ONE,
          status,
          points,
          duration: formValues.duration,
      })
    }
  };

  const getModalHeaderTextAndUpdateUser = () => {
    if (gameCompleted) {
      const points = Math.floor(
        getPoints(
          formValues.duration,
          formValues.selectedCharacters.length - 1,
          1
        )
      );
      updateUserStats(Status.WIN, points);
      return `Congratulations, you've won ${points} points`;
    }
    if (counter === 0) {
      updateUserStats(Status.TIMEOUT);
      return "You have run out of time";
    }
    if (throwOutIncorrect) {
      updateUserStats(Status.INCORRECT);
      return "You have entered an incorrect value";
    }
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
        headerText={getModalHeaderTextAndUpdateUser() ?? ""}
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
            <Text style={{ alignSelf: "center", color: "#F7B42F" }}>
              {counter}
            </Text>
          </View>
          {/*<View style={STANDARDISED_STYLES.CENTER_CONTENT}>*/}
          {/*  <ProgressPie*/}
          {/*    color={COLOR_COMBINATION_1.ORANGE}*/}
          {/*    progress={progress * 0.01}*/}
          {/*    size={50}*/}
          {/*  />*/}
          {/*</View>*/}
          <View
            style={{
              margin: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: COLOR_COMBINATION_1.ORANGE }}>Answer</Text>
            {/*ToDo: Define layout component and set width to maximum*/}
            <TextInput
              value={textInputValue}
              style={{ backgroundColor: "white", width: 150 }}
              onChangeText={(answer: string) => handleTextInputChange(answer)}
            />
          </View>
        </>
      )}
    </View>
  );
};
