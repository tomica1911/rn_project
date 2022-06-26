import { StyleSheet, View } from "react-native";
import { ButtonGroup } from "@rneui/themed";
import { SCREENS } from "../../constants";

import React from "react";
import { STANDARDISED_STYLES } from "../../styles/styles";
import { COLOR_COMBINATION_1 } from "../../styles/styles";

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
        containerStyle={STANDARDISED_STYLES.BUTTON}
        buttons={buttonTitles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_COMBINATION_1.BLACK,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
