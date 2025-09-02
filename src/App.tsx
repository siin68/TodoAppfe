import React from 'react';
import HealthStatus from './components/HealthStatus';
import UserList from './components/UserList';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">TdoApp Frontend</h1>
            </div>
            <div className="text-sm text-gray-500">
              Connected to: <span className="font-mono">localhost:3000</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Health Status */}
          <div className="lg:col-span-1">
            <HealthStatus />
          </div>

          {/* Right Column - User Management */}
          <div className="lg:col-span-2">
            <UserList />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-sm text-gray-500">
            TdoApp Frontend - Built with React, TypeScript & Tailwind CSS
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
