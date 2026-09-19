export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
  barcode?: string;
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
  tax: number;
  discount: number;
  finalTotal: number;
}

export enum PaymentMethod {
  EMV = 'EMV',
  NFC = 'NFC',
  MAGNETIC_STRIPE = 'MAGNETIC_STRIPE',
  CASH = 'CASH',
  QR_CODE = 'QR_CODE',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  CANCELLED = 'CANCELLED',
  ERROR = 'ERROR',
}

export interface PaymentRequest {
  amount: number;
  method: PaymentMethod;
  currency: string;
  cartId: string;
  cardData?: CardData;
}

export interface CardData {
  cardNumber?: string;
  cardholderName?: string;
  expiryDate?: string;
  cvv?: string;
  track1?: string;
  track2?: string;
  emvData?: string;
  nfcData?: string;
}

export interface PaymentResponse {
  transactionId: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  timestamp: string;
  authorizationCode?: string;
  receiptData: ReceiptData;
  errorMessage?: string;
}

export interface Transaction {
  id: string;
  transactionId: string;
  timestamp: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  items: CartItem[];
  receiptData: ReceiptData;
  customerInfo?: CustomerInfo;
}

export interface ReceiptData {
  receiptNumber: string;
  merchantName: string;
  merchantAddress: string;
  terminalId: string;
  timestamp: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  cardLast4?: string;
  authorizationCode?: string;
}

export interface CustomerInfo {
  name?: string;
  email?: string;
  phone?: string;
  loyaltyId?: string;
}

export interface TerminalConfig {
  terminalId: string;
  merchantId: string;
  merchantName: string;
  merchantAddress: string;
  currency: string;
  taxRate: number;
  supportedPaymentMethods: PaymentMethod[];
  locale: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CardReaderStatus {
  connected: boolean;
  readerType: 'EMV' | 'NFC' | 'MAGNETIC' | 'MULTI';
  status: 'IDLE' | 'READY' | 'READING' | 'ERROR';
  errorMessage?: string;
}
