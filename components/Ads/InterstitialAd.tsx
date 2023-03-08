import {
  AdEventType,
  AdsConsentStatus,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";
import React, { useEffect, useState } from "react";
import { useConsentInfo } from "../../contexts/consentContext";

export const InterstitialAdComponent = (): JSX.Element => {
  const { adsConsentStatus } = useConsentInfo();
  const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: !(
      adsConsentStatus === AdsConsentStatus.OBTAINED ||
      adsConsentStatus === AdsConsentStatus.NOT_REQUIRED
    ),
  });

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );

    interstitial.load();
    return unsubscribe;
  }, []);

  if (loaded) {
    interstitial.show();
  }

  return <></>;
};
