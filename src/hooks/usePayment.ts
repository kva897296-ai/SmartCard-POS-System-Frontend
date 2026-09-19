import { useState, useCallback } from 'react';
import { PaymentRequest, PaymentResponse } from '../types';
import paymentService from '../services/paymentService';

export const usePayment = () => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentResult, setPaymentResult] = useState<PaymentResponse | null>(null);

  const processPayment = useCallback(async (request: PaymentRequest) => {
    setProcessing(true);
    setError(null);
    setPaymentResult(null);

    try {
      const response = await paymentService.processPayment(request);
      
      if (response.success && response.data) {
        setPaymentResult(response.data);
        return response.data;
      } else {
        const errorMsg = response.error || 'Payment processing failed';
        setError(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err: any) {
      const errorMsg = err.message || 'Payment processing failed';
      setError(errorMsg);
      throw err;
    } finally {
      setProcessing(false);
    }
  }, []);

  const resetPayment = useCallback(() => {
    setProcessing(false);
    setError(null);
    setPaymentResult(null);
  }, []);

  return {
    processing,
    error,
    paymentResult,
    processPayment,
    resetPayment,
  };
};
