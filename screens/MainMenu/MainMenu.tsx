import { StyleSheet, View, Text } from "react-native";
import { ButtonGroup } from "@rneui/themed";
import { SCREENS } from "../../constants";

import React, { useMemo } from "react";
import { STANDARDISED_STYLES } from "../../styles/styles";
import { COLOR_COMBINATION_1 } from "../../styles/styles";
import { useAuth } from "../../contexts/authContext";
import { AppLayout } from "../../components/AppLayout/AppLayout";
import { TipsOfTheDay } from "../../constants";

//ToDo: add locale

//ToDo: add types to navigation
export const MainMenu = ({ navigation }: any): JSX.Element => {
  const {
    //@ts-expect-error
    currentUser,
  } = useAuth();

  const getTipindex = useMemo(() => {
    const currDayOfTheMonth = new Date().getDate();
    const currentDayOfTheMonthString = currDayOfTheMonth.toString();

    if (parseInt(currentDayOfTheMonthString) > 9) {
      return parseInt(currentDayOfTheMonthString[1]);
    } else {
      return parseInt(currentDayOfTheMonthString[0]);
    }
  }, []);

  const buttonTitles = Object.values(SCREENS);
  const buttons = !currentUser
    ? buttonTitles.filter(
        (screenName) =>
          !(
            screenName === SCREENS.LOGOUT ||
            screenName === SCREENS.PROFILE ||
            screenName === SCREENS.DASHBOARD ||
            screenName === SCREENS.ACHIEVEMENTS
          )
      )
    : buttonTitles.filter(
        (screenName) =>
          !(screenName === SCREENS.LOGIN || screenName === SCREENS.SIGNUP)
      );

  // ToDo: warn user about exiting the app with pressing back button
  // ToDo: Add snapshot & unit tests
  // ToDo: Do all the ToDos
  // ToDo: Make sure the app is compatible for iphone users
  // ToDo: Send emails to registered users
  // ToDo: Add push notifications
  // ToDo: Add ability to play games with friends
  return (
    <AppLayout>
      <View
        style={{
          backgroundColor: COLOR_COMBINATION_1.ORANGE,
          width: 300,
          borderRadius: 20,
          height: 100,
          borderWidth: 5,
          borderColor: "white",
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          Tip of the day:
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginLeft: 30,
            marginRight: 30,
            overflow: "hidden",
            marginTop: 5,
            marginBottom: 20,
          }}
        >
          {TipsOfTheDay[getTipindex]}
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
