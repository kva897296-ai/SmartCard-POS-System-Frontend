import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../context/CartContext';
import ProductCard from './ProductCard';
import Input from '../Common/Input';
import Loading from '../Common/Loading';
import styles from '../../styles/ProductCatalog.module.css';

const ProductCatalog: React.FC = () => {
  const { t } = useTranslation();
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ['all', ...Array.from(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  if (loading) {
    return <Loading message={t('common.loading')} />;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.catalog}>
      <div className={styles.header}>
        <h2>{t('products.title')}</h2>
        <div className={styles.controls}>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('products.search')}
            icon={<FaSearch />}
            className={styles.searchInput}
          />
          <div className={styles.categoryFilter}>
            <FaFilter />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.categorySelect}
            >
              <option value="all">{t('products.allCategories')}</option>
              {categories
                .filter((cat) => cat !== 'all')
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => addToCart(product)}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className={styles.noResults}>
          <p>{t('products.search')}</p>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
