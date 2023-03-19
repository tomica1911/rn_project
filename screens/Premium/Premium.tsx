import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AppLayout } from "../../components/AppLayout/AppLayout";
import { COLOR_COMBINATION_1 } from "../../styles/styles";

const imageImports = [
  require("../../assets/premium_feat_1.png"),
  require("../../assets/premium_feat_2.png"),
  require("../../assets/premium_feat_3.png"),
];

const PremiumFeatures = (): JSX.Element => {
  const [enlargedImage, setEnlargedImage] = useState<
    (typeof imageImports)[0] | null
  >(null);

  const handleImageTap = (image: string) => {
    setEnlargedImage(image);
  };

  const handleEnlargedImageTap = () => {
    setEnlargedImage(null);
  };

  return (
    <View style={styles.premiumFeaturesContainer}>
      <Text style={styles.premiumFeaturesTitle}>Premium Features:</Text>
      <Text style={styles.premiumFeaturesText}>- Ad-free experience</Text>
      <Text style={styles.premiumFeaturesText}>
        - Various graphs & charts to stay up to date with the current progress
      </Text>
      <Text style={styles.premiumFeaturesText}>
        - Daily goal tracking and combo bonuses
      </Text>
      <Text style={styles.enlargeText}>Tap images to enlarge them</Text>
      <View style={styles.premiumFeaturesImagesContainer}>
        {imageImports.map((img, index) => (
          <TouchableOpacity key={index} onPress={() => handleImageTap(img)}>
            <Image source={img} style={styles.premiumFeaturesImage} />
          </TouchableOpacity>
        ))}
      </View>
      {enlargedImage && (
        <TouchableOpacity
          style={styles.enlargedImageContainer}
          onPress={handleEnlargedImageTap}
        >
          <Image
            style={styles.enlargedImage}
            source={enlargedImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const SubscriptionSelection = (): JSX.Element => {
  const [selectedSubscription, setSelectedSubscription] = useState("");

  const handleSubscriptionSelection = (subscription: string) => {
    setSelectedSubscription(subscription);
  };

  const handleBuySubscription = () => {
    if (selectedSubscription) {
      // onBuySubscription(selectedSubscription);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a subscription plan:</Text>
      {["1 Month", "3 Months"].map((subscription, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.subscriptionButton,
            selectedSubscription === subscription &&
              styles.selectedSubscriptionButton,
          ]}
          onPress={() => handleSubscriptionSelection(subscription)}
        >
          <Text style={styles.subscriptionButtonText}>{subscription}</Text>
        </TouchableOpacity>
      ))}
      {selectedSubscription.length > 0 && (
        <Text style={styles.subscriptionButtonText}>
          Selected subscription: {selectedSubscription}
        </Text>
      )}
      <TouchableOpacity
        style={styles.buyButton}
        disabled={!selectedSubscription}
        onPress={handleBuySubscription}
      >
        <Text style={styles.buyButtonText}>Buy now</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Premium = (): JSX.Element => {
  return (
    <AppLayout>
      <PremiumFeatures />
      <SubscriptionSelection />
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: COLOR_COMBINATION_1.ORANGE,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subscriptionButton: {
    borderWidth: 1,
    width: 200,
    borderColor: COLOR_COMBINATION_1.BLUE,
    backgroundColor: COLOR_COMBINATION_1.DARK_BLUE,
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
  },
  selectedSubscriptionButton: {
    backgroundColor: COLOR_COMBINATION_1.DARK_BLUE,
  },
  subscriptionButtonText: {
    fontSize: 18,
    display: "flex",
    textAlign: "center",
    color: COLOR_COMBINATION_1.ORANGE,
    fontWeight: "bold",
  },
  buyButton: {
    backgroundColor: "#2F68B0",
    width: 200,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 5,
    marginTop: 24,
  },
  buyButtonText: {
    color: COLOR_COMBINATION_1.ORANGE,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  premiumFeaturesContainer: {
    borderWidth: 1,
    borderColor: COLOR_COMBINATION_1.ORANGE,
    borderRadius: 5,
    padding: 16,
    margin: 15,
  },
  premiumFeaturesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLOR_COMBINATION_1.ORANGE,
    marginBottom: 8,
  },
  premiumFeaturesText: {
    fontSize: 16,
    marginBottom: 4,
    color: COLOR_COMBINATION_1.ORANGE,
  },
  enlargeText: {
    textDecorationLine: "underline",
    fontSize: 20,
    textAlign: "center",
    color: COLOR_COMBINATION_1.ORANGE,
  },
  premiumFeaturesImagesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  premiumFeaturesImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  enlargedImageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  enlargedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
