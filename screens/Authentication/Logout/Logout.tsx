import React, { useState } from "react";
import { AppLayout } from "../../../components/AppLayout/AppLayout";
import { useAuth } from "../../../contexts/authContext";
import { View, Text } from "react-native";
import { CustomizableButton } from "../../../components/CustomizableButton/CustomizableButton";
import {
  COLOR_COMBINATION_1,
  STANDARDISED_STYLES,
} from "../../../styles/styles";
import { Modal } from "../../../components/Modal/Modal";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types";
import { SCREENS } from "../../../constants";

export const Logout = ({
  navigation,
}: StackScreenProps<RootStackParamList, SCREENS.LOGOUT>): JSX.Element => {
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
              stylesButton={{
                marginTop: 10,
                height: 50,
                ...STANDARDISED_STYLES.CENTER_CONTENT,
                ...STANDARDISED_STYLES.BUTTON,
                marginBottom: 10,
                marginLeft: 5,
                marginRight: 5,
              }}
              title="Back to main menu"
            />
          </View>
        }
        headerTitle="Logged out"
        headerText="You have been logged out"
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#F7B42F", textAlign: "center" }}>
          Oh no, are you sure you want to leave?
        </Text>
        <CustomizableButton
          onPress={() => navigation.navigate(SCREENS.MAIN)}
          stylesButton={{
            marginTop: 10,
            height: 50,
            ...STANDARDISED_STYLES.CENTER_CONTENT,
            ...STANDARDISED_STYLES.BUTTON,
            marginBottom: 10,
            marginLeft: 5,
            marginRight: 5,
          }}
          title="Nawh, just kidding!"
        />
        <CustomizableButton
          onPress={() => {
            logout();
            setIsModalVisible(true);
          }}
          stylesButton={{
            marginTop: 10,
            height: 50,
            borderColor: COLOR_COMBINATION_1.ORANGE,
            backgroundColor: COLOR_COMBINATION_1.BLACK,
            borderWidth: 2,
            ...STANDARDISED_STYLES.CENTER_CONTENT,
            marginBottom: 10,
            marginLeft: 5,
            marginRight: 5,
          }}
          stylesText={{ color: COLOR_COMBINATION_1.ORANGE }}
          title="Log out"
        />
      </View>
    </AppLayout>
  );
};
