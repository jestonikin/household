// src/services/UserService.ts
import axios from "axios";

// ---------- Axios instance ----------
const api = axios.create({
  baseURL: "http://localhost:3006/v1/api",
  headers: { "Content-Type": "application/json" },
});

// Optional: response interceptor for 401 / errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - redirect to login if needed");
    }
    return Promise.reject(error);
  }
);

// ---------- Type definitions ----------
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// ---------- Service methods ----------
const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/users");
  return response.data;
};

const getHouseholds = async (): Promise<User[]> => {
  const response = await api.get<any[]>("/households");
  return response.data;
};

const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/users/auth", data);
  return response.data;
};

const createHousehold = async (data: any): Promise<any> => {
  const response = await api.post<any>("/household", data);
  return response.data;
};

// ---------- Export ----------
const UserService = { getUsers, login, createHousehold, getHouseholds };
export default UserService;
