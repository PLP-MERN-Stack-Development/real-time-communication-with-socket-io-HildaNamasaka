// client/src/components/MessageList.jsx
import React from 'react';
import MessageItem from './MessageItem';

function MessageList({ messages, currentUser, messagesEndRef }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      {/* Empty State */}
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="bg-gray-200 rounded-full p-6 mb-4">
            <svg 
              className="w-16 h-16 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No messages yet
          </h3>
          <p className="text-gray-500">
            Start the conversation by sending a message!
          </p>
        </div>
      ) : (
        // Messages List
        <div className="space-y-4">
          {messages.map((message, index) => (
            <MessageItem
              key={message.id || index}
              message={message}
              currentUser={currentUser}
            />
          ))}
          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}

export default MessageList;