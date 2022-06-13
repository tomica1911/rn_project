import React from 'react';
import {Pressable, Text} from "react-native";

export interface CharacterTileProps {
    character: string,
    onPress: () => void,
    selected?: boolean
}

export const CharacterTile = ({character, onPress, selected}: CharacterTileProps): JSX.Element => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                backgroundColor: selected ? '#F7B42F' : "white",
                height: 50,
                width: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: 0.5,
            }}>
            <Text style={{fontSize: 40}}>{character}</Text>
        </Pressable>
    );
};