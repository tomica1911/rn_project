import { createStackNavigator } from "@react-navigation/stack";
import { MainMenu } from "../../screens/MainMenu/MainMenu";
import { NavigationContainer } from "@react-navigation/native";
import { SCREENS } from "../../constants";
import { COLOR_COMBINATION_1 } from "../../styles/styles";
import { GameMode1 } from "../../screens/Game/GameModes/GameMode1";
import { GameMode2 } from "../../screens/Game/GameModes/GameMode2";
import { Logout } from "../../screens/Logout/Logout";
import { Signup } from "../../screens/Signup/Signup";
import { About } from "../../screens/About/About";
import { Contact } from "../../screens/Contact/Contact";
import { Login } from "../../screens/Login/Login";
import { GameSelectionForm } from "../../screens/Game/GameSelectionForm/GameSelectionForm";
import { Dashboard } from "../../screens/Dashboard/Dashboard";

const AppStack = createStackNavigator();

export const Stack = (): JSX.Element => {
  const styles = {
    headerStyle: {
      backgroundColor: COLOR_COMBINATION_1.BLACK,
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
          component={GameSelectionForm}
        />
        <AppStack.Screen
          options={styles}
          name={SCREENS.DASHBOARD}
          component={Dashboard}
        />
        <AppStack.Screen
          options={styles}
          name={SCREENS.LOGIN}
          component={Login}
        />
        <AppStack.Screen
          options={styles}
          name={SCREENS.LOGOUT}
          component={Logout}
        />
        <AppStack.Screen
          options={styles}
          name={SCREENS.SIGNUP}
          component={Signup}
        />
        <AppStack.Screen
          options={styles}
          name={SCREENS.GAME_MODE_ONE}
          component={GameMode1}
        />
        <AppStack.Screen
          options={styles}
          name={SCREENS.GAME_MODE_TWO}
          component={GameMode2}
        />
        <AppStack.Screen
          options={styles}
          name={SCREENS.ABOUT}
          component={About}
        />
        <AppStack.Screen
          options={styles}
          name={SCREENS.CONTACT}
          component={Contact}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
