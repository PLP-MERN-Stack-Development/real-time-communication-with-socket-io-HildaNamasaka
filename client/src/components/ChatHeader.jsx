// client/src/components/ChatHeader.jsx
import React from 'react';
import { Users, Hash, Search } from 'lucide-react';

function ChatHeader({ selectedUser, users, searchQuery, onSearchChange, onToggleSidebar }) {
  return (
    <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
      {/* Left Side - Toggle and Chat Info */}
      <div className="flex items-center gap-4">
        {/* Toggle Sidebar Button */}
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Toggle sidebar"
        >
          <Users size={24} className="text-gray-600" />
        </button>

        {/* Chat Info */}
        {selectedUser ? (
          // Private Chat Header
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center font-bold text-white">
              {selectedUser.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-lg">
                {selectedUser.username}
              </h2>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Online
              </p>
            </div>
          </div>
        ) : (
          // Global Chat Header
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <Hash size={24} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-lg">
                Global Chat
              </h2>
              <p className="text-sm text-gray-500">
                {users.length} {users.length === 1 ? 'member' : 'members'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Right Side - Search */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors w-64"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;