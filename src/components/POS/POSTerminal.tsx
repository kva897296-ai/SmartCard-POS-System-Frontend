import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import ProductCatalog from '../Products/ProductCatalog';
import ShoppingCart from '../Cart/ShoppingCart';
import PaymentSelector from '../Payment/PaymentSelector';
import Receipt from '../Receipt/Receipt';
import Modal from '../Common/Modal';
import { ReceiptData, PaymentMethod } from '../../types';
import { generateId } from '../../utils/helpers';
import { useApp } from '../../context/AppContext';
import styles from '../../styles/POSTerminal.module.css';

type POSView = 'catalog' | 'payment' | 'receipt';

const POSTerminal: React.FC = () => {
  const { t } = useTranslation();
  const { cart, clearCart } = useCart();
  const { config } = useApp();
  const [currentView, setCurrentView] = useState<POSView>('catalog');
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleCheckout = () => {
    if (cart.items.length === 0) return;
    setCurrentView('payment');
  };

  const handlePaymentSuccess = (transactionId: string) => {
    const receipt: ReceiptData = {
      receiptNumber: generateId(),
      merchantName: config.merchantName,
      merchantAddress: config.merchantAddress,
      terminalId: config.terminalId,
      timestamp: new Date().toISOString(),
      items: cart.items,
      subtotal: cart.total,
      tax: cart.tax,
      discount: cart.discount,
      total: cart.finalTotal,
      paymentMethod: PaymentMethod.EMV,
      authorizationCode: transactionId,
    };

    setReceiptData(receipt);
    setShowReceipt(true);
    clearCart();
    setCurrentView('catalog');
  };

  const handlePaymentCancel = () => {
    setCurrentView('catalog');
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setReceiptData(null);
  };

  return (
    <div className={styles.terminal}>
      <div className={styles.main}>
        {currentView === 'catalog' && <ProductCatalog />}
        {currentView === 'payment' && (
          <PaymentSelector onSuccess={handlePaymentSuccess} onCancel={handlePaymentCancel} />
        )}
      </div>

      <div className={styles.sidebar}>
        <ShoppingCart onCheckout={handleCheckout} />
      </div>

      {showReceipt && receiptData && (
        <Modal
          isOpen={showReceipt}
          onClose={handleCloseReceipt}
          title={t('receipt.title')}
          size="large"
        >
          <Receipt receiptData={receiptData} onClose={handleCloseReceipt} />
        </Modal>
      )}
    </div>
  );
};

export default POSTerminal;
