import { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Database, 
  Palette, 
  Globe, 
  Mail, 
  Smartphone,
  Save,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Info,
  Eye,
  EyeOff
} from 'lucide-react';

interface NotificationSettings {
  newOrders: boolean;
  orderStatusUpdates: boolean;
  lowStock: boolean;
  dailyReports: boolean;
  customerReviews: boolean;
  systemUpdates: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
  loginAttempts: number;
  ipWhitelist: string[];
}

interface SystemSettings {
  maintenanceMode: boolean;
  debugMode: boolean;
  cacheEnabled: boolean;
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  maxFileSize: number;
  allowedFileTypes: string[];
}

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'auto';
  primaryColor: string;
  language: 'fa' | 'en';
  dateFormat: 'persian' | 'gregorian';
  currency: 'IRR' | 'USD';
  timezone: string;
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security' | 'system' | 'appearance'>('general');
  const [showApiKey, setShowApiKey] = useState(false);
  
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'رستوران ایرانی',
    siteDescription: 'بهترین غذاهای ایرانی و فست فود',
    adminEmail: 'admin@restaurant.com',
    supportEmail: 'support@restaurant.com',
    phoneNumber: '۰۲۱-۱۲۳۴۵۶۷۸',
    address: 'تهران، خیابان ولیعصر',
    apiKey: 'sk_test_1234567890abcdef',
    webhookUrl: 'https://restaurant.com/webhook'
  });

  // Notification Settings
  const [notifications, setNotifications] = useState<NotificationSettings>({
    newOrders: true,
    orderStatusUpdates: true,
    lowStock: false,
    dailyReports: true,
    customerReviews: true,
    systemUpdates: false
  });

  // Security Settings
  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,
    ipWhitelist: []
  });

  // System Settings
  const [system, setSystem] = useState<SystemSettings>({
    maintenanceMode: false,
    debugMode: false,
    cacheEnabled: true,
    autoBackup: true,
    backupFrequency: 'daily',
    maxFileSize: 10,
    allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif', 'pdf']
  });

  // Appearance Settings
  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: 'light',
    primaryColor: '#dc2626',
    language: 'fa',
    dateFormat: 'persian',
    currency: 'IRR',
    timezone: 'Asia/Tehran'
  });

  const tabs = [
    { id: 'general', label: 'عمومی', icon: <SettingsIcon className="w-4 h-4" /> },
    { id: 'notifications', label: 'اعلان‌ها', icon: <Bell className="w-4 h-4" /> },
    { id: 'security', label: 'امنیت', icon: <Shield className="w-4 h-4" /> },
    { id: 'system', label: 'سیستم', icon: <Database className="w-4 h-4" /> },
    { id: 'appearance', label: 'ظاهر', icon: <Palette className="w-4 h-4" /> }
  ];

  const handleSave = () => {
    alert('تنظیمات با موفقیت ذخیره شد');
  };

  const handleExportSettings = () => {
    const settings = {
      general: generalSettings,
      notifications,
      security,
      system,
      appearance
    };
    
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'restaurant-settings.json';
    link.click();
  };

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const settings = JSON.parse(e.target?.result as string);
          if (settings.general) setGeneralSettings(settings.general);
          if (settings.notifications) setNotifications(settings.notifications);
          if (settings.security) setSecurity(settings.security);
          if (settings.system) setSystem(settings.system);
          if (settings.appearance) setAppearance(settings.appearance);
          alert('تنظیمات با موفقیت وارد شد');
        } catch (error) {
          alert('خطا در خواندن فایل تنظیمات');
        }
      };
      reader.readAsText(file);
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">نام سایت</label>
          <input
            type="text"
            value={generalSettings.siteName}
            onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل مدیر</label>
          <input
            type="email"
            value={generalSettings.adminEmail}
            onChange={(e) => setGeneralSettings({ ...generalSettings, adminEmail: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">توضیحات سایت</label>
        <textarea
          value={generalSettings.siteDescription}
          onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس</label>
          <input
            type="text"
            value={generalSettings.phoneNumber}
            onChange={(e) => setGeneralSettings({ ...generalSettings, phoneNumber: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل پشتیبانی</label>
          <input
            type="email"
            value={generalSettings.supportEmail}
            onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">آدرس</label>
        <input
          type="text"
          value={generalSettings.address}
          onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">تنظیمات API</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">کلید API</label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={generalSettings.apiKey}
                onChange={(e) => setGeneralSettings({ ...generalSettings, apiKey: e.target.value })}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL وب‌هوک</label>
            <input
              type="url"
              value={generalSettings.webhookUrl}
              onChange={(e) => setGeneralSettings({ ...generalSettings, webhookUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">درباره اعلان‌ها</h4>
            <p className="text-sm text-blue-700 mt-1">
              تنظیم کنید که چه زمانی و برای چه رویدادهایی اعلان دریافت کنید.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">اعلان‌های ایمیل</h4>
        {Object.entries(notifications).map(([key, value]) => {
          const labels: Record<string, string> = {
            newOrders: 'سفارشات جدید',
            orderStatusUpdates: 'تغییر وضعیت سفارشات',
            lowStock: 'کمبود موجودی',
            dailyReports: 'گزارش‌های روزانه',
            customerReviews: 'نظرات مشتریان',
            systemUpdates: 'بروزرسانی‌های سیستم'
          };

          return (
            <label key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg">
                  {key === 'newOrders' && <Bell className="w-4 h-4 text-blue-600" />}
                  {key === 'orderStatusUpdates' && <CheckCircle className="w-4 h-4 text-green-600" />}
                  {key === 'lowStock' && <AlertTriangle className="w-4 h-4 text-orange-600" />}
                  {key === 'dailyReports' && <Mail className="w-4 h-4 text-purple-600" />}
                  {key === 'customerReviews' && <Smartphone className="w-4 h-4 text-pink-600" />}
                  {key === 'systemUpdates' && <Globe className="w-4 h-4 text-indigo-600" />}
                </div>
                <span className="font-medium text-gray-900">{labels[key]}</span>
              </div>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                className="w-5 h-5 text-red-600 focus:ring-red-500 rounded"
              />
            </label>
          );
        })}
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-yellow-900">تنظیمات امنیتی</h4>
            <p className="text-sm text-yellow-700 mt-1">
              این تنظیمات بر امنیت سیستم تأثیر می‌گذارند. با احتیاط تغییر دهید.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
            <div>
              <span className="font-medium text-gray-900">احراز هویت دو مرحله‌ای</span>
              <p className="text-sm text-gray-600 mt-1">افزایش امنیت با کد تأیید پیامکی</p>
            </div>
            <input
              type="checkbox"
              checked={security.twoFactorAuth}
              onChange={(e) => setSecurity({ ...security, twoFactorAuth: e.target.checked })}
              className="w-5 h-5 text-red-600 focus:ring-red-500 rounded"
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">مدت زمان نشست (دقیقه)</label>
            <input
              type="number"
              value={security.sessionTimeout}
              onChange={(e) => setSecurity({ ...security, sessionTimeout: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">انقضای رمز عبور (روز)</label>
            <input
              type="number"
              value={security.passwordExpiry}
              onChange={(e) => setSecurity({ ...security, passwordExpiry: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">حداکثر تلاش ورود ناموفق</label>
          <input
            type="number"
            value={security.loginAttempts}
            onChange={(e) => setSecurity({ ...security, loginAttempts: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">وضعیت سیستم</h4>
        
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
            <div>
              <span className="font-medium text-gray-900">حالت تعمیر و نگهداری</span>
              <p className="text-sm text-gray-600 mt-1">سایت برای کاربران غیرفعال می‌شود</p>
            </div>
            <input
              type="checkbox"
              checked={system.maintenanceMode}
              onChange={(e) => setSystem({ ...system, maintenanceMode: e.target.checked })}
              className="w-5 h-5 text-red-600 focus:ring-red-500 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
            <div>
              <span className="font-medium text-gray-900">حالت دیباگ</span>
              <p className="text-sm text-gray-600 mt-1">نمایش جزئیات خطاها برای توسعه‌دهندگان</p>
            </div>
            <input
              type="checkbox"
              checked={system.debugMode}
              onChange={(e) => setSystem({ ...system, debugMode: e.target.checked })}
              className="w-5 h-5 text-red-600 focus:ring-red-500 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
            <div>
              <span className="font-medium text-gray-900">کش فعال</span>
              <p className="text-sm text-gray-600 mt-1">بهبود سرعت بارگذاری صفحات</p>
            </div>
            <input
              type="checkbox"
              checked={system.cacheEnabled}
              onChange={(e) => setSystem({ ...system, cacheEnabled: e.target.checked })}
              className="w-5 h-5 text-red-600 focus:ring-red-500 rounded"
            />
          </label>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">پشتیبان‌گیری</h4>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
            <div>
              <span className="font-medium text-gray-900">پشتیبان‌گیری خودکار</span>
              <p className="text-sm text-gray-600 mt-1">ایجاد پشتیبان به صورت خودکار</p>
            </div>
            <input
              type="checkbox"
              checked={system.autoBackup}
              onChange={(e) => setSystem({ ...system, autoBackup: e.target.checked })}
              className="w-5 h-5 text-red-600 focus:ring-red-500 rounded"
            />
          </label>

          {system.autoBackup && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">دوره پشتیبان‌گیری</label>
              <select
                value={system.backupFrequency}
                onChange={(e) => setSystem({ ...system, backupFrequency: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="daily">روزانه</option>
                <option value="weekly">هفتگی</option>
                <option value="monthly">ماهانه</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">فایل‌ها</h4>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">حداکثر اندازه فایل (MB)</label>
            <input
              type="number"
              value={system.maxFileSize}
              onChange={(e) => setSystem({ ...system, maxFileSize: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">فرمت‌های مجاز</label>
            <input
              type="text"
              value={system.allowedFileTypes.join(', ')}
              onChange={(e) => setSystem({ ...system, allowedFileTypes: e.target.value.split(', ') })}
              placeholder="jpg, png, pdf"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">تم</label>
          <select
            value={appearance.theme}
            onChange={(e) => setAppearance({ ...appearance, theme: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="light">روشن</option>
            <option value="dark">تیره</option>
            <option value="auto">خودکار</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">رنگ اصلی</label>
          <input
            type="color"
            value={appearance.primaryColor}
            onChange={(e) => setAppearance({ ...appearance, primaryColor: e.target.value })}
            className="w-full h-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">زبان</label>
          <select
            value={appearance.language}
            onChange={(e) => setAppearance({ ...appearance, language: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="fa">فارسی</option>
            <option value="en">انگلیسی</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">فرمت تاریخ</label>
          <select
            value={appearance.dateFormat}
            onChange={(e) => setAppearance({ ...appearance, dateFormat: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="persian">شمسی</option>
            <option value="gregorian">میلادی</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">واحد پول</label>
          <select
            value={appearance.currency}
            onChange={(e) => setAppearance({ ...appearance, currency: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="IRR">ریال ایران</option>
            <option value="USD">دلار آمریکا</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">منطقه زمانی</label>
          <select
            value={appearance.timezone}
            onChange={(e) => setAppearance({ ...appearance, timezone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="Asia/Tehran">تهران</option>
            <option value="UTC">UTC</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">تنظیمات سیستم</h1>
          <p className="text-gray-600">مدیریت تنظیمات کلی سیستم</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="file"
            accept=".json"
            onChange={handleImportSettings}
            className="hidden"
            id="import-settings"
          />
          <label
            htmlFor="import-settings"
            className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            وارد کردن
          </label>
          <button
            onClick={handleExportSettings}
            className="flex items-center gap-2 px-4 py-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Download className="w-4 h-4" />
            خروجی
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'system' && renderSystemSettings()}
          {activeTab === 'appearance' && renderAppearanceSettings()}
        </div>

        {/* Save Button */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                ذخیره تغییرات
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                <Trash2 className="w-4 h-4" />
                بازنشانی
              </button>
            </div>
            <div className="text-sm text-gray-500">
              آخرین ذخیره: ۱۴۰۲/۱۲/۱۵ - ۱۴:۳۰
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}