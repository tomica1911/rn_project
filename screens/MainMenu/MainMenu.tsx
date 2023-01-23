import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  Button,
  Pressable,
} from "react-native";
import { ButtonGroup } from "@rneui/themed";
import { SCREENS, TipsOfTheDay } from "../../constants";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import React, { useMemo, FC, useEffect } from "react";
import { COLOR_COMBINATION_1, STANDARDISED_STYLES } from "../../styles/styles";
import { AppLayout } from "../../components/AppLayout/AppLayout";
import { useAuth } from "../../contexts/authContext";
import { useSafeArea } from "react-native-safe-area-context";
import { playButtonSound } from "../../utils/soundUtils";
import { CustomizableButton } from "../../components/CustomizableButton/CustomizableButton";

type Navigation = {
  navigate: (routeName: string) => void;
};

interface Props {
  navigation: Navigation;
}

export const MainMenu: FC<Props> = ({ navigation }: Props) => {
  const { currentUser } = useAuth();
  const getTipIndex = useMemo(
      () => new Date().getDate() % TipsOfTheDay.length,
      []
  );
  const [error, setError] = React.useState<string>("");
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
      : buttonTitles.filter((screenName) => screenName !== SCREENS.LOGOUT);

  const insets = useSafeArea();

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

  return (
      <View style={styles.container}>
        <Animated.View
            style={[styles.quoteBox, { paddingTop: insets.top, opacity: fadeAnim }]}
        >
          <Text style={styles.quoteHeadline}>Quote of the day:</Text>
          <Text style={styles.quoteText}>{TipsOfTheDay[getTipIndex]}</Text>
        </Animated.View>
        <Animated.View
            style={[
              { paddingBottom: insets.bottom, opacity: fadeAnim },
              styles.buttonContainer,
            ]}
        >
          {buttons.map((buttonTitle, index) => (
              <Pressable
                  style={styles.pressable}
                  key={buttonTitle}
                  onPress={() => handleOnPress(buttonTitle)}
              >
                <Text style={styles.pressableText}>{buttonTitle}</Text>
              </Pressable>
          ))}
          {/*<ButtonGroup*/}
          {/*  onPress={(buttonIndex: number) => handleOnPress(buttons[buttonIndex])}*/}
          {/*  vertical*/}
          {/*  textStyle={styles.buttonGroup}*/}
          {/*  buttonStyle={Platform.OS === "ios" ? { height: 50 } : {}}*/}
          {/*  containerStyle={STANDARDISED_STYLES.BUTTON}*/}
          {/*  buttons={buttons}*/}
          {/*/>*/}
          <View style={{ position: "absolute", bottom: 0 }}>
            <BannerAd size={BannerAdSize.LARGE_BANNER} unitId={TestIds.BANNER} />
          </View>
        </Animated.View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#0f1120",
  },
  buttonContainer: {
    alignItems: "center",
  },
  quoteBox: {
    backgroundColor: COLOR_COMBINATION_1.ORANGE,
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
    color: COLOR_COMBINATION_1.BLACK,
    fontSize: 16,
    textAlign: "center",
  },
  pressable: {
    backgroundColor: COLOR_COMBINATION_1.ORANGE,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLOR_COMBINATION_1.ORANGE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "50%",
  },
  pressableText: {
    color: COLOR_COMBINATION_1.BLACK,
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: "bold",
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