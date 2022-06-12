import {View, Text, TextInput} from 'react-native';
import {useEffect, useRef, useState} from "react";
import {GameSelectionState} from '../GameSelection/GameSelection';
import * as Progress from 'react-native-progress';
import {characters as charDB} from '../../../characters';
import {getRandomNumberInRange} from "../../../utils/utils";
import {ButtonGroup} from '@rneui/themed'
import {CustomizableButton} from "../../../components/CustomizableButton/CustomizableButton";

type GameModeOneTwoProps = {
    setStartGame: () => void
} & GameSelectionState;

export const Game = ({
                         characters,
                         duration,
                         selectedCharacters,
                         selectedGameMode,
                         setStartGame
                     }: GameModeOneTwoProps): JSX.Element => {
    const [tileDuration, setTileDuration] = useState<number>(duration);
    const [buttonGroupValues, setButtonGroupValues] = useState<string[]>([]);
    const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
    const [progress, setProgress] = useState(0);
    const [timeoutGame, setTimeoutGame] = useState<boolean>(false);
    const [throwOutIncorrect, setThrowOutIncorrect] = useState<boolean>(false);
    const [gameCompleted, setGameCompleted] = useState<boolean>(false);
    const textInputRef = useRef(null);
    let timer: NodeJS.Timeout;

    useEffect(() => {
        if (selectedGameMode === "GameModeTwo") {
            setValuesForButtonGroup();
        }
    }, [currentCharIndex])

    useEffect(() => {
        if (tileDuration !== 0) {
            timer = setTimeout(() => setTileDuration(tileDuration - 1)
                , 1000);
        } else {
            // ToDo: remove If condition here
            if ((currentCharIndex + 1) < selectedCharacters.length) {
                setTimeoutGame(true);
            }
        }
    });

    // ToDo: component seems to rerender too many times after user finishes playing, try to reduce the number of rerenders
    // ToDo: gotten points should be dependent on how long a user was in a chosen game(replace instead of 100)...
    const getPoints = (durationOfGame: number, numberOfSelectedChars: number) => {
        return (numberOfSelectedChars * 100 / duration * 1) * 100;
    }

    function handleTextInputChange(enteredValue: string) {
        if (selectedCharacters[currentCharIndex].equivalents.includes(enteredValue)) {
            if ((currentCharIndex + 1) <= selectedCharacters.length) {
                // ToDo: think about what should happen at the end
                if ((currentCharIndex + 1) == selectedCharacters.length) {
                    setGameCompleted(true);
                } else {
                    setCurrentCharIndex(prevCurrentIndex => prevCurrentIndex + 1);
                    // ToDo: remove @ts-ignore
                    // @ts-ignore
                    textInputRef.current.clear();
                    setTileDuration(duration);
                    setProgress(((currentCharIndex + 1) / selectedCharacters.length) * 100);
                    clearTimeout(timer);
                }
            }
        }
    }

    //
    // ToDo: add some proper typings and refactor this function and the function above
    const updateButtons = (buttonIndex: number) => {
        if (selectedCharacters[currentCharIndex].equivalents.includes(buttonGroupValues[buttonIndex])) {
            if ((currentCharIndex + 1) <= selectedCharacters.length) {
                // ToDo: think about what should happen at the end
                if ((currentCharIndex + 1) == selectedCharacters.length) {
                    setGameCompleted(true)
                } else {
                    setCurrentCharIndex(prevCurrentIndex => prevCurrentIndex + 1);
                    clearTimeout(timer);
                    setTileDuration(duration);
                    setProgress(((currentCharIndex + 1) / selectedCharacters.length) * 100);
                }
            }
        } else {
            setThrowOutIncorrect(true);
            setProgress(0);
            setCurrentCharIndex(0);
            setTileDuration(duration);
        }
    };

    selectedGameMode = "1";

    useEffect(() => {
        if (selectedGameMode === "2") {
            setValuesForButtonGroup();
        }
    }, [currentCharIndex])

    const setValuesForButtonGroup = (): void => {
        const values = [];
        let randomCharIndex = getRandomNumberInRange(0, charDB[characters].length - 1);
        let randomEquivalentIndex = getRandomNumberInRange(0, charDB[characters][randomCharIndex].equivalents.length - 1);
        values.push(charDB[characters][randomCharIndex].equivalents[randomEquivalentIndex])
        randomCharIndex = getRandomNumberInRange(0, charDB[characters].length - 1);
        randomEquivalentIndex = getRandomNumberInRange(0, charDB[characters][randomCharIndex].equivalents.length - 1);
        values.push(charDB[characters][randomCharIndex].equivalents[randomEquivalentIndex]);
        randomCharIndex = getRandomNumberInRange(0, charDB[characters].length - 1);
        randomEquivalentIndex = getRandomNumberInRange(0, charDB[characters][randomCharIndex].equivalents.length - 1);
        values.push(charDB[characters][randomCharIndex].equivalents[randomEquivalentIndex]);
        let notFound: boolean = true;
        for (let i = 0; i < selectedCharacters[currentCharIndex].equivalents.length; i++) {
            if (values.includes(selectedCharacters[currentCharIndex].equivalents[i])) {
                notFound = false;
            }
        }
        if (notFound) {
            values[getRandomNumberInRange(0, values.length - 1)] = selectedCharacters[currentCharIndex].equivalents[randomEquivalentIndex];
        }
        console.log("** values");
        console.log(values);
        setButtonGroupValues(values);
    }

    const startAgainWithCurrentSettings = () => {
        setTileDuration(duration);
        setCurrentCharIndex(0);
        setProgress(0);
        setTimeoutGame(false);
        setThrowOutIncorrect(false);
        setGameCompleted(false);
    }

    console.log("*** buttonGroupValues");
    console.log(buttonGroupValues);

    return (
        <View>
            {throwOutIncorrect && (<Text>
                Oh no, you have provided an incorrect answer!
            </Text>)}
            {(timeoutGame && !throwOutIncorrect) && (<Text>
                Oh no, time has run out!
            </Text>)}
            {gameCompleted && (<Text>
                Congratulations, you've
                won <b>{getPoints(duration, selectedCharacters.length).toFixed(0)}</b> points!
            </Text>)}
            {!timeoutGame && !gameCompleted && !throwOutIncorrect && (
                <>
                    <Text>hehe</Text>
                    <View
                        style={{
                            // border: "1px solid black",
                            // margin: "0 auto",
                            width: 200,
                            height: 200,
                            // fontSize: 100,
                            // verticalAlign: "middle",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text>{selectedCharacters[currentCharIndex].letter}</Text>
                    </View>
                    <View style={{margin: 5}}>
                        <Text>{tileDuration}</Text>
                    </View>
                    {selectedGameMode === "1" &&
                        (
                            <View style={{margin: 5}}>
                                <Text>Answer</Text>
                                <TextInput
                                    ref={textInputRef}
                                    onChangeText={(text: string) => handleTextInputChange(text)}/>
                            </View>
                        )}
                    <Progress.Pie progress={progress * 0.01} size={50}/>
                    {selectedGameMode === "2" && (<View>
                        <Text>Choose a correct answer</Text>
                        <ButtonGroup
                            buttons={buttonGroupValues}
                            onPress={(buttonIndex: number) => updateButtons(buttonIndex)}
                        />
                    </View>)}
                </>
            )}
            {(timeoutGame || throwOutIncorrect) && (<CustomizableButton
                title="Try Again"
                onPress={() => startAgainWithCurrentSettings()} stylesButton={{
                color: "white",
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 1,
                marginTop: 1,
                height: 50,
                backgroundColor: "#3E5494",
            }}/>)}
            <CustomizableButton
                onPress={() => setStartGame(false)}
                title="Back to selection"
                stylesButton={{
                    color: "white",
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 1,
                    marginTop: 1,
                    height: 50,
                    backgroundColor: "#3E5494",
                }}/>
        </View>
    );
};