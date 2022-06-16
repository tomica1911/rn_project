import React, {useState} from 'react';
import {GameSelectionState} from "../GameSelection/GameSelection";
import {Picker} from '@react-native-community/picker';
import {AvailableCharacters, CharacterObject, characters} from "../../../characters";
import {FlatList, Text, View} from 'react-native';
import {CustomizableButton} from "../../../components/CustomizableButton/CustomizableButton";
import {CharacterTile} from "../../../components/CharacterTile/CharacterTile";

interface GameSelectionFormProps {
    //ToDo: check if all values from GameSelectionState are needed here and rename it to GameSelectionStateProps
    formValues: GameSelectionState & {
        setStartGame: (arg: boolean) => void,
        //ToDo: define proper type for any
        setFormValues: (arg: any) => void
    }
}

//ToDo: add return type to the component (GameSelectionFormProps)
export const GameSelectionForm = ({formValues}: GameSelectionFormProps) => {
    //ToDo: make commented lines of code work
    // @ts-ignore
    // const {userData} = useFirestore();
    const userData = {};
    const [error, setError] = useState<string>('');
    // @ts-ignore
    // const {characters} = useFirestore();

    const availableCharacters = Object.values((AvailableCharacters));
    // ToDo: add appropriate value to any
    const handleChange =
        (key: keyof GameSelectionState, value: any) => {
            formValues.setFormValues({...formValues, [key]: value});
        };

    // ToDo: see if this can be refactored
    const renderDurationPickerItems = () => {
        const menuInputItems = [];

        for (let i = 0; i < 30; i++) {
            if (i % 2 == 0) {
                menuInputItems.push(<Picker.Item key={`key${i}`} label={(i + 2).toString()} value={i+2}/>)
            }
        }

        return menuInputItems.map(item => item);
    }

    const buttonColor = "#F7B42F"

    return (
        <>
            {!characters || !userData ? (<p>loading...</p>) : (
                <>
                    <Text style={{fontSize: 20, marginTop: 10, marginBottom: 10, color: buttonColor}}>Characters</Text>
                    <Picker
                        selectedValue={Object.values((AvailableCharacters))[0]}
                        style={{width: 200, backgroundColor: "white"}}
                        onValueChange={(itemValue) => handleChange("characters", itemValue)}>
                        {availableCharacters.map(key => <Picker.Item key={key} label={key} value={key}/>)}
                    </Picker>
                    <Text style={{fontSize: 20, marginTop: 10, marginBottom: 10, color: buttonColor}}>Select characters which you would like
                        to practice</Text>
                    <View style={{
                        height: 100,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <FlatList
                            persistentScrollbar
                            keyExtractor={(item, index) => item.letter + index}
                            numColumns={5}
                            data={characters.Hiragana}
                            renderItem={({item}) => <CharacterTile
                                selected={formValues.selectedCharacters.includes(item)} character={item.letter}
                                onPress={() => {
                                    if (formValues.selectedCharacters.includes(item)) {
                                        return formValues.setFormValues((prevValues: GameSelectionState) => {
                                            const withoutToBeRemoved = prevValues.selectedCharacters.filter(charObj => charObj.letter !== item.letter);
                                            return {
                                                ...prevValues,
                                                selectedCharacters: [
                                                    ...withoutToBeRemoved
                                                ]
                                            }
                                        })
                                    }
                                    return formValues.setFormValues((prevValues: GameSelectionState) => {
                                        const duplicate = prevValues.selectedCharacters.find((el: CharacterObject) => el.letter === item.letter);
                                        if (!duplicate) {
                                            return {
                                                ...prevValues,
                                                selectedCharacters: [
                                                    ...prevValues.selectedCharacters,
                                                    item
                                                ]
                                            }
                                        }
                                        return {
                                            ...prevValues
                                        }
                                    })
                                }}/>}
                            style={{width: "100%"}}
                        />
                    </View>
                    <Text style={{fontSize: 20, marginTop: 10, marginBottom: 10, color: buttonColor}}>Selected characters</Text>
                    <View style={{
                        height: 100,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <FlatList
                            persistentScrollbar
                            keyExtractor={(item, index) => item.letter + index}
                            numColumns={5}
                            data={formValues.selectedCharacters}
                            renderItem={({item}) => <CharacterTile character={item.letter} onPress={() => {
                                const filteredSelectedCharacters = formValues.selectedCharacters.filter((charObj: CharacterObject) => item.letter !== charObj.letter)
                                formValues.setFormValues({
                                    ...formValues,
                                    selectedCharacters: [
                                        ...filteredSelectedCharacters
                                    ]
                                })
                            }}/>}
                            style={{width: "100%"}}
                        />
                    </View>
                    <Text style={{fontSize: 20, marginTop: 10, marginBottom: 10, color: buttonColor}}>Select game mode</Text>
                    <Picker
                        selectedValue={formValues.selectedGameMode}
                        style={{width: 200, backgroundColor: "white"}}
                        onValueChange={(gameMode) => handleChange("selectedGameMode", gameMode)}>
                        <Picker.Item key="key1" label="Game Mode 1" value={1}/>
                        <Picker.Item key="key2" label="Game Mode 2" value={2}/>
                    </Picker>
                    <Text style={{fontSize: 20, marginTop: 10, marginBottom: 10, color: buttonColor}}>Select duration</Text>
                    <Picker
                        selectedValue={formValues.duration}
                        style={{width: 200, backgroundColor: "white"}}
                        onValueChange={(duration) => handleChange("duration", duration)}>
                        {renderDurationPickerItems()}
                    </Picker>
                    <CustomizableButton
                        onPress={() => {
                            if (formValues.selectedCharacters.length === 0) {
                                return setError('Please select a few characters');
                            }
                            formValues.setStartGame(true);
                        }}
                        stylesButton={{
                            marginTop: 10,
                            width: 250,
                            height: 50,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 10,
                            marginLeft: 5,
                            marginRight: 5,
                            backgroundColor: "#F7B42F",
                        }}
                        title="Play"/>
                </>
            )}
        </>
    );
};