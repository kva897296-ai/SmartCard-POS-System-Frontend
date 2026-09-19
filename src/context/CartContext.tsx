import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem, Product } from '../types';
import { calculateTax } from '../utils/helpers';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTaxRate: () => number;
  setTaxRate: (rate: number) => void;
  getDiscountRate: () => number;
  setDiscountRate: (rate: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'pos_cart';
const TAX_RATE_KEY = 'pos_tax_rate';
const DISCOUNT_RATE_KEY = 'pos_discount_rate';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [taxRate, setTaxRateState] = useState<number>(() => {
    const saved = localStorage.getItem(TAX_RATE_KEY);
    return saved ? parseFloat(saved) : 0.1;
  });

  const [discountRate, setDiscountRateState] = useState<number>(() => {
    const saved = localStorage.getItem(DISCOUNT_RATE_KEY);
    return saved ? parseFloat(saved) : 0;
  });

  const [cart, setCart] = useState<Cart>(() => {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch {
        return createEmptyCart();
      }
    }
    return createEmptyCart();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const createEmptyCart = (): Cart => ({
    items: [],
    total: 0,
    itemCount: 0,
    tax: 0,
    discount: 0,
    finalTotal: 0,
  });

  const recalculateCart = (items: CartItem[]): Cart => {
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const tax = calculateTax(subtotal, taxRate);
    const discount = subtotal * discountRate;
    const finalTotal = subtotal + tax - discount;

    return {
      items,
      total: subtotal,
      itemCount,
      tax,
      discount,
      finalTotal,
    };
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.product.id === product.id
      );

      let newItems: CartItem[];
      if (existingItem) {
        newItems = prevCart.items.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                subtotal: (item.quantity + quantity) * product.price,
              }
            : item
        );
      } else {
        newItems = [
          ...prevCart.items,
          {
            product,
            quantity,
            subtotal: product.price * quantity,
          },
        ];
      }

      return recalculateCart(newItems);
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter(
        (item) => item.product.id !== productId
      );
      return recalculateCart(newItems);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity,
              subtotal: quantity * item.product.price,
            }
          : item
      );
      return recalculateCart(newItems);
    });
  };

  const clearCart = () => {
    setCart(createEmptyCart());
  };

  const setTaxRate = (rate: number) => {
    setTaxRateState(rate);
    localStorage.setItem(TAX_RATE_KEY, rate.toString());
    setCart((prevCart) => recalculateCart(prevCart.items));
  };

  const setDiscountRate = (rate: number) => {
    setDiscountRateState(rate);
    localStorage.setItem(DISCOUNT_RATE_KEY, rate.toString());
    setCart((prevCart) => recalculateCart(prevCart.items));
  };

  const getTaxRate = () => taxRate;
  const getDiscountRate = () => discountRate;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTaxRate,
        setTaxRate,
        getDiscountRate,
        setDiscountRate,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
