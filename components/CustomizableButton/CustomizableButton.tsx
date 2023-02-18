import { Text, Pressable } from "react-native";
import { COLOR_COMBINATION_1 } from "../../styles/styles";

//ToDo: find more appropriate type for the styles prop
interface CustomizableButtonProps {
  onPress: () => void;
  title: string;
  primary?: boolean;
  stylesButton?: Record<string, string | number>;
  stylesText?: Record<string, string | number>;
  disabled?: boolean;
}

export const CustomizableButton = ({
  onPress,
  title,
  primary = true,
  stylesButton,
  stylesText,
  disabled = false,
}: CustomizableButtonProps) => (
  <Pressable
    android_disableSound
    disabled={disabled}
    style={{
      backgroundColor: primary ? COLOR_COMBINATION_1.ORANGE : "white",
      ...(primary
        ? {}
        : {
            borderStyle: "solid",
            borderColor: COLOR_COMBINATION_1.ORANGE,
            borderWidth: 5,
          }),
      padding: 20,
      alignSelf: "center",
      marginVertical: 10,
      borderRadius: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: COLOR_COMBINATION_1.ORANGE,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      width: "100%",
      ...stylesButton,
    }}
    onPress={onPress}
  >
    <Text
      style={{
        color: "#0f1120",
        fontSize: 20,
        ...stylesText,
      }}
    >
      {title}
    </Text>
  </Pressable>
);
