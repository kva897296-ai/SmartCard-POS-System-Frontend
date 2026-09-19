import apiClient from './apiClient';
import { Transaction, ApiResponse } from '../types';

class TransactionService {
  async getTransactions(limit?: number): Promise<ApiResponse<Transaction[]>> {
    const url = limit ? `/transactions?limit=${limit}` : '/transactions';
    return apiClient.get<Transaction[]>(url);
  }

  async getTransactionById(id: string): Promise<ApiResponse<Transaction>> {
    return apiClient.get<Transaction>(`/transactions/${id}`);
  }

  async getTransactionsByDateRange(
    startDate: string,
    endDate: string
  ): Promise<ApiResponse<Transaction[]>> {
    return apiClient.get<Transaction[]>(
      `/transactions?start=${startDate}&end=${endDate}`
    );
  }
}

const transactionService = new TransactionService();
export default transactionService;
