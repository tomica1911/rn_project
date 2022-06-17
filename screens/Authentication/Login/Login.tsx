import { View, Text } from "react-native";
import React, { useState } from "react";
import { AppLayout } from "../../../components/AppLayout/AppLayout";
import { ActivityIndicator } from "react-native";
import { InputField } from "../../../components/PasswordField/InputField";
import { CustomizableButton } from "../../../components/CustomizableButton/CustomizableButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const yupSchema = yup.object().shape({
  name: yup
    .string()
    .required(),
  password: yup.string().required().matches(/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/),
});

export const Login = (): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema),
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

  return (
    <AppLayout>
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
