import { View, Text } from "react-native";
import React, { useState } from "react";
import { AppLayout } from "../../../components/AppLayout/AppLayout";
import { ActivityIndicator } from "react-native";
import { InputField } from "../../../components/PasswordField/InputField";
import { CustomizableButton } from "../../../components/CustomizableButton/CustomizableButton";
import { FieldValues, useForm, FieldError } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "../../../components/Modal/Modal";
import {
  COLOR_COMBINATION_1,
  STANDARDISED_STYLES,
} from "../../../styles/styles";
import { useAuth } from "../../../contexts/authContext";
import merge from "lodash/merge";

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

//@ts-expect-error
export const Signup = ({ navigation }): JSX.Element => {
  // ToDo: remove ts-expect-error directives
  const {
    //@ts-expect-error
    signup,
    //@ts-expect-error
    authLoading,
    //@ts-expect-error
    authErrors,
    //@ts-expect-error
    setAuthErrors,
    //@ts-expect-error
    currentUser,
    //@ts-expect-error
    sendVerificationEmail,
    //@ts-expect-error
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

  // // @ts-ignore
  // const { createDbEntryForUser } = useFirestore();

  const onSignupFormSubmit = (data: FieldValues) => {
    signup(data.displayName, data.password, data.confirmPassword, data.email);
  };

  //ToDo: fix the timer issue
  // if (currentUser) {
  //   setTimeout(() => {
  //     setClickable(true);
  //   }, 30000);
  // }

  const allErrors: FieldError = merge(errors, authErrors);
  const formHasErrors = Object.keys(allErrors).length > 0;

  //ToDo: make an independent component for the spinner
  // @ts-ignore
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
              stylesButton={{
                marginTop: 10,
                height: 50,
                ...STANDARDISED_STYLES.CENTER_CONTENT,
                ...STANDARDISED_STYLES.BUTTON,
                marginBottom: 10,
                marginLeft: 5,
                marginRight: 5,
              }}
              title="Back to signup screen"
            />
          </View>
        }
        headerTitle="You're just one step away"
        // @ts-ignore
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
                stylesButton={{
                  marginTop: 10,
                  height: 50,
                  width: 200,
                  ...STANDARDISED_STYLES.CENTER_CONTENT,
                  backgroundColor: clickable
                    ? COLOR_COMBINATION_1.ORANGE
                    : "gray",
                  marginBottom: 10,
                  marginLeft: 5,
                  marginRight: 5,
                }}
                title="Resend email"
              />
              <CustomizableButton
                onPress={() => navigation.navigate("Main Menu")}
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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        {authLoading ? (
          //ToDo: move the loading icon to a seperate component
          <ActivityIndicator size="large" color="#F7B42F" />
        ) : (
          <>
            <Text style={{ color: "#F7B42F", textAlign: "center" }}>
              Display Name
            </Text>
            <InputField
              control={control}
              name="displayName"
              placeholder="Display Name"
            />
            <Text style={{ color: "#F7B42F", textAlign: "center" }}>Email</Text>
            <InputField control={control} name="email" placeholder="Email" />
            <Text style={{ color: "#F7B42F", textAlign: "center" }}>
              Password
            </Text>
            <InputField
              control={control}
              name="password"
              showHidePasswordAbility
              placeholder="Password"
            />
            <Text style={{ color: "#F7B42F", textAlign: "center" }}>
              Confirm Password
            </Text>
            <InputField
              name="confirmPassword"
              showHidePasswordAbility
              placeholder="Confirm Password"
              control={control}
            />
            <CustomizableButton
              onPress={handleSubmit(onSignupFormSubmit)}
              title="Signup"
              stylesButton={{
                marginTop: 10,
                width: 200,
                height: 35,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F7B42F",
              }}
            />
          </>
        )}
      </View>
    </AppLayout>
  );
};
