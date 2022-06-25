import { ModalConfiguration } from "./ModalConfiguration";
import { Text, View } from "react-native";
import { CustomizableButton } from "../CustomizableButton/CustomizableButton";
import { STANDARDISED_STYLES } from "../../styles/styles";
import React from "react";

interface ModalProps {
  isModalVisible: boolean,
  headerTitle: string,
  headerText: string,
  buttonTitle: string,
  onPressButtonFn: () => void
}

export const Modal = ({
  isModalVisible,
  headerTitle,
  headerText,
  buttonTitle,
  onPressButtonFn
}: ModalProps) => (
  <ModalConfiguration isVisible={isModalVisible}>
    <ModalConfiguration.Container>
      <View>
        <ModalConfiguration.Header title={headerTitle} />
        <ModalConfiguration.Body>
          <Text>{headerText}</Text>
        </ModalConfiguration.Body>
        <ModalConfiguration.Footer>
          <View>
            <CustomizableButton
              onPress={() => {
                onPressButtonFn();
              }}
              stylesButton={{
                marginTop: 10,
                height: 50,
                ...STANDARDISED_STYLES.CENTER_CONTENT,
                ...STANDARDISED_STYLES.BUTTON,
                marginBottom: 10,
                marginLeft: 5,
                marginRight: 5,
                backgroundColor: "#F7B42F",
              }}
              title={buttonTitle}
            />
          </View>
        </ModalConfiguration.Footer>
      </View>
    </ModalConfiguration.Container>
  </ModalConfiguration>
);
