import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const FilterBar: React.FC = () => {
  const { 
    products, 
    filteredProducts, 
    setFilteredProducts, 
    searchTerm, 
    selectedPlatform, 
    setSelectedPlatform 
  } = useAppContext();

  // Get unique platforms for filter options
  const platforms = ['All', ...new Set(products.map(product => product.platform))];

  useEffect(() => {
    let result = products;
    
    // Filter by platform
    if (selectedPlatform && selectedPlatform !== 'All') {
      result = result.filter(product => 
        product.platform === selectedPlatform
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.platform.toLowerCase().includes(term) ||
        product.packages.some(pkg => pkg.name.toLowerCase().includes(term)) ||
        product.notes.some(note => note.toLowerCase().includes(term))
      );
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedPlatform, products, setFilteredProducts]);

  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-4 px-4 shadow-sm transition-colors duration-300">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap items-center">
            <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mr-4">Filter by:</h2>
            <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
              {platforms.map((platform) => (
                <button
                  key={platform}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                    selectedPlatform === platform
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setSelectedPlatform(platform === 'All' ? '' : platform)}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredProducts.length} of {products.length} subscriptions
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;