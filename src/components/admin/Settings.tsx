import { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Save,
  AlertTriangle,
  CheckCircle,
  Info,
  Power,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

export default function Settings() {
  const [siteStatus, setSiteStatus] = useState<'online' | 'offline' | 'maintenance' | 'restricted'>('online');
  const [maintenanceMessage, setMaintenanceMessage] = useState('سایت در حال تعمیر و نگهداری است. لطفاً بعداً مراجعه کنید.');
  const [restrictedMessage, setRestrictedMessage] = useState('دسترسی محدود شده است.');

  const statusOptions = [
    { 
      value: 'online', 
      label: 'آنلاین (فعال)', 
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      description: 'سایت به طور کامل فعال است'
    },
    { 
      value: 'offline', 
      label: 'آفلاین (غیرفعال)', 
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: <Power className="w-5 h-5 text-red-600" />,
      description: 'سایت کاملاً غیرفعال است'
    },
    { 
      value: 'maintenance', 
      label: 'تعمیر و نگهداری', 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
      description: 'سایت در حال تعمیر است'
    },
    { 
      value: 'restricted', 
      label: 'دسترسی محدود', 
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      icon: <Lock className="w-5 h-5 text-orange-600" />,
      description: 'دسترسی فقط برای کاربران خاص'
    }
  ];

  const handleSave = () => {
    // Save to localStorage for demo
    localStorage.setItem('siteSettings', JSON.stringify({
      status: siteStatus,
      maintenanceMessage,
      restrictedMessage
    }));
    alert('تنظیمات با موفقیت ذخیره شد');
  };

  const currentStatus = statusOptions.find(option => option.value === siteStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">تنظیمات سایت</h1>
          <p className="text-gray-600">مدیریت وضعیت و دسترسی سایت</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {/* Current Status Display */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              {currentStatus?.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">وضعیت فعلی سایت</h3>
              <div className="flex items-center gap-3 mt-2">
                <span className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full border ${currentStatus?.color}`}>
                  {currentStatus?.label}
                </span>
                <span className="text-sm text-gray-600">{currentStatus?.description}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Options */}
        <div className="p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-6">انتخاب وضعیت سایت</h4>
          <div className="space-y-4">
            {statusOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md ${
                  siteStatus === option.value 
                    ? `${option.color} shadow-md` 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="siteStatus"
                  value={option.value}
                  checked={siteStatus === option.value}
                  onChange={(e) => setSiteStatus(e.target.value as any)}
                  className="mt-1 text-red-600 focus:ring-red-500"
                />
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-shrink-0 mt-0.5">
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900 mb-1">{option.label}</h5>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Custom Messages */}
        {(siteStatus === 'maintenance' || siteStatus === 'restricted') && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              {siteStatus === 'maintenance' ? 'پیام تعمیر و نگهداری' : 'پیام دسترسی محدود'}
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  پیام نمایش داده شده به کاربران:
                </label>
                <textarea
                  value={siteStatus === 'maintenance' ? maintenanceMessage : restrictedMessage}
                  onChange={(e) => {
                    if (siteStatus === 'maintenance') {
                      setMaintenanceMessage(e.target.value);
                    } else {
                      setRestrictedMessage(e.target.value);
                    }
                  }}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="پیام خود را وارد کنید..."
                />
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium mb-1">نکته مهم</p>
                    <p className="text-sm text-blue-700">
                      این پیام به جای محتوای اصلی سایت نمایش داده خواهد شد.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Save className="w-5 h-5" />
              ذخیره تنظیمات
            </button>
            <div className="text-sm text-gray-500">
              آخرین ذخیره: ۱۴۰۲/۱۲/۱۵ - ۱۴:۳۰
            </div>
          </div>
        </div>
      </div>

      {/* Warning Messages */}
      <div className="space-y-4">
        {siteStatus === 'offline' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-red-800 mb-1">هشدار: سایت غیرفعال</h4>
                <p className="text-sm text-red-700">
                  با انتخاب این گزینه، سایت کاملاً غیرفعال می‌شود و کاربران نمی‌توانند به آن دسترسی داشته باشند.
                </p>
              </div>
            </div>
          </div>
        )}

        {siteStatus === 'maintenance' && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800 mb-1">حالت تعمیر و نگهداری</h4>
                <p className="text-sm text-yellow-700">
                  در این حالت، فقط مدیران می‌توانند به سایت دسترسی داشته باشند و سایر کاربران پیام تعمیر را مشاهده می‌کنند.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}