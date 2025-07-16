import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users data - updated to use firstName/lastName and phone instead of email
const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'مدیر',
    lastName: 'سیستم',
    phone: '09123456789',
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
    firstName: 'علی',
    lastName: 'احمدی',
    phone: '09123456789',
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
    firstName: 'مریم',
    lastName: 'کریمی',
    phone: '09876543210',
    role: 'cashier',
    joinDate: '۱۴۰۲/۰۳/۱۵',
    lastLogin: '۱۴۰۲/۱۲/۱۳',
    isActive: true,
    permissions: ['orders', 'customers']
  },
  {
    id: '4',
    firstName: 'احمد',
    lastName: 'پیک',
    phone: '09333333333',
    role: 'delivery',
    joinDate: '۱۴۰۲/۰۶/۰۱',
    lastLogin: '۱۴۰۲/۱۲/۱۵',
    isActive: true,
    permissions: ['delivery']
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (phone: string, password: string): Promise<boolean> => {
    // Mock login logic - using phone instead of email
    const foundUser = mockUsers.find(u => u.phone === phone);
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
    // Force redirect to home page
    window.location.href = '/';
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