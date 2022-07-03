import { StyleSheet, View, Text } from "react-native";
import { ButtonGroup } from "@rneui/themed";
import { SCREENS } from "../../constants";

import React from "react";
import { STANDARDISED_STYLES } from "../../styles/styles";
import { COLOR_COMBINATION_1 } from "../../styles/styles";
import { useAuth } from "../../contexts/authContext";
import { AppLayout } from "../../components/AppLayout/AppLayout";

//ToDo: add locale

//ToDo: add types to navigation
export const MainMenu = ({ navigation }: any): JSX.Element => {
  const {
    //@ts-expect-error
    currentUser,
  } = useAuth();

  const buttonTitles = Object.values(SCREENS);
  const buttons = !currentUser
    ? buttonTitles.filter((name) => name !== SCREENS.LOGOUT)
    : buttonTitles.filter(
        (name) => !(name === SCREENS.LOGIN || name === SCREENS.SIGNUP)
      );

  return (
    <AppLayout>
      <View
        style={{
          backgroundColor: COLOR_COMBINATION_1.ORANGE,
          width: 300,
          borderRadius: 20,
          height: 80,
          borderWidth: 5,
          borderColor: "white",
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          Tip of the day
        </Text>
        <Text style={{ textAlign: "center", marginLeft: 30, marginRight: 30, overflow: "hidden", marginTop: 5, marginBottom: 20 }}>
          Fortune favors the disciplined
        </Text>
      </View>
      <View style={styles.container}>
        <ButtonGroup
          onPress={(buttonIndex) => navigation.navigate(buttons[buttonIndex])}
          vertical
          textStyle={{ color: "black" }}
          containerStyle={STANDARDISED_STYLES.BUTTON}
          buttons={buttons}
        />
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_COMBINATION_1.BLACK,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
