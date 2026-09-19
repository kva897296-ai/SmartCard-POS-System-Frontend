import apiClient from './apiClient';
import { Product, ApiResponse } from '../types';

class ProductService {
  async getProducts(): Promise<ApiResponse<Product[]>> {
    return apiClient.get<Product[]>('/products');
  }

  async getProductById(id: string): Promise<ApiResponse<Product>> {
    return apiClient.get<Product>(`/products/${id}`);
  }

  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    return apiClient.get<Product[]>(`/products/search?q=${encodeURIComponent(query)}`);
  }

  async getProductsByCategory(category: string): Promise<ApiResponse<Product[]>> {
    return apiClient.get<Product[]>(`/products/category/${encodeURIComponent(category)}`);
  }

  async getCategories(): Promise<ApiResponse<string[]>> {
    return apiClient.get<string[]>('/products/categories');
  }
}

const productService = new ProductService();
export default productService;
