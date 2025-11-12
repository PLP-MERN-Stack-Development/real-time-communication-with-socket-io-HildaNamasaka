// client/src/components/MessageInput.jsx
import React from 'react';
import { Send } from 'lucide-react';

function MessageInput({ messageText, onMessageChange, onSendMessage, selectedUser }) {
  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  // Get placeholder text based on chat type
  const getPlaceholder = () => {
    if (selectedUser) {
      return `Message ${selectedUser.username}...`;
    }
    return 'Type a message...';
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex items-center gap-3">
        {/* Message Input Field */}
        <input
          type="text"
          value={messageText}
          onChange={onMessageChange}
          onKeyPress={handleKeyPress}
          placeholder={getPlaceholder()}
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 transition-colors"
        />

        {/* Send Button */}
        <button
          onClick={onSendMessage}
          disabled={!messageText.trim()}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
        >
          <Send size={20} />
          <span className="hidden sm:inline">Send</span>
        </button>
      </div>

      {/* Helper Text */}
      <p className="mt-2 text-xs text-gray-500">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
}

export default MessageInput;