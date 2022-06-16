import { View, Text, TextInput, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { GameSelectionState } from "../GameSelection/GameSelection";
import * as Progress from "react-native-progress";
import { CustomizableButton } from "../../../components/CustomizableButton/CustomizableButton";
import { useCountdown } from "usehooks-ts";

type GameModeOneProps = {
  //ToDo: take setStartGame (that after &) from one place
  formValues: Omit<GameSelectionState, "characters" | "selectedGameMode"> & {
    setStartGame: (arg: boolean) => void;
  };
};

export const GameMode1 = ({ formValues }: GameModeOneProps): JSX.Element => {
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [timeoutGame, setTimeoutGame] = useState<boolean>(false);
  const [throwOutIncorrect, setThrowOutIncorrect] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [textInputValue, setTextInputValue] = useState<string>("");
  const [
    counter,
    { start: startCountdown, stop: stopCountdown, reset: resetCountdown },
  ] = useCountdown({
    seconds: formValues.duration,
    interval: 1000,
    isIncrement: false,
  });

  useEffect(() => {
    startCountdown();
  }, []);

  console.log(formValues.selectedCharacters[currentCharIndex].equivalents);

  // ToDo: component seems to rerender too many times after user finishes playing, try to reduce the number of rerender
  // ToDo: gotten points should be dependent on how long a user was in a chosen game(replace instead of 100)...
  // const getPoints = (durationOfGame: number, numberOfSelectedChars: number) => {
  //     return (numberOfSelectedChars * 100 / formValues.duration) * 100;
  // }

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
    setTimeoutGame(false);
    setThrowOutIncorrect(false);
    setGameCompleted(false);
  };

  // refactor this
  const buttonColor = "#F7B42F";

  return (
    <ScrollView>
      {/*{throwOutIncorrect && (<Text>*/}
      {/*    Oh no, you have provided an incorrect answer!*/}
      {/*</Text>)}*/}
      {/*{(timeoutGame && !throwOutIncorrect) && (<Text>*/}
      {/*    Oh no, time has run out!*/}
      {/*</Text>)}*/}
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
            <Text style={{ alignSelf: "center", color: "#F7B42F" }}>
              {counter}
            </Text>
          </View>
          <View
            style={{
              margin: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: buttonColor }}>Answer</Text>
            {/*ToDo: Define layout component and set width to maximum*/}
            <TextInput
              value={textInputValue}
              style={{ backgroundColor: "white", width: 150 }}
              onChangeText={(answer: string) => handleTextInputChange(answer)}
            />
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
          marginTop: 1,
          height: 50,
          backgroundColor: "#F7B42F",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </ScrollView>
  );
};
