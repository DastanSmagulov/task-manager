import { createContext, useState, useEffect, FC, ReactNode } from "react";
import axiosInstance from "../../../shared/api/axiosInstance";
import { loginApi, registerApi } from "../api/authApi";
import { User, UserRole } from "../../../entities/user/types";

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => false,
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role") as UserRole | null;
    const id = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    if (token && role && id && username) {
      setUser({ id, role, token, username });
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const data = await loginApi(username, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("username", username);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;
      setUser({
        id: data.id,
        username,
        role: data.role,
        token: data.token,
      });
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (
    username: string,
    password: string
  ): Promise<void> => {
    try {
      await registerApi(username, password);
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    delete axiosInstance.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
