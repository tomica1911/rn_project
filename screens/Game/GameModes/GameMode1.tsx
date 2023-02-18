import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CustomizableButton } from "../../../components/CustomizableButton/CustomizableButton";
import { useCountdown } from "usehooks-ts";
import { Modal } from "../../../components/Modal/Modal";
import { shuffle } from "lodash";
import {
  getPoints,
  getRandomNumberInRange,
  showInterstitalAd,
} from "../../../utils/utils";
// @ts-ignore
import { ProgressPie } from "react-native-progress/Pie";
import {
  COLOR_COMBINATION_1,
  STANDARDISED_STYLES,
} from "../../../styles/styles";
import { useFirestore } from "../../../contexts/firebaseContext";
import { useAuth } from "../../../contexts/authContext";
import { SCREENS, Status } from "../../../constants";
import { AppLayout } from "../../../components/AppLayout/AppLayout";

export const GameMode1 = ({ navigation, route }: any): JSX.Element => {
  const [formValues, setFormValues] = useState(route.params.formValues);
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
  const [counter, { startCountdown, resetCountdown, stopCountdown }] =
    useCountdown({
      countStart: formValues.duration,
      intervalMs: 1000,
      isIncrement: false,
    });

  useEffect(() => {
    const randomNumberInRange = getRandomNumberInRange(0, 100);

    if (gameCompleted && randomNumberInRange <= 20) {
      showInterstitalAd();
    }
  }, [gameCompleted]);

  useEffect(() => {
    startCountdown();
  }, []);

  async function handleTextInputChange(enteredValue: string) {
    setTextInputValue(enteredValue);
    const currentChar = formValues.selectedCharacters[currentCharIndex];
    if (currentChar.equivalents.includes(enteredValue)) {
      if (currentCharIndex + 1 <= formValues.selectedCharacters.length) {
        if (currentCharIndex + 1 === formValues.selectedCharacters.length) {
          stopCountdown();
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
    setFormValues({
      ...formValues,
      selectedCharacters: shuffle(formValues.selectedCharacters),
    });
    setGameCompleted(false);
    resetCountdown();
    startCountdown();
    setCurrentCharIndex(0);
    setIsHelperCalled(false);
    setIsModalVisible(false);
    setProgress(0);
    setReqSent(false);
    setThrowOutIncorrect(false);
  };

  const updateUserStats = (status: Status, points: number = 0) => {
    if (currentUser && !reqSent) {
      setReqSent((prevValue: boolean) => !prevValue);
      return updateUserData({
        userUid: currentUser.uid,
        characters: formValues.characters,
        gameMode: SCREENS.GAME_MODE_ONE,
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
      return `You've won ${points} points`;
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

  // @ts-ignore
  return (
    <AppLayout>
      <View>
        {/*/ This condition has to be here or else after the modal is closed, a new modal gets rendered for a very brief time /*/}
        {(gameCompleted || counter === 0 || throwOutIncorrect) && (
          <Modal
            isModalVisible={gameCompleted || counter === 0 || throwOutIncorrect}
            footerComponent={
              <View>
                <CustomizableButton
                  onPress={() =>
                    navigation.navigate(SCREENS.PLAY, { subsequent: true })
                  }
                  title="Back to selection"
                />
                <CustomizableButton
                  onPress={() => startAgainWithCurrentSettings()}
                  title="Try again"
                />
              </View>
            }
            headerTitle={
              throwOutIncorrect || counter === 0 ? "Oh no!" : "Congratulations!"
            }
            headerText={getModalHeaderTextAndUpdateUser() ?? ""}
          />
        )}
        {!(counter === 0) && !gameCompleted && !throwOutIncorrect && (
          <>
            <View style={styles.inputContainer}>
              <View style={styles.progress}>
                <ProgressPie
                  color={COLOR_COMBINATION_1.ORANGE}
                  progress={progress * 0.01}
                  size={20}
                />
              </View>
              <View>
                <Text style={styles.inputFieldText}>Answer</Text>
                <TextInput
                  value={textInputValue}
                  style={styles.inputField}
                  onChangeText={(answer: string) =>
                    handleTextInputChange(answer.toLowerCase())
                  }
                />
              </View>
            </View>
            <View style={styles.characterContainer}>
              <Text
                style={{
                  fontSize:
                    formValues.selectedCharacters[currentCharIndex].letter
                      .length > 0
                      ? 50
                      : 100,
                }}
              >
                {/*{formValues.selectedCharacters[currentCharIndex].equivalents[0]}*/}
                {formValues.selectedCharacters[currentCharIndex].letter}
              </Text>
            </View>
            <View style={styles.counterContainer}>
              <Text style={styles.counterNumber}>{counter}</Text>
            </View>
            <View style={styles.helpContainer}>
              <CustomizableButton
                onPress={() => {
                  setIsHelperCalled(true);
                  setIsModalVisible(true);
                }}
                title="Help"
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
                    title="Continue"
                  />
                </View>
              }
              headerTitle="Help"
              headerText={
                <Text>
                  Ability to earn points for this round{" "}
                  <Text style={styles.underlineText}>removed</Text>. {"\n"}
                  {"\n"}Suggested solutions:{"\n"}
                  <Text>
                    {formValues.selectedCharacters[
                      currentCharIndex
                    ].equivalents.reduce(
                      (
                        accumulator: string,
                        currentLetter: string,
                        index: number
                      ) =>
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
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    justifyContent: "space-between",
  },
  progress: {
    alignSelf: "flex-end",
    marginBottom: 5,
    marginRight: 5,
  },
  inputFieldText: {
    color: COLOR_COMBINATION_1.ORANGE,
    alignSelf: "center",
  },
  inputField: {
    backgroundColor: "white",
    width: 100,
  },
  characterContainer: {
    width: 150,
    height: 150,
    backgroundColor: "#DFDFD9",
    borderStyle: "solid",
    borderWidth: 5,
    borderColor: "#F7B42F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  counterContainer: {
    margin: 5,
  },
  counterNumber: {
    alignSelf: "center",
    color: "#F7B42F",
  },
  helpContainer: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
  },
  underlineText: {
    textDecorationLine: "underline",
  },
});

//ToDos
//______________________________________________________________________________________________________________________
//ToDo: try to trigger this function less often in TextInput component to optimize performance (handleTextInputChange)
/*ToDo: Define layout component and set width to maximum, locate the code under text component with "Answer"*/
// ToDo: think about what should happen at the end, location -> if (currentCharIndex + 1 == formValues.selectedCharacters.length) {
