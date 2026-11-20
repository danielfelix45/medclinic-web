import { api } from "../../../services/api/client";
import type {
  AuthUser,
  LoginCredentials,
  LoginResponse,
} from "../types/auth.types";

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/auth/login", credentials);

    return response.data;
  },

  async getMe(): Promise<AuthUser> {
    const response = await api.get<AuthUser>("/users/me");
    return response.data;
  },
};
