import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaShoppingCart } from 'react-icons/fa';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { useApp } from '../../context/AppContext';
import Card from '../Common/Card';
import Button from '../Common/Button';
import styles from '../../styles/ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { t } = useTranslation();
  const { config } = useApp();

  const isOutOfStock = product.stock <= 0;

  return (
    <Card className={styles.productCard}>
      {product.imageUrl && (
        <div className={styles.imageContainer}>
          <img src={product.imageUrl} alt={product.name} className={styles.image} />
        </div>
      )}
      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.details}>
          <span className={styles.sku}>
            {t('products.sku')}: {product.sku}
          </span>
          <span className={styles.stock}>
            {t('products.stock')}: {product.stock}
          </span>
        </div>
        <div className={styles.footer}>
          <span className={styles.price}>
            {formatCurrency(product.price, config.currency, config.locale)}
          </span>
          <Button
            variant="primary"
            size="small"
            onClick={onAddToCart}
            disabled={isOutOfStock}
            icon={<FaShoppingCart />}
          >
            {isOutOfStock ? t('products.outOfStock') : t('products.addToCart')}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
