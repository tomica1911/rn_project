import { StyleSheet, View } from "react-native";
import { ButtonGroup } from "@rneui/themed";
import { SCREENS } from "../../constants";

import React from "react";
import { AppLayout } from "../../components/AppLayout/AppLayout";
import {buttonStyle, COLOR_COMBINATION_1} from "../../styles/styles";

//ToDo: add locale

//ToDo: add types to navigation
export const MainMenu = ({ navigation }: any): JSX.Element => {
  const buttonTitles = Object.values(SCREENS);
  return (
      <View style={styles.container}>
        <ButtonGroup
          onPress={(buttonIndex) =>
            navigation.navigate(buttonTitles[buttonIndex])
          }
          vertical
          textStyle={{ color: "black" }}
          containerStyle={styles.buttons}
          buttons={buttonTitles}
        />
        {/*<GameSelection />*/}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_COMBINATION_1.COLOR_BLACK,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    ...buttonStyle
  }
});
