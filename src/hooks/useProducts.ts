import { useState, useEffect } from 'react';
import { Product } from '../types';
import productService from '../services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await productService.getProducts();
      if (response.success && response.data) {
        setProducts(response.data);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch products');
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const refreshProducts = async () => {
    setLoading(true);
    const response = await productService.getProducts();
    if (response.success && response.data) {
      setProducts(response.data);
      setError(null);
    } else {
      setError(response.error || 'Failed to fetch products');
    }
    setLoading(false);
  };

  return { products, loading, error, refreshProducts };
};
