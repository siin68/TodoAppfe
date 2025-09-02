# TdoApp Frontend

Frontend React TypeScript application for TdoApp.

## Features

- ✅ React 18 with TypeScript
- ✅ Tailwind CSS for styling
- ✅ Vite for fast development
- ✅ API integration with backend
- ✅ Health monitoring
- ✅ User management interface

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- Backend server running on port 3000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3001`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── HealthStatus.tsx # System health monitoring
│   ├── UserList.tsx     # User management
│   └── LoadingSpinner.tsx
├── hooks/               # Custom React hooks
│   ├── useUsers.ts      # User data management
│   └── useHealth.ts     # Health check management
├── services/            # API services
│   └── api.ts           # API client
├── types/               # TypeScript type definitions
│   └── api.ts           # API response types
├── config/              # Configuration files
│   └── api.ts           # API endpoints configuration
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles with Tailwind

```

## API Integration

The frontend connects to the backend API running on `http://localhost:3000` and provides:

- System health monitoring
- Database connection status
- User listing and search
- Real-time data updates

## Components

### HealthStatus
- Displays server status and uptime
- Shows database connection status
- Real-time health monitoring

### UserList
- Lists all users from the database
- Search functionality
- User detail view
- Refresh capabilities

## Development

The app uses Vite for fast development with Hot Module Replacement (HMR). All changes will be reflected immediately in the browser.

Make sure the backend server is running on port 3000 before starting the frontend development server.
