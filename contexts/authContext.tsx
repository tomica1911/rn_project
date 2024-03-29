import React, { useContext, useState } from "react";
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
  User,
} from "firebase/auth";

interface AuthContextProps {
  currentUser: User | null;
  login: Function;
  logout: Function;
  authErrors: Error | null;
  setAuthErrors: Function;
  signup: Function;
  resetUserPassword: Function;
  updateUserEmail: Function;
  updateUserPassword: Function;
  authLoading: boolean;
  sendVerificationEmail: Function;
  verificationEmailResent: boolean;
}

// ToDo: setup enviroment variables for this to work with production
const AuthContext = React.createContext<AuthContextProps>({
  currentUser: null,
  login: () => {},
  authErrors: null,
  setAuthErrors: () => {},
  signup: () => {},
  logout: () => {},
  resetUserPassword: () => {},
  updateUserEmail: () => {},
  updateUserPassword: () => {},
  authLoading: false,
  sendVerificationEmail: () => {},
  verificationEmailResent: false,
});

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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authErrors, setAuthErrors] = useState<Error | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [verificationEmailResent, setVerificationEmailResent] =
    useState<boolean>(false);
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
        .then(async (user) => {
          updateProfile(user.user, { displayName });
          sendEmailVerification(user.user);
          setCurrentUser(user.user);
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            return setAuthErrors({
              emailAlreadyInUse: { message: "Email address already in use" },
            });
          }

          if (error.code === "auth/invalid-email") {
            return setAuthErrors({
              emailInvalid: { message: "Email address invalid" },
            });
          }

          return setAuthErrors({
            unknownError: {
              message:
                "Unknown error, please contact customer support or try later",
            },
          });
        });
    }
    setAuthLoading(false);
  }

  function sendVerificationEmail(user: User) {
    setVerificationEmailResent(true);
    return sendEmailVerification(user);
  }

  function login(email: string, password: string) {
    setAuthLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setCurrentUser(user.user);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          return setAuthErrors({
            userNotFound: {
              message: "User not found, did you enter your email correctly?",
            },
          });
        }
        if (error.code === "auth/wrong-password") {
          return setAuthErrors({
            wrongPassword: { message: "Password incorrect" },
          });
        }
        return setAuthErrors({
          unknownError: {
            message:
              "Unknown error, please contact customer support or try later",
          },
        });
      });
    setAuthLoading(false);
  }

  function logout() {
    setAuthLoading(true);
    signOut(auth);
    setCurrentUser(null);
    setAuthLoading(false);
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
    verificationEmailResent,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
