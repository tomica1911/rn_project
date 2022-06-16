import { ReactNode } from "react";
import { View } from "react-native";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps): JSX.Element => {
  //ToDo: define general styles here
  return (
    <View
      style={{
        paddingLeft: 100,
        paddingRight: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#111214",
      }}
    >
      {children}
    </View>
  );
};
