import { useState } from 'react';
import { User, Edit, Save, X, Camera, MapPin, Phone, Mail, Calendar, ShoppingBag, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UserProfile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address || ''
  });

  if (!user) return null;

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: user.address || ''
    });
    setIsEditing(false);
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return 'مدیر سیستم';
      case 'manager': return 'مدیر';
      case 'cashier': return 'صندوق‌دار';
      case 'delivery': return 'پیک';
      case 'customer': return 'مشتری';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'cashier': return 'bg-green-100 text-green-800';
      case 'delivery': return 'bg-orange-100 text-orange-800';
      case 'customer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-red-500 to-red-600"></div>
        <div className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6 -mt-16">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <User className="w-16 h-16 text-gray-500" />
                  </div>
                )}
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 mt-4 sm:mt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getRoleColor(user.role)}`}>
                      {getRoleText(user.role)}
                    </span>
                    <span className="text-sm text-gray-500">عضو از {user.joinDate}</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  ویرایش پروفایل
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">اطلاعات شخصی</h2>
              {isEditing && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    ذخیره
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    انصراف
                  </button>
                </div>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نام و نام خانوادگی</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{user.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{user.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">آدرس</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="آدرس خود را وارد کنید"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{user.address || 'آدرس وارد نشده'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">اطلاعات حساب</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-600">تاریخ عضویت</div>
                  <div className="font-medium">{user.joinDate}</div>
                </div>
              </div>
              {user.lastLogin && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">آخرین ورود</div>
                    <div className="font-medium">{user.lastLogin}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Statistics (for customers) */}
        {user.role === 'customer' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">آمار سفارشات</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-600">تعداد سفارشات</div>
                    <div className="text-xl font-bold text-blue-900">{user.totalOrders || 0}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-green-600">کل خرید</div>
                    <div className="text-xl font-bold text-green-900">
                      {user.totalSpent?.toLocaleString('fa-IR') || '0'} تومان
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">دسترسی سریع</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-right bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <ShoppingBag className="w-5 h-5 text-gray-600" />
                  <span>تاریخچه سفارشات</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-right bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <span>آدرس‌های من</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}