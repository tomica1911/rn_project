import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { AppLayout } from "../../../components/AppLayout/AppLayout";
import { ActivityIndicator } from "react-native";
import { InputField } from "../../../components/PasswordField/InputField";
import { CustomizableButton } from "../../../components/CustomizableButton/CustomizableButton";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Modal } from "../../../components/Modal/Modal";
import { STANDARDISED_STYLES } from "../../../styles/styles";
import { useAuth } from "../../../contexts/authContext";
import merge from "lodash/merge";
import { RootStackParamList } from "../../../types";
import { StackScreenProps } from "@react-navigation/stack";
import { SCREENS } from "../../../constants";

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
export const Login = ({
  navigation,
}: StackScreenProps<RootStackParamList, SCREENS.LOGIN>): JSX.Element => {
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

  //@ts-expect-error
  const allErrors: FieldError = merge(errors, authErrors);
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
              stylesButton={{
                marginTop: 10,
                height: 50,
                ...STANDARDISED_STYLES.CENTER_CONTENT,
                ...STANDARDISED_STYLES.BUTTON,
                marginBottom: 10,
                marginLeft: 5,
                marginRight: 5,
              }}
              title="Back to login screen"
            />
          </View>
        }
        headerTitle="You're just one step away"
        // @ts-ignore
        headerText={Object.values(allErrors)[0]?.message}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        {loading ? (
          //ToDo: move the loading icon to a seperate component
          <ActivityIndicator size="large" color="#F7B42F" />
        ) : (
          <>
            <Text style={{ color: "#F7B42F", textAlign: "center" }}>
              Email Address
            </Text>
            <InputField
              control={control}
              name="email"
              placeholder="Enter email"
            />
            <Text style={{ color: "#F7B42F", textAlign: "center" }}>
              Password
            </Text>
            <InputField
              showHidePasswordAbility
              control={control}
              name="password"
              placeholder="Enter password"
            />
            <CustomizableButton
              onPress={handleSubmit(onFormSubmit)}
              title="Login"
              stylesButton={{
                marginTop: 10,
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
