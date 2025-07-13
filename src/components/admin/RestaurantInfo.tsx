import { useState } from 'react';
import { Store, Clock, Phone, MapPin, Globe, Upload, Image, Save, AlertCircle, Instagram, Twitter, Plus, Trash2, X } from 'lucide-react';

interface SocialMedia {
  id: string;
  name: string;
  icon: string;
  link: string;
}

export default function RestaurantInfo() {
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'رستوران ایرانی',
    phone: '۰۲۱-۱۲۳۴۵۶۷۸',
    address: 'تهران، خیابان ولیعصر',
    logo: '',
    enamad: '',
    enamadLink: '',
    workingHours: {
      weekdays: { open: '11:00', close: '23:00' },
      weekends: { open: '11:00', close: '24:00' }
    },
    socialMedia: [
      { id: '1', name: 'اینستاگرام', icon: '', link: '@restaurant_instagram' },
      { id: '2', name: 'توییتر', icon: '', link: '@restaurant_twitter' }
    ],
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

  const [newSocialMedia, setNewSocialMedia] = useState({
    name: '',
    icon: '',
    link: ''
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

  const handleSocialIconUpload = (socialId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const updatedSocialMedia = restaurantInfo.socialMedia.map(social =>
          social.id === socialId ? { ...social, icon: event.target?.result as string } : social
        );
        setRestaurantInfo({
          ...restaurantInfo,
          socialMedia: updatedSocialMedia
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addSocialMedia = () => {
    if (newSocialMedia.name && newSocialMedia.link) {
      const newSocial: SocialMedia = {
        id: Date.now().toString(),
        name: newSocialMedia.name,
        icon: newSocialMedia.icon,
        link: newSocialMedia.link
      };
      setRestaurantInfo({
        ...restaurantInfo,
        socialMedia: [...restaurantInfo.socialMedia, newSocial]
      });
      setNewSocialMedia({ name: '', icon: '', link: '' });
    }
  };

  const removeSocialMedia = (socialId: string) => {
    setRestaurantInfo({
      ...restaurantInfo,
      socialMedia: restaurantInfo.socialMedia.filter(social => social.id !== socialId)
    });
  };

  const updateSocialMedia = (socialId: string, field: string, value: string) => {
    const updatedSocialMedia = restaurantInfo.socialMedia.map(social =>
      social.id === socialId ? { ...social, [field]: value } : social
    );
    setRestaurantInfo({
      ...restaurantInfo,
      socialMedia: updatedSocialMedia
    });
  };

  const handleSave = () => {
    localStorage.setItem('restaurantInfo', JSON.stringify(restaurantInfo));
    alert('اطلاعات رستوران با موفقیت ذخیره شد');
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
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
                onChange={(e) => setRestaurantInfo({ ...restaurantInfo, name: e.target.value })}
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
                onChange={(e) => setRestaurantInfo({ ...restaurantInfo, phone: e.target.value })}
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
                onChange={(e) => setRestaurantInfo({ ...restaurantInfo, address: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-base md:px-4 md:py-3"
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
          <h3 className="flex items-center gap-2 mb-4 text-base font-semibold md:text-lg md:mb-6">
            <Image className="w-5 h-5 text-red-600 md:w-6 md:h-6" />
            لوگوی رستوران
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              {restaurantInfo.logo ? (
                <img src={restaurantInfo.logo} alt="لوگوی رستوران" className="max-h-28 max-w-full object-contain" />
              ) : (
                <div className="text-center">
                  <Image className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">لوگو انتخاب نشده</p>
                </div>
              )}
            </div>
            <div className="relative">
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <button className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
                <Upload className="w-4 h-4" />
                انتخاب لوگو
              </button>
            </div>
            {restaurantInfo.logo && (
              <button onClick={() => setRestaurantInfo({ ...restaurantInfo, logo: '' })} className="w-full px-4 py-2 text-sm text-red-600 transition-colors border border-red-300 rounded-lg hover:bg-red-50">
                حذف لوگو
              </button>
            )}
          </div>
        </div>

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
                      workingHours: { ...restaurantInfo.workingHours, weekdays: { ...restaurantInfo.workingHours.weekdays, open: e.target.value } }
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
                      workingHours: { ...restaurantInfo.workingHours, weekdays: { ...restaurantInfo.workingHours.weekdays, close: e.target.value } }
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
                      workingHours: { ...restaurantInfo.workingHours, weekends: { ...restaurantInfo.workingHours.weekends, open: e.target.value } }
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
                      workingHours: { ...restaurantInfo.workingHours, weekends: { ...restaurantInfo.workingHours.weekends, close: e.target.value } }
                    })}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent md:text-sm md:px-3 md:py-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

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
                  <p className="text-xs text-blue-700">این مختصات برای محاسبه فاصله تحویل استفاده می‌شود. می‌توانید از Google Maps مختصات دقیق را کپی کنید.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
        <h3 className="flex items-center gap-2 mb-4 text-base font-semibold md:text-lg md:mb-6">
          <Globe className="w-5 h-5 text-red-600 md:w-6 md:h-6" />
          شبکه‌های اجتماعی
        </h3>
        <div className="space-y-4 mb-6">
          {Array.isArray(restaurantInfo.socialMedia) && restaurantInfo.socialMedia.map((social) => (
            <div key={social.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-900">{social.name}</h4>
                <button onClick={() => removeSocialMedia(social.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">نام شبکه</label>
                  <input
                    type="text"
                    value={social.name}
                    onChange={(e) => updateSocialMedia(social.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">لینک/آیدی</label>
                  <input
                    type="text"
                    value={social.link}
                    onChange={(e) => updateSocialMedia(social.id, 'link', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="@username یا لینک کامل"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-700">آیکون</label>
                  <div className="flex items-center gap-2">
                    {social.icon && <img src={social.icon} alt={social.name} className="w-6 h-6 object-contain" />}
                    <div className="relative flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSocialIconUpload(social.id, e)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <button className="w-full px-3 py-2 text-xs text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                        {social.icon ? 'تغییر آیکون' : 'انتخاب آیکون'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">افزودن شبکه اجتماعی جدید</h4>
          <div className="grid gap-3 md:grid-cols-4">
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">نام شبکه</label>
              <input
                type="text"
                value={newSocialMedia.name}
                onChange={(e) => setNewSocialMedia({ ...newSocialMedia, name: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="نام شبکه اجتماعی"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">لینک/آیدی</label>
              <input
                type="text"
                value={newSocialMedia.link}
                onChange={(e) => setNewSocialMedia({ ...newSocialMedia, link: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="@username یا لینک"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">آیکون</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setNewSocialMedia({ ...newSocialMedia, icon: event.target?.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button className="w-full px-3 py-2 text-xs text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                  انتخاب آیکون
                </button>
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={addSocialMedia}
                className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                افزودن
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
        <h3 className="flex items-center gap-2 mb-4 text-base font-semibold md:text-lg md:mb-6">
          <Image className="w-5 h-5 text-red-600 md:w-6 md:h-6" />
          نماد اعتماد الکترونیک
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 mb-4">
              {restaurantInfo.enamad ? (
                <img src={restaurantInfo.enamad} alt="نماد اعتماد الکترونیک" className="max-h-28 max-w-full object-contain" />
              ) : (
                <div className="text-center">
                  <Image className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">نماد اعتماد انتخاب نشده</p>
                </div>
              )}
            </div>
            <div className="relative">
              <input type="file" accept="image/*" onChange={handleEnamadUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <button className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
                <Upload className="w-4 h-4" />
                انتخاب نماد اعتماد
              </button>
            </div>
            {restaurantInfo.enamad && (
              <button onClick={() => setRestaurantInfo({ ...restaurantInfo, enamad: '' })} className="w-full mt-2 px-4 py-2 text-sm text-red-600 transition-colors border border-red-300 rounded-lg hover:bg-red-50">
                حذف نماد اعتماد
              </button>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">لینک نماد اعتماد</label>
            <input
              type="url"
              value={restaurantInfo.enamadLink}
              onChange={(e) => setRestaurantInfo({ ...restaurantInfo, enamadLink: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="https://trustseal.enamad.ir/..."
            />
            <p className="mt-1 text-xs text-gray-500">لینک نماد اعتماد از سایت enamad.ir دریافت کنید</p>
          </div>
        </div>
      </div>

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