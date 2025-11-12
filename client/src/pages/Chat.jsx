// client/src/pages/Chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../hooks/useSocket';
import Sidebar from '../components/Sidebar';
import ChatHeader from '../components/ChatHeader';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import TypingIndicator from '../components/TypingIndicator';

function Chat() {
  const {
    messages,
    users,
    typingUsers,
    currentUser,
    sendMessage,
    sendPrivateMessage,
    setTyping
  } = useSocket();

  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle send message
  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    // Send private or global message
    if (selectedUser) {
      sendPrivateMessage(selectedUser.id, messageText);
    } else {
      sendMessage(messageText);
    }

    // Clear input and reset typing
    setMessageText('');
    setTyping(false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  // Handle typing indicator
  const handleTyping = (e) => {
    setMessageText(e.target.value);
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Show typing
    setTyping(true);
    
    // Hide typing after 1 second of no typing
    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false);
    }, 1000);
  };

  // Filter messages based on search and selected user
  const filteredMessages = messages.filter(msg => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        msg.message?.toLowerCase().includes(searchLower) ||
        msg.sender?.toLowerCase().includes(searchLower)
      );
    }
    
    // Private message filter
    if (selectedUser) {
      return msg.isPrivate && (
        msg.recipientId === selectedUser.id || 
        msg.senderId === selectedUser.id
      );
    }
    
    // Show only global messages
    return !msg.isPrivate;
  });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {showSidebar && (
        <Sidebar
          users={users}
          currentUser={currentUser}
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatHeader
          selectedUser={selectedUser}
          users={users}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
        />

        <MessageList
          messages={filteredMessages}
          currentUser={currentUser}
          messagesEndRef={messagesEndRef}
        />

        {typingUsers.length > 0 && (
          <TypingIndicator typingUsers={typingUsers} />
        )}

        <MessageInput
          messageText={messageText}
          onMessageChange={handleTyping}
          onSendMessage={handleSendMessage}
          selectedUser={selectedUser}
        />
      </div>
    </div>
  );
}

export default Chat;