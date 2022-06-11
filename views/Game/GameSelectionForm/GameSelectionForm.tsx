import React from 'react';
import {GameSelectionState} from "../GameSelection/GameSelection";
import {Picker} from '@react-native-community/picker';
import {AvailableCharacters, characters} from "../../../characters";
import {FlatList, Button, Text, View} from 'react-native';

interface GameSelectionFormProps {
    // ToDo: remove function types and add more appropriate ones
    setStartGame: Function,
    setValues: Function,
    values: GameSelectionState
}

//ToDo: add return type to the component (GameSelectionFormProps)
export const GameSelectionForm = ({setStartGame, setValues, values}: any) => {
    const availableCharacters = Object.values((AvailableCharacters));
    // ToDo: add appropriate value to any
    const handleChange =
        (key: keyof GameSelectionState, value: any) => {
            setValues({...values, [key]: value});
        };

    const renderDurationPickerItems = () => {
        const menuInputItems = [];

        for (let i = 0; i < 30; i++) {
            if(i%2 == 0){
               menuInputItems.push(<Picker.Item label={(i + 2).toString()} value={i}/>)
            }
        }

        return menuInputItems.map(item => item);
    }

    return (
        <>
            <Text>Characters</Text>
            <Picker
                selectedValue={Object.values((AvailableCharacters))[0]}
                style={{width: 200, backgroundColor: "white"}}
                onValueChange={(itemValue) => handleChange("characters", itemValue)}>
                {availableCharacters.map(key => <Picker.Item label={key} value={key}/>)}
            </Picker>
            {/*<Text>Select characters which you would like to practice</Text>*/}
            {/*<View style={{*/}
            {/*    height: 200,*/}
            {/*    display: "flex",*/}
            {/*    flexDirection: "column",*/}
            {/*    justifyContent: "center"*/}
            {/*}}>*/}
            {/*    <FlatList*/}
            {/*        persistentScrollbar*/}
            {/*        keyExtractor={(item, index) => item.letter + index}*/}
            {/*        numColumns={5}*/}
            {/*        data={characters.hiragana}*/}
            {/*        renderItem={({item}) => <CharacterTile character={item.letter} onClick={() => {*/}
            {/*        }}/>}*/}
            {/*        style={{width: "100%"}}*/}
            {/*    />*/}
            {/*</View>*/}
            {/*<Text>Selected characters</Text>*/}
            {/*<View style={{*/}
            {/*    height: 200,*/}
            {/*    display: "flex",*/}
            {/*    flexDirection: "column",*/}
            {/*    justifyContent: "center"*/}
            {/*}}>*/}
            {/*    <FlatList*/}
            {/*        persistentScrollbar*/}
            {/*        keyExtractor={(item, index) => item.letter + index}*/}
            {/*        numColumns={5}*/}
            {/*        data={characters.hiragana}*/}
            {/*        renderItem={({item}) => <CharacterTile character={item.letter} onClick={() => {*/}
            {/*        }}/>}*/}
            {/*        style={{width: "100%"}}*/}
            {/*    />*/}
            {/*</View>*/}
            {/*<Picker*/}
            {/*    selectedValue={Object.values((AvailableCharacters))[0]}*/}
            {/*    style={{width: 200, backgroundColor: "white"}}*/}
            {/*    onValueChange={(itemValue) => handleChange("characters", itemValue)}>*/}
            {/*    <Picker.Item label="Game Mode 1" value={1}/>*/}
            {/*    <Picker.Item label="Game Mode 2" value={2}/>*/}
            {/*</Picker>*/}
            <Picker
                selectedValue={Object.values((AvailableCharacters))[0]}
                style={{width: 200, backgroundColor: "white"}}
                onValueChange={(itemValue) => handleChange("characters", itemValue)}>
                {renderDurationPickerItems()}
            </Picker>
            <Button onPress={() => {}} title="Play"  />
        </>
    );
};