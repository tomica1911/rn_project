import { ReactNode } from "react";
import { View } from "react-native";
import { COLOR_COMBINATION_1 } from "../../styles/styles";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps): JSX.Element => {
  //ToDo: define general styles here
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: COLOR_COMBINATION_1.DARK_BLUE,
      }}
    >
      {children}
    </View>
  );
};
