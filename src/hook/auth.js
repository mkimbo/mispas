import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
import AuthService from "../service/AuthService";

const authContext = createContext();

export default function useAuth() {
  return useContext(authContext);
}

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const loginWithGoogle = async () => {
    const { data, error } = await AuthService.loginWithGoogle();
    if (data) {
      setUser(data);
      router.replace("/");
      /* if (!data?.enabledNotifications) {
        router.replace("/settings");
      } */
    }

    setError(error ?? "");
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };
  const value = { user, error, loginWithGoogle, logout, setUser };

  return <authContext.Provider value={value} {...props} />;
}
