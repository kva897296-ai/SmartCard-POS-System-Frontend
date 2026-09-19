import React from 'react';
import styles from '../../styles/Loading.module.css';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ message, fullScreen = false }) => {
  return (
    <div className={fullScreen ? styles.fullScreen : styles.loading}>
      <div className={styles.spinner}></div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Loading;
