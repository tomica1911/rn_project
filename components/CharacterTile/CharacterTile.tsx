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
            backgroundColor: selected ? '#96A5D0' : "white",
            height: 50,
            width: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 0.5,
        }}>
            <Text>{character}</Text>
        </Pressable>
    );
};