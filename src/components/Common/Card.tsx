import React from 'react';
import styles from '../../styles/Card.module.css';
import classNames from 'classnames';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, title, className, onClick }) => {
  return (
    <div
      className={classNames(styles.card, className, {
        [styles.clickable]: !!onClick,
      })}
      onClick={onClick}
    >
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Card;
