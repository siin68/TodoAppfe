// API configuration
export const API_BASE_URL = 'http://localhost:3000';

// API endpoints
export const API_ENDPOINTS = {
  health: '/health',
  dbTest: '/db-test',
  users: '/users',
  usernames: '/usernames',
  userById: (id: string) => `/users/${id}`,
  searchUsers: (username: string) => `/users/search/${username}`,
};
