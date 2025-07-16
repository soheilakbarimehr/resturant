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
  firstName: string;
  lastName: string;
  phone: string;
  role: 'admin' | 'cashier' | 'delivery' | 'customer';
  avatar?: string;
  joinDate: string;
  lastLogin?: string;
  isActive: boolean;
  totalOrders?: number;
  totalSpent?: number;
  address?: string;
  permissions?: string[];
  savedAddresses?: SavedAddress[];
}

export interface SavedAddress {
  id: string;
  title: string;
  address: string;
  description?: string;
  lat: number;
  lng: number;
  isDefault?: boolean;
}

export interface UserFormData {
  firstName: string;
  lastName: string;
  phone: string;
  role: 'admin' | 'cashier' | 'delivery' | 'customer';
  password: string;
  permissions?: string[];
}