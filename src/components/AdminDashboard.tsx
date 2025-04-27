import React, { useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Product, Package, Duration } from '../types'; // Memastikan tipe data sesuai
import { getPlatformIcon } from '../data/products';

const AdminDashboard: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAppContext();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState<{
    id: string;
    platform: string;
    logo: string;
    paket: Package[];
    note: string[];
  }>({
    id: '',
    platform: '',
    logo: '',
    paket: [
      {
        nama: '',
        deskripsi: '',
        durasi: [{ lama: '', harga: 0 }],
      },
    ],
    note: [''],
  });

  const resetForm = () => {
    setFormData({
      id: '',
      platform: '',
      logo: '',
      paket: [
        {
          nama: '',
          deskripsi: '',
          durasi: [{ lama: '', harga: 0 }],
        },
      ],
      note: [''],
    });
    setEditingProduct(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setFormData({
      ...product,
      paket: [...product.paket],
      note: [...product.note],
    });
    setEditingProduct(product);
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi form
    if (!formData.platform.trim()) {
      alert('Platform name is required');
      return;
    }

    if (
      formData.paket.some(
        (pkg) =>
          !pkg.nama.trim() ||
          pkg.durasi.some((d) => !d.lama.trim() || !d.harga)
      )
    ) {
      alert('Package name, duration, and price are required for all packages');
      return;
    }

    // Membersihkan catatan kosong
    const cleanedNotes = formData.note.filter((note) => note.trim());

    // Menyiapkan data produk
    const productData: Product = {
      ...formData,
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      logo: formData.platform.toLowerCase().replace(/\s+/g, '-'),
      note: cleanedNotes,
    };

    if (editingProduct) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }

    closeModal();
  };

  const handlePackageChange = (
    index: number,
    field: keyof Package,
    value: string | Duration[]
  ) => {
    const updatedPackages = [...formData.paket];
    updatedPackages[index] = { ...updatedPackages[index], [field]: value };
    setFormData({ ...formData, paket: updatedPackages });
  };

  const handleDurationChange = (
    packageIndex: number,
    durationIndex: number,
    field: keyof Duration,
    value: string
  ) => {
    const updatedPackages = [...formData.paket];
    updatedPackages[packageIndex].durasi[durationIndex] = {
      ...updatedPackages[packageIndex].durasi[durationIndex],
      [field]: value,
    };
    setFormData({ ...formData, paket: updatedPackages });
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      paket: [
        ...formData.paket,
        {
          nama: '',
          deskripsi: '',
          durasi: [{ lama: '', harga: 0 }],
        },
      ],
    });
  };

  const removePackage = (index: number) => {
    if (formData.paket.length === 1) {
      alert('You need at least one package');
      return;
    }
    const updatedPackages = formData.paket.filter((_, i) => i !== index);
    setFormData({ ...formData, paket: updatedPackages });
  };

  const addDuration = (packageIndex: number) => {
    const updatedPackages = [...formData.paket];
    updatedPackages[packageIndex].durasi.push({ lama: '', harga: 0 });
    setFormData({ ...formData, paket: updatedPackages });
  };

  const removeDuration = (packageIndex: number, durationIndex: number) => {
    if (formData.paket[packageIndex].durasi.length === 1) {
      alert('You need at least one duration');
      return;
    }
    const updatedPackages = [...formData.paket];
    updatedPackages[packageIndex].durasi = updatedPackages[
      packageIndex
    ].durasi.filter((_, i) => i !== durationIndex);
    setFormData({ ...formData, paket: updatedPackages });
  };

  const handleNoteChange = (index: number, value: string) => {
    const updatedNotes = [...formData.note];
    updatedNotes[index] = value;
    setFormData({ ...formData, note: updatedNotes });
  };

  const addNote = () => {
    setFormData({ ...formData, note: [...formData.note, ''] });
  };

  const removeNote = (index: number) => {
    const updatedNotes = formData.note.filter((_, i) => i !== index);
    setFormData({ ...formData, note: updatedNotes });
  };

  const confirmDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h2>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center transition-colors duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Platform
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Packages
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Notes
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No products available. Add a new product to get started.
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const IconComponent = getPlatformIcon(product.platform);
                return (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3 text-blue-600 dark:text-blue-400">
                          <IconComponent size={20} />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {product.platform}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {product.paket.length} packages
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        From {product.paket[0]?.durasi[0]?.harga || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {product.note.slice(0, 2).join(', ')}
                        {product.note.length > 2 && '...'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(product)}
                        className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-3 transition-colors duration-300"
                      >
                        <Edit className="h-5 w-5 inline" />
                      </button>
                      <button
                        onClick={() => confirmDelete(product.id)}
                        className="text-red-600 hover:text-red-900 dark:hover:text-red-400 transition-colors duration-300"
                      >
                        <Trash2 className="h-5 w-5 inline" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                aria-label="Close modal"
              >
                <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label
                  htmlFor="platform"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Platform Name*
                </label>
                <input
                  type="text"
                  id="platform"
                  value={formData.platform}
                  onChange={(e) =>
                    setFormData({ ...formData, platform: e.target.value })
                  }
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-md block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Spotify Premium"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Packages*
                </label>
                {formData.paket.map((pkg, packageIndex) => (
                  <div key={packageIndex} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Package {packageIndex + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removePackage(packageIndex)}
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors duration-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor={`package-name-${packageIndex}`}
                          className="block mb-1 text-xs text-gray-700 dark:text-gray-300"
                        >
                          Package Name*
                        </label>
                        <input
                          type="text"
                          id={`package-name-${packageIndex}`}
                          value={pkg.nama}
                          onChange={(e) =>
                            handlePackageChange(packageIndex, 'nama', e.target.value)
                          }
                          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-md block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., Individual 1 Month"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`package-description-${packageIndex}`}
                          className="block mb-1 text-xs text-gray-700 dark:text-gray-300"
                        >
                          Description
                        </label>
                        <textarea
                          id={`package-description-${packageIndex}`}
                          value={pkg.deskripsi}
                          onChange={(e) =>
                            handlePackageChange(packageIndex, 'deskripsi', e.target.value)
                          }
                          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-md block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., Access to premium features"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block mb-1 text-xs text-gray-700 dark:text-gray-300">
                          Durations
                        </label>
                        {pkg.durasi.map((duration, durationIndex) => (
                          <div key={durationIndex} className="flex items-center mb-2">
                            <input
                              type="text"
                              value={duration.lama}
                              onChange={(e) =>
                                handleDurationChange(
                                  packageIndex,
                                  durationIndex,
                                  'lama',
                                  e.target.value
                                )
                              }
                              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-md block w-1/3 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                              placeholder="e.g., 1 Bulan"
                              required
                            />
                            <input
                              type="text"
                              value={duration.harga}
                              onChange={(e) =>
                                handleDurationChange(
                                  packageIndex,
                                  durationIndex,
                                  'harga',
                                  e.target.value
                                )
                              }
                              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-md block w-1/3 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                              placeholder="e.g., Rp 29.000"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => removeDuration(packageIndex, durationIndex)}
                              className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors duration-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addDuration(packageIndex)}
                          className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm font-medium transition-colors duration-300"
                        >
                          + Add Another Duration
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addPackage}
                  className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm font-medium transition-colors duration-300"
                >
                  + Add Another Package
                </button>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Notes
                </label>
                {formData.note.map((note, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => handleNoteChange(index, e.target.value)}
                      className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-md block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Account from seller"
                    />
                    <button
                      type="button"
                      onClick={() => removeNote(index)}
                      className="ml-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors duration-300"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addNote}
                  className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm font-medium transition-colors duration-300"
                >
                  + Add Another Note
                </button>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;