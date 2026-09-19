import apiClient from './apiClient';
import {
  PaymentRequest,
  PaymentResponse,
  PaymentMethod,
  CardReaderStatus,
  ApiResponse,
} from '../types';
import { sleep } from '../utils/helpers';

class PaymentService {
  async processPayment(request: PaymentRequest): Promise<ApiResponse<PaymentResponse>> {
    return apiClient.post<PaymentResponse>('/payments/process', request);
  }

  async simulateCardRead(method: PaymentMethod): Promise<ApiResponse<any>> {
    await sleep(2000);
    
    const mockCardData = {
      cardNumber: '4532********1234',
      cardholderName: 'JOHN DOE',
      expiryDate: '12/25',
      track1: method === PaymentMethod.MAGNETIC_STRIPE ? 'SIMULATED_TRACK1_DATA' : undefined,
      track2: method === PaymentMethod.MAGNETIC_STRIPE ? 'SIMULATED_TRACK2_DATA' : undefined,
      emvData: method === PaymentMethod.EMV ? 'SIMULATED_EMV_DATA' : undefined,
      nfcData: method === PaymentMethod.NFC ? 'SIMULATED_NFC_DATA' : undefined,
    };

    return {
      success: true,
      data: mockCardData,
    };
  }

  async getCardReaderStatus(): Promise<ApiResponse<CardReaderStatus>> {
    try {
      const response = await apiClient.get<CardReaderStatus>('/card-reader/status');
      return response;
    } catch (error) {
      return {
        success: true,
        data: {
          connected: true,
          readerType: 'MULTI',
          status: 'READY',
        },
      };
    }
  }

  async cancelPayment(transactionId: string): Promise<ApiResponse<void>> {
    return apiClient.post<void>(`/payments/${transactionId}/cancel`);
  }

  async refundPayment(
    transactionId: string,
    amount: number
  ): Promise<ApiResponse<PaymentResponse>> {
    return apiClient.post<PaymentResponse>(`/payments/${transactionId}/refund`, {
      amount,
    });
  }

  async verifyPayment(transactionId: string): Promise<ApiResponse<PaymentResponse>> {
    return apiClient.get<PaymentResponse>(`/payments/${transactionId}`);
  }
}

const paymentService = new PaymentService();
export default paymentService;
