import { Text, TextInput, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { GameSelectionState } from "../GameSelection/GameSelection";
import { CustomizableButton } from "../../../components/CustomizableButton/CustomizableButton";
import { useCountdown } from "usehooks-ts";
import { Modal } from "../../../components/Modal/Modal";
import { getPoints } from "../../../utils/utils";
// @ts-ignore
import ProgressPie from "react-native-progress/Pie";
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
  const { updateUserData } = useFirestore();
  const { currentUser } = useAuth();
  const [reqSent, setReqSent] = useState<boolean>(false);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHelperCalled, setIsHelperCalled] = useState(false);
  const [throwOutIncorrect, setThrowOutIncorrect] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [textInputValue, setTextInputValue] = useState<string>("");
  const [counter, { startCountdown, resetCountdown }] = useCountdown({
    countStart: formValues.duration,
    intervalMs: 1000,
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
      });
    }
  };

  const getModalHeaderTextAndUpdateUser = () => {
    if (gameCompleted) {
      let points = Math.floor(
        getPoints(
          formValues.duration,
          formValues.selectedCharacters.length - 1,
          1
        )
      );
      if (isHelperCalled) {
        points = 0;
      }
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
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ alignSelf: "flex-end", marginBottom: 5, marginRight: 5 }}
            >
              <ProgressPie
                color={COLOR_COMBINATION_1.ORANGE}
                progress={progress * 0.01}
                size={20}
              />
            </View>
            <View>
              <Text
                style={{
                  color: COLOR_COMBINATION_1.ORANGE,
                  alignSelf: "center",
                }}
              >
                Answer
              </Text>
              {/*ToDo: Define layout component and set width to maximum*/}
              <TextInput
                value={textInputValue}
                style={{ backgroundColor: "white", width: 100 }}
                onChangeText={(answer: string) =>
                  handleTextInputChange(answer.toLowerCase())
                }
              />
            </View>
          </View>
          <View
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#DFDFD9",
              borderStyle: "solid",
              borderWidth: 5,
              borderColor: "#F7B42F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize:
                  formValues.selectedCharacters[currentCharIndex].letter
                    .length > 0
                    ? 50
                    : 100,
              }}
            >
              {formValues.selectedCharacters[currentCharIndex].letter}
            </Text>
          </View>
          <View style={{ margin: 5 }}>
            <Text style={{ alignSelf: "center", color: "#F7B42F" }}>
              {counter}
            </Text>
          </View>
          <View
            style={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <CustomizableButton
              onPress={() => {
                setIsHelperCalled(true);
                setIsModalVisible(true);
              }}
              title="Help"
              stylesText={{ textDecorationLine: "underline", color: "white" }}
              stylesButton={{
                color: "white",
                textDecorationLine: "underline",
              }}
            />
          </View>
          {/* Extract this component somewhere else and use it in the other game mode*/}
          <Modal
            isModalVisible={isModalVisible}
            footerComponent={
              <View>
                <CustomizableButton
                  onPress={() =>
                    setIsModalVisible((prevValue: boolean) => !prevValue)
                  }
                  stylesButton={{
                    marginTop: 10,
                    height: 50,
                    ...STANDARDISED_STYLES.CENTER_CONTENT,
                    ...STANDARDISED_STYLES.BUTTON,
                    marginBottom: 10,
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                  title="Continue"
                />
              </View>
            }
            headerTitle="Help"
            headerText={
              <Text>
                Ability to earn points for this round{" "}
                <Text style={{ fontWeight: "bold" }}>removed</Text>. Suggested
                solutions:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {formValues.selectedCharacters[
                    currentCharIndex
                  ].equivalents.reduce((accumulator, currentLetter, index) =>
                    index === 0
                      ? accumulator + currentLetter
                      : accumulator + ", " + currentLetter
                  )}
                </Text>
              </Text>
            }
          />
        </>
      )}
    </View>
  );
};
