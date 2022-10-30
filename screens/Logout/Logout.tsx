import React, { useState } from "react";
import { AppLayout } from "../../components/AppLayout/AppLayout";
import { useAuth } from "../../contexts/authContext";
import { View, Text, StyleSheet } from "react-native";
import { CustomizableButton } from "../../components/CustomizableButton/CustomizableButton";
import { COLOR_COMBINATION_1, STANDARDISED_STYLES } from "../../styles/styles";
import { Modal } from "../../components/Modal/Modal";
import { SCREENS } from "../../constants";

export const Logout = ({ navigation }: any): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { logout } = useAuth();

  return (
    <AppLayout>
      <Modal
        isModalVisible={isModalVisible}
        footerComponent={
          <View>
            <CustomizableButton
              onPress={() => navigation.navigate(SCREENS.MAIN)}
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
    marginTop: 10,
    height: 50,
    ...STANDARDISED_STYLES.CENTER_CONTENT,
    ...STANDARDISED_STYLES.BUTTON,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  } as any,
  logoutContainer: {
    flex: 1,
    justifyContent: "center",
  },
  logoutText: {
    color: "#F7B42F",
    textAlign: "center",
  },
  primaryButton: {
    marginTop: 10,
    height: 50,
    ...STANDARDISED_STYLES.CENTER_CONTENT,
    ...STANDARDISED_STYLES.BUTTON,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  } as any,
  secondaryButton: {
    marginTop: 10,
    height: 50,
    borderColor: COLOR_COMBINATION_1.ORANGE,
    backgroundColor: COLOR_COMBINATION_1.BLACK,
    borderWidth: 2,
    ...STANDARDISED_STYLES.CENTER_CONTENT,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  } as any,
  secondaryButtonText: {
    color: COLOR_COMBINATION_1.ORANGE,
  },
});
