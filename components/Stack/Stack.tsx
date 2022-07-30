import { createStackNavigator } from "@react-navigation/stack";
import { MainMenu } from "../../screens/MainMenu/MainMenu";
import { GameSelection } from "../../screens/Game/GameSelection/GameSelection";
import { Dashboard } from "../../screens/Dashboard/Dashboard";
import { Login } from "../../screens/Authentication/Login/Login";
import { Logout } from "../../screens/Authentication/Logout/Logout";
import { Signup } from "../../screens/Authentication/Signup/Signup";
import { Settings } from "../../screens/Settings/Settings";
import { NavigationContainer } from "@react-navigation/native";
import { Profile } from "../../screens/Profile/Profile";
import { Achievements } from "../../screens/Achievements/Achievements";
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
        <AppStack.Screen
          options={styles}
          name={SCREENS.PROFILE}
          component={Profile}
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
          name={SCREENS.ACHIEVEMENTS}
          component={Achievements}
        />
        <AppStack.Screen
          options={styles}
          name={SCREENS.SETTINGS}
          component={Settings}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
