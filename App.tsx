import "expo-dev-client";
import { useEffect, useState } from "react";
import mobileAds, {
  MaxAdContentRating,
  AdsConsent,
  AdsConsentStatus,
} from "react-native-google-mobile-ads";
import { Stack } from "./components/Stack/Stack";
import "./firebaseConfig";
import { AuthProvider } from "./contexts/authContext";
import { FirestoreProvider } from "./contexts/firebaseContext";
import { ConsentProvider } from "./contexts/consentContext";

export default function App() {
  const [adsConsentStatus, setAdsConsentStatus] =
    useState<AdsConsentStatus | null>(null);

  useEffect(() => {
    async function checkConsent() {
      const consentInfo = await AdsConsent.requestInfoUpdate();
      setAdsConsentStatus(consentInfo.status);

      if (
        consentInfo.isConsentFormAvailable &&
        consentInfo.status === AdsConsentStatus.REQUIRED
      ) {
        const { status } = await AdsConsent.showForm();
        setAdsConsentStatus(status);
      }
    }

    checkConsent();
  }, []);

  useEffect(() => {
    mobileAds().setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.G,
      tagForChildDirectedTreatment: true,
      tagForUnderAgeOfConsent: true,
      testDeviceIdentifiers: ["EMULATOR"],
    });

    mobileAds().initialize();
  }, []);

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
