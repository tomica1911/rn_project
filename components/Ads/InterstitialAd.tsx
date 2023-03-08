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

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      }
    );

    interstitial.load();
    return unsubscribe;
  }, []);

  return <></>;
};
