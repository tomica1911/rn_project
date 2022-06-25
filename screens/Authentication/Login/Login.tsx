import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { AppLayout } from "../../../components/AppLayout/AppLayout";
import { ActivityIndicator } from "react-native";
import { InputField } from "../../../components/PasswordField/InputField";
import { CustomizableButton } from "../../../components/CustomizableButton/CustomizableButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Modal } from "../../../components/Modal/Modal";

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

export const Login = (): JSX.Element => {
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
  // ToDo complete the loading functionality
  const [loading, setLoading] = useState<boolean>(false);
  // const { login, currentUser } = useAuth();
  // @ts-ignore
  // const { fetchUserData } = useFirestore();
  //
  // const loginUser = async (email: string, password: string) => {
  //   login(email, password)
  //     .then((user: any) => {
  //       if (!currentUser.multiFactor.user.emailVerified) {
  //         return setError("Please verify your email address!");
  //       }
  //       fetchUserData(currentUser.multiFactor.user.displayName);
  //       // navigate("/gameSelection");
  //     })
  //     .catch((error: Error) => {
  //       setError(error.message);
  //     });
  // };

  //ToDo: add proper type to any
  const onSubmit = (data: Record<string, any>) => {
    setLoading(true);
    console.log(errors);
    // await loginUser(values.email, values.password);
    setLoading(false);
  };

  const formHasErrors = Object.keys(errors).length > 0;
  return (
    <AppLayout>
      <Modal
        isModalVisible={formHasErrors}
        onPressButtonFn={() => {
          clearErrors();
        }}
        buttonTitle="Back to login screen"
        headerTitle="You're just one step away"
        headerText={formHasErrors && Object.values(errors)[0].message}
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
              onPress={handleSubmit(onSubmit)}
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
