import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { ApiResponse, User, HealthResponse, DbTestResponse } from '../types/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// API service functions
export const apiService = {
  // Health check
  async getHealth(): Promise<HealthResponse> {
    const response = await api.get<HealthResponse>('/health');
    return response.data;
  },

  // Database test
  async testDatabase(): Promise<DbTestResponse> {
    const response = await api.get<DbTestResponse>('/db-test');
    return response.data;
  },

  // Get all users
  async getUsers(): Promise<ApiResponse<User[]>> {
    const response = await api.get<ApiResponse<User[]>>('/users');
    return response.data;
  },

  // Get user by ID
  async getUserById(id: string): Promise<ApiResponse<User>> {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    return response.data;
  },

  // Get usernames only
  async getUsernames(): Promise<ApiResponse<string[]>> {
    const response = await api.get<ApiResponse<string[]>>('/usernames');
    return response.data;
  },

  // Search users by username
  async searchUsers(username: string): Promise<ApiResponse<User[]>> {
    const response = await api.get<ApiResponse<User[]>>(`/users/search/${username}`);
    return response.data;
  },
};
