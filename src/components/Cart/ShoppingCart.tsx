import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';
import Button from '../Common/Button';
import Card from '../Common/Card';
import CartItemComponent from './CartItem';
import styles from '../../styles/Cart.module.css';

interface ShoppingCartProps {
  onCheckout: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ onCheckout }) => {
  const { t } = useTranslation();
  const { cart, clearCart } = useCart();
  const { config } = useApp();

  const isEmpty = cart.items.length === 0;

  return (
    <Card className={styles.cart}>
      <div className={styles.header}>
        <h2>
          <FaShoppingCart /> {t('cart.title')}
        </h2>
        {!isEmpty && (
          <Button
            variant="danger"
            size="small"
            onClick={clearCart}
            icon={<FaTrash />}
          >
            {t('cart.clear')}
          </Button>
        )}
      </div>

      {isEmpty ? (
        <div className={styles.empty}>
          <FaShoppingCart className={styles.emptyIcon} />
          <p>{t('cart.empty')}</p>
        </div>
      ) : (
        <>
          <div className={styles.items}>
            {cart.items.map((item) => (
              <CartItemComponent key={item.product.id} item={item} />
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>{t('cart.subtotal')}:</span>
              <span>{formatCurrency(cart.total, config.currency, config.locale)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>{t('cart.tax')}:</span>
              <span>{formatCurrency(cart.tax, config.currency, config.locale)}</span>
            </div>
            {cart.discount > 0 && (
              <div className={styles.summaryRow}>
                <span>{t('cart.discount')}:</span>
                <span className={styles.discount}>
                  -{formatCurrency(cart.discount, config.currency, config.locale)}
                </span>
              </div>
            )}
            <div className={styles.summaryRow + ' ' + styles.total}>
              <span>{t('cart.total')}:</span>
              <span className={styles.totalAmount}>
                {formatCurrency(cart.finalTotal, config.currency, config.locale)}
              </span>
            </div>
          </div>

          <Button
            variant="success"
            size="large"
            fullWidth
            onClick={onCheckout}
            className={styles.checkoutButton}
          >
            {t('cart.checkout')}
          </Button>
        </>
      )}
    </Card>
  );
};

export default ShoppingCart;
