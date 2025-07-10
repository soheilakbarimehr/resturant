export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'admin' | 'manager' | 'cashier' | 'delivery' | 'customer';
  avatar?: string;
  joinDate: string;
  lastLogin?: string;
  isActive: boolean;
  totalOrders?: number;
  totalSpent?: number;
  address?: string;
  permissions?: string[];
}

export interface UserFormData {
  name: string;
  phone: string;
  email: string;
  role: 'admin' | 'manager' | 'cashier' | 'delivery' | 'customer';
  password: string;
  permissions?: string[];
}