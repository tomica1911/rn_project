import { createStackNavigator } from "@react-navigation/stack";
import { MainMenu } from "../../screens/MainMenu/MainMenu";
import { GameSelection } from "../../screens/Game/GameSelection/GameSelection";
import { Dashboard } from "../../screens/Dashboard/Dashboard";
import { Login } from "../../screens/Authentication/Login/Login";
import { Logout } from "../../screens/Authentication/Logout/Logout";
import { Signup } from "../../screens/Authentication/Signup/Signup";
import { Settings } from "../../screens/Settings/Settings";
import { NavigationContainer } from "@react-navigation/native";
import { Profile } from "../../screens/GameSettings/Profile";

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
          name="Main Menu"
          component={MainMenu}
        />
        <AppStack.Screen
          options={styles}
          name="Play"
          component={GameSelection}
        />
        <AppStack.Screen
          options={styles}
          name="Profile"
          component={Profile}
        />
        <AppStack.Screen
          options={styles}
          name="Dashboard"
          component={Dashboard}
        />
        <AppStack.Screen options={styles} name="Login" component={Login} />
        <AppStack.Screen options={styles} name="Logout" component={Logout} />
        <AppStack.Screen options={styles} name="Signup" component={Signup} />
        <AppStack.Screen
          options={styles}
          name="Settings"
          component={Settings}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
