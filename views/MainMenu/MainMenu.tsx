import { View } from 'react-native';
import {ButtonGroup} from "@rneui/themed";
import styles from "./MainMenu.scss";
import {GameSelectionForm} from "../Game/GameSelectionForm/GameSelectionForm";
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
            <GameSelectionForm />
        </View>);
};
