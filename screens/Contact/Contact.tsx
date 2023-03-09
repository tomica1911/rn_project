import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { AppLayout } from "../../components/AppLayout/AppLayout";
import { ActivityIndicator } from "react-native";
import { InputField } from "../../components/PasswordField/InputField";
import { CustomizableButton } from "../../components/CustomizableButton/CustomizableButton";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Modal } from "../../components/Modal/Modal";
import { useAuth } from "../../contexts/authContext";
import merge from "lodash/merge";
import { useFirestore } from "../../contexts/firebaseContext";

//ToDo: users should be able to send contact messages every 30 minutes
export const Contact = (): JSX.Element => {
  const { currentUser, authErrors, setAuthErrors } = useAuth();
  const {
    sendContactMessage,
    sendContactMessageSubmissionError,
    setSendContactMessageSubmissionError,
    contactFormSubmissionCompleted,
    setContactFormSubmissionCompleted,
  } = useFirestore();
  const [loading, setLoading] = useState<boolean>(false);

  const yupSchema = yup.object().shape({
    email: !currentUser
      ? yup
          .string()
          .email("Please enter a valid email address")
          .required("Please enter a valid email address")
      : yup.string().optional(),
    message: yup
      .string()
      .required("Please write a message")
      .min(10, "Please enter a valid message with over 10 characters"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors: clearFormErrors,
  } = useForm({
    resolver: yupResolver(yupSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const clearAllErrors = () => {
    clearFormErrors();
    setAuthErrors(undefined);
    setSendContactMessageSubmissionError(null);
  };

  const onFormSubmit = async (data: FieldValues) => {
    setLoading(true);
    const email = currentUser?.email ?? data["email"];
    const message = data["message"];
    await sendContactMessage({
      email,
      message,
    });
    setLoading(false);
  };

  const allErrors: typeof errors | { [errorKey: string]: { message: string } } =
    merge(errors, authErrors, sendContactMessageSubmissionError);
  const formHasErrors = Object.keys(allErrors).length > 0;

  return (
    <AppLayout>
      <Modal
        onRequestClose={() => clearAllErrors()}
        isModalVisible={formHasErrors || contactFormSubmissionCompleted}
        footerComponent={
          <>
            {contactFormSubmissionCompleted ? (
              <CustomizableButton
                onPress={() => setContactFormSubmissionCompleted(false)}
                title="Back"
              />
            ) : (
              <CustomizableButton
                onPress={() => clearAllErrors()}
                title="Back to login screen"
              />
            )}
          </>
        }
        headerTitle={
          contactFormSubmissionCompleted
            ? "Message successfully sent!"
            : "You're just one step away"
        }
        headerText={
          formHasErrors
            ? Object.values(allErrors)[0]?.message
            : "You'll be contacted as soon as possible, thank you for the message!"
        }
      />
      <View style={styles.formContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#F7B42F" />
        ) : (
          <>
            {!currentUser && (
              <>
                <Text style={styles.fieldLabel}>Email Address</Text>
                <InputField
                  control={control}
                  name="email"
                  placeholder="Enter email"
                />
              </>
            )}
            <Text style={styles.fieldLabel}>Message</Text>
            <InputField
              additionalInputContainerStyles={
                styles.additionalInputContainerStyles
              }
              additionalInputFieldStyles={styles.additionalInputFieldStyles}
              maxLength={600}
              multiline={true}
              numberOfLines={10}
              control={control}
              name="message"
              placeholder=""
            />
            <CustomizableButton
              onPress={handleSubmit(onFormSubmit)}
              title="Send"
            />
          </>
        )}
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
  additionalInputContainerStyles: { height: 200 },
  additionalInputFieldStyles: {
    textAlignVertical: "top",
    textAlign: "left",
  },
  fieldLabel: {
    color: "#F7B42F",
    textAlign: "center",
  },
});
