import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { AppLayout } from "../../../components/AppLayout/AppLayout";
import { ActivityIndicator } from "react-native";
import { InputField } from "../../../components/PasswordField/InputField";
import { CustomizableButton } from "../../../components/CustomizableButton/CustomizableButton";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "../../../components/Modal/Modal";

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

export const Signup = (): JSX.Element => {
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
  // // @ts-ignore
  // const { createDbEntryForUser } = useFirestore();
  // // ToDo complete the loading functionality
  const [loading, setLoading] = useState<boolean>(false);
  // // @ts-expect-error
  // const { signup } = useAuth();

  //
  // const registerUserWithFirebase = async (email: string, password: string) => {
  //   try {
  //     await signup(email, password)
  //       .then((userCredential: any) => {
  //         userCredential.user.sendEmailVerification();
  //         return userCredential;
  //       })
  //       .then((userCredential: any) => {
  //         userCredential.user.updateProfile({
  //           displayName: values.displayName,
  //         });
  //       })
  //       .then((res: any) => {
  //         createDbEntryForUser(values.displayName);
  //       })
  //       .catch((error: Error) => {
  //         setError(error.message);
  //       });
  //   } catch {
  //     setError("Failed to create an account, please contact customer support!");
  //   }
  // };
  //
  // const onSubmitHandler = async (event: FormEvent) => {
  //   event.preventDefault();
  //   if (!/^([0-9a-zA-Z]{1,16})$/.test(values.displayName)) {
  //     return setError("Display Name not valid, please try again");
  //   }
  //   if (values.password.length < 8) {
  //     return setError("Password should contain atleast 8 characters!");
  //   }
  //   if (values.password !== values.repeatPassword) {
  //     return setError("Passwords do not match!");
  //   }
  //   setLoading(true);
  //   registerUserWithFirebase(values.email, values.password);
  //   setLoading(false);
  // };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  //ToDo: add proper type to any
  const onSubmit = (data: Record<string, any>) => {
    setLoading(true);
    console.log(errors);
    // await loginUser(values.email, values.password);
    setLoading(false);
  };

  const formHasErrors = Object.keys(errors).length > 0;

  //ToDo: make an independent component for the spinner
  return (
    <AppLayout>
      <Modal
        isModalVisible={formHasErrors}
        onPressButtonFn={() => {
          clearErrors();
        }}
        buttonTitle="Back to signup screen"
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
              onPress={handleSubmit(onSubmit)}
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
