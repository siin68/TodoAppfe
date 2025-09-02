export interface User {
  id: number;
  username: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

export interface HealthResponse {
  status: string;
  database: string;
  uptime: number;
  timestamp: string;
}

export interface DbTestResponse {
  success: boolean;
  message: string;
  version?: string;
  error?: string;
}
