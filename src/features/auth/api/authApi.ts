import axiosInstance from "../../../shared/api/axiosInstance";
import { User } from "../../../entities/user/types";

interface LoginResponse {
  token: string;
  role: User["role"];
  id: string;
}

export const loginApi = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/auth/login", {
    username,
    password,
  });
  return response.data;
};

export const registerApi = async (
  username: string,
  password: string
): Promise<User> => {
  const response = await axiosInstance.post<User>("/auth/register", {
    username,
    password,
  });
  return response.data;
};
