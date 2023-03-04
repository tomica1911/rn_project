import React, { useState } from "react";
import { StyleSheet, Pressable, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTogglePasswordVisibility } from "../../hooks/useTogglePasswordVisibility";
import { useController } from "react-hook-form";
import merge from "lodash/merge";

interface PasswordFieldProps {
  placeholder?: string;
  showHidePasswordAbility?: boolean;
  name: string;
  //ToDo: add proper types for control
  control: any;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  // ToDo: find more appropriate type
  additionalInputFieldStyles?: Record<any, any>;
  additionalInputContainerStyles?: Record<any, any>;
}

//ToDo: refactor component
export const InputField = ({
  placeholder,
  showHidePasswordAbility,
  name,
  control,
  multiline = false,
  additionalInputFieldStyles,
  additionalInputContainerStyles,
  numberOfLines = 1,
  maxLength = 100,
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
    <View style={{ ...styles.inputContainer, ...additionalInputContainerStyles }}>
      <TextInput
        style={
          !additionalInputFieldStyles
            ? stylesObj
            : merge(stylesObj, additionalInputFieldStyles)
        }
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={maxLength}
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
    margin: 10,
    height: 50,
    backgroundColor: "white",
    width: 200,
    borderColor: "#d7d7d7",
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  inputField: {
    textAlign: "center",
    width: "100%",
  },
  placeholder: {
    marginLeft: 20,
  },
});

// const styles = StyleSheet.create({
//   inputContainer: {
//     paddingRight: 20,
//     backgroundColor: "white",
//     flexDirection: "row",
//     borderColor: "#d7d7d7",
//     borderWidth: 1,
//     borderRadius: 8,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "center",
//     marginTop: 20,
//   },
//   inputField: {
//     textAlign: "center",
//     padding: 12,
//     fontSize: 18,
//     color: "#232323",
//   },
//   placeholder: {
//     marginLeft: 20,
//   },
// });
