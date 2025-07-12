import { useState } from 'react';
import { Store, Clock, Phone, MapPin, Globe, Upload, Image, Save, AlertCircle, Instagram, Twitter } from 'lucide-react';

export default function RestaurantInfo() {
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'رستوران ایرانی',
    phone: '۰۲۱-۱۲۳۴۵۶۷۸',
    address: 'تهران، خیابان ولیعصر',
    logo: '',
    enamad: '',
    samandehi: '',
    workingHours: {
      weekdays: { open: '11:00', close: '23:00' },
      weekends: { open: '11:00', close: '24:00' }
    },
    socialMedia: {
      instagram: '@restaurant_instagram',
      twitter: '@restaurant_twitter'
    },
    location: {
      lat: 35.6892,
      lng: 51.3890
    },
    footer: {
      aboutText: 'رستوران ایرانی با بیش از ۱۰ سال تجربه در ارائه بهترین غذاهای ایرانی و فست فود',
      copyrightText: '© ۱۴۰۲ رستوران ایرانی. تمامی حقوق محفوظ است.',
      showSocialMedia: true,
      showWorkingHours: true,
      showContactInfo: true
    }
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setRestaurantInfo({
          ...restaurantInfo,
          logo: event.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnamadUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setRestaurantInfo({
          ...restaurantInfo,
          enamad: event.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSamandehi = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setRestaurantInfo({
          ...restaurantInfo,
          samandehi: event.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save restaurant info to localStorage for demo
    localStorage.setItem('restaurantInfo', JSON.stringify(restaurantInfo));
    alert('اطلاعات رستوران با موفقیت ذخیره شد');
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {/* Basic Information */}
        <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
          <h3 className="flex items-center gap-2 mb-4 text-base font-semibold md:text-lg md:mb-6">
            <Store className="w-5 h-5 text-red-600 md:w-6 md:h-6" />
            اطلاعات کلی
          </h3>
          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block mb-1.5 text-xs font-medium text-gray-700 md:text-sm md:mb-2">نام رستوران</label>
              <input
                type="text"
                value={restaurantInfo.name}
                onChange={(e) => setRestaurantInfo({...restaurantInfo, name: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-base md:px-4 md:py-3"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 mb-1.5 text-xs font-medium text-gray-700 md:text-sm md:mb-2">
                <Phone className="w-3 h-3 md:w-4 md:h-4" />
                تلفن
              </label>
              <input
                type="text"
                value={restaurantInfo.phone}
                onChange={(e) => setRestaurantInfo({...restaurantInfo, phone: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-base md:px-4 md:py-3"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 mb-1.5 text-xs font-medium text-gray-700 md:text-sm md:mb-2">
                <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                آدرس
              </label>
              <input
                type="text"
                value={restaurantInfo.address}
                onChange={(e) => setRestaurantInfo({...restaurantInfo, address: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-base md:px-4 md:py-3"
              />
            </div>
          </div>
        </div>

        {/* Logo Upload */}
        <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
          <h3 className="flex items-center gap-2 mb-4 text-base font-semibold md:text-lg md:mb-6">
            <Image className="w-5 h-5 text-red-600 md:w-6 md:h-6" />
            لوگوی رستوران
          </h3>
          <div className="space-y-4">
            {/* Current Logo Display */}
            <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              {restaurantInfo.logo ? (
                <img
                  src={restaurantInfo.logo}
                  alt="لوگوی رستوران"
                  className="max-h-28 max-w-full object-contain"
                />
              ) : (
                <div className="text-center">
                  <Image className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">لوگو انتخاب نشده</p>
                </div>
              )}
            </div>
            
            {/* Upload Button */}
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
                <Upload className="w-4 h-4" />
                انتخاب لوگو
              </button>
            </div>
            
            {restaurantInfo.logo && (
              <button
                onClick={() => setRestaurantInfo({...restaurantInfo, logo: ''})}
                className="w-full px-4 py-2 text-sm text-red-600 transition-colors border border-red-300 rounded-lg hover:bg-red-50"
              >
                حذف لوگو
              </button>
            )}
          </div>
        </div>

        {/* Working Hours */}
        <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
          <h3 className="flex items-center gap-2 mb-4 text-base font-semibold md:text-lg md:mb-6">
            <Clock className="w-5 h-5 text-red-600 md:w-6 md:h-6" />
            ساعات کاری
          </h3>
          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block mb-2 text-xs font-medium text-gray-700 md:text-sm">روزهای هفته</label>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <div>
                  <label className="block mb-1 text-xs text-gray-600">باز</label>
                  <input
                    type="time"
                    value={restaurantInfo.workingHours.weekdays.open}
                    onChange={(e) => setRestaurantInfo({
                      ...restaurantInfo,
                      workingHours: {
                        ...restaurantInfo.workingHours,
                        weekdays: { ...restaurantInfo.workingHours.weekdays, open: e.target.value }
                      }
                    })}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-sm md:px-3 md:py-2"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs text-gray-600">بسته</label>
                  <input
                    type="time"
                    value={restaurantInfo.workingHours.weekdays.close}
                    onChange={(e) => setRestaurantInfo({
                      ...restaurantInfo,
                      workingHours: {
                        ...restaurantInfo.workingHours,
                        weekdays: { ...restaurantInfo.workingHours.weekdays, close: e.target.value }
                      }
                    })}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-sm md:px-3 md:py-2"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-2 text-xs font-medium text-gray-700 md:text-sm">آخر هفته</label>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <div>
                  <label className="block mb-1 text-xs text-gray-600">باز</label>
                  <input
                    type="time"
                    value={restaurantInfo.workingHours.weekends.open}
                    onChange={(e) => setRestaurantInfo({
                      ...restaurantInfo,
                      workingHours: {
                        ...restaurantInfo.workingHours,
                        weekends: { ...restaurantInfo.workingHours.weekends, open: e.target.value }
                      }
                    })}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-sm md:px-3 md:py-2"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs text-gray-600">بسته</label>
                  <input
                    type="time"
                    value={restaurantInfo.workingHours.weekends.close}
                    onChange={(e) => setRestaurantInfo({
                      ...restaurantInfo,
                      workingHours: {
                        ...restaurantInfo.workingHours,
                        weekends: { ...restaurantInfo.workingHours.weekends, close: e.target.value }
                      }
                    })}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-sm md:px-3 md:py-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant Location */}
        <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
          <h3 className="flex items-center gap-2 mb-4 text-base font-semibold md:text-lg md:mb-6">
            <MapPin className="w-5 h-5 text-red-600 md:w-6 md:h-6" />
            موقعیت رستوران
          </h3>
          <div className="space-y-3 md:space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1.5 text-xs font-medium text-gray-700 md:text-sm md:mb-2">عرض جغرافیایی</label>
                <input
                  type="number"
                  step="0.000001"
                  value={restaurantInfo.location.lat}
                  onChange={(e) => setRestaurantInfo({
                    ...restaurantInfo,
                    location: { ...restaurantInfo.location, lat: parseFloat(e.target.value) }
                  })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-base md:px-4 md:py-3"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-xs font-medium text-gray-700 md:text-sm md:mb-2">طول جغرافیایی</label>
                <input
                  type="number"
                  step="0.000001"
                  value={restaurantInfo.location.lng}
                  onChange={(e) => setRestaurantInfo({
                    ...restaurantInfo,
                    location: { ...restaurantInfo.location, lng: parseFloat(e.target.value) }
                  })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-base md:px-4 md:py-3"
                />
              </div>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-blue-800 font-medium mb-1">راهنمایی</p>
                  <p className="text-xs text-blue-700">
                    این مختصات برای محاسبه فاصله تحویل استفاده می‌شود. می‌توانید از Google Maps مختصات دقیق را کپی کنید.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
        <h3 className="flex items-center gap-2 mb-4 text-base font-semibold md:text-lg md:mb-6">
          <Globe className="w-5 h-5 text-red-600 md:w-6 md:h-6" />
          شبکه‌های اجتماعی
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
          <div>
            <label className="flex items-center gap-2 mb-1.5 text-xs font-medium text-gray-700 md:text-sm md:mb-2">
              <Instagram className="w-4 h-4 text-pink-600" />
              اینستاگرام
            </label>
            <input
              type="text"
              value={restaurantInfo.socialMedia.instagram}
              onChange={(e) => setRestaurantInfo({
                ...restaurantInfo,
                socialMedia: { ...restaurantInfo.socialMedia, instagram: e.target.value }
              })}
              placeholder="@username"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-base md:px-4 md:py-3"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 mb-1.5 text-xs font-medium text-gray-700 md:text-sm md:mb-2">
              <Twitter className="w-4 h-4 text-blue-600" />
              توییتر
            </label>
            <input
              type="text"
              value={restaurantInfo.socialMedia.twitter}
              onChange={(e) => setRestaurantInfo({
                ...restaurantInfo,
                socialMedia: { ...restaurantInfo.socialMedia, twitter: e.target.value }
              })}
              placeholder="@username"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-base md:px-4 md:py-3"
            />
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {/* E-namad */}
        <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
          <h3 className="flex items-center gap-2 mb-4 text-base font-semibold md:text-lg md:mb-6">
            <Image className="w-5 h-5 text-red-600 md:w-6 md:h-6" />
            نماد اعتماد الکترونیک
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              {restaurantInfo.enamad ? (
                <img
                  src={restaurantInfo.enamad}
                  alt="نماد اعتماد الکترونیک"
                  className="max-h-28 max-w-full object-contain"
                />
              ) : (
                <div className="text-center">
                  <Image className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">نماد اعتماد انتخاب نشده</p>
                </div>
              )}
            </div>
            
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleEnamadUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
                <Upload className="w-4 h-4" />
                انتخاب نماد اعتماد
              </button>
            </div>
            
            {restaurantInfo.enamad && (
              <button
                onClick={() => setRestaurantInfo({...restaurantInfo, enamad: ''})}
                className="w-full px-4 py-2 text-sm text-red-600 transition-colors border border-red-300 rounded-lg hover:bg-red-50"
              >
                حذف نماد اعتماد
              </button>
            )}
          </div>
        </div>

        {/* Samandehi */}
        <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
          <h3 className="flex items-center gap-2 mb-4 text-base font-semibold md:text-lg md:mb-6">
            <Image className="w-5 h-5 text-red-600 md:w-6 md:h-6" />
            نماد ساماندهی
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              {restaurantInfo.samandehi ? (
                <img
                  src={restaurantInfo.samandehi}
                  alt="نماد ساماندهی"
                  className="max-h-28 max-w-full object-contain"
                />
              ) : (
                <div className="text-center">
                  <Image className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">نماد ساماندهی انتخاب نشده</p>
                </div>
              )}
            </div>
            
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleSamandehi}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
                <Upload className="w-4 h-4" />
                انتخاب نماد ساماندهی
              </button>
            </div>
            
            {restaurantInfo.samandehi && (
              <button
                onClick={() => setRestaurantInfo({...restaurantInfo, samandehi: ''})}
                className="w-full px-4 py-2 text-sm text-red-600 transition-colors border border-red-300 rounded-lg hover:bg-red-50"
              >
                حذف نماد ساماندهی
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer Settings */}
      <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
        <h3 className="flex items-center gap-2 mb-4 text-base font-semibold md:text-lg md:mb-6">
          <Globe className="w-5 h-5 text-red-600 md:w-6 md:h-6" />
          تنظیمات فوتر
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-1.5 text-xs font-medium text-gray-700 md:text-sm md:mb-2">متن درباره ما</label>
            <textarea
              value={restaurantInfo.footer.aboutText}
              onChange={(e) => setRestaurantInfo({
                ...restaurantInfo,
                footer: { ...restaurantInfo.footer, aboutText: e.target.value }
              })}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-base md:px-4 md:py-3"
              placeholder="متن درباره رستوران..."
            />
          </div>
          
          <div>
            <label className="block mb-1.5 text-xs font-medium text-gray-700 md:text-sm md:mb-2">متن کپی رایت</label>
            <input
              type="text"
              value={restaurantInfo.footer.copyrightText}
              onChange={(e) => setRestaurantInfo({
                ...restaurantInfo,
                footer: { ...restaurantInfo.footer, copyrightText: e.target.value }
              })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-base md:px-4 md:py-3"
              placeholder="متن کپی رایت..."
            />
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">نمایش در فوتر:</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={restaurantInfo.footer.showSocialMedia}
                  onChange={(e) => setRestaurantInfo({
                    ...restaurantInfo,
                    footer: { ...restaurantInfo.footer, showSocialMedia: e.target.checked }
                  })}
                  className="text-red-600 focus:ring-red-500"
                />
                <span className="text-sm">شبکه‌های اجتماعی</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={restaurantInfo.footer.showWorkingHours}
                  onChange={(e) => setRestaurantInfo({
                    ...restaurantInfo,
                    footer: { ...restaurantInfo.footer, showWorkingHours: e.target.checked }
                  })}
                  className="text-red-600 focus:ring-red-500"
                />
                <span className="text-sm">ساعات کاری</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={restaurantInfo.footer.showContactInfo}
                  onChange={(e) => setRestaurantInfo({
                    ...restaurantInfo,
                    footer: { ...restaurantInfo.footer, showContactInfo: e.target.checked }
                  })}
                  className="text-red-600 focus:ring-red-500"
                />
                <span className="text-sm">اطلاعات تماس</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700 md:px-6 md:py-3 md:text-base"
        >
          <Save className="w-4 h-4" />
          ذخیره تغییرات
        </button>
      </div>
    </div>
  );
}