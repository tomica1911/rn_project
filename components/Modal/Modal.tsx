import { ModalConfiguration } from "./ModalConfiguration";
import { Text, View } from "react-native";
import React, {ReactNode} from "react";

interface ModalProps {
  isModalVisible: boolean;
  headerTitle: string;
  headerText: string;
  footerComponent: ReactNode
}

export const Modal = ({
  isModalVisible,
  headerTitle,
  headerText,
  footerComponent,
}: ModalProps) => (
  <ModalConfiguration isVisible={isModalVisible}>
    <ModalConfiguration.Container>
      <View>
        <ModalConfiguration.Header title={headerTitle} />
        <ModalConfiguration.Body>
          <Text>{headerText}</Text>
        </ModalConfiguration.Body>
        <ModalConfiguration.Footer>{footerComponent}</ModalConfiguration.Footer>
      </View>
    </ModalConfiguration.Container>
  </ModalConfiguration>
);