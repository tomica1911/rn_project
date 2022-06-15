import { ReactNode } from "react";
import { View } from "react-native";

interface FormLayoutProps {
  children: ReactNode;
}

export const FormLayout = ({ children }: FormLayoutProps): JSX.Element => {
  //ToDo: define general styles here
  return (
    <View
      style={{
        paddingLeft: 100,
        paddingRight: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
};
