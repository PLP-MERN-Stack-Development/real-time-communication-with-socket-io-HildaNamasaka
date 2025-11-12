// client/src/components/Sidebar.jsx
import React from 'react';
import { Hash, LogOut } from 'lucide-react';
import { useSocket } from '../hooks/useSocket';

function Sidebar({ users, currentUser, selectedUser, onSelectUser }) {
  const { disconnect } = useSocket();

  // Filter out current user from the list
  const otherUsers = users.filter(user => user.username !== currentUser?.username);

  return (
    <div className="w-80 bg-gray-900 text-white flex flex-col">
      {/* Sidebar Header */}
      <div className="p-5 border-b border-gray-800">
        <h2 className="text-2xl font-bold mb-1">ChatHub</h2>
        <p className="text-sm text-gray-400">
          {users.length} {users.length === 1 ? 'user' : 'users'} online
        </p>
      </div>

      {/* Current User Info */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg">
              {currentUser?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-800 rounded-full"></div>
          </div>
          <div className="flex-1">
            <p className="font-semibold">{currentUser?.username}</p>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Global Chat Room */}
      <div className="p-3 border-b border-gray-800">
        <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2 px-2">
          Channels
        </h3>
        <button
          onClick={() => onSelectUser(null)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            !selectedUser
              ? 'bg-indigo-600 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          <Hash size={20} />
          <span className="font-medium">Global Chat</span>
        </button>
      </div>

      {/* Direct Messages */}
      <div className="flex-1 overflow-y-auto p-3">
        <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2 px-2">
          Direct Messages
        </h3>
        
        {otherUsers.length === 0 ? (
          <p className="text-sm text-gray-500 px-2 py-4">
            No other users online
          </p>
        ) : (
          <div className="space-y-1">
            {otherUsers.map(user => (
              <button
                key={user.id}
                onClick={() => onSelectUser(user)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  selectedUser?.id === user.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm">{user.username}</p>
                  <p className="text-xs text-gray-400">Online</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={disconnect}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;