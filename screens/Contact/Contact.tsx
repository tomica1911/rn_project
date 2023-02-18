import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { AppLayout } from "../../components/AppLayout/AppLayout";
import { ActivityIndicator } from "react-native";
import { InputField } from "../../components/PasswordField/InputField";
import { CustomizableButton } from "../../components/CustomizableButton/CustomizableButton";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Modal } from "../../components/Modal/Modal";
import { useAuth } from "../../contexts/authContext";
import merge from "lodash/merge";
import { SCREENS } from "../../constants";

const yupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter a valid email address"),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Please enter a valid password")
    .matches(/^([0-9a-zA-Z]{1,16}){8,}$/, "Please enter a valid password"),
});
// ToDo: add login with google, facebook and phone number
export const Contact = ({ navigation }: any): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(yupSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { currentUser, authErrors, setAuthErrors, login } = useAuth();

  // ToDo complete the loading functionality
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(
    () => currentUser && navigation.navigate(SCREENS.MAIN),
    [currentUser]
  );

  const onFormSubmit = (data: FieldValues) => {
    login(data.email, data.password);
  };

  const allErrors: FieldError | Pick<FieldError, "message"> = merge(
    errors,
    authErrors
  );
  const formHasErrors = Object.keys(allErrors).length > 0;

  return (
    <AppLayout>
      <Modal
        isModalVisible={formHasErrors}
        footerComponent={
          <View>
            <CustomizableButton
              onPress={() => {
                clearErrors();
                setAuthErrors(undefined);
              }}
              title="Back to login screen"
            />
          </View>
        }
        headerTitle="You're just one step away"
        // @ts-ignore
        headerText={Object.values(allErrors)[0]?.message}
      />
      <View style={styles.formContainer}>
        {loading ? (
          //ToDo: move the loading icon to a seperate component
          <ActivityIndicator size="large" color="#F7B42F" />
        ) : (
          <>
            <Text style={styles.fieldLabel}>Email Address</Text>
            <InputField
              control={control}
              name="email"
              placeholder="Enter email"
            />
            <Text style={styles.fieldLabel}>Message</Text>
            <InputField
              additionalInputFieldStyles={{
                textAlignVertical: "top",
                textAlign: "left",
              }}
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
  fieldLabel: {
    color: "#F7B42F",
    textAlign: "center",
  },
});