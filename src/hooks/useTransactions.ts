import { useState, useEffect, useCallback } from 'react';
import { Transaction } from '../types';
import transactionService from '../services/transactionService';

export const useTransactions = (limit?: number) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    const response = await transactionService.getTransactions(limit);
    if (response.success && response.data) {
      setTransactions(response.data);
      setError(null);
    } else {
      setError(response.error || 'Failed to fetch transactions');
    }
    setLoading(false);
  }, [limit]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, error, refreshTransactions: fetchTransactions };
};
