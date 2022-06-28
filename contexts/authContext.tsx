import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  updateProfile,
  sendEmailVerification,
  // onAuthStateChanged,
  User,
} from "firebase/auth";

// ToDo: setup enviroment variables for this to work with production
// ToDo: refactor this component so it uses typescript
const AuthContext = React.createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

interface ErrorObj {
  message: string;
}

type Error = {
  [errorName: string]: ErrorObj;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User>();
  const [authErrors, setAuthErrors] = useState<Error | undefined>(undefined);
  const [authLoading, setAuthLoading] = useState(false);
  const [verificationEmailResent, setVerificationEmailResent] = useState<boolean>(false);
  const auth = getAuth();

  function signup(
    displayName: string,
    password: string,
    confirmPassword: string,
    email: string
  ) {
    setAuthLoading(true);
    if (confirmPassword === password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          updateProfile(user.user, { displayName });
          sendEmailVerification(user.user);
          setCurrentUser(user.user);
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setAuthErrors({
              emailAlreadyInUse: { message: "Email address already in use" },
            });
          }

          if (error.code === "auth/invalid-email") {
            setAuthErrors({
              emailInvalid: { message: "Email address invalid" },
            });
          }

          console.error(error);
        });
    }
    setAuthLoading(false);
  }

  function sendVerificationEmail(user: User){
    setVerificationEmailResent(true);
    return sendEmailVerification(user)
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetUserPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserEmail(email: string) {
    if (currentUser) {
      return updateEmail(currentUser, email);
    }
  }

  function updateUserPassword(password: string) {
    if (currentUser) {
      return updatePassword(currentUser, password);
    }
  }

  const values = {
    currentUser,
    login,
    authErrors,
    setAuthErrors,
    signup,
    logout,
    resetUserPassword,
    updateUserEmail,
    updateUserPassword,
    authLoading,
    sendVerificationEmail,
    verificationEmailResent
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
