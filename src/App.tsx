import React, { useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

function AppContent() {
  const { isModalOpen, isAdmin } = useAppContext();
  
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isModalOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="flex-grow">
        {isAdmin && <AdminDashboard />}
        <ProductGrid />
      </main>
      
      <Footer />
      {isModalOpen && <ProductModal />}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;