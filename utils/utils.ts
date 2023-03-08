import {
  TestIds,
  InterstitialAd,
  AdsConsentStatus,
  AdEventType,
} from "react-native-google-mobile-ads";
import { Platform } from "react-native";
import { GOOGLE_ADMOB_APP_IDS } from "../constants";
import { useConsentInfo } from "../contexts/consentContext";
import React, { useEffect } from "react";

export const getRandomNumberInRange: (min: number, max: number) => number = (
  min: number,
  max: number
) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getPoints = (
  duration: number,
  numberOfSelectedCharacters: number,
  multiplyFactor: number
): number => (1 / duration) * 100 * numberOfSelectedCharacters * multiplyFactor;

export const showInterstitialAd = (
  adsConsentStatus: AdsConsentStatus | null
): void => {
  const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: !(
      adsConsentStatus === AdsConsentStatus.OBTAINED ||
      adsConsentStatus === AdsConsentStatus.NOT_REQUIRED
    ),
  });

  interstitial.addAdEventListener(AdEventType.LOADED, () => {
    interstitial.show();
  });

  interstitial.load();
};
