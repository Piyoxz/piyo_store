import React, { useState } from 'react';
import { X, User, Lock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface AdminLoginProps {
  onClose: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAppContext();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    const success = await login(username, password);
    
    if (success) {
      onClose();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Admin Login</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        <form onSubmit={handleLogin}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-md block w-full pl-10 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-md block w-full pl-10 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300"
          >
            Login
          </button>
    
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
