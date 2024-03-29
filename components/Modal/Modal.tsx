import { ModalConfiguration } from "./ModalConfiguration";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";

interface ModalProps {
  isModalVisible: boolean;
  onRequestClose?: () => void;
  headerTitle: string;
  headerTitleStyles?: TextStyle;
  headerText: string | JSX.Element;
  headerTextStyles?: TextStyle;
  footerComponent: ReactNode;
  containerStyles?: ViewStyle;
  textStyles?: TextStyle;
}

export const Modal = ({
  isModalVisible,
  headerTitle,
    onRequestClose,
  headerTitleStyles,
  headerText,
  footerComponent,
  containerStyles,
  headerTextStyles,
}: ModalProps) => {
  return (
    <ModalConfiguration onRequestClose={onRequestClose} isVisible={isModalVisible}>
      <ModalConfiguration.Container containerStyles={containerStyles}>
        <View>
          <ModalConfiguration.Header
            title={headerTitle}
            headerTitleStyles={headerTitleStyles}
          />
          <ModalConfiguration.Body>
            <Text
              style={Object.assign({ textAlign: "center" }, headerTextStyles)}
            >
              {headerText}
            </Text>
          </ModalConfiguration.Body>
          <ModalConfiguration.Footer>
            {footerComponent}
          </ModalConfiguration.Footer>
        </View>
      </ModalConfiguration.Container>
    </ModalConfiguration>
  );
};
