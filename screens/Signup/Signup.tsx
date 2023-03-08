import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { AppLayout } from "../../components/AppLayout/AppLayout";
import { ActivityIndicator } from "react-native";
import { InputField } from "../../components/PasswordField/InputField";
import { CustomizableButton } from "../../components/CustomizableButton/CustomizableButton";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "../../components/Modal/Modal";
import { useAuth } from "../../contexts/authContext";
import merge from "lodash/merge";
import { SCREENS } from "../../constants";

const yupSchema = yup.object().shape({
  displayName: yup
    .string()
    .required("Please choose a display name")
    .matches(
      /^([0-9a-zA-Z]{1,16})$/,
      "Please enter a display name between of length between 1-16 letters"
    ),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Minimum password length is 8 letters")
    .matches(
      /^([0-9a-zA-Z]{1,16}){8,}$/,
      "Minimum password length is 8 letters"
    ),
  confirmPassword: yup.string().required("Please confirm your password"),
  email: yup
    .string()
    .required("Please enter a valid email")
    .email("Please enter a valid email address"),
});

export const Signup = ({ navigation }: any): JSX.Element => {
  const {
    signup,
    authLoading,
    authErrors,
    setAuthErrors,
    currentUser,
    sendVerificationEmail,
    verificationEmailResent,
  } = useAuth();

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

  const [clickable, setClickable] = useState(false);

  const onSignupFormSubmit = (data: FieldValues) => {
    signup(data.displayName, data.password, data.confirmPassword, data.email);
  };

  //ToDo: fix the timer issue
  // if (currentUser) {
  //   setTimeout(() => {
  //     setClickable(true);
  //   }, 30000);
  // }

  const allErrors: typeof errors | { [errorKey: string]: { message: string } } =
    merge(errors, authErrors);
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
              title="Back to signup screen"
            />
          </View>
        }
        headerTitle="You're just one step away"
        headerText={Object.values(allErrors)[0]?.message}
      />
      {currentUser && (
        <Modal
          isModalVisible={!!currentUser}
          footerComponent={
            <View>
              <CustomizableButton
                disabled={!clickable}
                onPress={() => sendVerificationEmail(currentUser)}
                title="Resend email"
              />
              <CustomizableButton
                onPress={() => navigation.navigate(SCREENS.MAIN)}
                title="Back to main menu"
              />
            </View>
          }
          headerTitle="You're just one step away"
          headerText={
            currentUser.emailVerified
              ? "You've verified your email."
              : `You've created an account. Please verify your email. You can resend email after 30 seconds. ${
                  verificationEmailResent ? `\n Verification email resent.` : ""
                }`
          }
        />
      )}
      <View style={styles.formContainer}>
        {authLoading ? (
          //ToDo: move the loading icon to a seperate component
          <ActivityIndicator size="large" color="#F7B42F" />
        ) : (
          <>
            <Text style={styles.fieldLabel}>Display Name</Text>
            <InputField
              control={control}
              name="displayName"
              placeholder="Display Name"
            />
            <Text style={styles.fieldLabel}>Email</Text>
            <InputField control={control} name="email" placeholder="Email" />
            <Text style={styles.fieldLabel}>Password</Text>
            <InputField
              control={control}
              name="password"
              showHidePasswordAbility
              placeholder="Password"
            />
            <Text style={styles.fieldLabel}>Confirm Password</Text>
            <InputField
              name="confirmPassword"
              showHidePasswordAbility
              placeholder="Confirm Password"
              control={control}
            />
            <CustomizableButton
              onPress={handleSubmit(onSignupFormSubmit)}
              title="Signup"
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

//ToDos
//______________________________________________________________________________________________________________________
//ToDo: make an independent component for the spinner
