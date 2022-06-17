import React, { useState } from "react";
import { StyleSheet, Pressable, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTogglePasswordVisibility } from "../../hooks/useTogglePasswordVisibility";
import { useController } from "react-hook-form";

interface PasswordFieldProps {
  placeholder?: string;
  showHidePasswordAbility?: boolean;
  name: string;
  //ToDo: add proper types for control
  control: any;
}

//ToDo: refactor component
export const InputField = ({
  placeholder,
  showHidePasswordAbility,
  name,
  control,
}: PasswordFieldProps) => {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  });
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [value, setValue] = useState("");

  const stylesObj = {
    ...styles.inputField,
    marginLeft: showHidePasswordAbility ? 20 : 0,
  };
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={stylesObj}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="newPassword"
        secureTextEntry={showHidePasswordAbility ? passwordVisibility : false}
        value={field.value}
        enablesReturnKeyAutomatically
        onChangeText={field.onChange}
      />
      {showHidePasswordAbility ? (
        <Pressable onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons
            name={rightIcon as any}
            size={20}
            color="#232323"
          />
        </Pressable>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingRight: 20,
    backgroundColor: "white",
    width: 200,
    flexDirection: "row",
    borderColor: "#d7d7d7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 35,
  },
  inputField: {
    textAlign: "center",
    width: "100%",
  },
  placeholder: {
    marginLeft: 20,
  },
});
