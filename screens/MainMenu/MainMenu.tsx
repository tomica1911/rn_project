import { Animated, StyleSheet, Text, View } from "react-native";
import { SCREENS, TipsOfTheDay } from "../../constants";
import {
  AdsConsentStatus,
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import React, { FC, useEffect, useMemo } from "react";
import { COLOR_COMBINATION_1 } from "../../styles/styles";
import { useAuth } from "../../contexts/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { playButtonSound } from "../../utils/soundUtils";
import { CustomizableButton } from "../../components/CustomizableButton/CustomizableButton";
import { AppLayout } from "../../components/AppLayout/AppLayout";
import { useConsentInfo } from "../../contexts/consentContext";

type Navigation = {
  navigate: (routeName: string) => void;
};

interface Props {
  navigation: Navigation;
}

export const MainMenu: FC<Props> = ({ navigation }: Props) => {
  const { currentUser } = useAuth();
  const { adsConsentStatus } = useConsentInfo();
  const getTipIndex = useMemo(
    () => new Date().getDate() % TipsOfTheDay.length,
    []
  );
  const fadeAnim = new Animated.Value(0);

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
    : buttonTitles.filter(
        (screenName) =>
          screenName !== SCREENS.LOGOUT &&
          screenName &&
          screenName !== SCREENS.DASHBOARD
      );

  const handleOnPress = async (screenName: string) => {
    try {
      await playButtonSound();
      navigation.navigate(screenName);
    } catch (error) {
      console.log(`Failed to load sound: ${error}`);
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 15,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  // ToDo: make other modals closeable on press outside
  return (
    <AppLayout>
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.quoteBox, { opacity: fadeAnim }]}>
          <Text style={styles.quoteHeadline}>Quote of the day:</Text>
          <Text style={styles.quoteText}>{TipsOfTheDay[getTipIndex]}</Text>
        </Animated.View>
        <Animated.View style={[{ opacity: fadeAnim }, styles.buttonContainer]}>
          {buttons.map((buttonTitle) => (
            <CustomizableButton
              stylesButton={styles.pressable}
              key={buttonTitle}
              onPress={() => handleOnPress(buttonTitle)}
              title={buttonTitle}
            />
          ))}
        </Animated.View>
        <View style={{ position: "absolute", bottom: 0, alignSelf: "center" }}>
          <BannerAd
            requestOptions={{
              requestNonPersonalizedAdsOnly: !(
                adsConsentStatus === AdsConsentStatus.OBTAINED ||
                adsConsentStatus === AdsConsentStatus.NOT_REQUIRED
              ),
            }}
            size={BannerAdSize.LARGE_BANNER}
            unitId={TestIds.BANNER}
          />
        </View>
      </SafeAreaView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: "center",
  },
  quoteBox: {
    backgroundColor: COLOR_COMBINATION_1.ORANGE,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quoteHeadline: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  quoteText: {
    color: COLOR_COMBINATION_1.DARK_BLUE,
    fontSize: 16,
    textAlign: "center",
  },
  pressable: {
    width: 200,
    height: "10%",
    padding: 0,
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
// ToDo: change data privacy link in google admob
