import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { characters as charDB } from "../../../characters";
import {getPoints, getRandomNumberInRange, showInterstitalAd} from "../../../utils/utils";
import { ButtonGroup } from "@rneui/themed";
import { useCountdown } from "usehooks-ts";
// @ts-ignore
import ProgressPie from "react-native-progress/Pie";
import { CustomizableButton } from "../../../components/CustomizableButton/CustomizableButton";
import { Modal } from "../../../components/Modal/Modal";
import {
  COLOR_COMBINATION_1,
  STANDARDISED_STYLES,
} from "../../../styles/styles";
import { useAuth } from "../../../contexts/authContext";
import { useFirestore } from "../../../contexts/firebaseContext";
import { SCREENS, Status } from "../../../constants";
import { AppLayout } from "../../../components/AppLayout/AppLayout";

export const GameMode2 = ({ navigation, route }: any): JSX.Element => {
  const formValues = route.params.formValues;
  const [reqSent, setReqSent] = useState<boolean>(false);
  const [buttonGroupValues, setButtonGroupValues] = useState<string[]>([]);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHelperCalled, setIsHelperCalled] = useState(false);
  const [throwOutIncorrect, setThrowOutIncorrect] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [counter, { startCountdown, resetCountdown, stopCountdown }] =
    useCountdown({
      countStart: formValues.duration,
      intervalMs: 1000,
      isIncrement: false,
    });
  const { currentUser } = useAuth();
  const { updateUserData } = useFirestore();

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
          stopCountdown();
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
    const randomNumberInRange = getRandomNumberInRange(0, 100);

    if (gameCompleted && randomNumberInRange <= 20) {
      showInterstitalAd();
    }
  }, [gameCompleted]);

  useEffect(() => {
    setValuesForButtonGroup();
  }, [currentCharIndex]);

  const setValuesForButtonGroup = (): void => {
    const values = [];
    const lettersArray = charDB.filter(
      (arrayItem) => arrayItem.setName === formValues.characters
    )[0].letters;
    let randomCharIndex = getRandomNumberInRange(0, lettersArray.length - 1);
    let randomEquivalentIndex = getRandomNumberInRange(
      0,
      lettersArray[randomCharIndex].equivalents.length - 1
    );
    values.push(
      lettersArray[randomCharIndex].equivalents[randomEquivalentIndex]
    );
    randomCharIndex = getRandomNumberInRange(0, lettersArray.length - 1);
    randomEquivalentIndex = getRandomNumberInRange(
      0,
      lettersArray[randomCharIndex].equivalents.length - 1
    );
    values.push(
      lettersArray[randomCharIndex].equivalents[randomEquivalentIndex]
    );
    randomCharIndex = getRandomNumberInRange(0, lettersArray.length - 1);
    randomEquivalentIndex = getRandomNumberInRange(
      0,
      lettersArray[randomCharIndex].equivalents.length - 1
    );
    values.push(
      lettersArray[randomCharIndex].equivalents[randomEquivalentIndex]
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
      randomEquivalentIndex = getRandomNumberInRange(
        0,
        formValues.selectedCharacters[currentCharIndex].equivalents.length - 1
      );
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
    setIsModalVisible(false);
    setCurrentCharIndex(0);
    setIsHelperCalled(false);
    setProgress(0);
    setThrowOutIncorrect(false);
    setGameCompleted(false);
    setReqSent(false);
  };

  const updateUserStats = (status: Status, points: number = 0) => {
    if (currentUser && !reqSent) {
      setReqSent((prevValue: boolean) => !prevValue);
      return updateUserData({
        userUid: currentUser.uid,
        characters: formValues.characters,
        gameMode: SCREENS.GAME_MODE_TWO,
        status,
        points: points,
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
      return `You've won ${points} points.`;
    }
    if (counter === 0) {
      updateUserStats(Status.TIMEOUT);
      return "You have run out of time";
    }
    if (throwOutIncorrect) {
      updateUserStats(Status.INCORRECT);
      return "You have entered an incorrect value.";
    }
  };

  // ToDo: randomize the order of appearing characters
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
                  stylesButton={styles.modalBackButton}
                  title="Back to selection"
                />
                <CustomizableButton
                  onPress={() => startAgainWithCurrentSettings()}
                  stylesButton={styles.modalTryAgainButton}
                  title="Try again"
                />
              </View>
            }
            headerTitle={
              throwOutIncorrect || counter === 0 ? "Oh no!" : "Congratulations!"
            }
            headerText={
              (
                <>
                  <Text>{getModalHeaderTextAndUpdateUser()}</Text>
                  {"\n"}
                  {isHelperCalled && !(counter === 0) && (
                    <Text>Points resetted to 0 because of using help.</Text>
                  )}
                </>
              ) ?? ""
            }
          />
        )}
        {!(counter === 0) && !gameCompleted && !throwOutIncorrect && (
          <>
            <View style={styles.characterBox}>
              <Text
                style={{
                  fontSize:
                    formValues.selectedCharacters[currentCharIndex].letter
                      .length > 0
                      ? 50
                      : 150,
                }}
              >
                {formValues.selectedCharacters[currentCharIndex].letter}
              </Text>
            </View>
            <View style={{ margin: 5 }}>
              <Text style={styles.counterNumber}>{counter}</Text>
            </View>
            {/* ToDo: try to remove the view style */}
            <View style={STANDARDISED_STYLES.CENTER_CONTENT as ViewStyle}>
              <ProgressPie
                color={COLOR_COMBINATION_1.ORANGE}
                progress={progress * 0.01}
                size={50}
              />
            </View>
            <View>
              <Text style={styles.chooseAnswerText}>
                Choose a correct answer
              </Text>
              <ButtonGroup
                buttons={buttonGroupValues}
                onPress={(buttonIndex: number) => updateButtons(buttonIndex)}
              />
            </View>
            <View style={styles.helperContainer}>
              <CustomizableButton
                onPress={() => {
                  setIsHelperCalled(true);
                  setIsModalVisible(true);
                }}
                title="Help"
                stylesText={styles.helpButton}
                stylesButton={styles.helpButton}
              />
            </View>
            <Modal
              isModalVisible={isModalVisible}
              footerComponent={
                <View>
                  <CustomizableButton
                    onPress={() =>
                      setIsModalVisible((prevValue: boolean) => !prevValue)
                    }
                    stylesButton={styles.modalContinueButton}
                    title="Continue"
                  />
                </View>
              }
              headerTitle="Help"
              headerText={
                <Text>
                  Ability to earn points for this round{" "}
                  <Text style={styles.underlinedText}>removed.</Text>
                  {"\n"}
                  {"\n"} Suggested solutions:{"\n"}
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
  modalBackButton: {
    marginTop: 10,
    height: 50,
    ...STANDARDISED_STYLES.CENTER_CONTENT,
    ...STANDARDISED_STYLES.BUTTON,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  } as any,
  modalTryAgainButton: {
    marginTop: 10,
    height: 50,
    ...STANDARDISED_STYLES.CENTER_CONTENT,
    ...STANDARDISED_STYLES.BUTTON,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  } as any,
  characterBox: {
    width: 200,
    height: 200,
    backgroundColor: "#DFDFD9",
    borderStyle: "solid",
    borderWidth: 5,
    borderColor: "#F7B42F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  counterNumber: {
    alignSelf: "center",
    color: "#F7B42F",
  },
  chooseAnswerText: {
    color: COLOR_COMBINATION_1.ORANGE,
    textAlign: "center",
  },
  helperContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
  },
  helpButton: {
    color: "white",
    textDecorationLine: "underline",
  },
  modalContinueButton: {
    marginTop: 10,
    height: 50,
    ...STANDARDISED_STYLES.CENTER_CONTENT,
    ...STANDARDISED_STYLES.BUTTON,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  } as any,
  underlinedText: {
    textDecorationLine: "underline",
  },
});
