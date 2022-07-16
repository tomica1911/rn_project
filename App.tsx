import { Stack } from "./components/Stack/Stack";
import "./firebaseConfig";
import { AuthProvider } from "./contexts/authContext";
import { FirestoreProvider } from "./contexts/firebaseContext";

//ToDo: remove unused npm packages from project
export default function App() {
  return (
    <FirestoreProvider>
      <AuthProvider>
        <Stack />
      </AuthProvider>
    </FirestoreProvider>
  );
}
