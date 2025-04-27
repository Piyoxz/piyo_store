import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Product, User} from '../types';

interface AppContextType {
  products: Product[];
  filteredProducts: Product[];
  selectedProduct: Product | null;
  isModalOpen: boolean;
  isLoggedIn: boolean;
  isAdmin: boolean;
  searchTerm: string;
  selectedPlatform: string;
  currentUser: User | null;
  setProducts: (products: Product[]) => void;
  setFilteredProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setSearchTerm: (term: string) => void;
  setSelectedPlatform: (platform: string) => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  pagination: {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
  }
}

const API_URL = 'https://piyoflix.my.id/api';
const ITEMS_PER_PAGE = 6;

const defaultContext: AppContextType = {
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  isModalOpen: false,
  isLoggedIn: false,
  isAdmin: false,
  searchTerm: '',
  selectedPlatform: '',
  currentUser: null,
  setProducts: () => {},
  setFilteredProducts: () => {},
  setSelectedProduct: () => {},
  setIsModalOpen: () => {},
  setSearchTerm: () => {},
  setSelectedPlatform: () => {},
  login: async () => false,
  logout: () => {},
  addProduct: async () => {},
  updateProduct: async () => {},
  deleteProduct: async () => {},
  pagination: {
    currentPage: 1,
    totalPages: 0,
    setCurrentPage: () => {}
  }
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = isLoggedIn ? '/admin/accounts' : '/public/accounts';
        const headers = isLoggedIn ? { 'piyo-token': token } : {};
  
        const response = await axios.get(`${API_URL}${endpoint}`, {
          headers,
          params: {
            search: searchTerm,
            page: currentPage,
            limit: ITEMS_PER_PAGE,
          },
        });
  
        if (response.data.success) {
          const { data, pagination } = response.data;
  
          const transformedProducts = data.map((item: any) => ({
            id: item.id,
            platform: item.platform,
            logo: item.logo,
            paket: item.paket.map((p: any) => ({
              nama: p.nama,
              deskripsi: p.deskripsi,
              durasi: p.durasi.map((d: any) => ({
                lama: d.lama,
                harga: d.harga,
              })),
              garansi: p.garansi,
            })),
            note: item.note,
          }));
  
          // Update both products and filteredProducts
          setProducts(transformedProducts);
          setFilteredProducts(transformedProducts);
  
          // Update pagination
          setTotalPages(pagination.totalPages);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, [searchTerm, currentPage, isLoggedIn, token]);
  

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_URL}/admin/login`, {
        username,
        password
      });

      if (response.data.success) {
        setToken(response.data.token);
        setIsLoggedIn(true);
        setCurrentUser({ username, isAdmin: true });
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setToken(null);
  };

  const addProduct = async (product: Product) => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/accounts`,
        {
          platform: product.platform,
          logo: product.logo,
          paket: product.paket.map(p => ({
            nama: p.nama,
            deskripsi: p.deskripsi,
            durasi: p.durasi.map(d => ({
              lama: d.lama,
              harga: d.harga
            })),
          })),
          note: product.note
        },
        {
          headers: { 'piyo-token': token }
        }
      );

      if (response.data.success) {
        const newProducts = [...products, response.data.data];
        setProducts(newProducts);
        setFilteredProducts(newProducts);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/accounts/${product.id}`,
        {
          platform: product.platform,
          logo: product.logo,
          paket: product.paket.map(p => ({
            nama: p.nama,
            deskripsi: p.deskripsi,
            durasi: p.durasi.map(d => ({
              lama: d.lama,
              harga: d.harga
            })),
          })),
          note: product.note
        },
        {
          headers: { 'piyo-token': token }
        }
      );

      if (response.data.success) {
        const newProducts = products.map(p => 
          p.id === product.id ? response.data.data : p
        );
        setProducts(newProducts);
        setFilteredProducts(newProducts);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/admin/accounts/${id}`, {
        headers: { 'piyo-token': token }
      });

      if (response.data.success) {
        const newProducts = products.filter(p => p.id !== id);
        setProducts(newProducts);
        setFilteredProducts(newProducts);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        filteredProducts,
        selectedProduct,
        isModalOpen,
        isLoggedIn,
        isAdmin: currentUser?.isAdmin || false,
        searchTerm,
        selectedPlatform,
        currentUser,
        setProducts,
        setFilteredProducts,
        setSelectedProduct,
        setIsModalOpen,
        setSearchTerm,
        setSelectedPlatform,
        login,
        logout,
        addProduct,
        updateProduct,
        deleteProduct,
        pagination: {
          currentPage,
          totalPages: totalPages || 0,
          setCurrentPage,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};