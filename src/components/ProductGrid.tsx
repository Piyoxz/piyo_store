import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const ProductGrid: React.FC = () => {
  const { filteredProducts, setSearchTerm, searchTerm, pagination } =
    useAppContext();
  const itemsPerPage = 6;


  const totalPages = pagination?.totalPages || Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      pagination.setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.log(filteredProducts);
    }
  };

  // Fungsi untuk menangani pencarian
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    pagination.setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Pencarian */}
      <div className="flex justify-center md:justify-start mb-8 w-full">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search subscriptions..."
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 pl-10 text-gray-800 dark:text-gray-200 outline-none border-none focus:ring-2 focus:ring-blue-500 transition-colors"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Tampilan Produk */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try changing your search criteria
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`w-10 h-10 rounded-lg ${
                    pagination.currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  } transition-colors`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;