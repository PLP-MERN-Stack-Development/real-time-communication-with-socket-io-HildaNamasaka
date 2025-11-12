// client/src/components/MessageItem.jsx
import React from 'react';

function MessageItem({ message, currentUser }) {
  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // System messages (user joined/left)
  if (message.system) {
    return (
      <div className="flex justify-center">
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
          {message.message}
        </div>
      </div>
    );
  }

  // Check if message is from current user
  const isOwnMessage = message.senderId === currentUser?.id || 
                        message.sender === currentUser?.username;

  return (
    <div className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white">
          {message.sender?.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-xl ${isOwnMessage ? 'flex flex-col items-end' : ''}`}>
        {/* Message Header */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-bold text-gray-800 text-sm">
            {message.sender}
          </span>
          <span className="text-xs text-gray-500">
            {formatTime(message.timestamp)}
          </span>
          {message.isPrivate && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
              Private
            </span>
          )}
        </div>

        {/* Message Text */}
        <div className={`rounded-2xl px-4 py-3 shadow-sm ${
          isOwnMessage
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-none'
            : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
        }`}>
          <p className="break-words leading-relaxed">
            {message.message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageItem;