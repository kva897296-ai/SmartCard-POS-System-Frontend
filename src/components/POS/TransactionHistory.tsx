import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaReceipt, FaSync } from 'react-icons/fa';
import { useTransactions } from '../../hooks/useTransactions';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Transaction } from '../../types';
import Button from '../Common/Button';
import Card from '../Common/Card';
import Loading from '../Common/Loading';
import Modal from '../Common/Modal';
import Receipt from '../Receipt/Receipt';
import styles from '../../styles/TransactionHistory.module.css';

const TransactionHistory: React.FC = () => {
  const { t } = useTranslation();
  const { config } = useApp();
  const { transactions, loading, error, refreshTransactions } = useTransactions(50);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleViewReceipt = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setSelectedTransaction(null);
  };

  const getStatusClass = (status: string) => {
    const statusMap: Record<string, string> = {
      APPROVED: styles.statusApproved,
      DECLINED: styles.statusDeclined,
      PENDING: styles.statusPending,
      CANCELLED: styles.statusCancelled,
      ERROR: styles.statusError,
    };
    return statusMap[status] || styles.statusDefault;
  };

  if (loading) {
    return <Loading message={t('common.loading')} />;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.history}>
      <Card>
        <div className={styles.header}>
          <h2>{t('transactions.title')}</h2>
          <Button
            variant="secondary"
            size="small"
            onClick={refreshTransactions}
            icon={<FaSync />}
          >
            {t('common.refresh')}
          </Button>
        </div>

        {transactions.length === 0 ? (
          <div className={styles.noTransactions}>
            <p>{t('transactions.noTransactions')}</p>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{t('transactions.transactionId')}</th>
                  <th>{t('transactions.date')}</th>
                  <th>{t('transactions.amount')}</th>
                  <th>{t('transactions.method')}</th>
                  <th>{t('transactions.status')}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className={styles.transactionId}>{transaction.transactionId}</td>
                    <td>{formatDate(transaction.timestamp, config.locale)}</td>
                    <td className={styles.amount}>
                      {formatCurrency(transaction.amount, config.currency, config.locale)}
                    </td>
                    <td>{transaction.paymentMethod}</td>
                    <td>
                      <span className={getStatusClass(transaction.status)}>
                        {t(`status.${transaction.status.toLowerCase()}`)}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => handleViewReceipt(transaction)}
                        icon={<FaReceipt />}
                      >
                        {t('transactions.viewReceipt')}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {showReceipt && selectedTransaction && (
        <Modal
          isOpen={showReceipt}
          onClose={handleCloseReceipt}
          title={t('receipt.title')}
          size="large"
        >
          <Receipt
            receiptData={selectedTransaction.receiptData}
            onClose={handleCloseReceipt}
          />
        </Modal>
      )}
    </div>
  );
};

export default TransactionHistory;
