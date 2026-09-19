import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TerminalConfig, PaymentMethod } from '../types';

interface AppContextType {
  config: TerminalConfig;
  updateConfig: (config: Partial<TerminalConfig>) => void;
  isOnline: boolean;
  setIsOnline: (status: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultConfig: TerminalConfig = {
  terminalId: 'TERMINAL-001',
  merchantId: 'MERCHANT-001',
  merchantName: 'Smart Card POS',
  merchantAddress: '123 Main St, City, Country',
  currency: 'USD',
  taxRate: 0.1,
  supportedPaymentMethods: [PaymentMethod.EMV, PaymentMethod.NFC, PaymentMethod.MAGNETIC_STRIPE, PaymentMethod.CASH, PaymentMethod.QR_CODE],
  locale: 'en-US',
};

const CONFIG_KEY = 'pos_terminal_config';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<TerminalConfig>(() => {
    const savedConfig = localStorage.getItem(CONFIG_KEY);
    if (savedConfig) {
      try {
        return { ...defaultConfig, ...JSON.parse(savedConfig) };
      } catch {
        return defaultConfig;
      }
    }
    return defaultConfig;
  });

  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  const updateConfig = (newConfig: Partial<TerminalConfig>) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
    localStorage.setItem(CONFIG_KEY, JSON.stringify(updatedConfig));
  };

  return (
    <AppContext.Provider
      value={{
        config,
        updateConfig,
        isOnline,
        setIsOnline,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
