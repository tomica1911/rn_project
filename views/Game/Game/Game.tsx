import {View, Text, TextInput} from 'react-native';
import {createRef, useEffect, useRef, useState} from "react";
import {GameSelectionState} from '../GameSelection/GameSelection';
import * as Progress from 'react-native-progress';
import {characters as charDB} from '../../../characters';
import {getRandomNumberInRange} from "../../../utils/utils";
import {ButtonGroup} from '@rneui/themed'
import {CustomizableButton} from "../../../components/CustomizableButton/CustomizableButton";

type GameModeOneTwoProps = {
    setStartGame: (arg: boolean) => void
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
    const [textInputValue, setTextInputValue] = useState<string>('');
    let timer: NodeJS.Timeout;

    useEffect(() => {
        console.log(selectedCharacters[currentCharIndex]);
        if (selectedGameMode === "2") {
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

    // ToDo: component seems to rerender too many times after user finishes playing, try to reduce the number of rerender
    // ToDo: gotten points should be dependent on how long a user was in a chosen game(replace instead of 100)...
    const getPoints = (durationOfGame: number, numberOfSelectedChars: number) => {
        return (numberOfSelectedChars * 100 / duration) * 100;
    }

    //ToDo: try to trigger this function less often in TextInput component to optimize performance
    function handleTextInputChange(enteredValue: string) {
        setTextInputValue(enteredValue);
        if (selectedCharacters[currentCharIndex].equivalents.includes(enteredValue)) {
            if ((currentCharIndex + 1) <= selectedCharacters.length) {
                // ToDo: think about what should happen at the end
                if ((currentCharIndex + 1) == selectedCharacters.length) {
                    setGameCompleted(true);
                } else {
                    setCurrentCharIndex(prevCurrentIndex => prevCurrentIndex + 1);
                    setTextInputValue('');
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
    // refactor this
    const buttonColor = "#F7B42F"

    return (
        <View>
            {/*{throwOutIncorrect && (<Text>*/}
            {/*    Oh no, you have provided an incorrect answer!*/}
            {/*</Text>)}*/}
            {/*{(timeoutGame && !throwOutIncorrect) && (<Text>*/}
            {/*    Oh no, time has run out!*/}
            {/*</Text>)}*/}
            {gameCompleted && (<Text style={{color: buttonColor, margin: 10}}>
                // ToDo: add number of points
                Congratulations, you've
                won some points!
            </Text>)}
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
                            justifyContent: "center"
                        }}
                    >
                        <Text style={{fontSize: 150}}>{selectedCharacters[currentCharIndex].letter}</Text>
                    </View>
                    <View style={{margin: 5}}>
                        <Text>{tileDuration}</Text>
                    </View>
                    {selectedGameMode === "1" &&
                        (
                            <View style={{
                                margin: 5, display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Text style={{color: buttonColor}}>Answer</Text>
                                {/*ToDo: Define layout component and set width to maximum*/}
                                <TextInput
                                    value={textInputValue}
                                    style={{ backgroundColor: "white", width: 150 }}
                                    onChangeText={(answer: string) => handleTextInputChange((answer))}/>
                            </View>
                        )}
                    <View style={{
                        margin: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Progress.Pie color={buttonColor} progress={progress * 0.01} size={50}/>
                    </View>
                    {selectedGameMode === "2" && (<View>
                        <Text style={{color: buttonColor, textAlign: "center"}}>Choose a correct answer</Text>
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}/>)}
            <CustomizableButton
                onPress={() => setStartGame(false)}
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
                }}/>
        </View>
    );
};