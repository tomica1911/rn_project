import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { characters as charDB } from "../../../characters";
import {
  getPoints,
  getRandomNumberInRange,
  showInterstitialAd,
} from "../../../utils/utils";
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
import { shuffle } from "lodash";
import {
  playButtonSoundOnExecution,
  playCharacterSound,
} from "../../../utils/soundUtils";
import { useConsentInfo } from "../../../contexts/consentContext";

export const GameMode2 = ({ navigation, route }: any): JSX.Element => {
  const [formValues, setFormValues] = useState(route.params.formValues);
  const [reqSent, setReqSent] = useState<boolean>(false);
  const { adsConsentStatus } = useConsentInfo();
  const [buttonGroupValues, setButtonGroupValues] = useState<string[]>([]);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    if (formValues.playCharacterSounds) {
      playCharacterSound(
        formValues.selectedCharacters[currentCharIndex].characterSet,
        formValues.selectedCharacters[currentCharIndex].id
      );
    }
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
          let nextIndex = 0;
          setCurrentCharIndex((prevCurrentIndex) => {
            nextIndex = prevCurrentIndex + 1;
            return nextIndex;
          });
          setProgress(
            ((currentCharIndex + 1) / formValues.selectedCharacters.length) *
              100
          );
          if (formValues.playCharacterSounds) {
            playCharacterSound(
              formValues.selectedCharacters[nextIndex].characterSet,
              formValues.selectedCharacters[nextIndex].id
            );
          }
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
      showInterstitialAd(adsConsentStatus);
    }
  }, [gameCompleted]);

  useEffect(() => {
    setValuesForButtonGroup();
  }, [currentCharIndex]);

  const setValuesForButtonGroup = (shouldShuffle: boolean = false): void => {
    const values = [];
    const chars = shouldShuffle
      ? shuffle(formValues.selectedCharacters)
      : formValues.selectedCharacters;
    const lettersArray = charDB.filter(
      (arrayItem) => arrayItem.setName === formValues.characterSet
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
    for (let i = 0; i < chars[currentCharIndex].equivalents.length; i++) {
      if (values.includes(chars[currentCharIndex].equivalents[i])) {
        notFound = false;
      }
    }

    if (notFound) {
      randomEquivalentIndex = getRandomNumberInRange(
        0,
        chars[currentCharIndex].equivalents.length - 1
      );
      values[getRandomNumberInRange(0, values.length - 1)] =
        chars[currentCharIndex].equivalents[randomEquivalentIndex];
    }

    if (shouldShuffle) {
      setFormValues({
        ...formValues,
        selectedCharacters: chars,
      });
      if (formValues.playCharacterSounds) {
        playCharacterSound(chars[0].characterSet, chars[0].id);
      }
    }
    setButtonGroupValues(values);
  };

  const startAgainWithCurrentSettings = () => {
    setValuesForButtonGroup(true);
    resetCountdown();
    startCountdown();
    setIsModalVisible(false);
    setCurrentCharIndex(0);
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
        characterSet: formValues.characterSet,
        gameMode: SCREENS.GAME_MODE_TWO,
        trainingMode: formValues.trainingMode,
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

      if (formValues.trainingMode) {
        points = 0;
      }

      updateUserStats(Status.WIN, points);
      return `You've won ${points} points ${
        formValues.trainingMode ? "(training mode)" : ""
      }`;
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
                    playButtonSoundOnExecution(() =>
                      navigation.navigate(SCREENS.PLAY, { subsequent: true })
                    )
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
            headerText={
              <View>
                <Text>{getModalHeaderTextAndUpdateUser()}</Text>
                <View style={{ marginTop: 10 }}>
                  <Text>
                    Daily Goal Status: <Text style={{ fontWeight: "bold" }}>15/150</Text>
                  </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text>
                    Current Goal Streak: <Text style={{ fontWeight: "bold" }}>5 Days</Text>
                  </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text>
                    Bonus points: <Text style={{ fontWeight: "bold" }}>133</Text>
                  </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text>
                    Total points: <Text style={{ fontWeight: "bold" }}>148</Text>
                  </Text>
                </View>
              </View>
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
                Choose a correct answer{"\n"}
              </Text>
              {formValues.trainingMode && (
                <Text style={styles.trainingModeSolutionsText}>
                  {formValues.selectedCharacters[currentCharIndex].equivalents
                    .length > 0
                    ? "Suggested solutions: "
                    : "Suggested solution: "}
                  {"\n"}
                  {formValues.selectedCharacters[
                    currentCharIndex
                  ].equivalents.map((char: string, index: number) =>
                    index ===
                    formValues.selectedCharacters[currentCharIndex].equivalents
                      .length -
                      1
                      ? char
                      : `${char}, `
                  )}
                </Text>
              )}
              <ButtonGroup
                buttons={buttonGroupValues}
                onPress={(buttonIndex: number) => updateButtons(buttonIndex)}
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
  characterBox: {
    marginTop: "50%",
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
  trainingModeSolutionsText: {
    color: COLOR_COMBINATION_1.ORANGE,
    textAlign: "center",
  },
  counterNumber: {
    alignSelf: "center",
    color: "#F7B42F",
  },
  chooseAnswerText: {
    marginTop: 20,
    color: COLOR_COMBINATION_1.ORANGE,
    textAlign: "center",
  },
  underlinedText: {
    textDecorationLine: "underline",
  },
});
