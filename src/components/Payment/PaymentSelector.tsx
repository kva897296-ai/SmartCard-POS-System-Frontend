import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaCreditCard,
  FaWifi,
  FaBarcode,
  FaMoneyBillWave,
  FaQrcode,
} from 'react-icons/fa';
import { PaymentMethod } from '../../types';
import { useCart } from '../../context/CartContext';
import Button from '../Common/Button';
import Card from '../Common/Card';
import Modal from '../Common/Modal';
import PaymentProcessor from './PaymentProcessor';
import styles from '../../styles/Payment.module.css';

interface PaymentSelectorProps {
  onSuccess: (transactionId: string) => void;
  onCancel: () => void;
}

const PaymentSelector: React.FC<PaymentSelectorProps> = ({ onSuccess, onCancel }) => {
  const { t } = useTranslation();
  const { cart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [showProcessor, setShowProcessor] = useState(false);

  const paymentMethods = [
    {
      method: PaymentMethod.EMV,
      icon: <FaCreditCard />,
      label: t('payment.emv'),
      color: '#3b82f6',
    },
    {
      method: PaymentMethod.NFC,
      icon: <FaWifi />,
      label: t('payment.nfc'),
      color: '#10b981',
    },
    {
      method: PaymentMethod.MAGNETIC_STRIPE,
      icon: <FaBarcode />,
      label: t('payment.magnetic'),
      color: '#f59e0b',
    },
    {
      method: PaymentMethod.CASH,
      icon: <FaMoneyBillWave />,
      label: t('payment.cash'),
      color: '#22c55e',
    },
    {
      method: PaymentMethod.QR_CODE,
      icon: <FaQrcode />,
      label: t('payment.qrCode'),
      color: '#8b5cf6',
    },
  ];

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setShowProcessor(true);
  };

  const handlePaymentSuccess = (transactionId: string) => {
    setShowProcessor(false);
    onSuccess(transactionId);
  };

  const handlePaymentCancel = () => {
    setShowProcessor(false);
    setSelectedMethod(null);
  };

  return (
    <>
      <Card className={styles.paymentSelector}>
        <h2 className={styles.title}>{t('payment.selectMethod')}</h2>
        <div className={styles.methods}>
          {paymentMethods.map(({ method, icon, label, color }) => (
            <button
              key={method}
              className={styles.methodButton}
              onClick={() => handleMethodSelect(method)}
              style={{ borderColor: color }}
            >
              <div className={styles.methodIcon} style={{ color }}>
                {icon}
              </div>
              <span className={styles.methodLabel}>{label}</span>
            </button>
          ))}
        </div>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={onCancel} fullWidth>
            {t('common.cancel')}
          </Button>
        </div>
      </Card>

      {showProcessor && selectedMethod && (
        <Modal
          isOpen={showProcessor}
          onClose={handlePaymentCancel}
          title={t('payment.title')}
          size="medium"
        >
          <PaymentProcessor
            method={selectedMethod}
            amount={cart.finalTotal}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
          />
        </Modal>
      )}
    </>
  );
};

export default PaymentSelector;
