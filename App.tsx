import { Stack } from "./components/Stack/Stack";
import "./firebaseConfig";
import { AuthProvider } from "./contexts/authContext";

//ToDo: remove unused npm packages from project
export default function App() {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}
