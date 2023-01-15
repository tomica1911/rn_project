import AdMob, { InterstitialAd } from "@admob-plus/react-native";
import { TestIds } from "react-native-google-mobile-ads";

export const getRandomNumberInRange: (min: number, max: number) => number = (
  min: number,
  max: number
) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getPoints = (
  duration: number,
  numberOfSelectedCharacters: number,
  multiplyFactor: number
): number => (1 / duration) * 100 * numberOfSelectedCharacters * multiplyFactor;

export async function showInterstitalAd() {
  await AdMob.start();

  const interstitial = new InterstitialAd({
    adUnitId: TestIds.INTERSTITIAL,
  });
  await interstitial.load();
  await interstitial.show();
}