import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaPrint, FaEnvelope, FaTimes } from 'react-icons/fa';
import { ReceiptData } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { maskCardNumber } from '../../utils/helpers';
import Button from '../Common/Button';
import Card from '../Common/Card';
import styles from '../../styles/Receipt.module.css';

interface ReceiptProps {
  receiptData: ReceiptData;
  onClose: () => void;
}

const Receipt: React.FC<ReceiptProps> = ({ receiptData, onClose }) => {
  const { t } = useTranslation();
  const { config } = useApp();

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    alert('Email receipt functionality would be implemented here');
  };

  return (
    <div className={styles.receiptContainer}>
      <Card className={styles.receipt}>
        <div className={styles.header}>
          <h1 className={styles.merchantName}>{receiptData.merchantName}</h1>
          <p className={styles.merchantAddress}>{receiptData.merchantAddress}</p>
          <div className={styles.receiptInfo}>
            <p>
              {t('receipt.receiptNumber')}: {receiptData.receiptNumber}
            </p>
            <p>
              {t('receipt.terminal')}: {receiptData.terminalId}
            </p>
            <p>
              {t('receipt.date')}: {formatDate(receiptData.timestamp, config.locale)}
            </p>
          </div>
        </div>

        <div className={styles.items}>
          <table className={styles.itemsTable}>
            <thead>
              <tr>
                <th>{t('cart.item')}</th>
                <th>{t('cart.quantity')}</th>
                <th>{t('cart.price')}</th>
                <th>{t('cart.subtotal')}</th>
              </tr>
            </thead>
            <tbody>
              {receiptData.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {formatCurrency(item.product.price, config.currency, config.locale)}
                  </td>
                  <td>{formatCurrency(item.subtotal, config.currency, config.locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.totals}>
          <div className={styles.totalRow}>
            <span>{t('cart.subtotal')}:</span>
            <span>{formatCurrency(receiptData.subtotal, config.currency, config.locale)}</span>
          </div>
          <div className={styles.totalRow}>
            <span>{t('cart.tax')}:</span>
            <span>{formatCurrency(receiptData.tax, config.currency, config.locale)}</span>
          </div>
          {receiptData.discount > 0 && (
            <div className={styles.totalRow}>
              <span>{t('cart.discount')}:</span>
              <span className={styles.discount}>
                -{formatCurrency(receiptData.discount, config.currency, config.locale)}
              </span>
            </div>
          )}
          <div className={styles.totalRow + ' ' + styles.grandTotal}>
            <span>{t('cart.total')}:</span>
            <span>{formatCurrency(receiptData.total, config.currency, config.locale)}</span>
          </div>
        </div>

        <div className={styles.paymentInfo}>
          <p>
            {t('receipt.paymentMethod')}: {receiptData.paymentMethod}
          </p>
          {receiptData.cardLast4 && (
            <p>
              {t('receipt.cardNumber')}: {maskCardNumber(receiptData.cardLast4)}
            </p>
          )}
          {receiptData.authorizationCode && (
            <p>
              {t('receipt.authCode')}: {receiptData.authorizationCode}
            </p>
          )}
        </div>

        <div className={styles.footer}>
          <p className={styles.thankYou}>{t('receipt.thankYou')}</p>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" onClick={handlePrint} icon={<FaPrint />}>
            {t('receipt.print')}
          </Button>
          <Button variant="secondary" onClick={handleEmail} icon={<FaEnvelope />}>
            {t('receipt.email')}
          </Button>
          <Button variant="secondary" onClick={onClose} icon={<FaTimes />}>
            {t('receipt.close')}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Receipt;
