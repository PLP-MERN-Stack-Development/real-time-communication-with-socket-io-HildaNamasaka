// client/src/pages/Login.jsx
import React, { useState } from 'react';
import { useSocket } from '../hooks/useSocket';

function Login() {
  const { connect } = useSocket();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate username
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    
    if (username.length > 20) {
      setError('Username must be less than 20 characters');
      return;
    }
    
    // Clear error and connect
    setError('');
    connect(username.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full p-3 mb-4">
            <svg 
              className="w-12 h-12 text-white" 
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to ChatHub
          </h1>
          <p className="text-gray-600">
            Enter your username to start chatting
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username..."
              maxLength={20}
              autoFocus
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 transition-colors"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!username.trim()}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
          >
            Join Chat
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            No registration required • Free to use
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;