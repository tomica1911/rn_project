import React, { useContext, useState, useEffect } from "react";
import { authFirebase } from "../firebase";

// ToDo: setup enviroment variables for this to work with production
// ToDo: refactor this component so it uses typescript
const AuthContext = React.createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email: string, password: string) {
    return authFirebase.createUserWithEmailAndPassword(email, password);
  }

  function login(email: string, password: string) {
    return authFirebase.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return authFirebase.signOut();
  }

  function resetPassword(email: string) {
    return authFirebase.sendPasswordResetEmail(email);
  }

  function updateEmail(email: string) {
    // @ts-expect-error
    return currentUser.updateEmail(email);
  }

  function updatePassword(password: string) {
    // @ts-expect-error
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    setLoading(true);
    const unsubscribe = authFirebase.onAuthStateChanged(
      (user: React.SetStateAction<undefined>) => {
        if (user) {
          // @ts-ignore
          setCurrentUser(user);
        }
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
