// client/src/hooks/useSocket.js
import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

// Custom hook to use socket context
export const useSocket = () => {
  const context = useContext(SocketContext);
  
  // Make sure the hook is used within SocketProvider
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  
  return context;
};

export default useSocket;