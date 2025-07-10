import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  UserPlus,
  Shield,
  Users,
  X,
  Save
} from 'lucide-react';
import { User, UserFormData } from '../../types';

// Mock users data - only admin, cashier, and customer roles
const mockUsers: User[] = [
  {
    id: '1',
    name: 'مدیر سیستم',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    email: 'admin@restaurant.com',
    role: 'admin',
    joinDate: '۱۴۰۲/۰۱/۰۱',
    isActive: true,
    permissions: ['all']
  },
  {
    id: '2',
    name: 'علی احمدی',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    email: 'ali@example.com',
    role: 'customer',
    joinDate: '۱۴۰۲/۰۵/۱۰',
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
    isActive: true,
    permissions: ['orders', 'customers']
  },
  {
    id: '4',
    name: 'فاطمه محمدی',
    phone: '۰۹۱۱۱۱۱۱۱۱',
    email: 'fateme@example.com',
    role: 'customer',
    joinDate: '۱۴۰۲/۰۸/۰۵',
    isActive: true,
    totalOrders: 8,
    totalSpent: 1200000
  }
];

const roleOptions = [
  { value: 'admin', label: 'مدیر سیستم', color: 'bg-red-100 text-red-800' },
  { value: 'cashier', label: 'صندوق‌دار', color: 'bg-green-100 text-green-800' },
  { value: 'customer', label: 'مشتری', color: 'bg-gray-100 text-gray-800' }
];

const permissionOptions = [
  { value: 'all', label: 'دسترسی کامل' },
  { value: 'orders', label: 'مدیریت سفارشات' },
  { value: 'products', label: 'مدیریت محصولات' },
  { value: 'customers', label: 'مدیریت مشتریان' },
  { value: 'reports', label: 'گزارش‌گیری' },
  { value: 'settings', label: 'تنظیمات' }
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    phone: '',
    email: '',
    role: 'customer',
    password: '',
    permissions: []
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleInfo = (role: string) => {
    return roleOptions.find(option => option.value === role) || roleOptions[2];
  };

  const handleAddUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      role: formData.role,
      joinDate: new Date().toLocaleDateString('fa-IR'),
      isActive: true,
      permissions: formData.permissions
    };
    
    setUsers([...users, newUser]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditUser = () => {
    if (!editingUser) return;
    
    const updatedUsers = users.map(user => 
      user.id === editingUser.id 
        ? { 
            ...user, 
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            role: formData.role,
            permissions: formData.permissions
          }
        : user
    );
    
    setUsers(updatedUsers);
    setEditingUser(null);
    resetForm();
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('آیا از حذف این کاربر اطمینان دارید؟')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const toggleUserStatus = (userId: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    );
    setUsers(updatedUsers);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      role: 'customer',
      password: '',
      permissions: []
    });
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
      password: '',
      permissions: user.permissions || []
    });
  };

  const closeModals = () => {
    setShowAddModal(false);
    setEditingUser(null);
    resetForm();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت کاربران</h1>
          <p className="text-gray-600">مدیریت کاربران، مدیران، صندوق‌داران و مشتریان</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          <UserPlus className="w-5 h-5" />
          افزودن کاربر جدید
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm sm:flex-row sm:items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
            <input
              type="text"
              placeholder="جستجو در کاربران..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">همه نقش‌ها</option>
            {roleOptions.map(role => (
              <option key={role.value} value={role.value}>{role.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">کاربر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">نقش</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">تماس</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const roleInfo = getRoleInfo(user.role);
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${roleInfo.color}`}>
                        {roleInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-700">
                          <Eye className="w-4 h-4" />
                        </button>
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {(showAddModal || editingUser) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">
                {editingUser ? 'ویرایش کاربر' : 'افزودن کاربر جدید'}
              </h3>
              <button onClick={closeModals} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نام و نام خانوادگی</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="نام کاربر را وارد کنید"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="شماره تماس را وارد کنید"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="ایمیل را وارد کنید"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نقش</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {roleOptions.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رمز عبور</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="رمز عبور را وارد کنید"
                  />
                </div>
              )}

              {formData.role !== 'customer' && formData.role !== 'admin' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Shield className="w-4 h-4 inline ml-1" />
                    دسترسی‌ها
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {permissionOptions.map(permission => (
                      <label key={permission.value} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.permissions?.includes(permission.value) || false}
                          onChange={(e) => {
                            const permissions = formData.permissions || [];
                            if (e.target.checked) {
                              setFormData({ 
                                ...formData, 
                                permissions: [...permissions, permission.value] 
                              });
                            } else {
                              setFormData({ 
                                ...formData, 
                                permissions: permissions.filter(p => p !== permission.value) 
                              });
                            }
                          }}
                          className="text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm">{permission.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={closeModals}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={editingUser ? handleEditUser : handleAddUser}
                className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                {editingUser ? 'ویرایش' : 'افزودن'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}