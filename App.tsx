import "expo-dev-client";
import { Stack } from "./components/Stack/Stack";
import "./firebaseConfig";
import { AuthProvider } from "./contexts/authContext";
import { FirestoreProvider } from "./contexts/firebaseContext";
import { useFonts } from "expo-font";
import { setCustomText } from "react-native-global-props";
import mobileAds, {
  MaxAdContentRating,
  AdsConsent,
  AdsConsentStatus,
} from "react-native-google-mobile-ads";
import { useEffect, useState } from "react";
import { ConsentProvider } from "./contexts/consentContext";

//ToDo: remove unused npm packages from project
export default function App() {
  const [adsConsentStatus, setAdsConsentStatus] =
    useState<AdsConsentStatus | null>(null);
  const [fontsLoaded] = useFonts({
    karmillaBold: require("./assets/fonts/karmillaBold.ttf"),
  });
  AdsConsent.reset();

  useEffect(() => {
    async function checkConsent() {
      const consentInfo = await AdsConsent.requestInfoUpdate();
      setAdsConsentStatus(consentInfo.status);
      if (consentInfo.isConsentFormAvailable) {
        if (consentInfo.status === AdsConsentStatus.REQUIRED) {
          const { status } = await AdsConsent.showForm();
          setAdsConsentStatus(status);
        }
      }
    }

    checkConsent();
  }, []);

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
      console.log("adMob config set successfully");
    });

  mobileAds()
    .initialize()
    .then((adapterStatuses: any) => {
      console.log("adMob Initialization complete!");
    });

  if (fontsLoaded) {
    setCustomText({ style: { fontFamily: "luckiestGuy", fontSize: 15 } });
  }

  return (
    <ConsentProvider adsConsentStatusInfo={adsConsentStatus}>
      <FirestoreProvider>
        <AuthProvider>
          <Stack />
        </AuthProvider>
      </FirestoreProvider>
    </ConsentProvider>
  );
}
