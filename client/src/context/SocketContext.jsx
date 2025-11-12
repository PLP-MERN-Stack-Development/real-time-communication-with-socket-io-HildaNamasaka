// client/src/context/SocketContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { socket } from '../socket/socket';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Connection events
    socket.on('connect', () => {
      console.log('Socket connected');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    // Message events
    socket.on('receive_message', (message) => {
      console.log('New message received:', message);
      setMessages((prev) => [...prev, message]);
    });

    socket.on('private_message', (message) => {
      console.log('Private message received:', message);
      setMessages((prev) => [...prev, { ...message, isPrivate: true }]);
    });

    // User events
    socket.on('user_list', (userList) => {
      console.log('Updated user list:', userList);
      setUsers(userList);
    });

    socket.on('user_joined', (user) => {
      console.log('User joined:', user.username);
      // Add system message
      const systemMsg = {
        id: Date.now(),
        system: true,
        message: `${user.username} joined the chat`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, systemMsg]);
    });

    socket.on('user_left', (user) => {
      console.log('User left:', user.username);
      // Add system message
      const systemMsg = {
        id: Date.now(),
        system: true,
        message: `${user.username} left the chat`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, systemMsg]);
    });

    // Typing events
    socket.on('typing_users', (users) => {
      setTypingUsers(users);
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('receive_message');
      socket.off('private_message');
      socket.off('user_list');
      socket.off('user_joined');
      socket.off('user_left');
      socket.off('typing_users');
    };
  }, []);

  // Connect to server
  const connect = (username) => {
    socket.connect();
    socket.emit('user_join', username);
    setCurrentUser({ username, id: socket.id });
  };

  // Disconnect from server
  const disconnect = () => {
    socket.disconnect();
    setCurrentUser(null);
    setMessages([]);
    setUsers([]);
  };

  // Send message
  const sendMessage = (message) => {
    if (!message.trim()) return;
    socket.emit('send_message', { message });
  };

  // Send private message
  const sendPrivateMessage = (to, message) => {
    if (!message.trim()) return;
    socket.emit('private_message', { to, message });
  };

  // Set typing status
  const setTyping = (isTyping) => {
    socket.emit('typing', isTyping);
  };

  const value = {
    isConnected,
    messages,
    users,
    typingUsers,
    currentUser,
    connect,
    disconnect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};