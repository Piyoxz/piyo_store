import React, { useState } from 'react';
import { Package } from '../types';
import { useAppContext } from '../context/AppContext';
import { X, ShoppingCart, Check } from 'lucide-react';
import { getPlatformIcon } from '../data/products';

const ProductModal: React.FC = () => {
  const { selectedProduct, setIsModalOpen } = useAppContext();
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(
    selectedProduct?.paket[0] || null
  );
  const [selectedDuration, setSelectedDuration] = useState<any | null>(
    selectedPackage?.durasi[0] || null
  );
  const [quantity, setQuantity] = useState(1);

  const handlePackageSelection = (pkg: Package) => {
    setSelectedPackage(pkg);
    setSelectedDuration(pkg.durasi[0]); // Set durasi pertama sebagai default
  };

  // Jika tidak ada produk yang dipilih, kembalikan null
  if (!selectedProduct) return null;

  const IconComponent = getPlatformIcon(selectedProduct.platform);

  // Fungsi untuk mengarahkan ke WhatsApp
  const redirectToWhatsApp = () => {
    if (!selectedPackage || !selectedDuration) return;

    const message = encodeURIComponent(
      `Halo! Saya ingin memesan:\n\n` +
        `Produk: ${selectedProduct.platform}\n` +
        `Paket: ${selectedPackage.nama}\n` +
        `Durasi: ${selectedDuration.label}\n` +
        `Harga: Rp ${selectedDuration.harga?.toLocaleString('id-ID') || 'N/A'}\n` +
        `Jumlah: ${quantity}\n\n` +
        `Mohon informasikan detail pembayaran. Terima kasih!`
    );

    window.open(`https://wa.me/6283878761652?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-all duration-300 animate-fadeIn">
        <div className="relative">
          {/* Header Modal */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedProduct.platform}</h3>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Close modal"
            >
              <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Konten Utama Modal */}
          <div className="p-6">
            {/* Platform Information */}
            <div className="flex items-center mb-6">
              <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4 text-blue-600 dark:text-blue-400">
                <IconComponent size={32} />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">{selectedProduct.platform}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedProduct.paket.length} packages available
                </p>
              </div>
            </div>

            {/* Pilihan Paket */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Package Options</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedProduct.paket.map((pkg, index) => (
                  <button
                    key={index}
                    className={`p-4 border rounded-lg text-left transition-all duration-300 ${
                      selectedPackage === pkg
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-500'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-800'
                    }`}
                    onClick={() => handlePackageSelection(pkg)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{pkg.nama}</p>
                      </div>
                      {selectedPackage === pkg && (
                        <span className="bg-blue-600 rounded-full p-1 text-white">
                          <Check className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pilihan Durasi */}
            {selectedPackage && (
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Duration Options</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedPackage.durasi.map((duration, index) => (
                    <button
                      key={index}
                      className={`p-4 border rounded-lg text-left transition-all duration-300 ${
                        selectedDuration === duration
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-500'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-800'
                      }`}
                      onClick={() => setSelectedDuration(duration)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{duration.lama}</p>
                          <p className="text-blue-600 dark:text-blue-400 font-bold mt-1">
                            {duration.harga ? `Rp ${duration.harga.toLocaleString('id-ID')}` : 'N/A'}
                          </p>
                        </div>
                        {selectedDuration === duration && (
                          <span className="bg-blue-600 rounded-full p-1 text-white">
                            <Check className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Jumlah */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Quantity</h4>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-l-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="w-16 h-10 text-center border-y border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value >= 1 && value <= 10) {
                      setQuantity(value);
                    }
                  }}
                />
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-10 h-10 rounded-r-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center"
                  disabled={quantity >= 10}
                >
                  +
                </button>
                <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                  Max 10 units per order
                </span>
              </div>
            </div>

            {/* Catatan Tambahan */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Notes</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                {selectedProduct.note.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>

            {/* Ringkasan Pesanan */}
            {selectedPackage && (
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Package:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{selectedPackage.nama}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Duration:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{selectedDuration?.label || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Unit Price:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedDuration?.harga ? `Rp ${selectedDuration.harga.toLocaleString('id-ID')}` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Quantity:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{quantity}</span>
                </div>
                <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2 flex justify-between items-center">
                  <span className="font-bold text-gray-900 dark:text-white">Total:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {selectedDuration?.harga
                      ? `Rp ${(selectedDuration.harga * quantity).toLocaleString()}`
                      : 'N/A'}
                  </span>
                </div>
              </div>
            )}

            {/* Tombol Order */}
            <button
              onClick={redirectToWhatsApp}
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center transition-colors duration-300"
              disabled={!selectedPackage || !selectedDuration}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Order Now via WhatsApp
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              You will be redirected to WhatsApp to complete your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
