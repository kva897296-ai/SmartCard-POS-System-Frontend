import React from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';
import styles from '../../styles/CartItem.module.css';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { config } = useApp();

  const handleIncrement = () => {
    updateQuantity(item.product.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1);
    } else {
      removeFromCart(item.product.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.product.id);
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.info}>
        <h4 className={styles.name}>{item.product.name}</h4>
        <p className={styles.price}>
          {formatCurrency(item.product.price, config.currency, config.locale)}
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.quantity}>
          <button
            className={styles.quantityButton}
            onClick={handleDecrement}
            aria-label="Decrease quantity"
          >
            <FaMinus />
          </button>
          <span className={styles.quantityValue}>{item.quantity}</span>
          <button
            className={styles.quantityButton}
            onClick={handleIncrement}
            aria-label="Increase quantity"
          >
            <FaPlus />
          </button>
        </div>

        <div className={styles.subtotal}>
          {formatCurrency(item.subtotal, config.currency, config.locale)}
        </div>

        <button
          className={styles.removeButton}
          onClick={handleRemove}
          aria-label="Remove item"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
