import React, { useState } from "react";
import { AppLayout } from "../../components/AppLayout/AppLayout";
import { useAuth } from "../../contexts/authContext";
import { View, Text, StyleSheet } from "react-native";
import { CustomizableButton } from "../../components/CustomizableButton/CustomizableButton";
import { COLOR_COMBINATION_1, STANDARDISED_STYLES } from "../../styles/styles";
import { Modal } from "../../components/Modal/Modal";
import { SCREENS } from "../../constants";
import { playButtonSoundOnExecution } from "../../utils/soundUtils";

export const Logout = ({ navigation }: any): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { logout } = useAuth();

  return (
    <AppLayout>
      <Modal
        onRequestClose={() =>
          playButtonSoundOnExecution(() => navigation.navigate(SCREENS.MAIN))
        }
        isModalVisible={isModalVisible}
        footerComponent={
          <View>
            <CustomizableButton
              stylesText={styles.modalButtonText}
              onPress={() =>
                playButtonSoundOnExecution(() =>
                  navigation.navigate(SCREENS.MAIN)
                )
              }
              stylesButton={styles.modalButton}
              title="Back to main menu"
            />
          </View>
        }
        headerTitle="Logged out"
        headerText="You have been logged out"
      />
      <View style={styles.logoutContainer}>
        <Text style={styles.logoutText}>
          Oh no, are you sure you want to leave?
        </Text>
        <CustomizableButton
          onPress={() => navigation.navigate(SCREENS.MAIN)}
          stylesButton={styles.primaryButton}
          title="Nawh, just kidding!"
        />
        <CustomizableButton
          onPress={() => {
            logout();
            setIsModalVisible(true);
          }}
          stylesButton={styles.secondaryButton}
          stylesText={styles.secondaryButtonText}
          title="Log out"
        />
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  modalButton: {
    ...STANDARDISED_STYLES.CENTER_CONTENT,
    ...STANDARDISED_STYLES.BUTTON,
  } as any,
  modalButtonText: {
    textAlign: "center",
  },
  logoutContainer: {
    flex: 1,
    justifyContent: "center",
  },
  logoutText: {
    color: "#F7B42F",
    textAlign: "center",
  },
  primaryButton: {
    ...STANDARDISED_STYLES.BUTTON,
    height: 90,
  } as any,
  secondaryButton: {
    ...STANDARDISED_STYLES.BUTTON,
    height: 90,
    borderWidth: 2,
    borderColor: COLOR_COMBINATION_1.ORANGE,
    backgroundColor: COLOR_COMBINATION_1.DARK_BLUE,
  } as any,
  secondaryButtonText: {
    color: COLOR_COMBINATION_1.ORANGE,
  },
});
