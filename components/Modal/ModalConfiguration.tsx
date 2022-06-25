import React from "react";
import { StyleSheet, View, Text } from "react-native";
import RNModal from "react-native-modal";
import { STANDARDISED_STYLES } from "../../styles/styles";

type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
  [x: string]: any;
};
export const ModalConfiguration = ({
  isVisible = false,
  children,
  ...props
}: ModalProps) => {
  return (
    <RNModal
      isVisible={isVisible}
      animationInTiming={400}
      animationOutTiming={400}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      {...props}
    >
      {children}
    </RNModal>
  );
};

const ModalContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.container}>{children}</View>
);

const ModalHeader = ({ title }: { title: string }) => (
  <View style={styles.header}>
    <Text style={styles.text}>{title}</Text>
  </View>
);

const ModalBody = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.body}>{children}</View>
);

const ModalFooter = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingTop: 10,
    textAlign: "center",
    fontSize: 24,
  },
  // ToDo: check if this can be fixed
  // @ts-expect-error
  body: {
    ...STANDARDISED_STYLES.CENTER_CONTENT,
    paddingHorizontal: 15,
    minHeight: 100,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
  },
});

ModalConfiguration.Header = ModalHeader;
ModalConfiguration.Container = ModalContainer;
ModalConfiguration.Body = ModalBody;
ModalConfiguration.Footer = ModalFooter;
