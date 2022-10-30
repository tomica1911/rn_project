import { Stack } from "./components/Stack/Stack";
import "./firebaseConfig";
import { AuthProvider } from "./contexts/authContext";
import { FirestoreProvider } from "./contexts/firebaseContext";
import { useFonts } from "expo-font";
import { setCustomText } from "react-native-global-props";

//ToDo: remove unused npm packages from project
export default function App() {
  const [fontsLoaded] = useFonts({
    "luckiestGuy": require("./assets/fonts/LuckiestGuy.ttf"),
  });

  if(fontsLoaded){
      setCustomText({ style: { fontFamily: "luckiestGuy", fontSize: 15 } });
  }

  return (
    <FirestoreProvider>
      <AuthProvider>
        <Stack />
      </AuthProvider>
    </FirestoreProvider>
  );
}
