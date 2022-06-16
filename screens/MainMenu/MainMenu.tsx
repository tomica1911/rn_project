import { View } from "react-native";
import { ButtonGroup } from "@rneui/themed";
import { SCREENS } from "../../constants";
import styles from "./MainMenu.scss";

import React from "react";

//ToDo: add locale

//ToDo: add types to navigation
export const MainMenu = ({ navigation }: any): JSX.Element => {
    const buttonTitles = Object.values(SCREENS);
  return (
    <View style={styles.container}>
      <ButtonGroup
        onPress={(buttonIndex) => navigation.navigate(buttonTitles[buttonIndex])}
        vertical
        textStyle={{ color: "black" }}
        containerStyle={{ backgroundColor: "#FFFFFF", width: "50%" }}
        buttons={buttonTitles}
      />
      {/*<GameSelection />*/}
    </View>
  );
};
