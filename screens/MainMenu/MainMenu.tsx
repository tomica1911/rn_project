import { StyleSheet, View, Text, Button } from "react-native";
import { ButtonGroup } from "@rneui/themed";
import { SCREENS } from "../../constants";

import React, { useEffect, useMemo, useState } from "react";
import { STANDARDISED_STYLES } from "../../styles/styles";
import { COLOR_COMBINATION_1 } from "../../styles/styles";
import { AppLayout } from "../../components/AppLayout/AppLayout";
import { TipsOfTheDay } from "../../constants";
import { useAuth } from "../../contexts/authContext";
// import {
//   InterstitialAd,
//   AdEventType,
//   TestIds,
// } from "react-native-google-mobile-ads";
//
// const adUnitId = TestIds.INTERSTITIAL;
//
// const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ["fashion", "clothing"],
// });

export const MainMenu = ({ navigation }: any): JSX.Element => {
  const { currentUser } = useAuth();
  // const [loaded, setLoaded] = useState(false);
  const getTipindex = useMemo(() => {
    const currDayOfTheMonth = new Date().getDate();
    const currentDayOfTheMonthString = currDayOfTheMonth.toString();

    if (parseInt(currentDayOfTheMonthString) > 9) {
      return parseInt(currentDayOfTheMonthString[1]);
    } else {
      return parseInt(currentDayOfTheMonthString[0]);
    }
  }, []);

  // useEffect(() => {
  //   const unsubscribe = interstitial.addAdEventListener(
  //     AdEventType.LOADED,
  //     () => {
  //       setLoaded(true);
  //     }
  //   );
  //
  //   // Start loading the interstitial straight away
  //   interstitial.load();
  //
  //   // Unsubscribe from events on unmount
  //   return unsubscribe;
  // }, []);

  const buttonTitles = Object.values(SCREENS).filter(
    (screenName) =>
      screenName !== SCREENS.MAIN &&
      screenName !== SCREENS.GAME_MODE_ONE &&
      screenName !== SCREENS.GAME_MODE_TWO
  );

  const buttons = currentUser
    ? buttonTitles.filter(
        (screenName) =>
          screenName !== SCREENS.SIGNUP && screenName !== SCREENS.LOGIN
      )
    : buttonTitles.filter((screenName) => !(screenName === SCREENS.LOGOUT));

  return (
    <AppLayout>
      {/*<Button*/}
      {/*  title="Show Interstitial"*/}
      {/*  onPress={() => {*/}
      {/*    // interstitial.show();*/}
      {/*  }}*/}
      {/*/>*/}
      <View style={styles.quoteBox}>
        <Text style={styles.quoteHeadline}>Quote of the day:</Text>
        <Text style={styles.quoteText}>{TipsOfTheDay[getTipindex]}</Text>
      </View>
      <View style={styles.container}>
        <ButtonGroup
          onPress={(buttonIndex) => navigation.navigate(buttons[buttonIndex])}
          vertical
          textStyle={styles.buttonGroup}
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
  quoteText: {
    textAlign: "center",
    marginLeft: 30,
    marginRight: 30,
    overflow: "hidden",
    marginTop: 5,
    marginBottom: 20,
  },
  quoteBox: {
    backgroundColor: COLOR_COMBINATION_1.ORANGE,
    width: 300,
    borderRadius: 20,
    height: 100,
    borderWidth: 5,
    borderColor: "white",
  },
  quoteHeadline: {
    textAlign: "center",
  },
  buttonGroup: {
    color: "black",
  },
});

//ToDos
//______________________________________________________________________________________________________________________
// ToDo: warn user about exiting the app with pressing back button
// ToDo: Add snapshot & unit tests
// ToDo: Do all the ToDos
// ToDo: Make sure the app is compatible for iphone users
// ToDo: Send emails to registered users
// ToDo: Add push notifications
// ToDo: Add ability to play games with friends
// ToDo: add locale
// ToDo: add types to navigation
