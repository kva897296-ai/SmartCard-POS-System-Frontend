import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaSpinner,
} from 'react-icons/fa';
import { PaymentMethod, PaymentStatus } from '../../types';
import { usePayment } from '../../hooks/usePayment';
import { useApp } from '../../context/AppContext';
import { generateId } from '../../utils/helpers';
import paymentService from '../../services/paymentService';
import Button from '../Common/Button';
import styles from '../../styles/PaymentProcessor.module.css';

interface PaymentProcessorProps {
  method: PaymentMethod;
  amount: number;
  onSuccess: (transactionId: string) => void;
  onCancel: () => void;
}

const PaymentProcessor: React.FC<PaymentProcessorProps> = ({
  method,
  amount,
  onSuccess,
  onCancel,
}) => {
  const { t } = useTranslation();
  const { processPayment, processing, error, paymentResult } = usePayment();
  const { config } = useApp();
  const [status, setStatus] = useState<PaymentStatus>(PaymentStatus.PENDING);
  const [instruction, setInstruction] = useState<string>('');

  useEffect(() => {
    const instructions: Record<PaymentMethod, string> = {
      [PaymentMethod.EMV]: t('payment.insertCard'),
      [PaymentMethod.NFC]: t('payment.tapCard'),
      [PaymentMethod.MAGNETIC_STRIPE]: t('payment.swipeCard'),
      [PaymentMethod.CASH]: t('payment.processing'),
      [PaymentMethod.QR_CODE]: t('payment.processing'),
    };
    setInstruction(instructions[method]);
  }, [method, t]);

  const handlePayment = useCallback(async () => {
    try {
      setStatus(PaymentStatus.PROCESSING);

      let cardData;
      if (
        method === PaymentMethod.EMV ||
        method === PaymentMethod.NFC ||
        method === PaymentMethod.MAGNETIC_STRIPE
      ) {
        const cardResponse = await paymentService.simulateCardRead(method);
        if (cardResponse.success && cardResponse.data) {
          cardData = cardResponse.data;
        }
      }

      const paymentRequest = {
        amount,
        method,
        currency: config.currency,
        cartId: generateId(),
        cardData,
      };

      const result = await processPayment(paymentRequest);

      if (result.status === PaymentStatus.APPROVED) {
        setStatus(PaymentStatus.APPROVED);
        setTimeout(() => {
          onSuccess(result.transactionId);
        }, 2000);
      } else {
        setStatus(result.status);
      }
    } catch (err) {
      setStatus(PaymentStatus.ERROR);
    }
  }, [method, amount, config, processPayment, onSuccess]);

  useEffect(() => {
    if (!processing && !paymentResult) {
      handlePayment();
    }
  }, [processing, paymentResult, handlePayment]);

  const getStatusIcon = () => {
    switch (status) {
      case PaymentStatus.PROCESSING:
        return <FaSpinner className={styles.spinIcon} />;
      case PaymentStatus.APPROVED:
        return <FaCheckCircle className={styles.successIcon} />;
      case PaymentStatus.DECLINED:
        return <FaTimesCircle className={styles.errorIcon} />;
      case PaymentStatus.ERROR:
        return <FaExclamationCircle className={styles.errorIcon} />;
      default:
        return <FaSpinner className={styles.spinIcon} />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case PaymentStatus.PROCESSING:
        return t('payment.processing');
      case PaymentStatus.APPROVED:
        return t('payment.approved');
      case PaymentStatus.DECLINED:
        return t('payment.declined');
      case PaymentStatus.ERROR:
        return error || t('payment.error');
      default:
        return instruction;
    }
  };

  return (
    <div className={styles.processor}>
      <div className={styles.statusContainer}>
        <div className={styles.statusIcon}>{getStatusIcon()}</div>
        <p className={styles.statusMessage}>{getStatusMessage()}</p>
        <p className={styles.instruction}>{instruction}</p>
      </div>

      <div className={styles.actions}>
        {status === PaymentStatus.DECLINED || status === PaymentStatus.ERROR ? (
          <>
            <Button variant="primary" onClick={handlePayment} fullWidth>
              {t('payment.retry')}
            </Button>
            <Button variant="secondary" onClick={onCancel} fullWidth>
              {t('payment.cancel')}
            </Button>
          </>
        ) : status !== PaymentStatus.APPROVED ? (
          <Button variant="secondary" onClick={onCancel} fullWidth disabled={processing}>
            {t('payment.cancel')}
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default PaymentProcessor;
