import React from 'react';
import { Product } from '../types'; 
import { useAppContext } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, setIsModalOpen } = useAppContext();

  // Fungsi untuk menemukan harga terendah
  const lowestPrice = product.paket.reduce(
    (min, pkg) => {
      const currentPrice = pkg.durasi.reduce((minDurasi, durasi) => {
        return durasi.harga < minDurasi ? durasi.harga : minDurasi;
      }, Infinity);

      return currentPrice < min ? currentPrice : min;
    },
    Infinity
  );

  // Fungsi untuk membuka modal detail produk
  const handleViewDetails = () => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
      {/* Wrapper untuk konten utama */}
      <div className="p-6 flex flex-col h-full justify-between">
        {/* Header dengan logo dan nama platform */}
        <div className="flex items-center mb-4">
          {/* Menggunakan logo dari API */}
          <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4 overflow-hidden">
            <img
              src={product.logo} // Ganti dengan field logo dari API
              alt={`${product.platform} logo`}
              className="h-full w-full object-cover"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{product.platform}</h3>
        </div>

        {/* Informasi harga terendah */}
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Starting from</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {lowestPrice === Infinity
                ? 'N/A'
                : `Rp ${lowestPrice.toLocaleString()}`}
            </p>
          </div>

          {/* Informasi jumlah paket */}
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Packages:</p>
            <p className="text-gray-800 dark:text-gray-200">
              {product.paket.length} options available
            </p>
          </div>

          {/* Catatan tambahan */}
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Notes:</p>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
              {product.note.slice(0, 2).map((note, index) => (
                <li key={index}>{note}</li>
              ))}
              {product.note.length > 2 && <li>+ more...</li>}
            </ul>
          </div>
        </div>

        {/* Tombol View Details di bagian bawah */}
        <button
          onClick={handleViewDetails}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;