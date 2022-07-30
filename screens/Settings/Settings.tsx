import { View, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { SCREENS } from "../../constants";

export const Settings = ({
  navigation,
}: StackScreenProps<RootStackParamList, SCREENS.PROFILE>) => {
  // ToDo: add payment options tab
  // ToDo: add ability to change subscription
  // ToDo: add ability to cancel subscription
  // ToDo: add tab to change password
  // ToDo: add ability to change theme to a more lighter one - premium only
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};
