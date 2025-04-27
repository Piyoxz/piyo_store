import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Moon, Sun, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import AdminLogin from './AdminLogin';

const Header: React.FC = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    isLoggedIn, 
    isAdmin, 
    logout 
  } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme === 'dark' ? true : false; // Default ke light jika tidak ada preferensi 'dark'
});

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mr-2">Piyo Store</h1>
            <span className="hidden md:inline-block text-sm text-gray-500 dark:text-gray-400">Premium Subscriptions</span>
          </div>
          
          {/* Desktop Search */}
          {/* <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 flex-1 max-w-md mx-4">
            <Search className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search subscriptions..."
              className="bg-transparent border-none outline-none w-full text-gray-800 dark:text-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
            
            {isLoggedIn ? (
              <div className="flex items-center">
                <span className="hidden md:inline-block mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {isAdmin ? 'Admin' : 'User'}
                </span>
                <button 
                  onClick={logout}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-1 px-3 rounded-md transition-colors duration-300"
              >
                <User className="h-4 w-4 mr-1" />
                <span>Admin</span>
              </button>
            )}
            
            {/* <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button> */}
          </div>
        </div>
        
        {/* Mobile Search */}
        {/* {isMenuOpen && (
          <div className="md:hidden mt-4 flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
            <Search className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search subscriptions..."
              className="bg-transparent border-none outline-none w-full text-gray-800 dark:text-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )} */}
      </div>
      
      {isLoginModalOpen && (
        <AdminLogin onClose={() => setIsLoginModalOpen(false)} />
      )}
    </header>
  );
};

export default Header;
