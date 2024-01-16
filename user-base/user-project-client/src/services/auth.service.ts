import { axiosConfig } from "../api/axios.config";
import {
  LoginUserDatatype,
  UpdateUserDataType,
  UserDataType,
  UserSystemDataType,
} from "../types/user.types";

export const AuthService = {
  async registration(userData: UserDataType): Promise<number> {
    const data = await axiosConfig.post<number>("user", userData);

    return data.status;
  },
  async login(userData: LoginUserDatatype): Promise<UserSystemDataType> {
    const { data } = await axiosConfig.post<UserSystemDataType>(
      "auth/login",
      userData
    );
    return data;
  },
  async isAuthorizedUser(): Promise<UserSystemDataType | undefined> {
    const { data } = await axiosConfig.get<UserSystemDataType | undefined>(
      "auth/profile"
    );
    if (data) {
      return data;
    }
  },
  async getOneUser(id: string) {
    const { data } = await axiosConfig.get(`auth/${id}`);
    if (data) {
      return data;
    }
  },
  async getAllUsers() {
    const { data } = await axiosConfig.get("user");
    if (data) {
      return data;
    }
  },
  async updateUser(id: string, userData: UpdateUserDataType) {
    const { data } = await axiosConfig.patch(`user/${id}`, userData);
    if (data) {
      return data;
    }
  },
  async deleteUser(id: string) {
    const { data } = await axiosConfig.delete(`user/${id}`);
    if (data) {
      return data;
    }
  },
};
