import "expo-dev-client";
import { Stack } from "./components/Stack/Stack";
import "./firebaseConfig";
import { AuthProvider } from "./contexts/authContext";
import { FirestoreProvider } from "./contexts/firebaseContext";
import { useFonts } from "expo-font";
import { setCustomText } from "react-native-global-props";
import mobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";

//ToDo: remove unused npm packages from project
export default function App() {
  const [fontsLoaded] = useFonts({
    luckiestGuy: require("./assets/fonts/LuckiestGuy.ttf"),
  });

  if (fontsLoaded) {
    setCustomText({ style: { fontFamily: "luckiestGuy", fontSize: 15 } });
  }

  mobileAds()
    .setRequestConfiguration({
      // Update all future requests suitable for parental guidance
      maxAdContentRating: MaxAdContentRating.G,

      // Indicates that you want your content treated as child-directed for purposes of COPPA.
      tagForChildDirectedTreatment: true,

      // Indicates that you want the ad request to be handled in a
      // manner suitable for users under the age of consent.
      tagForUnderAgeOfConsent: true,

      // An array of test device IDs to allow.
      testDeviceIdentifiers: ["EMULATOR"],
    })
    .then(() => {
      // Request config successfully set!
      console.log("adMob config set successfully");
    });

  mobileAds()
    .initialize()
    .then((adapterStatuses: any) => {
      console.log("adMob Initialization complete!");
    });

  return (
    <FirestoreProvider>
      <AuthProvider>
        <Stack />
      </AuthProvider>
    </FirestoreProvider>
  );
}
