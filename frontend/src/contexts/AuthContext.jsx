// contexts/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { authService } from "../services/api.js";
import Cookies from "js-cookie";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    const authChecking = async () => {
      if (token) {
        authService
          .getProfile()
          .then((data) => setUser(data.user))
          .catch(() => Cookies.remove("token"))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    };
    authChecking();
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    Cookies.set("token", data.token, { expires: 7 });
    setUser(data.user);
    return data;
  };

  const loginWithGoogle = async (credential) => {
    const data = await authService.loginWithGoogle(credential);
    Cookies.set("token", data.token, { expires: 7 });
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    Cookies.set("token", data.token, { expires: 7 });
    setUser(data.user);
    return data;
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
