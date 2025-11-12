// client/src/App.jsx
import React from 'react';
import { SocketProvider } from './context/SocketContext';
import { useSocket } from './hooks/useSocket';
import Login from './pages/Login';
import Chat from './pages/Chat';

// Main App Content
function AppContent() {
  const { isConnected } = useSocket();

  // Show login page if not connected
  if (!isConnected) {
    return <Login />;
  }

  // Show chat page if connected
  return <Chat />;
}

// App wrapper with SocketProvider
function App() {
  return (
    <SocketProvider>
      <AppContent />
    </SocketProvider>
  );
}

export default App;