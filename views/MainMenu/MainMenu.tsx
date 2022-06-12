import { View } from 'react-native';
import {ButtonGroup} from "@rneui/themed";
import styles from "./MainMenu.scss";
import { GameSelection } from '../Game/GameSelection/GameSelection';
import React from "react";

export const MainMenu = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <ButtonGroup
                vertical
                textStyle={{color: "black"}}
                containerStyle={{backgroundColor: "#FFFFFF", width: "50%"}}
                buttons={['PLAY', 'DASHBOARD', 'LOGIN', 'LOGOUT', 'SIGN-UP', 'SETTINGS']}
            />
            <GameSelection />
        </View>);
};
