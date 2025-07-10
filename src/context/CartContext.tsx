import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product } from '../types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CALCULATE_TOTAL' };

const CartContext = createContext<{
  items: CartItem[];
  totalPrice: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        const newItems = state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        const newTotal = newItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        return {
          items: newItems,
          totalPrice: newTotal,
        };
      }
      const newItems = [...state.items, { product: action.payload, quantity: 1 }];
      const newTotal = newItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      return {
        items: newItems,
        totalPrice: newTotal,
      };
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.product.id !== action.payload);
      const newTotal = newItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      return {
        items: newItems,
        totalPrice: newTotal,
      };
    }
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.product.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const newTotal = newItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      return {
        items: newItems,
        totalPrice: newTotal,
      };
    }
    case 'CALCULATE_TOTAL': {
      const newTotal = state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      return {
        ...state,
        totalPrice: newTotal,
      };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], totalPrice: 0 });

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    }
  };

  return (
    <CartContext.Provider value={{ items: state.items, totalPrice: state.totalPrice, addItem, removeItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}