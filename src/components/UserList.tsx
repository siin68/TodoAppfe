import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { apiService } from '../services/api';
import { User } from '../types/api';
import LoadingSpinner from './LoadingSpinner';

const UserList: React.FC = () => {
  const { users, loading, error, refetch } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    try {
      const response = await apiService.searchUsers(searchTerm);
      if (response.success && response.data) {
        setSearchResults(response.data);
      }
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setSearching(false);
    }
  };

  const handleUserClick = async (userId: number) => {
    try {
      const response = await apiService.getUserById(userId.toString());
      if (response.success && response.data) {
        setSelectedUser(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch user details:', err);
    }
  };

  const displayUsers = searchTerm.trim() ? searchResults : users;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Users</h2>
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="lg" />
          <span className="ml-3 text-gray-600">Loading users...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Users</h2>
        <div className="text-red-600 p-4 bg-red-50 rounded-lg">
          <p className="font-medium">Error: {error}</p>
          <button
            onClick={refetch}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* User List */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Users</h2>
          <button
            onClick={refetch}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Refresh
          </button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search users by username..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              disabled={searching}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {searching ? <LoadingSpinner size="sm" /> : 'Search'}
            </button>
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSearchResults([]);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* User List */}
        <div className="space-y-2">
          {displayUsers.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              {searchTerm.trim() ? 'No users found' : 'No users available'}
            </div>
          ) : (
            displayUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserClick(user.id)}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <div>
                  <span className="font-medium text-gray-800">{user.username}</span>
                  <div className="text-sm text-gray-500">ID: {user.id}</div>
                </div>
                <div className="text-gray-400">→</div>
              </div>
            ))
          )}
        </div>

        {/* Total count */}
        <div className="mt-4 text-sm text-gray-500">
          Total: {displayUsers.length} users
          {searchTerm.trim() && ` (filtered from ${users.length})`}
        </div>
      </div>

      {/* Selected User Details */}
      {selectedUser && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">User Details</h3>
            <button
              onClick={() => setSelectedUser(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">ID:</span>
              <span className="text-gray-800">{selectedUser.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Username:</span>
              <span className="text-gray-800">{selectedUser.username}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
