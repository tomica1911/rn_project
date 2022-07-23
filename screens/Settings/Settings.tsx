import { SafeAreaView } from "react-native";
import {
  AppOpenAd,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  RewardedAd,
  TestIds,
} from "react-native-google-mobile-ads";

export const Settings = () => {
  // ToDo: add payment options tab
  // ToDo: add ability to change subscription
  // ToDo: add ability to cancel subscription
  // ToDo: add tab to change password
  // ToDo: add ability to change theme to a more lighter one - premium only
  // #App Open
  AppOpenAd.createForAdRequest(TestIds.APP_OPEN);
  // #Interstitial
  InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);
  // # Rewarded
  RewardedAd.createForAdRequest(TestIds.REWARDED);

  return (
    <SafeAreaView>
      <BannerAd
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        unitId={TestIds.BANNER}
      />
    </SafeAreaView>
  );
};
