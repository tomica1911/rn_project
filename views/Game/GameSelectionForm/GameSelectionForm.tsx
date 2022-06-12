import React, {useState} from 'react';
import {GameSelectionState} from "../GameSelection/GameSelection";
import {Picker} from '@react-native-community/picker';
import {AvailableCharacters, CharacterObject, characters} from "../../../characters";
import {FlatList, Text, View} from 'react-native';
import {CustomizableButton} from "../../../components/CustomizableButton/CustomizableButton";
import {CharacterTile} from "../../../components/CharacterTile/CharacterTile";

interface GameSelectionFormProps {
    // ToDo: remove function types and add more appropriate ones
    setStartGame: Function,
    setValues: Function,
    values: GameSelectionState
}

//ToDo: add return type to the component (GameSelectionFormProps)
export const GameSelectionForm = ({setStartGame, setValues, values}: any) => {
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
            setValues({...values, [key]: value});
        };

    const renderDurationPickerItems = () => {
        const menuInputItems = [];

        for (let i = 0; i < 30; i++) {
            if (i % 2 == 0) {
                menuInputItems.push(<Picker.Item key={`key${i}`} label={(i + 2).toString()} value={i}/>)
            }
        }

        return menuInputItems.map(item => item);
    }

    return (
        <>
            {!characters || !userData ? (<p>loading...</p>) : (
                <>
                    <Text>Characters</Text>
                    <Picker
                        selectedValue={Object.values((AvailableCharacters))[0]}
                        style={{width: 200, backgroundColor: "white"}}
                        onValueChange={(itemValue) => handleChange("characters", itemValue)}>
                        {availableCharacters.map(key => <Picker.Item key={key} label={key} value={key}/>)}
                    </Picker>
                    <Text>Select characters which you would like to practice</Text>
                    <View style={{
                        height: 200,
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
                                selected={values.selectedCharacters.includes(item)} character={item.letter}
                                onPress={() => {
                                    if (values.selectedCharacters.includes(item.letter)) {
                                        return setValues((prevValues: GameSelectionState) => {
                                            const withoutToBeRemoved = prevValues.selectedCharacters.filter(charObj => charObj.letter !== item.letter);
                                            return {
                                                ...prevValues,
                                                selectedCharacters: [
                                                    ...withoutToBeRemoved
                                                ]
                                            }
                                        })
                                    }
                                    return setValues((prevValues: GameSelectionState) => {
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
                    <Text>Selected characters</Text>
                    <View style={{
                        height: 200,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <FlatList
                            persistentScrollbar
                            keyExtractor={(item, index) => item.letter + index}
                            numColumns={5}
                            data={values.selectedCharacters}
                            renderItem={({item}) => <CharacterTile character={item.letter} onPress={() => {
                                const filteredSelectedCharacters = values.selectedCharacters.filter((charObj: CharacterObject) => item.letter !== charObj.letter)
                                setValues({
                                    ...values,
                                    selectedCharacters: [
                                        ...filteredSelectedCharacters
                                    ]
                                })
                            }}/>}
                            style={{width: "100%"}}
                        />
                    </View>
                    <Picker
                        selectedValue={Object.values((AvailableCharacters))[0]}
                        style={{width: 200, backgroundColor: "white"}}
                        onValueChange={(itemValue) => handleChange("characters", itemValue)}>
                        <Picker.Item key="key1" label="Game Mode 1" value={1}/>
                        <Picker.Item key="key2" label="Game Mode 2" value={2}/>
                    </Picker>
                    <Picker
                        selectedValue={Object.values((AvailableCharacters))[0]}
                        style={{width: 200, backgroundColor: "white"}}
                        onValueChange={(itemValue) => handleChange("characters", itemValue)}>
                        {renderDurationPickerItems()}
                    </Picker>
                    <CustomizableButton
                        onPress={() => {
                            if (values.selectedCharacters.length === 0) {
                                return setError('Please select a few characters');
                            }
                            setStartGame(true);
                        }}
                        stylesButton={{
                            // color: "white",
                            marginTop: 1,
                            marginLeft: 5,
                            marginRight: 5,
                            marginBottom: 1,
                            height: 150,
                            backgroundColor: "#3E5494",
                            // ':hover': {
                            //     backgroundColor: "#5370C7",
                            // }
                        }}
                        title="Play"/>
                </>
            )}
        </>
    );
};