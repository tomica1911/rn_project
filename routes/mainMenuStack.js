import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { MainMenu } from "../screens/MainMenu/MainMenu";
import { Login } from "../screens/Authentication/Login/Login";
import { Logout } from "../screens/Authentication/Logout/Logout";
import { Signup } from "../screens/Authentication/Signup/Signup";
import { GameSelection } from "../screens/Game/GameSelection/GameSelection"
import { Dashboard } from "../screens/Dashboard/Dashboard";

const screens = {
  MainMenu: MainMenu,
  Play: GameSelection,
  Dashboard: Dashboard,
  Login: Login,
  Logout: Logout,
  Signup: Signup,
};

const MainMenuStack = createStackNavigator(screens);

export default createAppContainer(MainMenuStack);
