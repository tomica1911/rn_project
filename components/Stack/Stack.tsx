import { createStackNavigator } from "@react-navigation/stack";
import { MainMenu } from "../../screens/MainMenu/MainMenu";
import { GameSelection } from "../../screens/Game/GameSelection/GameSelection";
import { NavigationContainer } from "@react-navigation/native";
import { SCREENS } from "../../constants";

const AppStack = createStackNavigator();

export const Stack = (): JSX.Element => {
  const styles = {
    headerStyle: {
      backgroundColor: "#111214",
    },
    headerTintColor: "#F7B42F",
    headerTitleStyle: {
      color: "#F7B42F",
    },
  };

  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          options={styles}
          name={SCREENS.MAIN}
          component={MainMenu}
        />
        <AppStack.Screen
          options={styles}
          name={SCREENS.PLAY}
          component={GameSelection}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
