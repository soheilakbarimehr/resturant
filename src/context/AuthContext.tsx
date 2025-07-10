import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users data - removed manager and delivery roles
const mockUsers: User[] = [
  {
    id: '1',
    name: 'مدیر سیستم',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    email: 'admin@restaurant.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    joinDate: '۱۴۰۲/۰۱/۰۱',
    lastLogin: '۱۴۰۲/۱۲/۱۵',
    isActive: true,
    address: 'تهران، خیابان ولیعصر',
    permissions: ['all']
  },
  {
    id: '2',
    name: 'علی احمدی',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    email: 'ali@example.com',
    role: 'customer',
    joinDate: '۱۴۰۲/۰۵/۱۰',
    lastLogin: '۱۴۰۲/۱۲/۱۴',
    isActive: true,
    totalOrders: 15,
    totalSpent: 2500000,
    address: 'تهران، خیابان آزادی'
  },
  {
    id: '3',
    name: 'مریم کریمی',
    phone: '۰۹۸۷۶۵۴۳۲۱',
    email: 'maryam@example.com',
    role: 'cashier',
    joinDate: '۱۴۰۲/۰۳/۱۵',
    lastLogin: '۱۴۰۲/۱۲/۱۳',
    isActive: true,
    permissions: ['orders', 'customers']
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login logic
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === '123456') {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      updateProfile,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}