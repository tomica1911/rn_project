import {View, Text} from 'react-native';
import {useEffect, useState} from "react";
import {GameSelectionState} from '../GameSelection/GameSelection';
import * as Progress from 'react-native-progress';
import {characters as charDB} from '../../../characters';
import {getRandomNumberInRange} from "../../../utils/utils";
import {CustomizableButton} from "../../../components/CustomizableButton/CustomizableButton";

// add appropriate type here
type GameModeOneTwoProps = {
    setStartGame: Function
} & GameSelectionState;

export const Game = ({
                         characters,
                         duration,
                         selectedCharacters,
                         selectedGameMode,
                         setStartGame
                     }: GameModeOneTwoProps): JSX.Element => {
    const [tileDuration, setTileDuration] = useState<number>(duration);
    const [radioButtonValues, setRadioButtonValues] = useState<string[]>([]);
    const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
    const [progress, setProgress] = useState(0);
    const [timeoutGame, setTimeoutGame] = useState<boolean>(false);
    const [throwOutIncorrect, setThrowOutIncorrect] = useState<boolean>(false);
    const [gameCompleted, setGameCompleted] = useState<boolean>(false);
    // replace this input ref
    // const inputRef = useRef<HTMLInputElement>(null);
    let timer: NodeJS.Timeout;
    //
    // useEffect(() => {
    //     console.log(selectedCharacters[currentCharIndex].equivalents);
    // })
    //
    //
    // if (selectedGameMode === "GameModeTwo") {
    //     useEffect(() => {
    //         setValuesForRadioButton();
    //     }, [currentCharIndex])
    // }
    //
    // useEffect(() => {
    //     if (tileDuration !== 0) {
    //         timer = setTimeout(() => setTileDuration(tileDuration - 1)
    //             , 1000);
    //     } else {
    //         // ToDo: remove If condition here
    //         if ((currentCharIndex + 1) < selectedCharacters.length) {
    //             setTimeoutGame(true);
    //         }
    //     }
    // });
    //
    // // ToDo: component seems to rerender too many times after user finishes playing, try to reduce the number of rerenders
    // ToDo: gotten points should be dependent on how long a user was in a chosen game(replace instead of 100)...
    const getPoints = (durationOfGame: number, numberOfSelectedChars: number) => {
        return (numberOfSelectedChars * 100 / duration * 1) * 100;
    }
    //
    // const setValuesForRadioButton = (): void => {
    //     const values = [];
    //     let randomCharIndex = getRandomNumberInRange(0, charDB[characters].length - 1);
    //     let randomEquivalentIndex = getRandomNumberInRange(0, charDB[characters][randomCharIndex].equivalents.length - 1);
    //     values.push(charDB[characters][randomCharIndex].equivalents[randomEquivalentIndex])
    //     randomCharIndex = getRandomNumberInRange(0, charDB[characters].length - 1);
    //     randomEquivalentIndex = getRandomNumberInRange(0, charDB[characters][randomCharIndex].equivalents.length - 1);
    //     values.push(charDB[characters][randomCharIndex].equivalents[randomEquivalentIndex]);
    //     randomCharIndex = getRandomNumberInRange(0, charDB[characters].length - 1);
    //     randomEquivalentIndex = getRandomNumberInRange(0, charDB[characters][randomCharIndex].equivalents.length - 1);
    //     values.push(charDB[characters][randomCharIndex].equivalents[randomEquivalentIndex]);
    //     let notFound: boolean = true;
    //     for (let i = 0; i < selectedCharacters[currentCharIndex].equivalents.length; i++) {
    //         if (values.includes(selectedCharacters[currentCharIndex].equivalents[i])) {
    //             notFound = false;
    //         }
    //     }
    //     if (notFound) {
    //         values[getRandomNumberInRange(0, values.length - 1)] = selectedCharacters[currentCharIndex].equivalents[randomEquivalentIndex];
    //     }
    //     setRadioButtonValues(values);
    // }
    //
    // function handleChange(enteredValue: string) {
    //     if (selectedCharacters[currentCharIndex].equivalents.includes(enteredValue)) {
    //         if ((currentCharIndex + 1) <= selectedCharacters.length) {
    //             // ToDo: think about what should happen at the end
    //             if ((currentCharIndex + 1) == selectedCharacters.length) {
    //                 setGameCompleted(true);
    //             } else {
    //                 setCurrentCharIndex(prevCurrentIndex => prevCurrentIndex + 1);
    //                 // inputRef.current.value = '';
    //                 setTileDuration(duration);
    //                 setProgress(((currentCharIndex + 1) / selectedCharacters.length) * 100);
    //                 clearTimeout(timer);
    //             }
    //         }
    //     }
    // }
    //
    // // ToDo: add some proper typings and refactor this function and the function above
    // const updateRadioSelection = (event: any) => {
    //     if (selectedCharacters[currentCharIndex].equivalents.includes(event.target.value)) {
    //         if ((currentCharIndex + 1) <= selectedCharacters.length) {
    //             // ToDo: think about what should happen at the end
    //             if ((currentCharIndex + 1) == selectedCharacters.length) {
    //                 setGameCompleted(true)
    //             } else {
    //                 setCurrentCharIndex(prevCurrentIndex => prevCurrentIndex + 1);
    //                 clearTimeout(timer);
    //                 setTileDuration(duration);
    //                 setProgress(((currentCharIndex + 1) / selectedCharacters.length) * 100);
    //             }
    //         }
    //     } else {
    //         setThrowOutIncorrect(true);
    //         setProgress(0);
    //         setCurrentCharIndex(0);
    //         setTileDuration(duration);
    //     }
    // };
    //
    const startAgainWithCurrentSettings = () => {
        setTileDuration(duration);
        setCurrentCharIndex(0);
        setProgress(0);
        setTimeoutGame(false);
        setThrowOutIncorrect(false);
        setGameCompleted(false);
    }

    return (
        <View>
            <Text>Hehe</Text>
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
                    {/*{selectedGameMode === "GameModeOne" &&*/}
                    {/*    (*/}
                    {/*        <View style={{margin: 5}}>*/}
                    {/*            <TextField inputRef={inputRef} id="outlined-search" label="Answer"*/}
                    {/*                       onChange={(e) => handleChange(e.target.value)}/>*/}
                    {/*        </View>*/}
                    {/*    )}*/}
                    <Progress.Pie progress={progress * 0.01} size={50}/>
                    {/* ToDo: find simpler way - index number should not be used in radioButtonValues */}
                    {/*{selectedGameMode === "GameModeTwo" && (<FormControl sx={{margin: "0 auto"}}>*/}
                    {/*    <FormLabel>Choose a correct answer</FormLabel>*/}
                    {/*    <RadioGroup*/}
                    {/*        row*/}
                    {/*        onChange={updateRadioSelection}*/}
                    {/*    >*/}
                    {/*        <FormControlLabel*/}
                    {/*            value={radioButtonValues[0]}*/}
                    {/*            control={<Radio/>}*/}
                    {/*            label={radioButtonValues[0] ?? "A"}*/}
                    {/*        />*/}
                    {/*        <FormControlLabel*/}
                    {/*            value={radioButtonValues[1]}*/}
                    {/*            control={<Radio/>}*/}
                    {/*            label={radioButtonValues[1] ?? "E"}*/}
                    {/*        />*/}
                    {/*        <FormControlLabel label={radioButtonValues[2] ?? "I"} value={radioButtonValues[2]}*/}
                    {/*                          control={<Radio/>}/>*/}
                    {/*    </RadioGroup>*/}
                    {/*</FormControl>)}*/}
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