import { 
  BarChart3, 
  ShoppingBag, 
  Users, 
  Store, 
  Truck, 
  Settings,
  Utensils,
  Tag,
  UserCog,
  FileText
} from 'lucide-react';

export type AdminSection = 'dashboard' | 'products' | 'foods' | 'categories' | 'orders' | 'users' | 'user-management' | 'delivery-management' | 'restaurant-info' | 'delivery-info' | 'reports' | 'settings';

export interface MenuItem {
  id: AdminSection;
  label: string;
  icon: JSX.Element;
  hasSubmenu?: boolean;
  submenuItems?: SubMenuItem[];
}

export interface SubMenuItem {
  id: AdminSection;
  label: string;
  icon: JSX.Element;
}

export const adminMenuItems: MenuItem[] = [
  { 
    id: 'dashboard', 
    label: 'داشبورد', 
    icon: <BarChart3 className="w-4 h-4 md:w-5 md:h-5" /> 
  },
  { 
    id: 'products', 
    label: 'محصولات', 
    icon: <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />, 
    hasSubmenu: true,
    submenuItems: [
      {
        id: 'foods',
        label: 'غذاها',
        icon: <Utensils className="w-3 h-3 md:w-4 md:h-4" />
      },
      {
        id: 'categories',
        label: 'دسته‌بندی‌ها',
        icon: <Tag className="w-3 h-3 md:w-4 md:h-4" />
      }
    ]
  },
  { 
    id: 'orders', 
    label: 'سفارشات', 
    icon: <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" /> 
  },
  { 
    id: 'users', 
    label: 'کاربران', 
    icon: <Users className="w-4 h-4 md:w-5 md:h-5" />, 
    hasSubmenu: true,
    submenuItems: [
      {
        id: 'user-management',
        label: 'مدیریت کاربران',
        icon: <UserCog className="w-3 h-3 md:w-4 md:h-4" />
      },
      {
        id: 'delivery-management',
        label: 'مدیریت پیک‌ها',
        icon: <Truck className="w-3 h-3 md:w-4 md:h-4" />
      }
    ]
  },
  { 
    id: 'reports', 
    label: 'گزارش‌گیری', 
    icon: <FileText className="w-4 h-4 md:w-5 md:h-5" /> 
  },
  { 
    id: 'restaurant-info', 
    label: 'اطلاعات رستوران', 
    icon: <Store className="w-4 h-4 md:w-5 md:h-5" /> 
  },
  { 
    id: 'delivery-info', 
    label: 'اطلاعات ارسال', 
    icon: <Truck className="w-4 h-4 md:w-5 md:h-5" /> 
  },
  { 
    id: 'settings', 
    label: 'تنظیمات', 
    icon: <Settings className="w-4 h-4 md:w-5 md:h-5" /> 
  },
];

export const getSectionTitle = (section: AdminSection): string => {
  const titles: Record<AdminSection, string> = {
    'dashboard': 'داشبورد',
    'products': 'محصولات',
    'foods': 'مدیریت غذاها',
    'categories': 'مدیریت دسته‌بندی‌ها',
    'orders': 'مدیریت سفارشات',
    'users': 'کاربران',
    'user-management': 'مدیریت کاربران',
    'delivery-management': 'مدیریت پیک‌ها',
    'restaurant-info': 'اطلاعات رستوران',
    'delivery-info': 'اطلاعات ارسال',
    'reports': 'گزارش‌گیری',
    'settings': 'تنظیمات'
  };
  
  return titles[section] || section;
};