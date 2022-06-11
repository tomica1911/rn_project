import React from 'react';
import {Pressable, View, Text} from "react-native";

export interface CharacterTileProps {
    character: string,
    onClick: Function,
    selected?: boolean
}

export const CharacterTile = ({character, onClick, selected}: CharacterTileProps): JSX.Element => {
    return (
        <Pressable
            onPress={() => onClick}
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