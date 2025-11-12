// client/src/components/TypingIndicator.jsx
import React from 'react';

function TypingIndicator({ typingUsers }) {
  if (!typingUsers || typingUsers.length === 0) {
    return null;
  }

  // Format the typing message
  const getTypingMessage = () => {
    if (typingUsers.length === 1) {
      return `${typingUsers[0]} is typing`;
    } else if (typingUsers.length === 2) {
      return `${typingUsers[0]} and ${typingUsers[1]} are typing`;
    } else {
      return `${typingUsers.length} people are typing`;
    }
  };

  return (
    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        {/* Animated Dots */}
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
        
        {/* Typing Text */}
        <span className="font-medium italic">
          {getTypingMessage()}...
        </span>
      </div>
    </div>
  );
}

export default TypingIndicator;